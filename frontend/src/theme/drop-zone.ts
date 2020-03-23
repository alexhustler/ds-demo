import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const createBaseFileUploadSectionStyles = (theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    maxHeight: "700px",
    overflowY: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  root: {
    width: "100%",
    overflowX: "auto",
  },
  formControl: {
    marginTop: "20px",
  },
  title: {
    marginTop: theme.spacing(3),
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },
  fileUploadSectionTitle: {
    marginTop: theme.spacing(),
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export const dropZoneBaseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#000",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  textAlign: "center",
};

export const dropZoneActiveStyle = {
  borderColor: "#2196f3",
};

export const dropZoneAcceptStyle = {
  borderColor: "#00e676",
};

export const dropZoneRejectStyle = {
  borderColor: "#ff1744",
};
