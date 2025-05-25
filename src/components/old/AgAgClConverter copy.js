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
import './AgAgClConverter.css';

function AgAgClConverter() {
  const [input, setInput] = useState('');
  const [ph, setPh] = useState('');
  const [results, setResults] = useState({
    she: '',
    calomel: '',
    hgo: '',
    rhe: '',
  });

  const handleConvert = () => {
    const agAgCl = parseFloat(input);
    const phValue = parseFloat(ph);

    if (!phValue) {
      setResults({
        she: 'Invalid pH',
        calomel: 'Invalid pH',
        hgo: 'Invalid pH',
        rhe: 'Invalid pH',
      });
      return;
    }

    setResults({
      she: (agAgCl - 0.197).toFixed(3),
      calomel: (agAgCl - 0.053).toFixed(3),
      hgo: (agAgCl - 0.099).toFixed(3),
      rhe: (agAgCl - 0.197 + 0.059 * phValue).toFixed(3),
    });
  };

  return (
    <div className="agagcl-converter">
      <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert from Ag/AgCl
          </Typography>

          <TextField
            label="Potential (Ag/AgCl, in V)"
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

      {results.she || results.calomel || results.hgo ? (
        <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Table className="result-table">
              <TableBody>
                <TableRow>
                  <TableCell>Ag/AgCl to SHE:</TableCell>
                  <TableCell>{results.she} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ag/AgCl to Calomel:</TableCell>
                  <TableCell>{results.calomel} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ag/AgCl to HgO:</TableCell>
                  <TableCell>{results.hgo} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ag/AgCl to RHE:</TableCell>
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

export default AgAgClConverter;
