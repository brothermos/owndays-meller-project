import { useEffect, useState } from "react";

type UseAnimatedPresenceProps = {
  isVisible: boolean;
  exitDurationMs: number;
};

export function useAnimatedPresence(props: UseAnimatedPresenceProps) {
  const { isVisible, exitDurationMs } = props;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible || !isMounted) return;

    const exitTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, exitDurationMs);

    return () => window.clearTimeout(exitTimer);
  }, [isVisible, isMounted, exitDurationMs]);

  return isMounted;
}
