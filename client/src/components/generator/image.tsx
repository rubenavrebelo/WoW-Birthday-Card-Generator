import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import notrashy from "../../static/notrashy-base.jpg";

const useStyles = makeStyles(() => ({
  status: {
    position: "absolute",
    height: "9%",
    width: "6%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(224, 172, 51, 0.2)",
      cursor: "pointer",
    },
    left: "42%",
  },
  skill: {
    position: "absolute",
    height: "9%",
    width: "6%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(224, 172, 51, 0.2)",
      cursor: "pointer",
    },
    left: "42%",
    marginTop: "23%",
  },
  achiev: {
    position: "absolute",
    height: "10%",
    width: "6%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(224, 172, 51, 0.2)",
      cursor: "pointer",
    },
    marginLeft: "6%",
    marginTop: "42%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: 32,
  },
}));

export interface ImageProps {
  hash: string;
}

export const Image: React.FC<ImageProps> = ({ hash }) => {
  const classes = useStyles();

  React.useEffect(() => {});

  return (
    <div className={classes.imageContainer}>
      <img src={`http://localhost:8080/tmp/${hash}/${hash}-final.jpg`} style={{ width: "88%" }} />
      <button className={classes.status} />
      <button className={classes.skill} />
      <button className={classes.achiev} />
    </div>
  );
};
