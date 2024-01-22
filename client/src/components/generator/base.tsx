import * as React from "react";
import { Typography, Paper, Tabs, Tab, Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Image } from "./image";
import AchievEditor from "../tabs/achievement-editor";
import StatusEditor from "../tabs/status-editor";
import { createStyles, makeStyles, withStyles } from "@mui/styles";
import { allIcons } from "../../types/icons";

const useStyles = makeStyles(() => ({
  tabtabContainer: {
    backgroundColor: "#363636",
    borderRadius: 6,
  },
  tab: {
    width: "25%",
    minWidth: "25%",
    letterSpacing: "0.6px",
    fontWeight: 450,
    color: "#768188",
  },
  selected: {
    color: "white !important",
  },
}));

export interface BaseImageProps {
  hash: string;
}

export const BaseImage: React.FC<BaseImageProps> = ({ hash }) => {
  const [tab, setCurrentTab] = React.useState<number>(0);
  const classes = useStyles();

  const isFolder = (val: any | string) => {
    return typeof val === "object";
  };

  const renderParent = (key: string, value: any, fullpath: string) => {
    return (
      <>
        <Accordion
          style={{ backgroundColor: "white", padding: "16px 32px", width: "100%" }}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary>
            <Typography style={{ textTransform: "capitalize" }}>{key.toLowerCase()}</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderIcons(value, fullpath + "/" + key)}</AccordionDetails>
        </Accordion>
      </>
    );
  };

  const renderIcons = (iconObject: any, fullpath: string): JSX.Element => {
    return (
      <Grid container>
        {Object.keys(iconObject).map((ic: any) =>
          isFolder(iconObject[ic])
            ? renderParent(ic, iconObject[ic], fullpath)
            : renderLeaf(ic, iconObject[ic], fullpath)
        )}
      </Grid>
    );
  };

  const renderLeaf = (key: string, value: string, fullpath?: string) => {
    return (
      <Grid item xs={2} style={{ textAlign: "center", textTransform: "capitalize" }}>
        {fullpath && (
          <img src={"http://localhost:8080/icons" + fullpath + "/" + key + ".png"} style={{ width: 64, height: 64 }} />
        )}
        <Typography style={{ fontSize: 12 }}>
          {value.toLowerCase().replace(/\b(\w)/g, (x) => x.toUpperCase())}
        </Typography>
      </Grid>
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div style={{ overflowY: "auto" }}>
      <div style={{ height: 70, width: "100%", backgroundColor: "#363636" }}></div>
      <Grid container>
        <Grid item xs={8}>
          <Image hash={hash} />
        </Grid>
        <Grid
          item
          xs={4}
          style={{ backgroundColor: "#212121", maxHeight: "90vh", overflowY: "scroll", paddingRight: 32 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }} className={classes.tabtabContainer}>
            <Tabs onChange={handleChange} value={tab} variant={"fullWidth"} style={{ width: "95%" }}>
              <Tab classes={{ root: classes.tab, selected: classes.selected }} label="Base" />
              <Tab classes={{ root: classes.tab, selected: classes.selected }} label="First Spell" />
              <Tab classes={{ root: classes.tab, selected: classes.selected }} label="Second Spell" />
              <Tab classes={{ root: classes.tab, selected: classes.selected }} label="Achievement" />
            </Tabs>
          </div>
          {renderIcons(allIcons, "")}
        </Grid>
      </Grid>
    </div>
  );
};
