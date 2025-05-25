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
import './CalomelConverter.css';

function CalomelConverter() {
  const [input, setInput] = useState('');
  const [ph, setPh] = useState('');
  const [results, setResults] = useState({
    she: '',
    agAgCl: '',
    hgo: '',
    rhe: '',
  });

  const handleConvert = () => {
    const calomel = parseFloat(input);
    const phValue = parseFloat(ph);

    if (!phValue) {
      setResults({
        she: 'Invalid pH',
        agAgCl: 'Invalid pH',
        hgo: 'Invalid pH',
        rhe: 'Invalid pH',
      });
      return;
    }

    setResults({
      she: (calomel + 0.250).toFixed(3),
      agAgCl: (calomel + 0.053).toFixed(3),
      hgo: (calomel - 0.152).toFixed(3),
      rhe: (calomel + 0.250 + 0.059 * phValue).toFixed(3),
    });
  };

  return (
    <div className="calomel-converter">
      <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert from Calomel
          </Typography>

          <TextField
            label="Potential (Calomel, in V)"
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

      {results.she || results.agAgCl || results.hgo ? (
        <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Table className="result-table">
              <TableBody>
                <TableRow>
                  <TableCell>Calomel to SHE:</TableCell>
                  <TableCell>{results.she} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Calomel to Ag/AgCl:</TableCell>
                  <TableCell>{results.agAgCl} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Calomel to HgO:</TableCell>
                  <TableCell>{results.hgo} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Calomel to RHE:</TableCell>
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

export default CalomelConverter;
