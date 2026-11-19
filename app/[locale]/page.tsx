import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { redirect } from "@/i18n/navigation";

/**
 * next-intl's proxy forwards the bare `/` here as `/{locale}`, but there is no
 * standalone home screen in this phase — onboarding step 01 (the splash) is the
 * entry point. Forward to it, keeping the locale intact.
 */
export default async function LocaleIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect({ href: ONBOARDING_ROUTES.splash, locale });
}
