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
      className="mx-2 h-16 w-full cursor-pointer rounded-lg border-none bg-white/5 px-4 py-2 text-2xl font-medium ring-2 ring-sky-500 backdrop-blur-xl outline-none hover:bg-white/10 disabled:cursor-not-allowed disabled:bg-gray-700"
    >
      {title}
    </button>
  );
}
