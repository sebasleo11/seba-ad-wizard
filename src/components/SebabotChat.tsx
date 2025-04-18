import React, { useState } from "react";

const SebabotChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const handleSend = () => {
    setRespuesta("¡Hola! Soy Sebabot. En breve podré ayudarte con IA 🤖");
    setMensaje("");
  };

  return (
    <>
      {/* Burbuja de bienvenida flotante */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 bg-white border border-gray-300 text-sm text-gray-800 px-4 py-2 rounded-lg shadow-md animate-bounce z-40">
          Hola, soy Sebabot 🤖<br />¿Necesitás ayuda?
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        💬
      </button>

      {/* Chat simple */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white border rounded-lg shadow-lg w-80 z-50 p-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Sebabot 🤖</h2>
          <div className="text-sm text-gray-700 mb-2">
            {respuesta || "¿En qué puedo ayudarte hoy?"}
          </div>
          <input
            type="text"
            placeholder="Escribí tu pregunta..."
            className="w-full p-2 border rounded mb-2"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      )}
    </>
  );
};

export default SebabotChat;
