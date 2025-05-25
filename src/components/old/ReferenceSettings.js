import React, { useState } from "react";
import { useReference } from "./context/ReferenceContext";
import "./ReferenceSettings.css";

const ReferenceSettings = ({ activeTab }) => {
  const { references, updateReference } = useReference();
  const [isVisible, setIsVisible] = useState(true);

  // Obtém os valores de referência apenas da aba ativa
  const activeReferences = references[activeTab] || {};

  return (
    <div className="reference-container">
      {/* Botão para mostrar/ocultar */}
      <button className={`toggle-button ${isVisible ? "open" : ""}`} onClick={() => setIsVisible(!isVisible)}>
        Configurar Referências ({activeTab})
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Card de Configuração (ocultável) */}
      <div className={`reference-card ${isVisible ? "" : "hidden"}`}>
        <h2>Referências para {activeTab}</h2>
        {Object.keys(activeReferences).map((electrode) => (
          <div key={electrode} className="input-group">
            <label>{electrode.toUpperCase()}:</label>
            <input
              type="number"
              value={activeReferences[electrode]}
              onChange={(e) => updateReference(activeTab, electrode, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferenceSettings;
