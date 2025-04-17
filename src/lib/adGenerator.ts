
// Simple function to generate ad copy based on the form data
export const generateAdCopy = (data: any): string => {
  const { business, objective, audience } = data;

  // Helper function to get a random item from an array
  const getRandomItem = (items: string[]): string => {
    return items[Math.floor(Math.random() * items.length)];
  };

  // Different hooks based on the business type
  const hooks = {
    producto: [
      `¡Descubre ${business.name}!`,
      `¿Buscando ${business.type}s de calidad?`,
      `El ${business.type} que estabas buscando`,
      `${business.name}: El ${business.type} preferido por los expertos`
    ],
    servicio: [
      `${business.name}: La solución que necesitas`,
      `Contrata los mejores servicios de ${business.name}`,
      `Expertos en ${business.description.split(' ').slice(0, 3).join(' ')}`,
      `Servicios profesionales de ${business.name}`
    ],
    infoproducto: [
      `¡Aprende con ${business.name}!`,
      `Conocimiento exclusivo sobre ${business.description.split(' ').slice(0, 3).join(' ')}`,
      `Descubre los secretos de ${business.description.split(' ').slice(0, 3).join(' ')}`,
      `${business.name}: El camino más rápido hacia el éxito`
    ]
  };

  // Value propositions based on the objective
  const valuePropositions = {
    sales: [
      `Precios imbatibles`,
      `Calidad garantizada`,
      `Envío rápido y seguro`,
      `Ofertas exclusivas por tiempo limitado`
    ],
    leads: [
      `Asesoramiento personalizado`,
      `Presupuesto sin compromiso`,
      `Primera consulta gratis`,
      `Descuentos para nuevos clientes`
    ],
    traffic: [
      `Visita nuestra web para más información`,
      `Catálogo completo en nuestra página`,
      `Descubre todas nuestras opciones`,
      `Visítanos y sorpréndete`
    ],
    awareness: [
      `Más de 5 años de experiencia`,
      `Cientos de clientes satisfechos`,
      `Referentes en el sector`,
      `La marca en la que confían los profesionales`
    ]
  };

  // Call to action based on the objective
  const ctas = {
    sales: [`¡Compra ahora!`, `¡Aprovecha esta oferta!`, `¡No te lo pierdas!`],
    leads: [`Contáctanos hoy`, `Solicita información`, `Reserva tu consulta`],
    traffic: [`Visita nuestra web`, `Descubre más`, `Explora nuestro catálogo`],
    awareness: [`Conócenos mejor`, `Síguenos`, `Descubre nuestra historia`]
  };

  // Generate the ad copy
  const hook = getRandomItem(hooks[business.type as keyof typeof hooks] || hooks.producto);
  const value = getRandomItem(valuePropositions[objective as keyof typeof valuePropositions] || valuePropositions.sales);
  const cta = getRandomItem(ctas[objective as keyof typeof ctas] || ctas.sales);
  
  // Create a short description from the business description
  const shortDescription = business.description.length > 70 
    ? `${business.description.substring(0, 70)}...` 
    : business.description;

  // Assemble the final copy
  return `${hook} ${shortDescription}\n\n${value}.\n\n${cta}`;
};
