import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonTemp from "../../Util/ButtonTemp";

//MUI stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import theme from "../../Util/theme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//redux stuff
import { connect } from "react-redux";
import { submitComment, getScream } from "../../redux/actions/dataActions";

const styles = () => ({
  ...theme,
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
    submit: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    } else if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.body !== "") {
      await this.props.submitComment(
        { Body: this.state.body.toString() },
        this.props.screamId
      );
      this.setState({ submit: true });
    } else {
      this.setState({ errors: { Comment: "Field can't be empty" } });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ submit: false });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkUp = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on a scream"
            error={errors.Comment ? true : false}
            helperText={errors.Comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />

        <Snackbar
          open={this.state.submit}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            {"Comment Submitted"}
          </MuiAlert>
        </Snackbar>
      </Grid>
    ) : null;

    return commentFormMarkUp;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment, getScream })(
  withStyles(styles)(CommentForm)
);
