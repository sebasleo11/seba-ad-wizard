const Contacto = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">¿Querés contactarme?</h1>
  
        <p className="text-lg mb-4">
          📧 Escribime a:{" "}
          <a
            href="mailto:cursoiainteligente@gmail.com"
            className="text-blue-500 underline hover:text-blue-700"
          >
            cursoiainteligente@gmail.com
          </a>
        </p>
  
        <p className="text-lg mb-6">
          💬 Mandame un WhatsApp:{" "}
          <a
            href="https://wa.me/541140930260"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline hover:text-green-800"
          >
            +54 11 4093-0260
          </a>
        </p>
  
        <p className="text-gray-500">Te responderé lo antes posible 📝</p>
      </div>
    );
  };
  
  export default Contacto;
  
  
  
  
  