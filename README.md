# Citare – Sitio web institucional

Sitio web para **Citare**, Centro de Día y Servicio de Apoyo a la Inclusión Escolar (SAIE) en Villa Sarmiento, Morón (Buenos Aires, Argentina).

Es el primer proyecto de una línea de trabajo más amplia: **webs y herramientas de gestión para centros terapéuticos de discapacidad**, un sector donde la comunicación con familias, escuelas y obras sociales suele ser desordenada y depender de Instagram, Gmail y WhatsApp.

## El problema

Antes de este sitio, Citare tenía presencia solo en redes sociales:

- Instagram con pocas publicaciones e información clave (requisitos de admisión, contactos, ubicación) guardada en historias destacadas.
- Sin sitio propio ni ficha de Google, por lo que una familia que busca "centro de día discapacidad Morón" no los encuentra.
- Dos servicios con públicos distintos (jóvenes adultos y chicos en edad escolar) mezclados en el mismo canal.
- Búsquedas laborales publicadas como imágenes con mails sueltos.

## Qué resuelve

| Necesidad | Solución en el sitio |
|---|---|
| Que las familias encuentren el centro | SEO local: datos estructurados `MedicalOrganization` (JSON-LD), meta tags, `sitemap.xml`, mapa embebido |
| Separar los dos servicios | Dos accesos claros desde el inicio: Centro de Día e Inclusión Escolar |
| Saber qué documentación llevar | Checklist de admisión por servicio con pestañas accesibles |
| Contactar sin fricción | Formulario que arma el mensaje y abre WhatsApp, más botón flotante y teléfonos por área |
| Informar a las familias | Sección de derechos y normativa (acompañante externo, MAI, nivel inicial) |
| Reclutar profesionales | Sección "Trabajá con nosotros" con mail y asunto por servicio |
| Cuidar los datos | El formulario no pide diagnósticos; consentimiento explícito; política de privacidad (Ley 25.326) |

## Stack

- **HTML5 semántico + CSS + JavaScript vanilla**, sin dependencias ni paso de build.
- Imágenes en WebP con fallback a JPG.
- Tipografías: Fraunces (títulos) y Nunito (texto), vía Google Fonts.
- Deploy: **GitHub Pages** (sitio estático).

La decisión de no usar framework en esta etapa es deliberada: el sitio es una sola página informativa y así carga rápido en celulares de gama baja. La migración a Astro está planificada para cuando el sitio tenga contenido autogestionable (ver roadmap).

## Accesibilidad (objetivo: WCAG 2.1 AA)

- Paleta derivada del logo con contraste mínimo 4.5:1 en texto.
- Enlace "Saltar al contenido", foco visible en todos los controles.
- Pestañas con patrón ARIA `tablist` (navegables con flechas, Inicio y Fin).
- Menú móvil con `aria-expanded` y cierre con Escape.
- Validación del formulario con `aria-invalid` y mensaje de error anunciado (`role="alert"`).
- Áreas táctiles de 44 px o más, texto base de 18 px.
- Respeta `prefers-reduced-motion`.

## Estructura

```
├── index.html          Página principal
├── privacidad.html     Política de privacidad (borrador)
├── css/styles.css      Estilos y variables de diseño
├── js/main.js          Menú, pestañas y formulario → WhatsApp
├── img/                Logo, fotos y favicons
├── docs/               Relevamiento y roadmap del proyecto
├── robots.txt
└── sitemap.xml
```

## Correr en local

No hace falta instalar nada. Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Y abrir http://localhost:8000.

## Publicar en GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. Source: **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. A los pocos minutos queda publicado en `https://<usuario>.github.io/citare-web/`.

## Pendiente de confirmar con el centro

Los datos marcados en el sitio entre `[corchetes]` faltan confirmar. El checklist completo está en [`docs/relevamiento.md`](docs/relevamiento.md).

## Roadmap

- [x] **Etapa 1 – Presencia:** sitio institucional, SEO local, contacto por WhatsApp.
- [ ] Completar datos pendientes y fotos con consentimiento.
- [ ] Dominio propio (`.com.ar`) y ficha de Google Business Profile.
- [ ] **Etapa 2 – Contenido autogestionable:** migración a Astro y CMS para novedades y búsquedas laborales.
- [ ] **Etapa 3 – Portal interno:** legajos de concurrentes con vencimientos (CUD, autorizaciones), tablero mensual de facturación por obra social, registro de presentaciones y débitos.
- [ ] **Etapa 4 – Portal de familias:** documentos, avisos y recordatorios.

## Créditos

Desarrollo: Valentín ([@valenhimitian](https://github.com/valenhimitian)), estudiante de la Tecnicatura Universitaria en Web (UNLaM).

El logo, las fotos y los textos institucionales pertenecen a CITARE S.A. y se usan con fines de desarrollo del sitio.
