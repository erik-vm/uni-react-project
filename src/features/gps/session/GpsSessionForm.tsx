import { useNavigate, useParams } from "react-router";

import { Button, MenuItem, Paper, TextField, Typography, Select, FormControl, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useContext, type FormEvent } from "react";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";
import { StoreContext } from "../../../lib/stores/store";
import type { IGpsSession } from "../../../types/IGpsSession";
import { formatDistance } from "../../../utils/util";

export default function GpsSessionForm() {
  const { id } = useParams();

  const { session, createSession, updateSession, sessionTypes } =
    useGpsSessions(id);

  const { userStore } = useContext(StoreContext);

  const navigate = useNavigate();

  // Get the default session type value
  const getDefaultSessionType = () => {
    if (session) {
      // If editing, use the session's current type
      return session.gpsSessionType || (sessionTypes?.[0]?.description || "");
    } else {
      // If creating, use the first available type as default
      return sessionTypes?.[0]?.description || "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (session) {
      data.id = session.id;
      await updateSession.mutateAsync(data);
      navigate("/dashboard");
    } else {
      createSession.mutate(data as unknown as IGpsSession, {
        onSuccess: () => {
          navigate("/dashboard");
        },
      });
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
      >
        {session ? "Edit session" : "Create session"}
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <TextField
          name="creator"
          label="Creator"
          defaultValue={
            session ? session.userFirstLastName : userStore.fullName
          }
          disabled
        />
        <TextField
          name="name"
          label="Session name"
          defaultValue={session?.name || ""}
          required
        />
        <DateTimePicker 
          name="recordedAt"
          label="Recorded At"
          value={session ? new Date(session.recordedAt) : null} 
        />
        <FormControl fullWidth>
          <InputLabel>Session Type</InputLabel>
          <Select
            name="sessionType"
            label="Session Type"
            defaultValue={getDefaultSessionType()}
            required
          >
            {sessionTypes?.map(type => (
              <MenuItem key={type.id} value={type.description}>
                {type.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="distance"
          label="Distance"
          defaultValue={session ? formatDistance(session.distance) : ""}
        />
        <TextField
          name="description"
          label="Description"
          defaultValue={session?.description || ""}
          multiline
          rows={3}
        />
        <Box
          mt={2}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
          >
            {session ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}