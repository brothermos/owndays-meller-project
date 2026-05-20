import { type RefObject, useLayoutEffect, useRef, useSyncExternalStore } from "react";

/** Matches Tailwind `sm:` — drawer layout + keyboard trap only from this width up. */
const TRAP_MEDIA_QUERY = "(min-width: 640px)";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function subscribeDesktopViewport(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(TRAP_MEDIA_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopViewportSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(TRAP_MEDIA_QUERY).matches;
}

function getDesktopViewportServerSnapshot() {
  return false;
}

function getVisibleFocusables(container: HTMLElement): HTMLElement[] {
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return nodes.filter((el) => {
    if (el.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    return true;
  });
}

type UseModalFocusTrapResult = {
  trapViewport: boolean;
};

export function useModalFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): UseModalFocusTrapResult {
  const trapViewport = useSyncExternalStore(
    subscribeDesktopViewport,
    getDesktopViewportSnapshot,
    getDesktopViewportServerSnapshot,
  );

  const trapActive = isActive && trapViewport;
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!trapActive) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusables = getVisibleFocusables(container);
    const initial = focusables[0];
    if (initial) {
      initial.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const list = getVisibleFocusables(container);
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      const prev = previousFocusRef.current;
      if (prev && document.contains(prev) && typeof prev.focus === "function") {
        prev.focus();
      }
      previousFocusRef.current = null;
    };
  }, [trapActive, containerRef]);

  return { trapViewport };
}
