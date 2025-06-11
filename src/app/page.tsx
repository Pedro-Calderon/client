'use client';
import { Box, Container, Button, TextField, Typography, Paper, InputAdornment, Card, IconButton, CardMedia, CardContent, Grid } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link";
import {
  Search,
  FavoriteBorder,
} from "@mui/icons-material"
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: session } = useSession();

  const user = session?.user;

  type Video = {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        medium: { url: string };
      };
    };
  };

  const [videos, setVideos] = useState<Video[]>([])


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchQuery.trim();
    if (!searchTerm) return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      searchTerm
    )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("✅ YouTube API response:", data);

      if (Array.isArray(data.items)) {
        setVideos(data.items);
      } else {
        console.warn("❌ No se encontraron videos.");
        setVideos([]);
      }
    } catch (error) {
      console.error("❌ Error al buscar videos:", error);
      setVideos([]);
    }
  };
  return (

    <Box
      sx={{
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: 8,
        textAlign: "center",
      }}>
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
        </Container>

        {/* Barra de búsqueda principal */}
        {user ? (
          <>
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


          </>
        ) : (
          <Container maxWidth="md" sx={{ mt: 3, alignItems: "center", display: "flex", flexDirection: "column" }}>
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
                href="/conocer"
              >
                CONOCER MÁS
              </Button>

            </Box>
          </Container>
        )}

      </Box>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>

            <Card sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(255,255,255,0.8)",
                  zIndex: 1,
                }}
              >
                <FavoriteBorder color="error" />
              </IconButton>
              <CardMedia
                component="img"
                image={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {video.snippet.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.snippet.channelTitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}
