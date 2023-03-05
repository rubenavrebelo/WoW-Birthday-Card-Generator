import * as React from "react";
import {
  Typography,
  Paper,
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  choicesContainer: {
    padding: "24px 36px",
    margin: "16px",
    backgroundColor: "white",
    borderRadius: 4,
  },
  description: {
    color: "#757575",
    fontWeight: 200,
  },
}));

export default function StatusEditor() {
  React.useEffect(() => {});

  const classes = useStyles();

  return (
    <div>
      <div className={classes.choicesContainer}>
        <Typography style={{ marginBottom: 16 }}>Main Text</Typography>
        <TextField label={"Input"} style={{ width: "100%" }} />
        <Typography
          variant="subtitle2"
          className={classes.description}
          style={{ marginTop: 16 }}
        >
          Customize your text to add a personal level! It can be anything you
          want: age, a job, position and more!
        </Typography>
      </div>
      <FormGroup>
        <div className={classes.choicesContainer}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="First Spell?"
          />
          <Typography variant="subtitle2" className={classes.description}>
            Disables or enables <b>BOTH</b> spells from appearing in the final
            card.
          </Typography>
        </div>
        <div className={classes.choicesContainer}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Second Spell?"
          />
          <Typography variant="subtitle2" className={classes.description}>
            Disables or enables the <b>SECOND</b> spell from appearing in the
            final card. When disabling, only the first spell with appear
          </Typography>
        </div>
        <div className={classes.choicesContainer}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Have Achievement Spell?"
          />
          <Typography variant="subtitle2" className={classes.description}>
            Disables or enables achievement from appearing in the final card.
          </Typography>
        </div>
      </FormGroup>
    </div>
  );
}
