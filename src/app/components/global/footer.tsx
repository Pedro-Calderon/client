'use client'
import React from 'react'
import {
    Box,
    Container,
    Grid,
    Typography,
    Stack,
} from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "grey.100", py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <VideoLibraryIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                  InnovaTube
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                La mejor plataforma para descubrir, buscar y organizar videos de YouTube. Crea tu colección personal de
                contenido favorito.
              </Typography>
            </Grid>
            <Grid >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                Funcionalidades
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  • Búsqueda avanzada de videos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Lista de favoritos personalizada
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Interfaz intuitiva y moderna
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Acceso gratuito y registro simple
                </Typography>
              </Stack>
            </Grid>
            <Grid >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
                Contacto
              </Typography>
              <Stack spacing={1}>
                
                <Typography variant="body2" color="text.secondary">
                  Soporte: soporteinnovatube@gmail.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2025 InnovaTube. Todos los derechos reservados.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}

