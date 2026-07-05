"use client";

import { useState } from "react";
import { CursorScrubFrameSequence } from "@/components/CursorScrubFrameSequence";
import { dictionary, type Locale } from "@/content/portfolio";

const portraitFrameSequence = {
  frameCount: 111,
  extension: "webp",
  pad: 3
} as const;

const portraitSequence = {
  ...portraitFrameSequence,
  basePath: "/videos/portrait-clean-frames"
} as const;

export function HeroPortrait({ locale }: { locale: Locale }) {
  const [isTracking, setIsTracking] = useState(false);
  const copy = dictionary[locale];

  return (
    <div
      className={`hero-portrait-frame ${isTracking ? "is-tracking" : ""}`}
      role="img"
      aria-label={copy.portraitAria}
    >
      <div className="portrait-frame-header">
        <span>{copy.portraitLabel}</span>
        <span>{copy.portraitObject}</span>
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
          {isTracking ? copy.portraitTracking : copy.portraitActive}
        </span>
      </div>
    </div>
  );
}
