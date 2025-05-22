import z from "zod";
import { requiredString } from "../../utils/util";

export const gpsSessionSchema = z.object({
  name: requiredString("Name"),
  description: requiredString("Description"),
});

export type GpsSessionSchema = z.infer<typeof gpsSessionSchema>;
