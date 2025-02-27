import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window === "undefined") return { width: 1200, height: 800 }; // ✅ Prevent SSR errors

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useGetWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    // ✅ Force update on mount (for hydration issues)
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); // ✅ Empty dependency array is fine (event listener persists)

  return windowDimensions;
}
