import Image from "next/image";

export function OnboardingPartnerLogo({
  label = "",
  cornerRadius,
}: {
  label?: string;
  cornerRadius?: number;
}) {
  return (
    <Image
      src="/onboarding/partner-logo.png"
      alt={label}
      width={200}
      height={73}
      unoptimized
      loading="eager"
      style={{ display: "block", flexShrink: 0, objectFit: "contain", borderRadius: cornerRadius }}
    />
  );
}
