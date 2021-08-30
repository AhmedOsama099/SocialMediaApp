import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import EditDetails from "./EditDetails";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ButtonTemp from "../../Util/ButtonTemp";
import ProfileSkeleton from "../../Util/ProfileSkeleton";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import theme from "../../Util/theme";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = () => ({
  ...theme,
});

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      errors: "",
      open: false,
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.UI.errors &&
      nextProps.UI.errors === "Profile picture must be in jpg or png extension"
    ) {
      console.log("here");
      console.log(nextProps);
      this.setState({ errors: nextProps.UI.errors });
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    const { errors, open } = this.state;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={`https://localhost:44392${imageUrl}`}
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                name="image"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={this.handleClose}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={this.handleClose}
                  severity="error"
                >
                  {errors}
                </MuiAlert>
              </Snackbar>

              <ButtonTemp
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </ButtonTemp>
            </div>
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                </Fragment>
              )}
              <hr />
              {website && (
                <Fragment>
                  <LinkIcon color="primary" align="center" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                </Fragment>
              )}
              <hr />
              <CalendarToday color="primary" />
              {""} <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <ButtonTemp
              tip="Logout"
              onClick={this.handleLogout}
              btnClassName="button"
            >
              <KeyboardReturn color="primary" />
            </ButtonTemp>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            {" "}
            No profile Found Please Loging again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              login
            </Button>

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
