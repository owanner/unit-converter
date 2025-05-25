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
import './HgOConverter.css';

function HgOConverter() {
  const [input, setInput] = useState('');
  const [ph, setPh] = useState('');
  const [results, setResults] = useState({
    she: '',
    calomel: '',
    agAgCl: '',
    rhe: '',
  });

  const handleConvert = () => {
    const hgo = parseFloat(input);
    const phValue = parseFloat(ph);

    if (!phValue) {
      setResults({
        she: 'Invalid pH',
        calomel: 'Invalid pH',
        agAgCl: 'Invalid pH',
        rhe: 'Invalid pH',
      });
      return;
    }

    setResults({
      she: (hgo - 0.098).toFixed(3),
      calomel: (hgo + 0.152).toFixed(3),
      agAgCl: (hgo + 0.099).toFixed(3),
      rhe: (hgo - 0.098 + 0.059 * phValue).toFixed(3),
    });
  };

  return (
    <div className="hgo-converter">
      <Card sx={{mt: 1, padding: 0 }} className="converter-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert from HgO
          </Typography>

          <TextField
            label="Potential (HgO, in V)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <TextField
            label="pH"
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

      {results.she || results.calomel || results.agAgCl ? (
        <Card sx={{mt: 1, padding: 0 }} className="converter-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Table className="result-table">
              <TableBody>
                <TableRow>
                  <TableCell>HgO to SHE:</TableCell>
                  <TableCell>{results.she} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HgO to Calomel:</TableCell>
                  <TableCell>{results.calomel} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HgO to Ag/AgCl:</TableCell>
                  <TableCell>{results.agAgCl} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HgO to RHE:</TableCell>
                  <TableCell>{results.rhe}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default HgOConverter;
