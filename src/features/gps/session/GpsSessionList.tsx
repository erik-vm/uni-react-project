import { Add } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";
import GpsSessionCard from "./GpsSessionCard";

export default function GpsSessionList() {
  const { 
    sessions, 
    sessionTypes, 
    sessionsLoading, 
    sessionTypesLoading, 
    sessionsError, 
    sessionTypesError 
  } = useGpsSessions();

  if (sessionsLoading || sessionTypesLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (sessionsError || sessionTypesError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Failed to load GPS sessions. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      
      {!sessions || sessions.length === 0 ? (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="300px"
          textAlign="center"
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No GPS sessions found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Create your first GPS session to get started
          </Typography>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            startIcon={<Add />}
            size="large"
          >
            Create First Session
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {sessions.map((session) => (
            <GpsSessionCard
              key={session.id}
              gpsSession={session}
              gpsSessionTypes={sessionTypes || []}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}