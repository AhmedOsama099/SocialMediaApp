import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonTemp from "../../Util/ButtonTemp";
import LikeButton from "./LikeButton";
import CommentsComponent from "../scream/Comments";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

//MUI stuff

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//redux
//redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import theme from "../../Util/theme";

const styles = () => ({
	...theme,
	invisibleSeparator: {
		border: "none",
		margin: 4,
	},
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover",
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		left: "90%",
	},
	expanButton: {
		position: "absolute",
		left: "90%",
	},
	spinnerDiv: {
		textAlign: "center",
		margin: "50px 0",
	},
});

class ScreamDialog extends Component {
	state = {
		open: false,
	};

	handleOpen = async () => {
		await this.props.getScream(this.props.ScreamId);
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			classes,
			scream: {
				ScreamId,
				Body,
				CreatedAt,
				LikeCount,
				CommentCount,
				ImagePath,
				UserHandle,
				Comments,
			},
			UI: { loading },
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={5}>
					<img
						src={`https://localhost:44392${ImagePath}`}
						alt="Profile"
						className={classes.profileImage}
					/>
				</Grid>
				<Grid item sm={7}>
					<Typography
						component={Link}
						color="primary"
						variant="h5"
						to={`/users/${UserHandle}`}
					>
						@{UserHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body2" color="textSecondary">
						{dayjs(CreatedAt).format("h:m a, MMM DD YYYY")}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">{Body}</Typography>
					<LikeButton screamId={ScreamId} />
					<span>{LikeCount} likes</span>
					<ButtonTemp tip="comments">
						<ChatIcon color="primary" />
					</ButtonTemp>
					<span>{CommentCount} comments</span>
				</Grid>

				<hr className={classes.visibleSeparator} />
				<CommentForm screamId={ScreamId} />
				<CommentsComponent Comments={Comments} />
			</Grid>
		);

		return (
			<Fragment>
				<ButtonTemp
					onClick={this.handleOpen}
					tip="Expand scream"
					tipClassName={classes.expanButton}
				>
					<UnfoldMore color="primary" />
				</ButtonTemp>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<ButtonTemp
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</ButtonTemp>
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	ScreamId: PropTypes.string.isRequired,
	UserHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	scream: state.data.scream,
	UI: state.UI,
});

const mapActionsToProps = {
	getScream,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog));
