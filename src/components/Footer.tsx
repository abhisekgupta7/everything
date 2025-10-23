import React from "react";
import { Separator } from "@/components/ui/separator";

type FooterProps = {
    company?: string;
    privacyHref?: string;
    termsHref?: string;
    className?: string;
};

export default function Footer({
    company = "Abhisek",
    privacyHref = "#",
    termsHref = "#",
    className = "",
}: FooterProps) {
    const year = new Date().getFullYear();

    return (
        <footer
            aria-label="Site footer"
            className={`w-full bg-transparent py-6 ${className}`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Separator className="mb-4" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        © {year} {company}. All rights reserved.
                    </p>

                    <nav aria-label="Footer navigation" className="flex gap-4">
                        <a
                            href={privacyHref}
                            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                        >
                            Privacy
                        </a>
                        <a
                            href={termsHref}
                            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                        >
                            Terms
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}