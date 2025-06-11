"use client";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: "#000"
      }}
    >
      <CircularProgress color="primary" />
      <Typography sx={{ mt: 2 }} color="white">
        Verificando tu solicitud...
      </Typography>
    </Box>
  );
}
