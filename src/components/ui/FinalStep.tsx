import React, { useState } from 'react';

const FinalStep = () => {
  const [selectedCopy, setSelectedCopy] = useState('');
  const [manualImage, setManualImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setManualImage(e.target.files[0]);
    }
  };

  const handleCopySelect = (text: string) => {
    setSelectedCopy(text);
    console.log('Copy seleccionado:', text);
  };

  const handleDownload = () => {
    console.log('Descargar Kit');
  };

  const handleEmail = () => {
    console.log('Enviar por email');
  };

  const handleNewCampaign = () => {
    console.log('Generar otra campaña');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>🎯 Kit de campaña generado</h2>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        {/* Columna izquierda */}
        <div style={{ flex: 1 }}>
          <h3>Título del anuncio</h3>
          <p>¡Descubrí el poder de tu marca hoy mismo!</p>

          <h4>Segmentación recomendada</h4>
          <p>📍 Argentina | 👥 Mujeres 25-45 | 🎯 Intereses: Emprendimiento, Moda</p>

          <h4>Presupuesto sugerido</h4>
          <p>💸 $500 ARS por día</p>

          <h4>Opciones de texto (Copy)</h4>
          <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p>¿Querés más ventas? Nuestra solución es justo lo que necesitás.</p>
            <button onClick={() => handleCopySelect('¿Querés más ventas? Nuestra solución es justo lo que necesitás.')}>
              Usar este copy
            </button>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <p>Transformá tu negocio con un solo clic. ¡Empezá hoy!</p>
            <button onClick={() => handleCopySelect('Transformá tu negocio con un solo clic. ¡Empezá hoy!')}>
              Usar este copy
            </button>
          </div>
        </div>

        {/* Columna derecha */}
        <div style={{ flex: 1 }}>
          <h4>Imágenes sugeridas por IA</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ border: '1px solid #ccc', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Imagen 1 (IA) no disponible
            </div>
            <div style={{ border: '1px solid #ccc', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Imagen 2 (IA) no disponible
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label>📤 Subí una imagen manualmente:</label><br />
            <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} />
            {manualImage && <p>Imagen cargada: {manualImage.name}</p>}
          </div>
        </div>
      </div>

      {/* Botones finales */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleDownload}>📥 Descargar Kit</button>
        <button onClick={handleEmail}>✉️ Enviar por email</button>
        <button onClick={handleNewCampaign}>🔄 Generar otra campaña</button>
      </div>
    </div>
  );
};

export default FinalStep;
