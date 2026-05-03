"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.wanoapp.com";

interface VisitorData {
  page: string;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  timezone: string;
  timestamp: string;
}

async function trackVisitor(data: VisitorData) {
  try {
    await fetch(`${API_URL}/api/v1/landing/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Don't wait for response
      keepalive: true,
    });
  } catch {
    // Silently fail - don't block user experience
  }
}

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track on client side
    if (typeof window === "undefined") return;

    // Small delay to not block page load
    const timeoutId = setTimeout(() => {
      const data: VisitorData = {
        page: pathname,
        referrer: document.referrer || "direct",
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString(),
      };

      trackVisitor(data);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
