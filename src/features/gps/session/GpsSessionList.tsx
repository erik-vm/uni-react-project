import { Box } from "@mui/material";
import { useGpsSessions } from "../../../hooks/useGpsSessions";
import GpsSessionCard from "./GpsSessionCard";

export default function GpsSessionList() {
const {sessions} = useGpsSessions();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: '50%'}}>
        {sessions?.map((session) => (
            <GpsSessionCard gpsSession={session}/>
        ))}
    </Box>
  )
}