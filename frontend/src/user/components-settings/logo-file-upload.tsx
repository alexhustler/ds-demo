import React, { useCallback, useMemo, useReducer } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, Divider, Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import { Loading } from "../../common/components/loading";
import {
  createBaseFileUploadSectionStyles,
  dropZoneActiveStyle,
  dropZoneAcceptStyle,
  dropZoneBaseStyle,
  dropZoneRejectStyle,
} from "../../theme/drop-zone";
import { StoreState } from "../../redux/configure-store";

// import { updateLogoImage } from "../user-actions";

const styles = (theme: Theme) =>
  createStyles({
    ...(createBaseFileUploadSectionStyles(theme) as any),
  });

const LogoFileUpload = (props: any) => {
  const { classes, user, isUpdatingLogoImage } = props;

  // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
  const [ignoredVariable, forceUpdate] = useReducer(x => x + 1, 0);

  const onDrop = useCallback(async files => {
    if (files.length === 1) {
      const file = files[0];
      // await props.updateLogoImage(file);
      forceUpdate(null);
    } else {
      console.log("Wrong type of file or multiple files selected");
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/jpg, image/png",
    maxSize: 20 * 1000000, // 20mb
    multiple: false,
  });

  const dropZoneStyle = useMemo(
    () => ({
      ...dropZoneBaseStyle,
      ...(isDragActive ? dropZoneActiveStyle : {}),
      ...(isDragAccept ? dropZoneAcceptStyle : {}),
      ...(isDragReject ? dropZoneRejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Logo</Typography>
        <Divider />
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          container
          justify="flex-start"
          alignItems="center"
        >
          <Button
            style={{ marginBottom: "16px" }}
            variant="outlined"
            color="secondary"
            disabled={isUpdatingLogoImage}
            onClick={async () => {
              // await props.updateLogoImage(null);
              forceUpdate(null);
            }}
          >
            Reset
          </Button>

          {user.logoImageUrl && <img width="50px" src={user.logoImageUrl} />}
        </Grid>

        {isUpdatingLogoImage ? (
          <Loading />
        ) : (
          <Grid item xs={12} md>
            <div
              {...getRootProps({
                style: dropZoneStyle,
              } as any)}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop your file here...</p>
              ) : (
                <span>
                  <p style={{ marginTop: "0px" }}>
                    Drag and drop your file here, or click to select a file
                  </p>
                  <em>Only .png and .jpg files are accepted</em>
                </span>
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (storeState: StoreState) => ({
  user: storeState.authentication.user,
  isUpdatingLogoImage: storeState.user.isUpdatingLogoImage,
});

export default connect(mapStateToProps, {})(withStyles(styles)(LogoFileUpload));
