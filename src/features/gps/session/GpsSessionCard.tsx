import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import type { IGpsSession } from "../../../types/IGpsSession";
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatElevation,
  formatPace,
} from "../../../utils/util";
import type { IGpsSessionType } from "../../../types/IGpsSessionType";
import { Link } from "react-router";

type Props = {
  gpsSession: IGpsSession;
  gpsSessionTypes: IGpsSessionType[];
};

export default function GpsSessionCard({ gpsSession, gpsSessionTypes }: Props) {
  const parsedSessionType = JSON.parse(gpsSession.gpsSessionType);
  const sessionTypeMatch = gpsSessionTypes.find(
    (type) => type.name === parsedSessionType.en
  );

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          sx={{ backgroundColor: "#20A7AC", color: "white" }}
          title={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Typography variant="h4">
                {gpsSession.userFirstLastName}
              </Typography>
              <Box display={'flex'} gap={1}>
    <Button
              component={Link}
              to={`/edit/${gpsSession.id}`}
                variant="contained"
                size="large"
                color="primary"
              >
                Edit
              </Button>
                  <Button
              component={Link}
              to={`/delete/${gpsSession.id}`}
                variant="contained"
                size="large"
                color="error"
              >
                Delete
              </Button>
              </Box>
          
            </Box>
          }
          subheader={
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                color: "#EEEEEE",
              }}
            >
              <span>{formatDate(gpsSession.recordedAt)}</span>{" "}
              <strong
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                |
              </strong>
              <span>Distance: {formatDistance(gpsSession.distance)}</span>
              <strong
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                |
              </strong>
              <span>Duration: {formatDuration(gpsSession.duration)}</span>
              <strong
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                |
              </strong>
              <span>Location count: {gpsSession.gpsLocationsCount}</span>
            </Box>
          }
        />
        <Divider />

        <Grid container>
          <Grid
            size={6}
            p={2}
          >
            <Typography variant="body1">Name: {gpsSession.name}</Typography>
            <Typography variant="body2">
              Description: {gpsSession.description}
            </Typography>
            <Typography variant="body2">
              Type: {sessionTypeMatch?.name}
            </Typography>
          </Grid>
          <Grid
            size={6}
            p={2}
            display={"flex"}
            alignItems={"flex-end"}
          >
            <Grid size={6}>
              <Typography variant="body2">
                Min/pace: {formatPace(gpsSession.paceMin)}
              </Typography>
              <Typography variant="body2">
                Max/pace: {formatPace(gpsSession.paceMax)}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body2">
                Climb: {formatElevation(gpsSession.climb)}{" "}
              </Typography>
              <Typography variant="body2">
                Descent: {formatElevation(gpsSession.descent)}{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
