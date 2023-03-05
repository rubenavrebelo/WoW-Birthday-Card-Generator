import * as React from "react";
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Theme,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Image from "./image";
import AchievEditor from "../tabs/achievement-editor";
import StatusEditor from "../tabs/status-editor";
import { createStyles, withStyles } from "@mui/styles";

interface StyledTabProps {
  label: string;
}

export default function BaseImage() {
  const [tab, setCurrentTab] = React.useState<number>(0);

  return (
    <div style={{ overflowY: "auto" }}>
      <div
        style={{ height: 70, width: "100%", backgroundColor: "#363636" }}
      ></div>
      <Grid container>
        <Grid item xs={8.5}>
          <Image />
        </Grid>
        <Grid item xs={3.5} style={{ backgroundColor: "#212121" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tabs aria-label="basic tabs example">
              <Tab label="Base" />
              <Tab label="First Spell" />
              <Tab label="Second Spell" />
              <Tab label="Achievement" />
            </Tabs>
          </div>
          <StatusEditor />
        </Grid>
      </Grid>
    </div>
  );
}
