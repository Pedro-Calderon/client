"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Email } from "@mui/icons-material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { sendPasswordResetEmail } from "../services/api"
import { useSession } from "next-auth/react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { status } = useSession(); 

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateEmail(email)) {
      setIsValidEmail(false)
      return
    }

    try {
      const response = await sendPasswordResetEmail(email)

      if (response.status === 200) {
        setIsSubmitted(true)
      } else {
        alert(response.data.message || "No se pudo enviar el correo.")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Error al enviar el correo.")
      }
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
        px: 2,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", fontSize: isMobile ? "1.8rem" : "2rem" }}>
              InnovaTube
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontSize: isMobile ? "1.1rem" : "1.25rem" }}>
              Recuperar contraseña
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Te enviaremos un enlace para restablecer tu contraseña.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!isSubmitted ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setIsValidEmail(true)
                }}
                error={!isValidEmail}
                helperText={!isValidEmail ? "Ingresa un correo válido" : ""}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ pl: 1 }}>
                      <Email color="action" />
                    </Box>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mb: 2, py: 1.5, fontSize: "1rem" }}
              >
                Enviar instrucciones
              </Button>
              <Button
                component={Link}
                href="/login"
                startIcon={<KeyboardBackspaceIcon />}
                fullWidth
                sx={{ mt: 1, fontSize: "0.9rem" }}
              >
                Volver al inicio de sesión
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Se ha enviado un correo a <strong>{email}</strong> con instrucciones.
              </Alert>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Revisa tu bandeja de entrada y sigue el enlace para crear una nueva contraseña.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setIsSubmitted(false)}
                sx={{ mr: 2 }}
              >
                Reintentar
              </Button>
              <Button component={Link} href="/login">
                Volver a inicio
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
