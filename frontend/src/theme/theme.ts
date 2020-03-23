import { createMuiTheme } from "@material-ui/core/styles";

const primary = {
  light: "#636363",
  main: "#393939",
  dark: "#131313",
  contrastText: "#00d88e",
};
const secondary = {
  light: "#62ffbf",
  main: "#00d88e",
  dark: "#00a560",
  contrastText: "#ffffff",
};

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&$hover:hover": {
          backgroundColor: secondary.main,
        },
      },
    },
    MuiListItem: {
      root: {
        "&$selected, &$selected:hover": {
          backgroundColor: secondary.main,
        },
      },
      button: {
        "&:hover": {
          backgroundColor: secondary.light,
        },
      },
    },
  },
  palette: {
    primary,
    secondary,
  },
  //https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: {},
});

export default theme;
