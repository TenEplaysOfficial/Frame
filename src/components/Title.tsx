export default function Title({ title }: { title: string }) {
  return (
    <h1 className="group relative mt-8 inline-block w-fit pb-2 text-4xl font-semibold">
      {title}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-25 transform bg-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
      ></span>
    </h1>
  );
}
