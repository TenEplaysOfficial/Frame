import { ReactNode, useRef, useState, useEffect, MouseEvent } from 'react';

export default function HorizontalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);
  const isHorizontalDrag = useRef(false);
  const isVerticalDrag = useRef(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    startY.current = e.pageY - scrollRef.current.offsetTop;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollTop.current = scrollRef.current.scrollTop;
    isHorizontalDrag.current = false;
    isVerticalDrag.current = false;

    document.querySelectorAll('a').forEach((link) => {
      (link as HTMLAnchorElement).style.pointerEvents = 'none';
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    const deltaX = Math.abs(x - startX.current);
    const deltaY = Math.abs(y - startY.current);

    if (deltaY > deltaX) {
      isVerticalDrag.current = true;
      isHorizontalDrag.current = false;
      document.querySelectorAll('a').forEach((link) => {
        (link as HTMLAnchorElement).style.pointerEvents = 'auto';
      });
    }

    if (deltaX > deltaY && !isVerticalDrag.current) {
      isHorizontalDrag.current = true;
      scrollRef.current.scrollLeft =
        scrollLeft.current - (x - startX.current) * 1.5;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (isHorizontalDrag.current) {
      setTimeout(() => {
        document.querySelectorAll('a').forEach((link) => {
          (link as HTMLAnchorElement).style.pointerEvents = 'auto';
        });
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    document.querySelectorAll('a').forEach((link) => {
      (link as HTMLAnchorElement).style.pointerEvents = 'auto';
    });
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      className={`hide-scrollbar flex max-h-fit min-h-[60vh] w-full space-x-4 overflow-x-scroll px-2 py-4 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {children}
    </div>
  );
}
