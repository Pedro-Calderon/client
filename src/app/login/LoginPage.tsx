"use client"

import type React from "react"
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Divider,
   Alert,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff, VideoLibrary } from "@mui/icons-material"
import { useState } from "react"

import { signIn, useSession } from "next-auth/react"

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [identifier, setIdentifier] = useState("");
  const [submittrue, setSubmitTrue] = useState(false);
  const { status } = useSession(); 
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null);



    if (!identifier || !password) {
      setError("Por favor, completa ambos campos.");
      return;
    }



    try {
      const res = await signIn("credentials", {
        identifier,   // puede ser email o nombreUser
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        router.push("/");
        router.refresh();
        setSubmitTrue(true);
        return;

      }

      if (res?.error) {
        const lowerErr = res.error.toLowerCase();

        if (lowerErr.includes("demasiados intentos")) {
          setError("Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.");
        } else if (res.error === "CredentialsSignin") {
          setError("Correo o contraseña incorrectos.");
        } else {
          setError(res.error);
        }
      }

    } catch (err) {
      console.error("🔥 EXCEPCIÓN CRÍTICA:", err);
      setError("Error interno. Intenta más tarde.");
    }
  }
 if (status === "loading") {
        return <div>Cargando...</div>;
    }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <VideoLibrary sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
                InnovaTube
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a tu cuenta para continuar
            </Typography>
          </Box>

          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {submittrue && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Inicio de sesión exitoso. Redirigiendo...
            </Alert>
          )}
          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo Electrónico o Usuario"
              required
              value={identifier}
              onChange={(email) => setIdentifier(email.target.value)}
              placeholder="tu@email.com o Usuairio"
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 320 }}

              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ maxLength: 100 }}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 3, py: 1.5, fontSize: "1.1rem" }}
            >
              Iniciar Sesión
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
             
          </Divider>

          

          {/* Enlaces */}
          <Box sx={{ textAlign: "center" }}>
            <Link  href="/forgot-password" variant="body2" sx={{ display: "block", mb: 2, textDecoration: "none" }}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" sx={{ fontWeight: 600, textDecoration: "none" }}>
                Regístrate aquí
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link href="/" sx={{ color: "primary.main", textDecoration: "none" }}>
                ← Volver al inicio
              </Link>
            </Typography>
          </Box>


        </Paper>
      </Container>
    </Box>
  )
}
