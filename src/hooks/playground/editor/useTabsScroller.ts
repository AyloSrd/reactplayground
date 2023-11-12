import { useCallback, useEffect, useRef, useState } from "react";

export function useTabsScroller({ tabs }: { tabs: string[] }) {
  const [isOverflowedLeft, setIsOverflowedLeft] = useState(false);
  const [isOverflowedRight, setIsOverflowedRight] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFaders = useCallback(() => {
    const { current: ul } = tabsRef;

    if (ul) {
      const { scrollWidth, clientWidth, scrollLeft } = ul;
      setIsOverflowedLeft(scrollLeft > 0);
      setIsOverflowedRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, [setIsOverflowedLeft, setIsOverflowedRight, tabsRef]);

  useEffect(() => {
    calculateFaders();
    const { current: container } = containerRef;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        calculateFaders()
      }
    });
    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [calculateFaders, tabs, tabsRef, containerRef]);

  return {
    containerRef,
    tabsRef,
    isOverflowedLeft,
    isOverflowedRight,
    handleScroll: calculateFaders,
  };
}
