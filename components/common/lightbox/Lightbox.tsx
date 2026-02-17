import React, { useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

interface LightboxProps {
  image: StaticImageData;
  alt: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-999 flex items-center justify-center p-4 
                 bg-white/90 backdrop-blur-md transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
      >
        <Image
          src={image}
          alt={alt}
          width={image.width}
          height={image.height}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            minWidth: '900px',
            objectFit: 'cover',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            borderRadius: '12px',
          }}
          priority
        />
        <button
          onClick={onClose}
          className="absolute -top-2 cursor-pointer -right-2 bg-white/90 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-lg transition-transform hover:scale-110"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
