import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, labelledBy, describedBy, id, className = '', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`site-modal ${className}`}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
