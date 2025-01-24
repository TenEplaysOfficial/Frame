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
      className="rounded-lg bg-blue-500 px-4 py-2 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-700"
    >
      {title}
    </button>
  );
}
