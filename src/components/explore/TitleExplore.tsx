export default function TitleExplore({ title }: { title: string }) {
  return (
    <h3 className="group font-secondary relative my-2 w-fit text-xl font-medium uppercase">
      {title}
      <span
        className={`absolute -bottom-[2px] left-0 h-[3px] w-full origin-left scale-x-25 transform bg-sky-600 transition-transform duration-700 ease-in-out group-hover:scale-x-100`}
      />
    </h3>
  );
}
