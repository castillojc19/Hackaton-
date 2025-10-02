// Función para hash de contraseña con SHA-256
async function hashPassword(password) {
  const buffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Observer para animar el formulario de login/registro
const formCard = document.querySelector("main section");
if (formCard) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      formCard.classList.add("visible");
    }
  });
  observer.observe(formCard);
}

// Validación de login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
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
      name: "Juan Pérez",
      passwordHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" // 123456
    };

    const hashedInput = await hashPassword(password);

    if (email === userDB.email && hashedInput === userDB.passwordHash) {
      alert("✅ Inicio de sesión exitoso");
      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify({ name: userDB.name, email: userDB.email }));
      window.location.href = "index.html";
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  });
}

// Animación al hacer scroll
const sections = document.querySelectorAll("section");
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
sections.forEach(sec => scrollObserver.observe(sec));

// Validación del formulario de contacto
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      alert("⚠️ Todos los campos son obligatorios");
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(`✅ Gracias ${nombre}, tu mensaje fue enviado correctamente.`);
    e.target.reset();
  });
}

// Manejo de usuario logueado en el menú
document.addEventListener("DOMContentLoaded", () => {
  const userMenu = document.getElementById("userMenu");

  // Verificar si hay usuario en localStorage
  const usuario = JSON.parse(localStorage.getItem("user"));

  if (usuario) {
    // Si hay sesión, mostrar el nombre y botón de cerrar
    userMenu.innerHTML = `
      <li class="nav-item">
        <span class="nav-link">👤 ${usuario.name}</span>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-light ms-2" id="logoutBtn">Cerrar sesión</button>
      </li>
    `;

    // Evento cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });

  } else {
    // Si no hay sesión, mostrar solo el botón de login
    userMenu.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="login.html">Iniciar sesión</a>
      </li>
    `;
  }
});
