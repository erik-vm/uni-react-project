import type { IDomainId } from "./IDomainId";

export interface IGpsLocation extends IDomainId {
  name: string;
  description: string;
  recordedAt: string;
  duration: number;
  speed: number;
  distance: number;
  climb: number;
  descent: number;
  paceMin: number;
  paceMax: number;
  gpsSessionType: string;
  gpsLocationsCount: number;
  userFirstLastName: string;
}
