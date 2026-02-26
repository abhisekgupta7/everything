import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import extractSummaryFromPdf from "../../../actions/summary";
import { getSummaryCountByClerkId, getUserPlanStatus, getUserPriceId } from "@/lib/user";
import { plans } from "@/lib/constants";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
   .middleware(async () => {
  const user = await currentUser();
  if (!user) throw new UploadThingError("Not authenticated");
  
  const email = user.emailAddresses[0]?.emailAddress;
  const status = await getUserPlanStatus(email);
  if (status !== "active") {
    throw new UploadThingError("Active subscription required");
  }
  
  // Check upload limit
  const count = await getSummaryCountByClerkId(user.id);
  const priceId = await getUserPriceId(email);
  const isPro = plans.find(p => p.priceId === priceId)?.name === "Pro";
  const limit = isPro ? 1000 : 5;
  
  if (count >= limit) {
    throw new UploadThingError("Upload limit reached");
  }
  
  return { userId: user.id };
})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("FIle uploaded:", file);
      console.log("Upload complete for user id:", metadata.userId);

      // Kick off server-side summary extraction in background so we don't block the UploadThing callback
      try {
        const pdfUrl = file.ufsUrl || file.url || file.appUrl || null;
        if (!pdfUrl) {
          console.warn("No PDF URL available on uploaded file:", file);
        } else {
          // Don't await — run in background and log any errors
          extractSummaryFromPdf(pdfUrl, {
            userId: metadata.userId as string,
            pdfUrl,
            fileName: file.name,
            fileSize: file.size,
            FileKey: file.key,
          }).catch((err) => console.error("Background summary error:", err));
        }
      } catch (err) {
        console.error("Error starting background summary:", err);
      }

      // Return basic metadata to UploadThing
      return {
        userId: metadata.userId,
        pdfUrl: file.ufsUrl,
        fileName: file.name,
        fileSize: file.size,
        FileKey: file.key,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
