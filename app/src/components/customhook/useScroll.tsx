import { useState, useEffect } from 'react';

function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', () => {
      if (mounted) {
        console.log('이벤트 시작');
        setScrollY(window.pageYOffset);
        setLoading(false);
      }
    });
    return () => {
      console.log('이벤트 종료');
      mounted = false;
      // window.removeEventListener('scroll', debounce(listener, delay));
    };
  }, []);

  return {
    scrollY,
  };
}

export default useScroll;
