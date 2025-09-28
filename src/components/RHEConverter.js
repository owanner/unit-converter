import React, { useState } from "react";
import { Card, CardContent, Button, TextField, Typography, IconButton, Stack, Alert } from "@mui/material"; // 🟢 Adicionei o Alert aqui
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import "./styles/ConverterStyle.css"

const RHEConverter = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 🟢 Novo estado para gerenciar alertas
  const [error, setError] = useState("");

  // Valores de referência específicos para RHE
  const referenceDefaults = {
    RHE: 0.000, // O valor do RHE será ajustado no cálculo
    AgAgCl: 0.197,
    SCE: 0.241,
    HgHgO: 0.105,
    SHE: 0.000
  };

  const [references, setReferences] = useState(referenceDefaults);
  const [inputValue, setInputValue] = useState("");
  const [phValue, setPhValue] = useState("");
  const [results, setResults] = useState({});

  const updateReference = (electrode, value) => {
    setReferences((prev) => ({ ...prev, [electrode]: parseFloat(value) || 0 }));
  };

  // 🟢 Alterei o handleConvert
  const handleConvert = () => {
    if (!inputValue) {
      // Se não tiver valores, exibe erro e não abre os resultados
      setError("Please, fill in Potential field before converting.");
      setShowResults(false);
      return;
    }

    setError(""); // limpa erro caso já estivesse mostrando

    const rhe = parseFloat(inputValue) || 0;
    const ph = parseFloat(phValue) || 0;

    setResults({
      AgAgCl: ((rhe - references.AgAgCl) - (0.059 * ph)).toFixed(3),
      SCE: ((rhe - references.SCE) - (0.059 * ph)).toFixed(3),
      HgHgO: ((rhe - references.HgHgO) - (0.059 * ph)).toFixed(3),
      SHE: ((rhe - references.SHE) - (0.059 * ph)).toFixed(3)
    });

    setShowResults(true);
  };

  return (
    <div className="converter-container">
      {/* Botão para alternar Configurações */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={() => setShowSettings(!showSettings)}
          sx={{
            borderRadius: 2,
            boxShadow: "3px 3px 6px rgba(0.1, 0.1, 0.1, 0.3)",
            transition: "0.3s",
            "&:hover": { boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)" }
          }}>
          {showSettings ? <ExpandLess /> : <ExpandMore />}
          <Typography variant="subtitle1">Set Reference Electrode Values</Typography>
        </IconButton>
      </Stack>

      {showSettings && (
        <Card className="settings-card">
          <CardContent>
            <Typography variant="h6">
              Reference Electrode Values&nbsp;
              <span style={{ fontSize: '0.70em', fontWeight: 400 }}>
                (V vs. SHE)
              </span>
            </Typography>            
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
          <Typography variant="h6">Convert from RHE</Typography>
          <TextField
            type="number"
            label="Potential (RHE, in V)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            type="number"
            label="pH (optional)"
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

          {/* 🟢 Novo: alerta bonito quando faltar campos */}
          {error && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
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
                    <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                      {results[electrode]}
                    </td>
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

export default RHEConverter;
