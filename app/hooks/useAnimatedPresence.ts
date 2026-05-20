import { useEffect, useState } from "react";

type UseAnimatedPresenceProps = {
  isVisible: boolean;
  exitDurationMs: number;
};

export function useAnimatedPresence(props: UseAnimatedPresenceProps) {
  const { isVisible, exitDurationMs } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const frame = requestAnimationFrame(() => {
        setIsMounted(true);
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!isMounted) return;

    const exitTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, exitDurationMs);

    return () => window.clearTimeout(exitTimer);
  }, [isVisible, isMounted, exitDurationMs]);

  return isMounted;
}
