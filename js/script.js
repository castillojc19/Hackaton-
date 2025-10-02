// Función para hash de contraseña con SHA-256
async function hashPassword(password) {
  const buffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Observer para animar el formulario
const formCard = document.querySelector("main section");
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    formCard.classList.add("visible");
  }
});
observer.observe(formCard);

// Validación de login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  // Usuario simulado con contraseña en hash
  const userDB = {
    email: "usuario@correo.com",
    passwordHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" // 123456
  };

  const hashedInput = await hashPassword(password);

  if (email === userDB.email && hashedInput === userDB.passwordHash) {
    alert("✅ Inicio de sesión exitoso");
    window.location.href = "index.html";
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});

// Animación al hacer scroll (Intersection Observer)
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
sections.forEach(sec => observer.observe(sec));

// Validación del formulario de contacto con async/await
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const correo = document.querySelector("#correo").value.trim();
  const mensaje = document.querySelector("#mensaje").value.trim();

  if (!nombre || !correo || !mensaje) {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  // Simulación de envío con Promise
  await new Promise(resolve => setTimeout(resolve, 1000));

  alert(`✅ Gracias ${nombre}, tu mensaje fue enviado correctamente.`);
  e.target.reset();
});
// Verificar si hay un usuario logueado
const userMenu = document.getElementById("userMenu");
const usuario = localStorage.getItem("usuario");

if (usuario) {
  userMenu.innerHTML = `
    <li class="nav-item">
      <span class="nav-link">👤 ${usuario}</span>
    </li>
    <li class="nav-item">
      <a class="nav-link text-danger" href="#" id="logoutBtn">Cerrar sesión</a>
    </li>
  `;

  // Botón cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const userMenu = document.getElementById("userMenu");

  // Revisar si el usuario ya está logueado (guardado en localStorage)
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Mostrar nombre del usuario + botón de cerrar sesión
    userMenu.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="#">👤 ${user.name}</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-light ms-2" id="logoutBtn">Cerrar sesión</button>
      </li>
    `;

    // Cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  } else {
    // Mostrar login y registro
    userMenu.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="login.html">Iniciar sesión</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="register.html">Registrarse</a>
      </li>
    `;
  }
});
