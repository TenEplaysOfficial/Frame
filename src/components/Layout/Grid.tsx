import { GridProps } from '../../types';

export default function Grid({
  children,
  columns = 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  gap = 'gap-4',
}: GridProps) {
  return <div className={`mt-4 grid ${columns} ${gap}`}>{children}</div>;
}
