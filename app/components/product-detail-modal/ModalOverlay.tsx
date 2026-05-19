type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalOverlay(props: ModalOverlayProps) {
  const { isOpen, onClose } = props;

  return (
    <div
      onClick={onClose}
      aria-hidden="true"
      className={`fixed inset-0 z-110 bg-black/40 ${
        isOpen ? "animate-overlay-in" : "pointer-events-none animate-overlay-out"
      }`}
    />
  );
}
