import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_MENU_EXIT_MS = 320;

const useHeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpenState] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const exitTimerRef = useRef<number | null>(null);

  const clearPendingMenuTransitions = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const setIsMobileMenuOpen = useCallback(
    (open: boolean) => {
      clearPendingMenuTransitions();

      if (open) {
        setIsMobileMenuMounted(true);
        setIsMobileMenuOpenState(true);
        return;
      }

      setIsMobileMenuOpenState(false);
      exitTimerRef.current = window.setTimeout(() => {
        setIsMobileMenuMounted(false);
        exitTimerRef.current = null;
      }, MOBILE_MENU_EXIT_MS);
    },
    [clearPendingMenuTransitions],
  );

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [setIsMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuMounted]);

  useEffect(() => clearPendingMenuTransitions, [clearPendingMenuTransitions]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuMounted,
  };
};

export default useHeroSection;
