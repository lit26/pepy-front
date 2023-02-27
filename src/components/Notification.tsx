import React from "react";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/lab/Alert";
import { AlertColor, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface NotificationProps {
  severity: AlertColor;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ severity, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};

export default Notification;
