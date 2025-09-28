import React from "react";
import { Box, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LaptopIcon from "@mui/icons-material/Laptop";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        backgroundColor: "#bdbdbd",
        color: "white",
        padding: "1vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "auto",
        boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="body2" display="flex" alignItems="center">
        <LightbulbIcon fontSize="small" sx={{ marginRight: "5px" }} />
        Idealized by Nicolas Ishiki
      </Typography>
      <Typography variant="body2" display="flex" alignItems="center">
        <LaptopIcon fontSize="small" sx={{ marginRight: "5px" }} />
        Developed by Wanner Menezes
      </Typography>
      <Typography variant="body2">© {new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  );
};

export default Footer;
