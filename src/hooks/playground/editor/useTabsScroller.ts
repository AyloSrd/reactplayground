import { useCallback, useEffect, useRef, useState } from "react";

export function useTabsScroller({ tabs }: { tabs: string[] }) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isOverflowedLeft, setIsOverflowedLeft] = useState(false);
  const [isOverflowedRight, setIsOverflowedRight] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFaders = useCallback(() => {
    const { current: ul } = tabsRef;

    if (ul) {
      const { scrollWidth, clientWidth, scrollLeft } = ul;
      setIsScrollable(scrollWidth > clientWidth);
      setIsOverflowedLeft(scrollLeft > 0);
      setIsOverflowedRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, [setIsScrollable, setIsOverflowedLeft, setIsOverflowedRight, tabsRef]);

  useEffect(() => {
    calculateFaders();
    const { current: container } = containerRef;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        calculateFaders()
      }
    });
    if (container) observer.observe(container);
    //window.addEventListener("resize", calculateFaders);

    return () => {
      if (container) observer.unobserve(container);
      //window.removeEventListener("resize", calculateFaders);
    };
  }, [calculateFaders, tabs, tabsRef, containerRef]);

  return {
    containerRef,
    tabsRef,
    isScrollable,
    isOverflowedLeft,
    isOverflowedRight,
    handleScroll: calculateFaders,
  };
}
