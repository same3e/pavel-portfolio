"use client";

import { useState } from "react";
import { CursorScrubVideo } from "@/components/CursorScrubVideo";

export function HeroPortrait() {
  const [isTracking, setIsTracking] = useState(false);
  const [isRenderReady, setIsRenderReady] = useState(false);

  return (
    <div
      className={`hero-portrait-frame ${isTracking ? "is-tracking" : ""}`}
      role="img"
      aria-label="Voxel portrait render preview"
    >
      <div className="portrait-frame-header">
        <span>PORTRAIT_01</span>
        <span>OBJ / 001</span>
      </div>

      <div className="portrait-viewport">
        <CursorScrubVideo
          darkSrc="/videos/portrait-dark.mp4"
          lightSrc="/videos/portrait-light.mp4"
          onTrackingChange={setIsTracking}
          onReadyChange={setIsRenderReady}
        />
      </div>

      <div className="portrait-frame-footer">
        <span>1254 x 1254</span>
        <span>
          <i aria-hidden="true" />
          {isRenderReady ? "RENDER ACTIVE" : "LOADING RENDER"}
        </span>
      </div>
    </div>
  );
}
