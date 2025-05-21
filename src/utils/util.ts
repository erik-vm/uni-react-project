import { type DateArg, format } from "date-fns";
import z from "zod";

// Formats date to more readable output
export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy hh:mm");
}
// Converts seconds to min:sec format
export function formatPace(seconds: number): string {
  const min = Math.round(seconds / 60);
  return `${min}min/km`;
}

// Converts minutes to h m s format
export function formatDuration(duration: number): string {
  const totalSeconds = Math.round(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}min`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}sec`);

  return parts.join(" ");
}

// Converts distance
export function formatDistance(distance: number): string {
  const meters = Math.round(distance);
  const kilometers = Math.floor(meters / 1000);
  const remainingMeters = meters % 1000;

  const parts = [];
  if (kilometers > 0) parts.push(`${kilometers}km`);
  if (remainingMeters > 0 || kilometers === 0)
    parts.push(`${remainingMeters}m`);

  return parts.join(" ");
}

// Converts climb/descent in mm to m
export function formatElevation(elevation: number): string {
  const meters = (elevation / 1000).toFixed(1);
  return `${meters}m`;
}

export const requiredString = (fieldName: string) => z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` })
