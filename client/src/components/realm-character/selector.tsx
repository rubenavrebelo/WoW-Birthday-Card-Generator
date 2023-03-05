import * as React from "react";
import { InputBase, Paper, Divider, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Autocomplete from "@mui/lab/Autocomplete";
import PersonIcon from "@mui/icons-material/Person";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import EURealms from "../../types/eu-realm";
import USRealms from "../../types/us-realm";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    alignItems: "center",
    width: "40% ",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    height: 50,
  },
}));

export interface RealmCharSelectorProps {
  imageCallback: (info: any, url: string) => void;
}

export const RealmCharSelector: React.FC<RealmCharSelectorProps> = ({ imageCallback }) => {
  const classes = useStyles();

  const [charName, setCharName] = React.useState<string>("");
  const [realm, setRealm] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState<string>("");

  const normalizeRealm = (wowRealm: string) => wowRealm.replace("EU - ", "").replace("US - ", "").replace(" ", "-");

  const sendRequest = () => {
    if (realm !== null) {
      localStorage.setItem("realm", realm);
      localStorage.setItem("character", charName);
      axios
        .get(`http://localhost:8080/${normalizeRealm(realm)}/${charName}/base`)
        .then((response) => imageCallback(null, response.data));
    }
  };

  React.useEffect(() => {
    const localRealm = localStorage.getItem("realm");
    const localCharacter = localStorage.getItem("character");
    console.log(localRealm, localCharacter);

    if (localRealm !== null) {
      setRealm(localRealm);
      setInputValue(localRealm);
    }
    if (localCharacter !== null) {
      setCharName(localCharacter);
    }
  }, []);

  console.log("states", charName, realm);

  return (
    <Paper className={classes.root}>
      <div style={{ width: "35%" }}>
        <InputBase
          placeholder={"Character Name"}
          startAdornment={<PersonIcon style={{ marginLeft: 8, marginRight: 12, color: "#4CB0C2" }} />}
          onChange={(e) => setCharName(e.target.value)}
          value={charName}
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ marginLeft: 10, width: "45%" }}>
        <Autocomplete
          groupBy={(option) => (option.includes("EU") ? "Europe" : "America")}
          options={EURealms().concat(USRealms())}
          onChange={(e: any, newValue: string | null) => setRealm(newValue)}
          onInputChange={(e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={realm}
          inputValue={inputValue}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <InputBase
                {...params}
                placeholder={"Realm"}
                startAdornment={<EmojiNatureIcon style={{ marginLeft: 8, marginRight: 12, color: "#E0AC33" }} />}
              />
            </div>
          )}
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ width: "20%", height: "100%" }}>
        <Button
          disabled={charName === "" || realm === "" || realm === null}
          onClick={() => sendRequest()}
          fullWidth
          style={{ height: "100%" }}
        >
          Go
        </Button>
      </div>
    </Paper>
  );
};
