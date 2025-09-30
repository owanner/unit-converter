import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SHEConverter from './components/SHEConverter';
import CalomelConverter from './components/CalomelConverter';
import AgAgClConverter from './components/AgAgClConverter';
import HgOConverter from './components/HgOConverter';
import RHEConverter from './components/RHEConverter';
import Footer from './components/Footer'
import DrawerFooter from './components/DrawerFooter';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const referenceElectrodes = [
    { name: 'Reversible Hydrogen Electrode (RHE)', potential: '0.000V' },
    { name: 'Silver/Silver Chloride Electrode (Ag/AgCl, KClsat.)', potential: '+0.197V' },
    { name: 'Saturated Calomel Electrode (SCE, Hg/Hg2Cl2, KClsat.)', potential: '+0.241V' },
    { name: 'Mercury/Mercuric Oxide Electrode (Hg/HgO, 1M, KOH)', potential: '+0.105V' },
    { name: 'vs. SHE (Standard Hydrogen Electrode)', potential: 'at a(H+)=1, T=25ºC, f(H2)=1bar.' },
  ];

  const references = [
    { name: 'G. Inzelt, A. Lewenstam, and F. Scholz, "Handbook of Reference Electrodes," Springer, 2013.' },
    { name: 'C. G. Zoski, "Handbook of Electrochemistry", 1st ed.  Elsevier, 2007.' },
    { name: 'G. Jerkiewicz, "Standard and Reversible Hydrogen Electrodes: Theory, Design, Operations and Applications", ACS Catal. vol. 10, no. 15, pp. 8409-8417, 2020.' },
    { name: 'K. Kawashima et al., "Accurate Potentials of Hg/HgO electrodes: Practical Parameters for Reporting Alkaline Water Electrolysis Overpotentials", ACS Catal., vol 13, no. 3, pp. 1893-1898, 2023.' }
  ]

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {referenceElectrodes.map((electrode, index) => (
          <ListItem button key={index} sx={{ py: 0.5 }}>
            <ListItemText primary={electrode.name} secondary={electrode.potential} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {references.map((author, index) => (
          <ListItem button key={index} sx={{ py: 0.5 }}>
            <ListItemText secondary={author.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const tabs = [
    { label: 'RHE', component: <RHEConverter /> },
    { label: 'Ag/AgCl', component: <AgAgClConverter /> },
    { label: 'SCE', component: <CalomelConverter /> },
    { label: 'Hg/HgO', component: <HgOConverter /> },
    { label: 'SHE', component: <SHEConverter /> }
  ];

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "100vw", overflowX: "hidden" }}>
        {/* Barra de título do aplicativo */}
        <AppBar position="static" style={{ marginBottom: '0px', paddingBottom: '0px' }} elevation={0} sx={{ mb: 2, width: '100vw' }} >
          <Toolbar>
            <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                Electrochemical Converter
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box display="flex" flexDirection="column" height="100%">
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2} backgroundColor="#b5b5b5" color="white" borderRadius={2} >
                <Typography variant="h6" gutterBottom>
                  Electrode Literature Values
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon color='white' />
                </IconButton>
              </Box>
              {list()}
            </Box>
            <Box mt="auto">
              <DrawerFooter />
            </Box>
          </Box>
        </Drawer>

        {/*Tabs para navegação */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100vw' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" 
            style={{ backgroundColor: '#ffffff' }}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} sx={{ textTransform: "none", fontSize: {xs: "0.95rem", sm: "1rem"}, 
                    minWidth: 0, px: {xs: 0.5, sm: 2}, }} />
            ))}
          </Tabs>
        </Box>

        {/*Conteúdo das abas */}
        <Box sx={{ flexGrow: 1, width: "100vw",
           backgroundColor: tabIndex === 0 ? "#fff3e0" : tabIndex === 1 ? "#f3e5f5" : tabIndex === 2 ? "#e3f2fd" : tabIndex === 3 ? "#f1f8e9" : "#ffebee" }}>
          {tabs[tabIndex].component}
        </Box>

        <Footer />
      </Box>
    </div>
  );
}

export default App;