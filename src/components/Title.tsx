export default function Title({ title }: { title: string }) {
  return (
    <h1 className="group font-secondary relative mt-8 inline-block w-fit cursor-default pb-2 text-4xl font-medium uppercase">
      {title}
      <span
        className={`absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-25 transform rounded-2xl bg-blue-600 transition-transform duration-700 ease-in-out group-hover:scale-x-100`}
      ></span>
    </h1>
  );
}
