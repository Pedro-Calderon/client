'use client';
import { Box, Container, Button, TextField, Typography, Paper, InputAdornment, Card, IconButton, CardMedia, CardContent, Grid, Alert } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link";
import {
  Search,
  FavoriteBorder,
} from "@mui/icons-material"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { addFavorite } from "./services/api";
import { useError } from "./Context/ErrorContext";
import { Dialog } from "@mui/material"; // asegúrate de tener esto importado

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: session } = useSession();
  const { setFormError, formError } = useError();
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([])

  const user = session?.user;
  if (status === "loading") {
    return <div>Cargando...</div>;
  }
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



  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchQuery.trim();
    if (!searchTerm) return;

    const url = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}${encodeURIComponent(
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

  const handleFavorite = async (video: Video) => {
    if (!session?.user?.id) return (
      <Alert variant="outlined" severity="warning">
        Inicia sesion para guardar en Favoritos
      </Alert>)


    try {
      const favoriteData = {
        userId: user?.id as string,
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        channelTitle: video.snippet.channelTitle,
      }
      const res = await addFavorite(favoriteData)

      if (res.status === 200) {
        setFormSuccess("Video agregado a Favoritos");
        setTimeout(() => setFormSuccess(null), 3000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    } catch (err: any) {
      console.log("error recuperado", err)
      if (err.status === 415) {
        setFormError({ field: "favorite", message: "Este video ya existe en favoritos" })
      }
    }

  }

  return (
    <>
      {formError?.message && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            width: "auto",
            maxWidth: 300,
          }}
        >

          <Alert severity="error" onClose={() => setFormError({ field: "", message: "" })}>
            {formError.message}
          </Alert>
        </Box>
      )}
      {formSuccess && (
        <Box
          sx={{
            position: "fixed",
            top: 80,
            right: 20,
            zIndex: 9999,
            width: "auto",
            maxWidth: 300,
          }}
        >
          <Alert severity="success" onClose={() => setFormSuccess(null)}>
            {formSuccess}
          </Alert>
        </Box>
      )}
      <Box
        sx={{
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",

          py: 8,
          textAlign: "center",
        }}>


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

        <Grid container spacing={5} alignItems="stretch" justifyContent="center">
          {videos.map((video) => (
            <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }} key={video.id.videoId}>

              <Card
                onClick={() => setPlayingVideoId(video.id.videoId)}
                sx={{
                  position: "relative", height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  width: 300,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  mt: 5,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                  },
                }}>
                <IconButton
                  onClick={(e) =>{
                    e.stopPropagation();
                    handleFavorite(video)}}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(71, 18, 18, 0.8)",
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
                  width: 300,
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
    </Box >

      <Dialog open={!!playingVideoId} onClose={() => setPlayingVideoId(null)} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", paddingTop: "56.25%" /* 16:9 ratio */ }}>
          {playingVideoId && (
            <iframe
              src={`https://www.youtube.com/embed/${playingVideoId}`}

              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Box>
      </Dialog>

    </>

  )
}

