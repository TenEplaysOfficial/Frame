export function convertMinutesToTimeFormat({ n }: { n: number | string }) {
  const num = typeof n === 'string' ? parseFloat(n) : n;

  const hours = Math.floor(num / 60);
  const remainingMinutes = Math.floor(num % 60);
  const seconds = Math.floor((num % 1) * 60);

  const timeParts = [];

  if (hours > 0) timeParts.push(`${hours}hr`);
  if (remainingMinutes > 0) timeParts.push(`${remainingMinutes}min`);
  if (seconds > 0) timeParts.push(`${seconds}secs`);

  return timeParts.length > 0 ? timeParts.join(' ') : '0secs';
}
