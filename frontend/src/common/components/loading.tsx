import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = (props: any) => {
  return (
    <CircularProgress
      color="secondary"
      size="2rem"
      style={{ padding: "5px" }}
    />
  );
};
