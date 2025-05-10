import { type DateArg, format } from "date-fns";

export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy hh:mm");
}
export function formatDuration(duration: string | number): string {
  const parsed = Number(duration);
  if (isNaN(parsed)) return "Invalid duration";

  const totalSeconds = Math.round(parsed * 60); // convert minutes to seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}min`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}sec`);

  return parts.join(" ");
}
