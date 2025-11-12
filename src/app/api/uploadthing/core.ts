import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import extractSummaryFromPdf from "../../../../actions/summary";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      try {
        const user = await currentUser();
        if (!user) {
          console.log("No user found");
          return { userId: "anonymous" };
        }
        return { userId: user.id };
      } catch (error) {
        console.error("Middleware error:", error);
        throw new UploadThingError("Authentication failed");
      }
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
