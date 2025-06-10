"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff, VideoLibrary, Google, Facebook } from "@mui/icons-material"

interface LoginForm {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validación de email
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido"
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof LoginForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular diferentes respuestas
      if (formData.email === "demo@innovatube.com" && formData.password === "demo123") {
        setSuccessMessage("¡Inicio de sesión exitoso! Redirigiendo...")
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        setErrors({
          general: "Credenciales incorrectas. Intenta con demo@innovatube.com / demo123",
        })
      }
    } catch {
      setErrors({
        general: "Error al iniciar sesión. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Iniciar sesión con ${provider}`)
    // Aquí implementarías la autenticación social
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

          {/* Mensajes de estado */}
          {errors.general && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.general}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
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
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
              disabled={isLoading}
              sx={{ mb: 3, py: 1.5, fontSize: "1.1rem" }}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              O continúa con
            </Typography>
          </Divider>

          {/* Botones de redes sociales */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSocialLogin("Google")}
              sx={{ py: 1.5 }}
            >
              Continuar con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              onClick={() => handleSocialLogin("Facebook")}
              sx={{ py: 1.5 }}
            >
              Continuar con Facebook
            </Button>
          </Stack>

          {/* Enlaces */}
          <Box sx={{ textAlign: "center" }}>
            <Link href="#" variant="body2" sx={{ display: "block", mb: 2, textDecoration: "none" }}>
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

          {/* Demo credentials */}
          <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
              <strong>Credenciales de prueba:</strong>
              <br />
              Email: demo@innovatube.com
              <br />
              Contraseña: demo123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
