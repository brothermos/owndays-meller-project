import { useCallback, useEffect, useState } from "react";

import { MOBILE_MENU_EXIT_MS } from "@/app/constants/mobile-menu";

import { useAnimatedPresence } from "@/app/hooks/useAnimatedPresence";
import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";

export function useMobileMenu() {
  const [isOpen, setIsOpenState] = useState(false);

  const isMounted = useAnimatedPresence({
    isVisible: isOpen,
    exitDurationMs: MOBILE_MENU_EXIT_MS,
  });

  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
  }, []);

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

  useBodyScrollLock(isMounted);

  return { isOpen, isMounted, setIsOpen };
}
