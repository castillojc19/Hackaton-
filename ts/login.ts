// Definimos un tipo para el usuario
interface User {
  email: string;
  passwordHash: string;
}

// Función para hash con SHA-256
async function hashPassword(password: string): Promise<string> {
  const buffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Usuario simulado
const userDB: User = {
  email: "usuario@correo.com",
  passwordHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" // 123456
};

// Validación del formulario
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();

  if (!email || !password) {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  const hashedInput = await hashPassword(password);

  if (email === userDB.email && hashedInput === userDB.passwordHash) {
    alert("✅ Inicio de sesión exitoso (TypeScript validado)");
    window.location.href = "index.html";
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});
