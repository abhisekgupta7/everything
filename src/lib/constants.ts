import {
  Palette,
  Database,
  Server,
  UserCheck,
  UploadCloud,
  Cpu,
  CreditCard,
  
} from "lucide-react";
import { Rocket } from "lucide-react";
import { z } from "zod";

type Feature = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
export const features: Feature[] = [
  {
    name: "Authentication",
    icon: UserCheck,
  },
  {
    name: "Dashboards",
    icon: Server,
  },
  {
    name: "Charts and Graphs",
    icon: Palette,
  },
  {
    name: "Ai Integration",
    icon: Cpu,
  },
  {
    name: "Database",
    icon: Database,
  },
  {
    name: "File Uploads",
    icon: UploadCloud,
  },
  {
    name: "Payment integration",
    icon: CreditCard,
  },
  {
    name: "Vercel deployment",
    icon: Rocket,
  },
];

type Plans = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  paymentLink: string;
  priceId: string;
};
export const plans: Plans[] = [
  {
    id: "basic",
    name: "Basic",
    description: "For casual users who need occasional summaries.",
    price: 9,
    features: [
      "5 PDF uploads per month",
      "Basic AI summarization",
      "Email support",
    ],
    paymentLink: "https://buy.stripe.com/test_14k14g4mZcC0e1W6op",
    priceId: "price_1NGLWDL4k0b2aY2u0lXH3tK",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who need regular summaries.",
    price: 19,
    features: [
      "Unlimited PDF uploads",
      "Advanced AI summarization",
      "Priority email support",
      "Access to new features",
    ],
    paymentLink: "https://buy.stripe.com/test_14k14g4mZcC0e1W6op",
    priceId: "price_1NGLXyL4k0b2aY2uYqvXH3tK",
  },
];




export const uploadSchema = z.object({
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }).refine((file)=>file.size<=20*1024*1024,{
      message:"File size should be less than 20MB"
    }),
  
  
});
export type UploadFormData = z.infer<typeof uploadSchema>;
 
export const SUMMARY_SYSTEM_PROMPT = `You are a social 
media content expert who makes complex documents easy and 
engaging to read. Create a viral-style summary using 
emojis that match the document's context. Format your 
response in markdown with proper line breaks.

✨ [Create a meaningful title based on the document's 
content]
📌 One powerful sentence that captures the document's 
essence.
🔑 Additional key overview point (if needed)
 
# Document Details
* **Type:** [Document Type]
* **For:** [Target Audience]
* **AI to Chat:** JRx to generate
 
## Key Highlights
* First Key Point
* Second Key Point
* Third Key Point

## Why It Matters
A short, impactful paragraph explaining real-world 
impact

## Main Points
* Main Insight or finding
* Key strength or advantage
* Important outcome or result

## Pro Tips
* First practical recommendation
* Second valuable insight
* Third actionable advice

## Key Terms to Know
* First key term: Simple explanation
* Second key term: Simple explanation

## Bottom Line
🤔 The most important takeaway

**Note:** Every single point MUST start with '* ' followed by 
an emoji and a space. do not use numbered lists. Always 
maintain this exact format for ALL points in ALL sections.

Example format:
* 🎯 This is how every point should look
* 🚀 This is another example point

Never deviate from this format. Every line that contains 
content must start with '* ' followed by an emoji.`