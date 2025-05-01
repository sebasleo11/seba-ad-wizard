import React, { useState } from "react";

const AdContentStep = () => {
  const [prompt, setPrompt] = useState("");
  const [copys, setCopys] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState("");

  const generarTexto = async () => {
    try {
      setLoadingText(true);
      setError("");

      const res = await fetch("http://localhost:5678/webhook/crear-campania", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("No se pudo generar el texto");

      const data = await res.json();
      console.log("Texto generado por IA:", data);
      setCopys([data.copy1, data.copy2]);
    } catch (err) {
      console.error("Error generando texto:", err);
      setError("Error al generar el texto. Verificá que el servidor n8n esté activo.");
    } finally {
      setLoadingText(false);
    }
  };

  const generarImagen = async () => {
    try {
      setLoadingImage(true);
      setError("");

      const res = await fetch("http://localhost:5678/webhook/crear-imagen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("No se pudo generar la imagen");

      const data = await res.json();
      console.log("Imagen generada por IA:", data);
      setImages([data.img1, data.img2]);
    } catch (err) {
      console.error("Error generando imagen:", err);
      setError("Error al generar la imagen. Verificá que el servidor n8n esté activo.");
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Generar contenido publicitario con IA</h2>

      <input
        type="text"
        placeholder="Ej: Zapatos cómodos para todo el día"
        className="w-full p-2 border rounded mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={generarTexto}
          disabled={loadingText}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loadingText ? "Generando..." : "Generar texto con IA"}
        </button>
        <button
          onClick={generarImagen}
          disabled={loadingImage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loadingImage ? "Generando..." : "Generar imagen con IA"}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <div className="mb-6">
        <h3 className="font-semibold">Textos generados</h3>
        {copys.length > 0 ? (
          copys.map((copy, index) => (
            <div key={index} className="border p-2 rounded mt-2 bg-gray-50">
              <p>{copy}</p>
              <button className="text-sm text-blue-600 hover:underline mt-1">Usar esta copia</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aún no se ha generado</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold">Imágenes generadas</h3>
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="mt-4">
              <img src={url} alt={`Generada ${index + 1}`} className="rounded shadow" />
              <p className="text-sm text-gray-600 mt-1">Imagen generada</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aún no se ha generado</p>
        )}
      </div>
    </div>
  );
};

export default AdContentStep;







