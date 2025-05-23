import { Grid } from "@mui/material";
import GpsSessionList from "../gps/session/GpsSessionList";

export default function Dashboard() {
  return (
    <Grid container spacing={3} sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>

<GpsSessionList/>


    </Grid>
  )
}