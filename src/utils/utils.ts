export function getAge({ n }: { n: number }) {
  const yearNow = new Date().getFullYear();
  const age = yearNow - n;

  return age;
}
