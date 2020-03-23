import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { StoreState } from "../../redux/configure-store";
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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  appEmailUsername: string;
  isAdmin: boolean;
  appPhoneNumber: string;
  companyName: string;
  license: string;
}

function UsersTable(props: any) {
  const { classes, navigateToAdminUsersViewPage, users } = props;
  const columnNames = ["User", "Full Name", "Login/ Email Address", "Admin"];

  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Users
      </Typography>
      <div className={classes.tableContainer}>
        <Paper elevation={2} className={classes.root}>
          <Table className={classes.table}>
            <ListHeader columnNames={columnNames} />
            <TableBody>
              {((users || []) as User[]).map(user => {
                return (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    key={user.id}
                    onClick={() => navigateToAdminUsersViewPage(user.id)}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.emailAddress}</TableCell>
                    <TableCell>{user.isAdmin ? "true" : "false"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = (storeState: StoreState) => ({
  users: storeState.admin.users,
});

export default connect(mapStateToProps, {})(withStyles(styles)(UsersTable));
