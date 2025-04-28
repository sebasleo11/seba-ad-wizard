export async function generarCopyEImagen(formData: any) {
    try {
      const response = await fetch('http://localhost:5678/webhook/generar-texto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Error al generar anuncio con IA');
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al generar copy e imagen:', error);
      throw error;
    }
  }
  