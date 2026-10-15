# Portafolio IanGL

Portafolio de Ian González, construido con Next.js, React, TypeScript y Tailwind CSS. Presenta habilidades, proyectos públicos y enlaces al perfil de GitHub.

## Desarrollo

Requiere Node.js 20.9 o superior.

```bash
npm ci
npm run dev
```

## Validación y producción

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

La interfaz utiliza fuentes del sistema y no requiere acceso a Google Fonts para compilar.

## Editar el contenido

- `lib/portfolio.ts`: proyectos, perfil y contacto.
- `components/Inicio.tsx`: presentación.
- `components/Habilidades.tsx`: habilidades.
- `app/globals.css`: diseño adaptable, colores y movimiento reducido.
- `app/layout.tsx`: idioma, metadatos y viewport.

Las tarjetas de proyectos usan ilustraciones CSS decorativas; no son capturas de las aplicaciones. Solo se enlazan repositorios públicos existentes, sin prometer demostraciones o resultados no verificados.

### Contacto y CV

El contacto público actual es el perfil de GitHub. Para agregar correo, configura `contactUrl` con una dirección `mailto:` y adapta el texto del botón en `app/page.tsx`.

Para activar la descarga del CV:

1. Coloca el PDF definitivo en `public/cv/Ian-Gonzalez-CV.pdf`.
2. Establece `profile.cvUrl` como `/cv/Ian-Gonzalez-CV.pdf`.

Mientras no haya un PDF configurado, la navegación muestra un enlace real a GitHub.

## Avatar

Se muestra primero la ilustración local optimizada por Next.js. El modelo 3D de aproximadamente 21 MB se descarga únicamente al activar el botón correspondiente. Si falla el modelo o WebGL, permanece la imagen alternativa. La vista 3D respeta movimiento reducido y se limita al área del avatar.

## Caché

El service worker conserva únicamente archivos estáticos de compilación con nombre versionado. Las páginas y las imágenes no utilizan una caché permanente. Al activarse elimina las cachés antiguas conocidas de este proyecto.

## Publicación

La rama principal se puede conectar a Vercel usando la configuración estándar de Next.js. No se requieren variables de entorno para esta versión.
