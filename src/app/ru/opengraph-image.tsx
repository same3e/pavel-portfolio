import { ImageResponse } from "next/og";
import { getSite } from "@/content/portfolio";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function RussianOpenGraphImage() {
  const site = getSite("ru");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#11110f",
          color: "#f2f0ea",
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
          <span>{site.name}</span>
          <span>{site.location}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "sans-serif",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 0.98
          }}
        >
          <span>Веб-дизайнер</span>
          <span>и разработчик</span>
        </div>
      </div>
    ),
    size
  );
}
