import * as React from "react";
import BaseImage from "./components/generator/base";
import RealmCharSelector from "./components/realm-character/selector";
import bg from "./static/background22.jpg";
import { createTheme, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "rgb(33, 33, 33)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
        }}
      >
        <BaseImage />
      </div>
    </ThemeProvider>
  );
}

export default App;
