# Dayan en Cloudflare Workers

`dayan.html` es el archivo fuente. El proceso de compilación conserva su diseño y contenido, extrae las imágenes y canciones base64 a archivos independientes y genera `dist/index.html` y `dist/dayan.html`.

## Ejecutar localmente

Requiere Node.js 22 o posterior y npm.

```sh
npm install
npm run dev
```

Abre la dirección que muestra Wrangler (normalmente http://localhost:8787).
Cada vez que edites `dayan.html`, vuelve a ejecutar `npm run dev` para regenerar los archivos.

## Verificar y publicar

```sh
npm run check
npx wrangler login
npm run deploy
```

`check` comprueba la compilación y prepara un despliegue de prueba sin publicar. `deploy` publica el sitio en Cloudflare Workers con el nombre `dayan`; puedes cambiarlo en `wrangler.jsonc`.

Si conectas este repositorio a Workers Builds, usa `npm run build` como comando de compilación y `npm run deploy` como comando de despliegue.

El sitio se sirve tanto en `/` como en `/dayan.html`. Los archivos generados y las dependencias no se guardan en Git. La compilación se detiene si el HTML sigue escribiéndose o está incompleto. Cada archivo multimedia debe ocupar como máximo 25 MiB. Las fuentes tipográficas de Google requieren conexión a Internet.

Documentación: https://developers.cloudflare.com/workers/static-assets/
