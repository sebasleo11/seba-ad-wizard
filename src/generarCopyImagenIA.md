## Flujo n8n para generar texto e imagen con IA

Este flujo debe hacer lo siguiente:

1. Recibir un webhook con los datos de campaña del usuario.
2. Enviar esos datos a OpenAI para generar:
   - Un copy publicitario
   - Un título atractivo
3. Luego, enviar los mismos datos (título + copy) a DALL·E (vía OpenAI Image Generation) para crear **una imagen sin texto**.
4. Si el usuario activó la opción "imagen con texto integrado", generar otra imagen más con el texto superpuesto.
5. Enviar la respuesta al frontend con este JSON:

```json
{
  "copy": "Texto generado por IA...",
  "titulo": "Título generado",
  "imagenes": [
    "https://url-imagen-normal.jpg",
    "https://url-imagen-con-texto.jpg"
  ]
}
