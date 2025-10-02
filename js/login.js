var _a;
// Función para hash con SHA-256
async function hashPassword(password) {
    const buffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
// Usuario simulado
const userDB = {
    email: "usuario@correo.com",
    passwordHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" // 123456
};
// Validación del formulario
(_a = document.getElementById("loginForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!email || !password) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }
    const hashedInput = await hashPassword(password);
    if (email === userDB.email && hashedInput === userDB.passwordHash) {
        alert("✅ Inicio de sesión exitoso (TypeScript validado)");
        window.location.href = "index.html";
    }
    else {
        alert("❌ Usuario o contraseña incorrectos");
    }
});
if (email === userDB.email && hashedInput === userDB.passwordHash) {
    alert("✅ Inicio de sesión exitoso (TypeScript validado)");
    // Guardar usuario en localStorage
    localStorage.setItem("usuario", email);
    window.location.href = "index.html";
}
if (email === userDB.email && hashedInput === userDB.passwordHash) {
    alert("✅ Inicio de sesión exitoso");
    localStorage.setItem("user", JSON.stringify({ name: "Usuario Demo", email }));
    window.location.href = "index.html";
}
