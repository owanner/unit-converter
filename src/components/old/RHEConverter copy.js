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
import './RHEConverter.css';

function RHEConverter() {
  const [input, setInput] = useState('');
  const [ph, setPh] = useState('');
  const [results, setResults] = useState({
    she: '',
    calomel: '',
    agAgCl: '',
    hgo: '',
  });

  const handleConvert = () => {
    const rhe = parseFloat(input);
    const phValue = parseFloat(ph);

    if (!phValue) {
      setResults({
        she: 'Invalid pH',
        calomel: 'Invalid pH',
        agAgCl: 'Invalid pH',
        hgo: 'Invalid pH',
      });
      return;
    }

    setResults({
      she: (rhe - 0.059 * phValue).toFixed(3),
      calomel: (rhe - 0.059 * phValue - 0.250).toFixed(3),
      agAgCl: (rhe - 0.059 * phValue - 0.197).toFixed(3),
      hgo: (rhe - 0.059 * phValue - 0.098).toFixed(3),
    });
  };

  return (
    <div className="rhe-converter">
      <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convert from RHE
          </Typography>

          <TextField
            label="Potential (RHE, in V)"
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

      {results.she || results.calomel || results.agAgCl || results.hgo ? (
        <Card sx={{ mt: 1, padding: 0 }} className="converter-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Table className="result-table">
              <TableBody>
                <TableRow>
                  <TableCell>RHE to SHE:</TableCell>
                  <TableCell>{results.she} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RHE to Calomel:</TableCell>
                  <TableCell>{results.calomel} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RHE to Ag/AgCl:</TableCell>
                  <TableCell>{results.agAgCl} V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RHE to HgO:</TableCell>
                  <TableCell>{results.hgo} V</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default RHEConverter;
