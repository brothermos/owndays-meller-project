import { useCallback, useEffect, useRef, useState } from "react";

import { MOBILE_MENU_EXIT_MS } from "../constants/mobile-menu.type";

export function useMobileMenu() {
  const [isOpen, setIsOpenState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const exitTimerRef = useRef<number | null>(null);

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const setIsOpen = useCallback(
    (open: boolean) => {
      clearExitTimer();

      if (open) {
        setIsMounted(true);
        setIsOpenState(true);
        return;
      }

      setIsOpenState(false);
      exitTimerRef.current = window.setTimeout(() => {
        setIsMounted(false);
        exitTimerRef.current = null;
      }, MOBILE_MENU_EXIT_MS);
    },
    [clearExitTimer],
  );

  useEffect(() => {
    if (!isMounted) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isMounted, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMounted]);

  useEffect(() => clearExitTimer, [clearExitTimer]);

  return { isOpen, isMounted, setIsOpen };
}
