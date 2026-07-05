"use client";

import { useState } from "react";
import { CursorScrubFrameSequence } from "@/components/CursorScrubFrameSequence";

const portraitFrameSequence = {
  frameCount: 111,
  extension: "webp",
  pad: 3
} as const;

const portraitSequence = {
  ...portraitFrameSequence,
  basePath: "/videos/frames"
} as const;

export function HeroPortrait() {
  const [isTracking, setIsTracking] = useState(false);

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
        <CursorScrubFrameSequence
          sequence={portraitSequence}
          onTrackingChange={setIsTracking}
        />
      </div>

      <div className="portrait-frame-footer">
        <span>1254 x 1254</span>
        <span>
          <i aria-hidden="true" />
          {isTracking ? "SUBJECT TRACKING" : "RENDER ACTIVE"}
        </span>
      </div>
    </div>
  );
}
