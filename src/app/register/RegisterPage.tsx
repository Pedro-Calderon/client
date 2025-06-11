"use client";
import { useState } from "react";
import type React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Person from "@mui/icons-material/Person";
import VideoLibrary from "@mui/icons-material/VideoLibrary";
import { useRouter } from "next/navigation";
//import { addMember } from "../../services/api";
import { useError } from "@/app/Context/ErrorContext";
import { addMember } from "../services/api";

export default function RegisterPage() {
  const router = useRouter();
  const { setFormError, formError } = useError();
  const [submittrue, setSubmitTrue] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nombreUser: "",
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const PasswordStrengthBar = ({ strength }: { strength: number }) => {
    let color = "#f44336"; // Rojo
    let label = "Débil";

    if (strength >= 80) {
      color = "#4caf50"; // Verde
      label = "Fuerte";
    } else if (strength >= 40) {
      color = "#ff9800"; // Naranja
      label = "Media";
    }

    return (
      <Box sx={{ width: "100%", mt: 1, mb: 2 }}>
        <Box
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${strength}%`,
              backgroundColor: color,
              transition: "width 0.3s ease",
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            color,
            fontWeight: "bold",
            textAlign: "left",
            display: "block",
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //ER para el nombre y apellido
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/;
    if (name === "firstName" || name === "lastName") {
      const isValid = regex.test(value);
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? "" : "Solo se permiten letras y espacios.",
      }));
      if (isValid) {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    }

    //ER para el nombre de usuario
    if (name === "nombreUser") {
      //  console.log("Validando nombreuser:", value);

      const isValid = /^[A-Za-z0-9_]*$/.test(value);
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? "" : "Solo se permiten letras, números y guiones bajos.",
      }));
      if (isValid) {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    }

    //ER para el email

    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]*$/.test(value);
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? "" : "Correo inválido",
      }));
    }

    //Password vaalidation
    if (name === "password") {
      let strength = 0

      if (value.length >= 8) strength += 20
      if (/[A-Z]/.test(value)) strength += 20
      if (/[a-z]/.test(value)) strength += 20
      if (/\d/.test(value)) strength += 20
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 20

      setPasswordStrength(strength)


    }
    setFormData((prev) => ({ ...prev, [name]: value }));


  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.nombreUser.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      <Alert variant="outlined" severity="warning">
        Todos los campos son obligatorios.
      </Alert>
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Correo electrónico no válido.");
      return;
    }



    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }


    try {
      const memberData = {
        _id: "",
        nombre: formData.firstName,
        nombreUser: formData.nombreUser,
        apellidos: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      await addMember(memberData);
      // alert("Registro exitoso" + response.data);
      // console.log("Registro exitoso:", response.data);
      setSubmitTrue(true);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    } catch (err: any) {
      const message = err?.response?.data?.message;
      console.error("Error en el registro:", message);

      if (err?.response?.status === 410 && message) {
        // veralert();
        // alert("⚠️ " + message);
        setFormError({ field: "email", message: message });

      }
      if (err?.response?.status === 412 && message) {
        // veralert();
        // alert("⚠️ " + message);
        setFormError({ field: "nombreUser", message: message });

      }

    }
  };

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
          {formError?.message && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {formError.message}
            </Alert>
          )}
          {submittrue && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Registro exitoso. Ahora puedes iniciar sesión.
            </Alert>
          )}

          {/* Formulario de registro */}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Nombre"
                name="firstName"
                variant="outlined"
                required
                inputProps={{ maxLength: 20 }}
                error={!!errors.firstName}
                helperText={errors.firstName}
                value={formData.firstName}
                onChange={handleChange}
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
                name="lastName"
                variant="outlined"
                margin="normal"
                required
                inputProps={{ maxLength: 40 }}
                error={!!errors.lastName}
                helperText={errors.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />

            </Stack>

            <TextField
              fullWidth
              label="Nombren de Usuario"
              name="nombreUser"
              required
              inputProps={{ maxLength: 20 }}
              error={!!errors.nombreUser}
              helperText={errors.nombreUser}
              value={formData.nombreUser}
              onChange={handleChange}
              sx={{ mb: 3 }}
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
              label="Correo Electrónico"
              name="email"
              type="email"
              required
              inputProps={{ maxLength: 320 }}

              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />


            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              required
              inputProps={{ maxLength: 100 }}
              error={!!errors.password} // muestra borde rojo si hay error
              helperText={errors.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
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
            {formData.password && <PasswordStrengthBar strength={passwordStrength} />}

            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
              error={
                formData.confirmPassword !== "" &&
                formData.password !== formData.confirmPassword
              }
              helperText={
                formData.confirmPassword !== "" &&
                  formData.password !== formData.confirmPassword
                  ? "Las contraseñas no coinciden"
                  : ""
              }
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
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
              Crear Cuenta
            </Button>

            <Divider sx={{ my: 3 }}></Divider>



            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                ¿Ya tienes una cuenta? <Typography
                  component="span"
                  sx={{ fontWeight: 600, cursor: "pointer", color: "primary.main", textDecoration: "underline" }}
                  onClick={() => router.push("/login")}
                >
                  Inicia sesión aquí
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
