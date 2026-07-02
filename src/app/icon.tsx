import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f2f0ea",
          color: "#161616",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 26,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        P
      </div>
    ),
    size
  );
}
