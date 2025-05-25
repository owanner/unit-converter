import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import './SHEConverter.css'; // Importa o CSS

function SHEConverter() {
  const [input, setInput] = useState('');
  const [ph, setPh] = useState('');
  const [results, setResults] = useState({
    calomel: '',
    agAgCl: '',
    hgo: '',
    rhe: '',
  });

  const handleConvert = () => {
    const she = parseFloat(input);
    const phValue = parseFloat(ph);

    setResults({
      calomel: (she + 0.250).toFixed(3),
      agAgCl: (she + 0.197).toFixed(3),
      hgo: (she + 0.098).toFixed(3),
      rhe: phValue ? (she + 0.059 * phValue).toFixed(3) : 'Invalid pH',
    });
  };

  return (
    <div className="she-converter">
      <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert from SHE
          </Typography>

          {/* Inputs */}
          <TextField
            label="Potential (SHE, in V)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <TextField
            label="pH (for RHE calculation)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleConvert}
            className="convert-button"
          >
            Convert
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results.calomel || results.agAgCl || results.hgo || results.rhe ? (
        <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Table className="result-table">
              <TableBody>
                <TableRow>
                  <TableCell>SHE to Calomel:</TableCell>
                  <TableCell>{results.calomel} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SHE to Ag/AgCl:</TableCell>
                  <TableCell>{results.agAgCl} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SHE to HgO:</TableCell>
                  <TableCell>{results.hgo} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SHE to RHE:</TableCell>
                  <TableCell>{results.rhe} V</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default SHEConverter;
