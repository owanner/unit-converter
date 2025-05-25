import React, { createContext, useContext, useState } from "react";

// Criando o contexto para armazenar os valores de referência
const ReferenceContext = createContext();

export const ReferenceProvider = ({ children }) => {
  // Estados para armazenar os valores de referência de cada aba
  const [references, setReferences] = useState({
    SHE: { calomel: 0.250, agAgCl: 0.197, hgo: 0.098, rhe: 0.000 },
    Calomel: { she: -0.250, agAgCl: -0.053, hgo: -0.152, rhe: -0.250 },
    AgAgCl: { she: -0.197, calomel: 0.053, hgo: -0.099, rhe: -0.197 },
    // Adicione outras abas conforme necessário
  });

  // Função para atualizar um valor de referência em uma aba específica
  const updateReference = (tab, electrode, value) => {
    setReferences((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [electrode]: parseFloat(value) },
    }));
  };

  return (
    <ReferenceContext.Provider value={{ references, updateReference }}>
      {children}
    </ReferenceContext.Provider>
  );
};

// Hook para acessar o contexto em qualquer componente
export const useReference = () => useContext(ReferenceContext);
