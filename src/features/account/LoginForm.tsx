import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import TextInput from "../../app/shared/components/TextInput";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { AccountService } from "../../lib/services/AccountService";
import { AccountContext } from "../../lib/stores/accountStore";

export default function LoginForm() {
 const { setAccountInfo } = useContext(AccountContext);
  const accountService = new AccountService(setAccountInfo);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

   const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    console.log(data);
    setErrorMessage("Loading...");
    try {
      const result = await accountService.loginAsync(data.email, data.password);
      if (result.errors) {
        setErrorMessage(result.statusCode + " " + result.errors[0]);
        return;
      }
      setErrorMessage("");
  
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed -" + (error as Error).message);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        {errorMessage}
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput
        label="Email"
        control={control}
        name="email"
      />
      <TextInput
        label="Password"
        type="password"
        control={control}
        name="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Don't have an account?
        <Typography
          sx={{ ml: 2 }}
          component={Link}
          to="/register"
          color="primary"
        >
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
}
