"use client";

import { useTranslations } from "next-intl";
import { type SubmitEvent, useEffect, useRef, useState } from "react";

import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { useDemoRegistration } from "@/components/features/onboarding/useDemoRegistration";
import { Button, Callout, Divider, TextInput } from "@/components/ui";
import { isOnboardingMockEnabled } from "@/lib/api/mock-onboarding";

/** Local validation + opt-in synthetic demo. Backend owns real accounts and sessions. */
export function RegisterForm() {
  const t = useTranslations("register");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [unavailable, setUnavailable] = useState<"account" | "guest" | null>(null);
  const demo = isOnboardingMockEnabled();
  const registration = useDemoRegistration(() => {
    if (passwordRef.current) passwordRef.current.value = "";
  });
  const { duplicateEmail } = registration;
  const hasErrors = emailInvalid || passwordInvalid || duplicateEmail;

  useEffect(() => {
    if (duplicateEmail && !registration.isPending) emailRef.current?.focus();
  }, [duplicateEmail, registration.isPending]);

  function clearFeedback() {
    setUnavailable(null);
    registration.reset();
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (registration.isPending) return;
    const email = emailRef.current;
    const password = passwordRef.current;
    if (!email || !password) return;

    setSubmitted(true);
    setEmailInvalid(!email.validity.valid);
    setPasswordInvalid(!password.validity.valid);
    clearFeedback();

    if (!email.validity.valid) email.focus();
    else if (!password.validity.valid) password.focus();
    else if (demo) registration.start();
    else setUnavailable("account");
  }

  return (
    <div style={onboardingStyles.stack}>
      {hasErrors ? (
        <div role="alert" aria-live="polite">
          <Callout tone="warning" title={t("validation.title")}>
            {t("validation.body")}
          </Callout>
        </div>
      ) : registration.isError ? (
        <div aria-live="polite">
          <Callout tone="danger" title={t("requestError.title")}>
            {t("requestError.body")}
          </Callout>
        </div>
      ) : unavailable ? (
        <p role="status" aria-live="polite" style={onboardingStyles.intro}>
          {t(`unavailable.${unavailable}`)}
        </p>
      ) : (
        <p style={onboardingStyles.intro}>{t("intro")}</p>
      )}

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={registration.isPending}
        style={onboardingStyles.card}
      >
        {/* No field names until API integration: native submission without JS
            must never serialize credentials into a URL. Validation uses refs. */}
        <TextInput
          ref={emailRef}
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          disabled={registration.isPending}
          required
          label={t("email.label")}
          placeholder={t("email.placeholder")}
          helperText={t("email.helper")}
          errorText={
            emailInvalid ? t("email.error") : duplicateEmail ? t("email.inUse") : undefined
          }
          onChange={(event) => {
            if (submitted) setEmailInvalid(!event.currentTarget.validity.valid);
            clearFeedback();
          }}
        />
        <TextInput
          ref={passwordRef}
          type="password"
          autoComplete="new-password"
          disabled={registration.isPending}
          required
          minLength={8}
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          helperText={t("password.helper")}
          errorText={passwordInvalid ? t("password.error") : undefined}
          onChange={(event) => {
            if (submitted) setPasswordInvalid(!event.currentTarget.validity.valid);
            clearFeedback();
          }}
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={registration.isPending}
          loadingLabel={t("submitting")}
        >
          {t("submit")}
        </Button>
      </form>

      {!hasErrors && (
        <>
          <Divider label={t("divider")} />
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            disabled={registration.isPending}
            onClick={() => {
              setUnavailable("guest");
            }}
          >
            {t("guest")}
          </Button>
          <p style={onboardingStyles.footnote}>{t("footnote")}</p>
        </>
      )}
      {demo && <p style={onboardingStyles.footnote}>{t("demoNote")}</p>}
    </div>
  );
}
