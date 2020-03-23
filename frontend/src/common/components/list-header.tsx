import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Theme, createStyles, withStyles } from "@material-ui/core";
import { colors } from "../../theme/colors";
import { isIE } from "../utils";
// import classes from "*.module.css";

const styles = (theme: Theme) =>
  createStyles({
    tableHeader: {
      backgroundColor: colors.gray,
      zIndex: 999,
      position: "sticky",
      top: 0,
      textAlign: "left",
      color: colors.black,
    },
    tableHeaderIE: {
      backgroundColor: colors.gray,
      textAlign: "left",
      color: colors.black,
    },
  });

interface ListHeaderProps {
  columnNames: string[];
  classes: any;
}

const ListHeader = (props: ListHeaderProps) => {
  const { classes, columnNames } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell
          className={isIE() ? classes.tableHeaderIE : classes.tableHeader}
        >
          {columnNames[0]}
        </TableCell>
        {columnNames.slice(1).map(columnName => {
          return (
            <TableCell
              key={columnName}
              className={isIE() ? classes.tableHeaderIE : classes.tableHeader}
            >
              {columnName}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(ListHeader);
