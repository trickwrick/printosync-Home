import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fbfefd 0%, #e5f7f2 50%, #fbfefd 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #29b8ba, #289475)",
            }}
          />
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#212529" }}>
            {siteConfig.name}
          </span>
        </div>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#212529",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          {siteConfig.tagline}
        </h1>
        <p style={{ fontSize: "24px", color: "#5c5c5c", maxWidth: "800px" }}>
          {siteConfig.description}
        </p>
      </div>
    ),
    { ...size },
  );
}
