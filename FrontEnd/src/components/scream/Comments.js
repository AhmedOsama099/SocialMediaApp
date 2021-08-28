import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import theme from "../../Util/theme";

const styles = () => ({
  ...theme,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { Comments, classes } = this.props;
    return (
      <Grid container>
        {Comments.map((comment, index) => {
          const { Body, CraetedAt, ImagePath, UserHandle } = comment;
          return (
            <Fragment key={CraetedAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={`https://localhost:44392${ImagePath}`}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${UserHandle}`}
                        color="primary"
                      >
                        {UserHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(CraetedAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{Body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== Comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  Comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
