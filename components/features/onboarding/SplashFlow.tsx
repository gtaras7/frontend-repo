"use client";

import { useEffect, useRef, useState } from "react";

import { SplashErrorPanel } from "@/components/features/onboarding/SplashErrorPanel";
import { SplashPanel } from "@/components/features/onboarding/SplashPanel";
import { bootstrapSession } from "@/lib/api/bootstrap";

export function SplashFlow() {
  const [failed, setFailed] = useState(false);
  const initialRequest = useRef<Promise<boolean> | null>(null);

  useEffect(() => {
    let active = true;
    // Strict Mode replays the effect. The bootstrap POST should run once per visit.
    initialRequest.current ??= tryBootstrap();
    void initialRequest.current.then((succeeded) => {
      if (active) setFailed(!succeeded);
    });
    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <SplashErrorPanel
        onRetry={async () => {
          setFailed(!(await tryBootstrap()));
        }}
      />
    );
  }

  return <SplashPanel />;
}

function tryBootstrap() {
  return bootstrapSession().then(
    () => true,
    () => false,
  );
}
