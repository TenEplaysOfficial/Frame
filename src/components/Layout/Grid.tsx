import { GridProps } from '../../types';

export default function Grid({ children }: GridProps) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
