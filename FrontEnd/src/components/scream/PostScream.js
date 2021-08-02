import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonTemp from "../../Util/ButtonTemp";

//redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import store from "../../redux/store";
import { SET_ERRORS } from "../../redux/types";

//MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import theme from "../../Util/theme";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
	...theme,
	submitButton: {
		position: "relative",
		float: "right",
		margin: "10px 0",
	},
	progressSpinner: {
		position: "absolute",
	},
	closeButton: {
		position: "absolute",
		left: "91%",
		top: "4%",
	},
});

export class PostScream extends Component {
	state = {
		open: false,
		Body: "",
		errors: {},
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({ open: false, errors: {} });
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.Body !== "") {
			this.props.postScream({ Body: this.state.Body });
		} else {
			console.log("enter here");
			store.dispatch({
				type: SET_ERRORS,
				payload: { Body: "Body mustn't be empty" },
			});
		}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			});
		} else if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({
				Body: "",
				open: false,
				error: {},
			});
		}
	}

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading },
		} = this.props;

		return (
			<Fragment>
				<ButtonTemp onClick={this.handleOpen} tip="Post a scream">
					<AddIcon />
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
					<DialogTitle>Post a new scream</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="Body"
								type="text"
								label="SCREAM!!"
								multiline
								rows="3"
								placeholder="Scream at your fellow apes"
								helperText={errors.Body}
								error={errors.Body ? true : false}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
	withStyles(styles)(PostScream)
);
