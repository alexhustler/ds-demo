import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  createStyles,
  Typography,
  TextField,
  IconButton,
  FormControl,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const styles: any = (theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
    notes: {
      display: "flex",
      flexDirection: "row",
    },
    noteText: {
      flexGrow: 1,
      fontSize: theme.typography.body2.fontSize,
    },
    textField: {
      fontSize: "14px",
    },
    editIcon: {
      color: "#cccccc",
      "&:hover": {
        color: "#757575",
      },
    },
    buttonIconRoot: {
      padding: "5px",
      backgroundColor: "transparent",
    },
    buttonActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: "8px",
    },
  });

const EditField = (props: any) => {
  const {
    classes,
    defaultValue,
    onSubmit,
    toolTipTitle,
    toolTipPlacement,
    rows,
    isUpdating,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const parseFormValues = (e: any) => {
    return [e.target[1].value];
  };

  return (
    <>
      {!isEditing && (
        <>
          <div className={classes.notes}>
            <Typography className={classes.noteText}>{defaultValue}</Typography>
            <Tooltip title={toolTipTitle} placement={toolTipPlacement}>
              <IconButton
                className={classes.buttonIconRoot}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                {isUpdating ? (
                  <CircularProgress color="secondary" size="1.5rem" />
                ) : (
                  <EditIcon className={classes.editIcon} fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}

      {isEditing && (
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit(...parseFormValues(e));
              setIsEditing(!isEditing);
            }}
          >
            <FormControl className={classes.form}>
              <TextField
                InputProps={{
                  classes: {
                    input: classes.textField,
                  },
                }}
                fullWidth
                multiline
                rows={rows}
                defaultValue={defaultValue}
                variant="outlined"
              />
              <div className={classes.buttonActions}>
                <IconButton
                  type="submit"
                  className={classes.buttonIconRoot}
                  color="secondary"
                >
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className={classes.buttonIconRoot}
                >
                  <CancelIcon color="error" fontSize="small" />
                </IconButton>
              </div>
            </FormControl>
          </form>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(EditField);
