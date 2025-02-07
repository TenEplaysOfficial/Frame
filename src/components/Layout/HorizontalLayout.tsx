import { ReactNode } from 'react';

export default function HorizontalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`hide-scrollbar flex max-h-fit min-h-[60vh] w-full space-x-4 overflow-x-scroll px-2 py-4`}
    >
      {children}
    </div>
  );
}
