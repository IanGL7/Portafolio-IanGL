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

## Avatar y scroll

El avatar 3D se carga automáticamente y utiliza `public/models/avatar-scroll.glb` (1.28 MB). El modelo original (21 MB) se conserva como fuente, pero no se descarga desde la página.

- Optimización: Meshopt, texturas WebP de hasta 1024 px y simplificación con tolerancia 0.0005. El decodificador Meshopt se empaqueta con Drei; no depende de un CDN Draco.
- `AvatarDirector` conecta el desplazamiento nativo con un único avatar. Mide anclas reales y recalcula las posiciones al cambiar el tamaño o el contenido.
- En escritorio, a partir de 1100 px, cada sección reserva una columna para el avatar. La trayectoria funciona al avanzar, retroceder y entrar directamente con `#proyectos` u otra ancla.
- En móvil o con movimiento reducido, el avatar permanece dentro del inicio y sale de pantalla con esa sección.
- La interpolación depende del tiempo, no de la frecuencia de pantalla. No se mezcla con Lenis ni se interceptan eventos de rueda o touch.
- El canvas usa `frameloop="demand"`: los cambios de pose invalidan los fotogramas y el render se detiene al estabilizarse.
- Una imagen permanece visible durante la carga, ante un error del archivo o si WebGL no está disponible. El botón permite alternar o reintentar el 3D.
- El centro geométrico se aplica al objeto interior; la rotación y escala del scroll se aplican al grupo padre.

Optimización reproducible:

```bash
npx @gltf-transform/cli@4.2.1 optimize public/models/avatar.glb public/models/avatar-scroll.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify-ratio 0.3 --simplify-error 0.0005
```

## Caché

El service worker conserva únicamente archivos estáticos de compilación con nombre versionado. Las páginas y las imágenes no utilizan una caché permanente. Al activarse elimina las cachés antiguas conocidas de este proyecto.

## Publicación

La rama principal se puede conectar a Vercel usando la configuración estándar de Next.js. No se requieren variables de entorno para esta versión.
