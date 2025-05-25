import React from "react";
import { Box, Typography } from "@mui/material";

const DrawerFooter = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#a5a5a5",
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
        São Carlos Institute of Chemistry - USP
      </Typography>
    </Box>
  );
};

export default DrawerFooter;