import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import SHEConverter from '../SHEConverter';
import CalomelConverter from '../CalomelConverter';
import AgAgClConverter from '../AgAgClConverter';
import HgOConverter from '../HgOConverter';
import RHEConverter from '../RHEConverter';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const tabs = [
    { label: 'SHE', component: <SHEConverter /> },
    { label: 'Calomel', component: <CalomelConverter /> },
    { label: 'Ag/AgCl', component: <AgAgClConverter /> },
    { label: 'HgO', component: <HgOConverter /> },
    { label: 'RHE', component: <RHEConverter /> },
  ];

  return (
      <div>
        {/* Barra de título do aplicativo */}
        <AppBar position="static" style={{ marginBottom: '0px', paddingBottom: '0px' }} elevation={0} sx={{ mb: 2 }} >
          <Toolbar>
            <Typography variant="h6" component="div">
              Electrochemical Converter
            </Typography>
          </Toolbar>
        </AppBar>

        {/*Tabs para navegação */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" style={{ backgroundColor: '#ffffff' }}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} sx={{textTransform: "none"}}/>
            ))}
          </Tabs>
        </Box>

        {/*Conteúdo das abas */}
        <Box sx={{ p: 1 }}>{tabs[tabIndex].component}</Box>
      </div>
  );
}

export default App;