"use client";

import { Box, Button, Container, Typography, Paper } from "@mui/material";
import Link from "next/link";

export default function ConocerMas() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Conoce Más Sobre Nosotros
          </Typography>

          <Typography variant="body1" paragraph>
            Somos una plataforma enfocada en ayudarte a recopilar una serie de videos de YouTube que te interesan. Ya sea
            que quieras guardar tutoriales, conferencias o cualquier otro tipo de contenido, estamos aquí para facilitarte
            esa tarea. Nuestra misión es ofrecerte una experiencia fluida y eficiente para que puedas disfrutar de tus
            videos favoritos sin complicaciones.
          </Typography>

          <Typography variant="body1" paragraph>
            Descubre cómo nuestros servicios pueden marcar la diferencia en tu día a día. Nos importa tu experiencia,
            por eso combinamos diseño intuitivo con tecnología de punta.
          </Typography>

          <Box textAlign="center" mt={4}>
            <Link href="/" passHref>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff", ":hover": { backgroundColor: "#fff", color: "#3f51b5" } }}>
                Volver al inicio
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
