import React, { useState } from "react";
import { Card, CardContent, Button, TextField, Typography, IconButton, Stack } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import "./styles/ConverterStyle.css"

const AgAgClConverter = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Valores de referência específicos para AgAgCl
  const referenceDefaults = {
    //SHE: 0.199,
    RHE: 0.000, // O valor do RHE será ajustado no cálculo
    SCE: 0.241,
    HgO: 0.105
  };

  const [references, setReferences] = useState(referenceDefaults);
  const [inputValue, setInputValue] = useState("");
  const [phValue, setPhValue] = useState("");
  const [results, setResults] = useState({});

  // Atualiza o valor de referência quando o usuário altera o input
  const updateReference = (electrode, value) => {
    setReferences((prev) => ({ ...prev, [electrode]: parseFloat(value) || 0 }));
  };

  // Função para converter os valores
  const handleConvert = () => {
    const agagcl = parseFloat(inputValue) || 0;
    const ph = parseFloat(phValue) || 0;

    setResults({
      //SHE: (agagcl + references.SHE).toFixed(3),
      RHE: (agagcl + references.RHE + 0.059 * ph).toFixed(3),
      SCE: (agagcl + references.SCE).toFixed(3),
      HgO: (agagcl + references.HgO).toFixed(3)
    });

    setShowResults(true);
  };

  return (
    <div className="converter-container">
      {/* Botão para alternar Configurações com Título */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={() => setShowSettings(!showSettings)}
          sx={{
            borderRadius: 2,
            boxShadow: "3px 3px 6px rgba(0.1, 0.1, 0.1, 0.3)",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)"
            }
          }}>
          {showSettings ? <ExpandLess /> : <ExpandMore />}
          <Typography variant="subtitle1">Set Reference Electrode Values</Typography>
        </IconButton>
      </Stack>

      {/* Card de Configuração (opcional) */}
      {showSettings && (
        <Card className="settings-card">
          <CardContent>
            <Typography variant="h6">Reference Electrode Values (V vs. SHE)</Typography>
            {Object.keys(references).map((electrode) => (
              <TextField
                key={electrode}
                type="number"
                label={electrode}
                value={references[electrode]}
                onChange={(e) => updateReference(electrode, e.target.value)}
                fullWidth
                margin="dense"
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Card de Entrada */}
      <Card className="input-card">
        <CardContent>
          <Typography variant="h6">Convert from Ag/AgCl</Typography>
          <TextField
            type="number"
            label="Potential (Ag/AgCl, in V)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            type="number"
            label="pH"
            value={phValue}
            onChange={(e) => setPhValue(e.target.value)}
            fullWidth
            margin="dense"
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <Button onClick={handleConvert} variant="contained" color="primary" sx={{ px: 8 }}>
              Convert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card de Resultados */}
      {showResults && (
        <Card className="result-card">
          <CardContent>
            <Typography variant="h6">Results</Typography>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "2px solid #ddd", padding: "8px", textAlign: "left" }}>Electrode</th>
                  <th style={{ borderBottom: "2px solid #ddd", padding: "8px", textAlign: "right" }}>Value (V)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(results).map((electrode) => (
                  <tr key={electrode}>
                    <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{electrode}</td>
                    <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{results[electrode]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgAgClConverter;
