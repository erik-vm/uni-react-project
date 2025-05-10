import { Box, Typography } from "@mui/material";
import { useGpsSessions } from "../../../hooks/useGpsSessions";
import GpsSessionCard from "./GpsSessionCard";

export default function GpsSessionList() {
const {sessions, sessionTypes} = useGpsSessions();

  return (
    <>
    <Typography variant="h5" my={2} ml={2}>List of GPS sessions</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3}}>
        {sessions?.map((session) => (
            <GpsSessionCard gpsSession={session} gpsSessionTypes={sessionTypes}/>
        ))}
    </Box>
    </>
  )
}