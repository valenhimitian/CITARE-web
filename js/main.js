// Citare – comportamiento del sitio (sin dependencias)

// Número de WhatsApp de admisiones en formato internacional (sin +, sin espacios)
const WHATSAPP_NUMERO = "5491138594334";

/* ---------- Menú en celular ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("menu-principal");

if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    toggle.querySelector(".visually-hidden").textContent = open ? "Cerrar menú" : "Abrir menú";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
  });
}

/* ---------- Pestañas de documentación (patrón ARIA tabs) ---------- */
const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));

function activarTab(tab, mover = true) {
  tabs.forEach((t) => {
    const activa = t === tab;
    t.setAttribute("aria-selected", String(activa));
    t.tabIndex = activa ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !activa;
  });
  if (mover) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => activarTab(tab, false));
  tab.addEventListener("keydown", (e) => {
    let destino = null;
    if (e.key === "ArrowRight") destino = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") destino = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === "Home") destino = tabs[0];
    if (e.key === "End") destino = tabs[tabs.length - 1];
    if (destino) { e.preventDefault(); activarTab(destino); }
  });
});

/* ---------- Formulario de consulta → WhatsApp ---------- */
// No hay servidor todavía: el formulario arma el mensaje y abre WhatsApp.
// Cuando exista backend, acá se reemplaza por un fetch() al endpoint.
const form = document.getElementById("form-consulta");

if (form) {
  const error = form.querySelector(".form-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    const nombre = (datos.get("nombre") || "").toString().trim();
    const telefono = (datos.get("telefono") || "").toString().trim();
    const servicio = datos.get("servicio");
    const obraSocial = (datos.get("obraSocial") || "").toString().trim();
    const consentimiento = datos.get("consentimiento");

    // Validación accesible: marcamos campos y anunciamos el error
    const faltantes = [];
    form.querySelectorAll("[required]").forEach((campo) => {
      const vacio = campo.type === "checkbox" ? !campo.checked : !campo.value.trim();
      campo.setAttribute("aria-invalid", String(vacio));
      if (vacio) faltantes.push(campo);
    });

    if (faltantes.length) {
      error.textContent = consentimiento
        ? "Completá tu nombre y teléfono para poder responderte."
        : "Completá los campos obligatorios y aceptá el uso de los datos.";
      error.hidden = false;
      faltantes[0].focus();
      return;
    }
    error.hidden = true;

    const mensaje = [
      "Hola Citare, quiero hacer una consulta de admisión.",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Servicio: ${servicio}`,
      obraSocial ? `Obra social: ${obraSocial}` : null,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
  });
}

/* ---------- Año del pie ---------- */
const anio = document.getElementById("year");
if (anio) anio.textContent = new Date().getFullYear();
