"use client";

import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    const preventDoubleTap = (() => {
      let lastTouchEnd = 0;
      return (e: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };
    })();

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("dblclick", preventGesture);
    document.addEventListener("touchend", preventDoubleTap, false);

    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("dblclick", preventGesture);
      document.removeEventListener("touchend", preventDoubleTap);
    };
  }, []);

  return null;
}