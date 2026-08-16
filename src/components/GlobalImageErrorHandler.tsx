'use client';

import { useEffect } from 'react';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

export default function GlobalImageErrorHandler() {
  useEffect(() => {
    const handleGlobalImageError = (event: ErrorEvent) => {
      const target = event.target as HTMLImageElement;
      if (target && target.tagName === 'IMG') {
        target.src = FALLBACK_IMAGE;
      }
    };

    const patchExistingImages = () => {
      const imgs = document.querySelectorAll('img');
      imgs.forEach((img) => {
        if (!img.onerror) {
          img.onerror = () => {
            img.src = FALLBACK_IMAGE;
          };
        }
      });
    };

    patchExistingImages();
    document.addEventListener('error', handleGlobalImageError, true);

    return () => {
      document.removeEventListener('error', handleGlobalImageError, true);
    };
  }, []);

  return null;
}
