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
    { name: 'Standard Hydrogen Electrode (SHE)', potential: '0.000 V' },
    { name: 'Saturated Calomel Electrode (SCE)', potential: '+0.241 V' },
    { name: 'Silver/Silver Chloride Electrode (Ag/AgCl)', potential: '+0.197 V' },
    { name: 'Mercury/Mercuric Oxide Electrode (Hg/HgO)', potential: '+0.314 V' },
  ];

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {referenceElectrodes.map((electrode, index) => (
          <ListItem button key={index}>
            <ListItemText primary={electrode.name} secondary={`Potencial: ${electrode.potential}`} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

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
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: "100%" }}>
        {/* Barra de título do aplicativo */}
        <AppBar position="static" style={{ marginBottom: '0px', paddingBottom: '0px' }} elevation={0} sx={{ mb: 2, width: '100%' }} >
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
                <CloseIcon color='white'/>
              </IconButton>
            </Box>
            {list()}
            <Divider />
          </Box>
          <Box mt="auto">
            <DrawerFooter />
          </Box>
        </Box>
        </Drawer>

        {/*Tabs para navegação */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%'}}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" style={{ backgroundColor: '#ffffff' }}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} sx={{ textTransform: "none" }} />
            ))}
          </Tabs>
        </Box>

        {/*Conteúdo das abas */}
        <Box sx={{ p: 1, flexGrow: 1 }}>{tabs[tabIndex].component}</Box>

        <Footer />
      </Box>
    </div>
  );
}

export default App;