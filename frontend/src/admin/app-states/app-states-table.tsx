import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import ListHeader from "../../common/components/list-header";

const styles: any = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
    marginBottom: "40px",
  },
  tableContainer: {
    height: 320,
  },
};

function AppStatesTable(props: any) {
  const { classes, appStates, setAppStateWorkerProcessLock } = props;
  const columnNames = ["id", "Key", "Value", "Updated at", "Created at"];
  let isWorkerProcessLocked: boolean = false;
  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        App States
      </Typography>
      <div className={classes.tableContainer}>
        <Paper elevation={2} className={classes.root}>
          <Table className={classes.table}>
            <ListHeader columnNames={columnNames} />
            <TableBody>
              {((appStates || []) as any[]).map(appState => {
                if (appState.key === "worker-process-lock") {
                  isWorkerProcessLocked = appState.value;
                }
                return (
                  <TableRow key={appState.id}>
                    <TableCell component="th" scope="row">
                      {appState.id}
                    </TableCell>
                    <TableCell>{appState.key}</TableCell>
                    <TableCell>{appState.value.toString()}</TableCell>
                    <TableCell>{appState.updatedAt}</TableCell>
                    <TableCell>{appState.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setAppStateWorkerProcessLock(!isWorkerProcessLocked)}
            style={{ margin: "15px", width: "auto" }}
          >
            Toggle Worker Process Lock
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(AppStatesTable);
