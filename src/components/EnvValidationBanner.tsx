'use client';

import { useEffect, useState } from 'react';

export default function EnvValidationBanner() {
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const valid = Boolean(url && key && url.includes('supabase.co') && key.length > 20);
    setIsMissing(!valid);
  }, []);

  if (!isMissing) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] bg-amber-500 text-white text-center py-2 px-4 text-sm font-medium">
      Database connection missing - Check .env.local
    </div>
  );
}
