import * as React from "react";
import { BaseImage } from "./components/generator/base";
import { RealmCharSelector } from "./components/realm-character/selector";
import bg from "./static/background22.jpg";
import { createTheme, StyledEngineProvider, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({});

function App() {
  const [info, setInfo] = React.useState<any>();
  const [hash, setHash] = React.useState<string>("");

  const handleBase = (info: any, url: string) => {
    setHash(url);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <div
          style={{
            backgroundColor: "rgb(33, 33, 33)",
            boxSizing: "border-box",
            width: "100vw",
            height: "100vh",
          }}
        >
          {hash !== "" ? <BaseImage hash={hash} /> : <RealmCharSelector imageCallback={handleBase} />}
        </div>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
