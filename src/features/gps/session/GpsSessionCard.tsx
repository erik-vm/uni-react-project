import { Box, Card, CardHeader, Divider } from "@mui/material";
import type { IGpsSession } from "../../../types/IGpsSession";
import { formatDate, formatDuration } from "../../../utils/util";

type Props = {
  gpsSession: IGpsSession;
};

export default function GpsSessionCard({ gpsSession }: Props) {
  //       name: string;
  //   description: string;
  //   recordedAt: string;
  //   duration: number;
  //   speed: number;
  //   distance: number;
  //   climb: number;
  //   descent: number;
  //   paceMin: number;
  //   paceMax: number;
  //   gpsSessionType: string;
  //   gpsLocationsCount: number;
  //   userFirstLastName: string;

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={gpsSession.userFirstLastName}
          subheader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{formatDate(gpsSession.recordedAt)}</span>
              <span>Duration: {formatDuration(gpsSession.duration)}</span>
              <span>Location count: {gpsSession.gpsLocationsCount}</span>
            </Box>
          }
        />
        <Divider/>
      </Box>
    </Card>
  );
}
