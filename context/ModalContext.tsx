'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';

type ModalOptions = {
  outsideClose?: boolean;
};

type ModalState = {
  content: ReactNode;
  options?: ModalOptions;
};

type ModalContextType = {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (content: ReactNode, options?: ModalOptions) =>
    setModal({ content, options });
  const closeModal = useCallback(() => setModal(null), []);

  const handleBackdropClick = () => {
    if (modal?.options?.outsideClose !== false) {
      closeModal();
    }
  };

  useEffect(() => {
    if (!modal) return;
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = scrollBarWidth + 'px';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = "0px";
    };
  }, [modal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal &&
        createPortal(
          <div id="modal-root" className="fixed inset-0 z-999 p-5 flex items-center justify-center bg-[#342E3999] backdrop-blur-md"
            onClick={handleBackdropClick}
          >
            <div className="relative bg-white rounded-xl max-h-[-webkit-fill-available] overflow-y-auto shadow-lg md:py-6 py-4 md:px-6 px-5 w-full max-w-175"
              onClick={(e) => e.stopPropagation()}
            >
              {modal.content}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};