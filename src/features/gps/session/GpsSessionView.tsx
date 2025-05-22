import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatElevation,
  formatPace,
} from "../../../utils/util";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";

export default function GpsSessionView() {
  const { id } = useParams();
  const { session, sessionLocation, deleteSession } = useGpsSessions(id);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Set the first location as default when sessionLocation loads
  useEffect(() => {
    if (sessionLocation && sessionLocation.length > 0 && !selectedLocationId) {
      const firstLocation = sessionLocation[0];
      setSelectedLocationId(firstLocation.id.toString());
      setSelectedLocation(firstLocation);
    }
  }, [sessionLocation, selectedLocationId]);

  const handleLocationChange = (event: any) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    const location = sessionLocation?.find(
      (loc) => loc.id.toString() === locationId
    );
    setSelectedLocation(location);
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{ borderRadius: 3, height: "80vh" }}
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
                  {session?.userFirstLastName}
                </Typography>
                <Box
                  display={"flex"}
                  gap={1}
                >
                  <Button
                    component={Link}
                    to={`/edit/${id}`}
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteSession}
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
                  alignItems: "flex-end",
                  color: "#EEEEEE",
                }}
              >
                <span>{session ? formatDate(session.recordedAt) : undefined}</span>{" "}
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
                <span>Distance: {session ? formatDistance(session.distance) : undefined}</span>
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
                <span>Duration: {session ? formatDuration(session.duration) : undefined}</span>
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
                <span>Location count: {session?.gpsLocationsCount}</span>
              </Box>
            }
          />
          <Divider />

          <Grid container>
            <Grid
              size={3}
              p={1}
            >
              <Grid
                size={12}
                p={2}
              >
                <Typography variant="body1">Name: {session?.name}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  Description: {session?.description}
                </Typography>
                <Typography variant="body2">Type: {session?.name}</Typography>
              </Grid>

              <Grid
                size={12}
                p={2}
                gap={1}
                display={"flex"}
                alignItems={"flex-end"}
                flexDirection={"column"}
              >
                <Grid size={12}>
                  <Typography variant="body2">
                    Min/pace: {session ? formatPace(session.paceMin) : undefined}
                  </Typography>
                  <Typography variant="body2">
                    Max/pace: {session ? formatPace(session.paceMax) : undefined}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Typography variant="body2">
                    Climb: {session ? formatElevation(session.climb) : undefined}
                  </Typography>
                  <Typography variant="body2">
                    Descent: {session ? formatElevation(session.descent) : undefined}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              size={9}
              p={2}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <InputLabel id="location-select-label">
                    Select Location
                  </InputLabel>
                  <Select
                    labelId="location-select-label"
                    value={selectedLocationId}
                    label="Select Location"
                    onChange={handleLocationChange}
                  >
                    {sessionLocation?.map((location, index) => (
                      <MenuItem
                        key={location.id}
                        value={location.id.toString()}
                      >
                        Location {index + 1} - Lat:{" "}
                        {location.latitude.toFixed(6)}, Lng:{" "}
                        {location.longitude.toFixed(6)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ flexGrow: 1, minHeight: "60vh" }}>
                  {selectedLocation ? (
                    <MapComponent
                      position={[
                        selectedLocation.latitude,
                        selectedLocation.longitude,
                      ]}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Select a location to view on the map
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
