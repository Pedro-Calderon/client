'use client';
 import { Box, Container, Button, TextField, Typography, Paper, InputAdornment } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link";
import {
  Search,
} from "@mui/icons-material"
import { useState } from "react";
 
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí implementarías la búsqueda real con la API de YouTube
    console.log("Buscando:", searchQuery)
  }
  return (

      <Box>
         <Box
          sx={{
            bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: 8,
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
              Descubre el Mundo de YouTube
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
              Busca, explora y guarda tus videos favoritos en un solo lugar
            </Typography>

            {/* Barra de búsqueda principal */}
            <Paper
              component="form"
              onSubmit={handleSearch}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: 600,
                mx: "auto",
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                placeholder="Buscar videos en YouTube..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  sx: { "& fieldset": { border: "none" } },
                }}
              />
              <Button type="submit" variant="contained" sx={{ ml: 1, px: 3 }}>
                Buscar
              </Button>
            </Paper>

            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Únete a miles de usuarios que ya disfrutan de InnovaTube
            </Typography>
          </Container>

          <Container maxWidth="md"  sx={{ mt: 3, alignItems: "center", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5, px: 4, fontWeight: 600 }}
              >
                COMENZAR AHORA
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 4, borderColor: "white", color: "white" }}
                component={Link}
                href="/conocer" // Link to the static HTML page
              >
                CONOCER MÁS
              </Button>

            </Box>
          </Container>

                  

        </Box>

      </Box>
   
  )
}
 