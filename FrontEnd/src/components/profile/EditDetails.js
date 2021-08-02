import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import theme from "../../Util/theme";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = () => ({
	...theme,
	button: {
		float: "right",
	},
});

class EditDetails extends Component {
	state = {
		bio: "",
		website: "",
		location: "",
		open: false,
	};

	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : "",
		});
	};
	handleOpen = () => {
		this.setState({ open: true });
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	handleChange = (event) => {
		console.log(event.target.value);
		console.log(event.target.name);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Tooltip title="Edit User" placement="top">
					<IconButton onClick={this.handleOpen} className={classes.button}>
						<EditIcon color="primary" />
					</IconButton>
				</Tooltip>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<TextField
							name="bio"
							type="text"
							label="Bio"
							multiline
							rows="3"
							placeholder="A short bio about your self"
							className={classes.textField}
							value={this.state.bio}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="Website"
							placeholder="Your personal/professional website"
							className={classes.textField}
							value={this.state.website}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="Location"
							placeholder="Where you live"
							className={classes.textField}
							value={this.state.location}
							onChange={this.handleChange}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	credentials: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	credentials: state.user.credentials,
});

const mapActionsToProps = {
	editUserDetails,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(EditDetails));
