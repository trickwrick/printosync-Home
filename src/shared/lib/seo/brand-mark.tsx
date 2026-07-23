import { siteConfig } from "@/shared/config/site";

/** Shared brand mark for metadata icons (ImageResponse) */
export function BrandMark({ size }: { size: number }) {
  const fontSize = Math.round(size * 0.38);
  const radius = Math.round(size * 0.22);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #29b8ba, #289475)",
        borderRadius: radius,
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.04em",
        }}
      >
        {siteConfig.name.charAt(0)}
      </span>
    </div>
  );
}
