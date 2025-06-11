"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,

  IconButton,
  InputAdornment,
} from "@mui/material"
import { Visibility, VisibilityOff, CheckCircle, Cancel, LockReset, Check } from "@mui/icons-material"
import { resetPassword, validateResetToken } from "@/app/services/api"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isResetSuccessful, setIsResetSuccessful] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const requirements = [
    { id: "length", label: "Al menos 8 caracteres", met: newPassword.length >= 8 },
    { id: "uppercase", label: "Al menos una mayúscula", met: /[A-Z]/.test(newPassword) },
    { id: "lowercase", label: "Al menos una minúscula", met: /[a-z]/.test(newPassword) },
    { id: "number", label: "Al menos un número", met: /\d/.test(newPassword) },
    { id: "special", label: "Al menos un carácter especial", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ]

  useEffect(() => {
    const token = searchParams.get("token")
    const checkToken = async () => {
      if (!token) {
        setIsTokenValid(false); setIsLoading(false); return;
      }
      try {
        const response = await validateResetToken(token)
        setIsTokenValid(response.status === 200)
      } catch {
        setIsTokenValid(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkToken()
  }, [searchParams])

  useEffect(() => {
    let strength = 0
    if (newPassword.length >= 8) strength += 20
    if (/[A-Z]/.test(newPassword)) strength += 20
    if (/[a-z]/.test(newPassword)) strength += 20
    if (/\d/.test(newPassword)) strength += 20
    if (/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) strength += 20
    setPasswordStrength(strength)
  }, [newPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (passwordStrength < 60) {
      alert("La contraseña es demasiado débil")
      return
    }
    try {
      const response = await resetPassword({
        token: searchParams.get("token") || "",
        newPassword,
      })
      if (response.status === 200) {
        setIsResetSuccessful(true)
        setTimeout(() => router.push("/login"), 3000)
      } else {
        alert("Error al actualizar la contraseña.")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error en el restablecimiento.")
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center", backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.95)" }}>
            <Typography variant="h6">Verificando tu solicitud...</Typography>
            <LinearProgress sx={{ mt: 3 }} />
          </Paper>
        </Container>
      </Box>
    )
  }

  if (!isTokenValid) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center", backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.95)" }}>
            <Alert severity="error" sx={{ mb: 3 }}>El enlace de restablecimiento no es válido o ha expirado.</Alert>
            <Button component={Link} href="/forgot-password" variant="contained">Solicitar nuevo enlace</Button>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", py: 4, px: 2 }}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: 3, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>InnovaTube</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>Nueva contraseña</Typography>
            <Typography variant="body2" color="text.secondary">Crea una contraseña segura para proteger tu cuenta.</Typography>
          </Box>

          {!isResetSuccessful ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nueva contraseña"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <LinearProgress variant="determinate" value={passwordStrength} sx={{ height: 8, borderRadius: 4, mb: 2 }} />

              <List dense sx={{ mb: 2 }}>
                {requirements.map((req) => (
                  <ListItem key={req.id}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {req.met ? <CheckCircle color="success" fontSize="small" /> : <Cancel color="error" fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary={req.label} primaryTypographyProps={{ variant: "body2" }} />
                  </ListItem>
                ))}
              </List>

              <TextField
                fullWidth
                label="Confirmar contraseña"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword !== "" && newPassword !== confirmPassword}
                helperText={confirmPassword !== "" && newPassword !== confirmPassword ? "Las contraseñas no coinciden" : ""}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<LockReset />}
                disabled={newPassword !== confirmPassword || passwordStrength < 60 || newPassword.length === 0}
              >
                Cambiar contraseña
              </Button>
            </Box>
          ) : (
            <Box textAlign="center">
              <Check color="success" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>¡Contraseña actualizada!</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>Serás redirigido al inicio de sesión en unos segundos.</Typography>
              <LinearProgress sx={{ mb: 3 }} />
              <Button component={Link} href="/login" variant="contained">Ir al inicio de sesión</Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
