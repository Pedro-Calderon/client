"use client"
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    CircularProgress,
    TextField,
    InputAdornment,
    Alert,
} from "@mui/material"
import { Favorite, Search } from "@mui/icons-material"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Favorite as FavoriteType, getFavorites } from "@/app/services/api"
import { deleteFavorite } from "@/app/services/api"

export default function FavoritesSection() {
    
    const { data: session } = useSession()
    const userId = session?.user?.id
    const [favorites, setFavorites] = useState<FavoriteType[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState<FavoriteType[]>([])
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) return
            try {
                const favs = await getFavorites(userId)
                const favArray = Array.isArray(favs) ? favs : [favs]
                setFavorites(favArray)
                setFiltered(favArray)
            } catch (err) {
                console.error("❌ Error al obtener favoritos:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [userId])
    const handleRemoveFavorite = async (videoId: string) => {


        try {
            const res = await deleteFavorite(userId as string, videoId)
            if (res.status === 200) {
                setFormSuccess("Video eliminado de Favoritos");
                setTimeout(() => setFormSuccess(null), 3000);

            }
            setFavorites((prev) => prev.filter((f) => f.videoId !== videoId))
        } catch (err) {
            console.error('❌ Error al eliminar favorito', err)
        }
    }


    useEffect(() => {
        const filteredResults = favorites.filter((video) =>
            video.title.toLowerCase().includes(search.toLowerCase())
        )
        setFiltered(filteredResults)
    }, [search, favorites])

    return (
        <>
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
                    bgcolor: "#f5f5f5",
                    color: "#333",
                    py: 8,
                    textAlign: "center",
                    minHeight: "100vh",
                }}
            >

                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
                        Tus videos favoritos ❤️
                    </Typography>

                    <TextField
                        variant="outlined"
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "black" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 4,
                            width: "100%",
                            maxWidth: 500,
                            backgroundColor: "rgba(255,255,255,0.15)",
                            borderRadius: 1,
                            input: { color: "black" },
                        }}
                    />

                    {loading ? (
                        <CircularProgress color="inherit" />
                    ) : filtered.length === 0 ? (
                        <Typography>No tienes videos guardados aún.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {filtered.map((video) => (
                                <Grid  sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" } }} key={video.videoId}>
                                    <Card sx={{ position: "relative" }}>
                                        <IconButton
                                            onClick={() => handleRemoveFavorite(video.videoId)}

                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                bgcolor: "rgba(71, 18, 18, 0.8)",
                                                zIndex: 1,
                                            }}

                                        >
                                            <Favorite color="error" />
                                        </IconButton>
                                        <CardMedia
                                            component="img"
                                            image={video.thumbnail}
                                            alt={video.title}
                                            sx={{ height: 180, objectFit: "cover" }}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                                {video.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {video.channelTitle}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
        </>
    )
}
