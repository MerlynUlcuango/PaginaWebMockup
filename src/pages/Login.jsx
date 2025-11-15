import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
  e.preventDefault()
  const res = login(user, pass)
  if (!res.ok) return setErr(res.error)

  localStorage.setItem("namca_username", user)

  navigate('/')
}


  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <h1 style={styles.logo}>ARCBANK</h1>

        <div style={styles.loginBox}>
          <h2 style={styles.title}>Bienvenidos</h2>
          <h3 style={styles.subtitle}>Ingresa a tu Banca</h3>

          {err && <div style={styles.error}>{err}</div>}

          <form onSubmit={submit}>
            <div style={styles.inputGroup}>
              <FaUser style={styles.icon} />
              <input
                style={styles.input}
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div style={styles.forgot}>¿Olvidaste tu usuario?</div>

            <div style={styles.inputGroup}>
              <FaLock style={styles.icon} />
              <input
                type="password"
                style={styles.input}
                placeholder="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <FaEyeSlash style={styles.eyeIcon} />
            </div>
            <div style={styles.forgot}>¿Olvidaste tu contraseña?</div>

            <button type="submit" style={styles.button}>
              Ingresar
            </button>
          </form>
        </div>
      </div>

      <div style={styles.right}>
        <h2 style={styles.recoTitle}>Recomendaciones</h2>
        <ol style={styles.recoList}>
          <li>Cuida bien tu usuario y contraseña</li>
          <li>Verifica todo antes de ingresar</li>
        </ol>

        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
          alt="persona"
          style={{ width: 250, marginTop: 20 }}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(to right, #f5f5f5, #e8e8e8)",
  },
  left: {
    flex: 1,
    padding: "40px 60px",
  },
  right: {
    flex: 1,
    padding: "60px 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#b8860b",
    marginBottom: 50,
  },
  loginBox: {
    background: "white",
    padding: 40,
    borderRadius: 20,
    width: 420,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 38,
    fontWeight: 700,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 25,
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  inputGroup: {
    position: "relative",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: "10px 40px",
    borderRadius: 4,
    border: "2px solid #315eb3",
    fontSize: 16,
    outline: "none",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: "translateY(-50%)",
    color: "#0a0a0a",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  forgot: {
    fontSize: 13,
    textAlign: "right",
    marginBottom: 10,
    color: "#3f3f3f",
  },
  button: {
    marginTop: 15,
    width: "100%",
    padding: 12,
    fontSize: 18,
    background: "linear-gradient(to right, orange, gold)",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
  },
  recoTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 20,
  },
  recoList: {
    fontSize: 20,
    lineHeight: 1.6,
  },
};
