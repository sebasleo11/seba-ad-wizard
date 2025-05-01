import React from 'react';

interface AdPreviewStepProps {
  data: {
    copys: string[];
    imagenes: string[];
    textoSeleccionado?: string;
    imagenSeleccionada?: string;
  };
  updateData: (data: { textoSeleccionado?: string; imagenSeleccionada?: string }) => void;
}

const AdPreviewStep: React.FC<AdPreviewStepProps> = ({ data, updateData }) => {
  const usarTexto = (texto: string) => {
    updateData({ textoSeleccionado: texto });
  };

  const usarImagen = (url: string) => {
    updateData({ imagenSeleccionada: url });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">Vista previa del anuncio</h2>

      {/* Sección de textos generados */}
      <div className="mb-8">
        <h3 className="font-bold mb-4">Textos generados</h3>
        {data.copys.length > 0 ? (
          <div className="space-y-3">
            {data.copys.map((texto, i) => (
              <div
                key={i}
                className={`border rounded p-4 ${
                  data.textoSeleccionado === texto
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <p className="mb-3">{texto}</p>
                <button
                  onClick={() => usarTexto(texto)}
                  className={`text-sm ${
                    data.textoSeleccionado === texto
                      ? 'text-blue-600 font-medium'
                      : 'text-blue-500 hover:text-blue-600'
                  }`}
                >
                  {data.textoSeleccionado === texto
                    ? '✓ Texto seleccionado'
                    : 'Seleccionar este texto'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay textos generados</p>
        )}
      </div>

      {/* Sección de imágenes generadas */}
      <div>
        <h3 className="font-bold mb-4">Imágenes generadas</h3>
        {data.imagenes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.imagenes.map((url, i) => (
              <div
                key={i}
                className={`border rounded overflow-hidden ${
                  data.imagenSeleccionada === url
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={url}
                  alt={`Imagen generada ${i + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <button
                    onClick={() => usarImagen(url)}
                    className={`text-sm w-full ${
                      data.imagenSeleccionada === url
                        ? 'text-green-600 font-medium'
                        : 'text-green-500 hover:text-green-600'
                    }`}
                  >
                    {data.imagenSeleccionada === url
                      ? '✓ Imagen seleccionada'
                      : 'Seleccionar esta imagen'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay imágenes generadas</p>
        )}
      </div>
    </div>
  );
};

export default AdPreviewStep; 