import { useEffect } from 'react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Introduction video"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          ✕
        </button>

        {/* Video */}
        <div
          className="relative overflow-hidden rounded-2xl bg-black shadow-2xl"
          style={{ paddingBottom: '56.25%' }}
        >
          <video
            autoPlay
            controls
            playsInline
            className="absolute inset-0 h-full w-full"
          >
            <source src="/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;