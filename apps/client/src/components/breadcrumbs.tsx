"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      label: decodeURIComponent(seg.replace(/-/g, " ")),
      href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.length == 0 ? (
          <li key="home" className="flex items-center space-x-1">
            <BreadcrumbItem>
              <BreadcrumbPage
                href="/"
                className="text-foreground"
                aria-current="page"
              >
                Home
              </BreadcrumbPage>
            </BreadcrumbItem>
          </li>
        ) : (
          crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;

            return (
              <li key={idx} className="flex items-center space-x-1">
                <BreadcrumbItem>
                  <BreadcrumbPage
                    href={crumb.href}
                    className={cn(
                      "capitalize",
                      idx === crumbs.length - 1
                        ? "text-foreground"
                        : "text-foreground opacity-60"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </BreadcrumbPage>
                  {isLast ? (
                    ""
                  ) : (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbItem>
              </li>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
