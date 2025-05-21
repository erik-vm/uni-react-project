import { useNavigate, useParams } from "react-router";

import type { FormEvent } from "react";
import type { IGpsSession } from "../../../types/IGpsSession";
import { Paper, TextField, Typography } from "@mui/material";
import { Box, flex } from "@mui/system";
import { formatDate, formatDistance } from "../../../utils/util";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";

export default function GpsSessionForm() {
  const { id } = useParams();

  const { session, createSession, updateSession, deleteSession, sessionTypes } =
    useGpsSessions(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (session) {
      data.id = session.id;
      await updateSession.mutateAsync(data.id);
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
          defaultValue={session? session.userFirstLastName : 'User unknown'}
          disabled
        />
        <TextField
          name="name"
          label="Session name"
          defaultValue={session?.name}
        />
        <TextField
          name="description"
          label="Description"
          defaultValue={session?.description}
          multiline
          rows={3}
        />
        <TextField  name="recorded" label="Recorded at" defaultValue={session? formatDate(session?.recordedAt) : "No date"}/>
 <TextField
          name="distance"
          label="Distance"
          defaultValue={session? formatDistance(session.distance): "no val"}
        />
      </Box>
    </Paper>
  );
}
