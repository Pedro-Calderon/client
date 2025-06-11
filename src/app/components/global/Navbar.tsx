'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Stack,
    Avatar
} from '@mui/material';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import Favorite from '@mui/icons-material/TrendingUp';
import { useSession, signOut } from 'next-auth/react';
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { data: session, status } = useSession();
    const open = Boolean(anchorEl);

    if (status === "loading") return null;
    const user = session?.user;



    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleProfileClose = () => {
        setAnchorEl(null);

    };

    const handleLogout = () => {
        setAnchorEl(null);
        signOut({ callbackUrl: "/" });
    };
    return (
        <AppBar position="static" sx={{ bgcolor: "#60B5FF" }}>
            <Toolbar>

                <VideoLibrary sx={{ mr: 2 }} />
                <Typography
                    variant="h6"
                    component={Link}
                    href="/"
                    sx={{ flexGrow: 1, cursor: "pointer", textDecoration: "none", color: "inherit" }}
                >
                    InnovaTube
                </Typography>
                {user ? (
                    <>
                        {/* Navegación */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
                            <Button color="inherit"
                                component={Link}
                                href="/favoritos" 
                                startIcon={<Favorite />}>
                                Favoritos
                            </Button>
                        </Box>
                        <IconButton
                            onClick={handleProfileClick}
                            sx={{
                                p: 0,
                                border: "2px solid transparent",
                                borderRadius: "50%",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    borderColor: theme => theme.palette.primary.main,
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <Avatar
                                alt="Usuario"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: theme => theme.palette.primary.main,
                                    color: "#000",
                                    fontWeight: 600,
                                }}
                            >
                                {user?.nombreUser?.charAt(0)?.toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleProfileClose}
                            //   onClick={handleProfileClose}
                            disableScrollLock

                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    border: "1px solid rgba(255, 235, 59, 0.2)",
                                    mt: 1.5,
                                    transition: "none",
                                    minWidth: 200,
                                    mr: 1,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },


                                },
                            }}
                        >

                            <Box sx={{ px: 2, py: 1, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#FFEB3B" }}>
                                    {user?.nombreUser}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#ccc" }}>
                                    {user?.email}
                                </Typography>
                            </Box>



                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                            <MenuItem onClick={handleLogout} sx={{ color: theme => theme.palette.primary.main }}>
                                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Cerrar sesión
                            </MenuItem>




                        </Menu>
                    </>

                ) : (<>
                    <Stack direction="row" spacing={1}>
                        <Button
                            component={Link}
                            href="/login"
                            color="inherit"
                            variant="outlined"
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/register"
                            variant="contained"
                            sx={{ bgcolor: "white", color: "primary.main" }}>
                            Registrarse
                        </Button>
                    </Stack>
                </>
                )}
            </Toolbar>
        </AppBar >
    )
}


