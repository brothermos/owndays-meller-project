import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_MENU_EXIT_MS = 300;

const useHeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpenState] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const rafRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  const clearPendingMenuTransitions = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const setIsMobileMenuOpen = useCallback(
    (open: boolean) => {
      clearPendingMenuTransitions();

      if (open) {
        setIsMobileMenuOpenState(true);
        setIsMobileMenuMounted(true);
        setIsMobileMenuAnimating(false);
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = requestAnimationFrame(() => {
            setIsMobileMenuAnimating(true);
            rafRef.current = null;
          });
        });
        return;
      }

      setIsMobileMenuOpenState(false);
      setIsMobileMenuAnimating(false);
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
    isMobileMenuAnimating,
  };
};

export default useHeroSection;
