import { useNavigate, useParams } from "react-router";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { type FormEvent } from "react";
import { useGpsSessions } from "../../../lib/hooks/useGpsSessions";
import type { IGpsSession } from "../../../types/IGpsSession";

export default function GpsSessionForm() {
  const { id } = useParams();

  const { session, createSession, updateSession, sessionTypes } = useGpsSessions(id);

  const navigate = useNavigate();

  // Get the default session type ID
  const getDefaultSessionTypeId = () => {
    if (session && sessionTypes) {
      // If editing, find the session type ID by matching the gpsSessionType string
      const matchingType = sessionTypes.find(
        type => type.name === session.gpsSessionType || type.description === session.gpsSessionType
      );
      return matchingType?.id || sessionTypes?.[0]?.id || "";
    } else {
      // If creating, use the first available type as default
      return sessionTypes?.[0]?.id || "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      if (session) {
        // For update, pass the data with the session ID
        await updateSession.mutateAsync({
          id: session.id,
          name: data.name as string,
          description: data.description as string,
          sessionTypeId: data.sessionTypeId as string,
        } as IGpsSession & { id: string });
        navigate("/dashboard");
      } else {
        // For create, pass name, description, and sessionTypeId
        await createSession.mutateAsync({
          name: data.name as string,
          description: data.description as string,
          sessionTypeId: data.sessionTypeId as string,
        } as Partial<IGpsSession>);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Error handling is done in the mutation's onError callback
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
          name="name"
          label="Session name"
          defaultValue={session?.name || ""}
          required
        />

        <FormControl fullWidth required>
          <InputLabel>Session Type</InputLabel>
          <Select
            name="sessionTypeId"
            label="Session Type"
            defaultValue={getDefaultSessionTypeId()}
          >
            {sessionTypes?.map(type => (
              <MenuItem key={type.id} value={type.id}>
                {type.name || type.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            disabled={createSession.isPending || updateSession.isPending}
          >
            {(createSession.isPending || updateSession.isPending) 
              ? "Saving..." 
              : (session ? "Update" : "Create")
            }
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}