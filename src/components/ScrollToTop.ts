import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const navigationType = (
      window.performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming
    )?.type;

    if (navigationType === 'navigate') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
