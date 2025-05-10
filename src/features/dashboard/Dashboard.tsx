import { Grid } from "@mui/material";
import GpsSessionList from "../gps/session/GpsSessionList";
import GpsSessionFilters from "../gps/session/GpsSessionFilters";

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
<Grid size={8}>
<GpsSessionList/>
</Grid>
<Grid size={4}>
    <GpsSessionFilters/>
</Grid>
    </Grid>
  )
}