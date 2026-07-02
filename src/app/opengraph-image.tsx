import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f2f0ea",
          color: "#161616",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "76px",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 24,
            justifyContent: "space-between",
            letterSpacing: 1,
            textTransform: "uppercase"
          }}
        >
          <span>Pavel Kostin</span>
          <span>Tbilisi / Worldwide</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "sans-serif",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 0.92
          }}
        >
          <span>Web Designer</span>
          <span>&amp; Developer</span>
        </div>
      </div>
    ),
    size
  );
}
