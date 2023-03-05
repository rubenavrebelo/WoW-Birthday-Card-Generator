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
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Image } from "./image";
import AchievEditor from "../tabs/achievement-editor";
import StatusEditor from "../tabs/status-editor";
import { createStyles, withStyles } from "@mui/styles";
import { allIcons } from "../../types/icons";

export interface BaseImageProps {
  hash: string;
}

export const BaseImage: React.FC<BaseImageProps> = ({ hash }) => {
  const [tab, setCurrentTab] = React.useState<number>(0);

  const isFolder = (val: any | string) => {
    return typeof val === "object";
  };

  const renderParent = (key: string, value: any) => {
    return (
      <>
        <Accordion style={{ backgroundColor: "white", padding: "16px 32px", width: "100%" }}>
          <AccordionSummary>
            <Typography>{key}</Typography>
          </AccordionSummary>
        </Accordion>
        <AccordionDetails>{renderIcons(value)}</AccordionDetails>
      </>
    );
  };

  const renderIcons = (iconObject: any): JSX.Element => {
    return (
      <Grid container>
        {Object.keys(iconObject).map((ic: any) =>
          isFolder(iconObject[ic]) ? renderParent(ic, iconObject[ic]) : renderLeaf(ic, iconObject[ic])
        )}
      </Grid>
    );
  };

  const renderLeaf = (key: string, value: string) => {
    return (
      <Grid item xs={2}>
        <Typography>{value}</Typography>
      </Grid>
    );
  };

  return (
    <div style={{ overflowY: "auto" }}>
      <div style={{ height: 70, width: "100%", backgroundColor: "#363636" }}></div>
      <Grid container>
        <Grid item xs={8.5}>
          <Image hash={hash} />
        </Grid>
        <Grid item xs={3.5} style={{ backgroundColor: "#212121", maxHeight: "90vh", overflowY: "scroll" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tabs aria-label="basic tabs example">
              <Tab label="Base" />
              <Tab label="First Spell" />
              <Tab label="Second Spell" />
              <Tab label="Achievement" />
            </Tabs>
          </div>
          {renderIcons(allIcons)}
        </Grid>
      </Grid>
    </div>
  );
};
