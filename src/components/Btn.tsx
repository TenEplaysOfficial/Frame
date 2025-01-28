export default function Btn({
  onClick,
  title,
  disabled,
}: {
  onClick?: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mx-2 h-16 w-full cursor-pointer rounded-lg border-none px-4 py-2 text-2xl font-medium ring-2 ring-white/20 backdrop-blur-xl outline-none hover:ring-white/70 active:bg-indigo-700 active:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:bg-transparent"
    >
      {title}
    </button>
  );
}
