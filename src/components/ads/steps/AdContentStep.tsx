import React, { useState } from 'react';

const AdContentStep = ({ updateData }) => {
  const [promptUsuario, setPromptUsuario] = useState('');
  const [copys, setCopys] = useState<string[]>([]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const generarTexto = async () => {
    try {
      setLoadingText(true);
      const res = await fetch('http://localhost:5678/webhook/crear-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptUsuario }),
      });
      const data = await res.json();
      console.log('Copys generados:', data);
      setCopys([data.copy1, data.copy2]);
    } catch (err) {
      console.error('Error generando texto:', err);
    } finally {
      setLoadingText(false);
    }
  };

  const generarImagen = async () => {
    try {
      setLoadingImage(true);
      const prompt = promptUsuario || 'Producto destacado para redes sociales';
      const res = await fetch('http://localhost:5678/webhook/crear-imagen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log('Imágenes generadas:', data);
      setImagenes([data.imagen1, data.imagen2]);
    } catch (err) {
      console.error('Error generando imagen:', err);
    } finally {
      setLoadingImage(false);
    }
  };

  const usarTexto = (texto: string) => {
    updateData({ textoSeleccionado: texto });
  };

  const usarImagen = (url: string) => {
    updateData({ imagenSeleccionada: url });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Generar contenido publicitario con IA</h2>

      <input
        type="text"
        placeholder="Ej: Zapatos cómodos para todo el día"
        value={promptUsuario}
        onChange={(e) => setPromptUsuario(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <div className="flex gap-4 mb-6">
        <button
          onClick={generarTexto}
          disabled={loadingText}
          className="btn bg-blue-600 text-white rounded px-4 py-2"
        >
          {loadingText ? 'Generando...' : 'Generar texto con IA'}
        </button>

        <button
          onClick={generarImagen}
          disabled={loadingImage}
          className="btn bg-green-600 text-white rounded px-4 py-2"
        >
          {loadingImage ? 'Generando...' : 'Generar imagen con IA'}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Textos generados</h3>
        {copys.length > 0 ? (
          copys.map((texto, i) => (
            <div key={i} className="border rounded p-3 mb-2">
              <p className="mb-2">{texto}</p>
              <button
                onClick={() => usarTexto(texto)}
                className="text-sm text-blue-600 underline"
              >
                Usar esta copia
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aún no se ha generado</p>
        )}
      </div>

      <div>
        <h3 className="font-bold mb-2">Imágenes generadas</h3>
        {imagenes.length > 0 ? (
          imagenes.map((url, i) => (
            <div key={i} className="mb-4">
              <img src={url} alt={`Generada ${i + 1}`} className="w-full rounded shadow" />
              <p className="text-sm text-center mt-1">Imagen generada</p>
              <button
                onClick={() => usarImagen(url)}
                className="text-sm text-green-600 underline block text-center mt-1"
              >
                Usar esta imagen
              </button>
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






