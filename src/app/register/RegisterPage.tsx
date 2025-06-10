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
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { Person, Email, Lock, Visibility, VisibilityOff, VideoLibrary, Google, Facebook } from "@mui/icons-material"

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
  general?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validación de nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "El nombre debe tener al menos 2 caracteres"
    }

    // Validación de apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "El apellido debe tener al menos 2 caracteres"
    }

    // Validación de email
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido"
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    // Validación de términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof RegisterForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === "acceptTerms" ? event.target.checked : event.target.value
    setFormData({
      ...formData,
      [field]: value,
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
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular registro exitoso
      setSuccessMessage("¡Cuenta creada exitosamente! Redirigiendo al login...")
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch  {
      setErrors({
        general: "Error al crear la cuenta. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider: string) => {
    console.log(`Registrarse con ${provider}`)
    // Aquí implementarías el registro social
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
              Crear Cuenta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Únete a la comunidad de InnovaTube
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
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Apellido"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Stack>

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

            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox checked={formData.acceptTerms} onChange={handleInputChange("acceptTerms")} color="primary" />
              }
              label={
                <Typography variant="body2">
                  Acepto los{" "}
                  <Link href="#" sx={{ textDecoration: "none" }}>
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="#" sx={{ textDecoration: "none" }}>
                    política de privacidad
                  </Link>
                </Typography>
              }
              sx={{ mb: 2 }}
            />
            {errors.acceptTerms && (
              <Typography variant="caption" color="error" sx={{ display: "block", mb: 2 }}>
                {errors.acceptTerms}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 3, py: 1.5, fontSize: "1.1rem" }}
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              O regístrate con
            </Typography>
          </Divider>

          {/* Botones de redes sociales */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSocialRegister("Google")}
              sx={{ py: 1.5 }}
            >
              Continuar con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              onClick={() => handleSocialRegister("Facebook")}
              sx={{ py: 1.5 }}
            >
              Continuar con Facebook
            </Button>
          </Stack>

          {/* Enlaces */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" sx={{ fontWeight: 600, textDecoration: "none" }}>
                Inicia sesión aquí
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
