import React from "react";
import { Box, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LaptopIcon from "@mui/icons-material/Laptop";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#4dabf5",
        color: "white",
        padding: "1vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //flexDirection: "column",
        flexWrap: "wrap",
        gap: "10px",
        //position: "fixed",
        marginTop: "auto",
        bottom: 0,
        left: 0,
        //height: "4vh", // Define uma altura fixa para o footer
        boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
        //zIndex: 1000, // Garante que o footer fique acima de outros elementos
      }}
    >
      <Typography variant="body2" display="flex" alignItems="center">
        <LightbulbIcon fontSize="small" sx={{ marginRight: "5px" }} />
        Idealized by Nicolas Ishiki
      </Typography>
      <Typography variant="body2">|</Typography>
      <Typography variant="body2" display="flex" alignItems="center">
        <LaptopIcon fontSize="small" sx={{ marginRight: "5px" }} />
        Developed by Wanner Menezes
      </Typography>
      <Typography variant="body2">|</Typography>
      <Typography variant="body2">© {new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  );
};

export default Footer;
