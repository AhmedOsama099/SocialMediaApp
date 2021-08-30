import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import ButtonTemp from "../../Util/ButtonTemp";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "../scream/ScreamDialog";
import LikeButton from "../scream/LikeButton";
//redux
import { connect } from "react-redux";

// Mui imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        Body,
        CreatedAt,
        ImagePath,
        UserHandle,
        ScreamId,
        LikeCount,
        CommentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && UserHandle === handle ? (
        <DeleteScream screamId={ScreamId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={`https://localhost:44392${ImagePath}`}
          title="Profile Image"
          className={classes.image}
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${UserHandle}`}
          >
            {UserHandle}{" "}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(CreatedAt).fromNow()}
          </Typography>
          <Typography variant="body1">{Body}</Typography>
          <LikeButton screamId={ScreamId} />
          <span>{LikeCount} likes</span>
          <ButtonTemp tip="comments">
            <ChatIcon color="primary" />
          </ButtonTemp>
          <span>{CommentCount} comments</span>
          <ScreamDialog ScreamId={ScreamId} UserHandle={UserHandle} />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
