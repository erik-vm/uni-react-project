import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import MapComponent from "../../../app/shared/components/MapComponent";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";
import {
  formatDate,
  formatDistance,
  formatDuration,
  formatElevation,
  formatPace,
  formatTypeName,
} from "../../../utils/util";

export default function GpsSessionView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, sessionLocation, deleteSession } = useGpsSessions(id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Set the first location as default when sessionLocation loads

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteSession.mutateAsync(id);
      setDeleteDialogOpen(false);
      navigate("/dashboard"); // Navigate back to dashboard after successful delete
    } catch (error) {
      console.error("Failed to delete session:", error);
      // Error is already handled by the mutation's onError callback
    }
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
                    onClick={() => setDeleteDialogOpen(true)}
                    variant="contained"
                    size="large"
                    color="error"
                    disabled={deleteSession.isPending}
                  >
                    {deleteSession.isPending ? "Deleting..." : "Delete"}
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
                <span>
                  {session ? formatDate(session.recordedAt) : undefined}
                </span>{" "}
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
                <span>
                  Distance:{" "}
                  {session ? formatDistance(session.distance) : undefined}
                </span>
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
                <span>
                  Duration:{" "}
                  {session ? formatDuration(session.duration) : undefined}
                </span>
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
                <Typography variant="body2">
                  Type:{" "}
                  {session ? formatTypeName(session.gpsSessionType) : undefined}
                </Typography>
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
                    Min/pace:{" "}
                    {session ? formatPace(session.paceMin) : undefined}
                  </Typography>
                  <Typography variant="body2">
                    Max/pace:{" "}
                    {session ? formatPace(session.paceMax) : undefined}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Typography variant="body2">
                    Climb:{" "}
                    {session ? formatElevation(session.climb) : undefined}
                  </Typography>
                  <Typography variant="body2">
                    Descent:{" "}
                    {session ? formatElevation(session.descent) : undefined}
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
                <Box sx={{ flexGrow: 1, minHeight: "50vh" }}>
                  {sessionLocation && sessionLocation.length > 0 ? (
                    <MapComponent
                      locations={sessionLocation}
                      showPath={true}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      No location data available for this session
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the session "{session?.name}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteSession.isPending}
          >
            {deleteSession.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
