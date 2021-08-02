import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/monkey.png";
import { Link } from "react-router-dom";
import theme from "../Util/theme";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = () => ({ ...theme });

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			handle: "",
			errors: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			console.log("here");
			console.log(nextProps);
			this.setState({ errors: nextProps.UI.errors });
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const signupUserData = new URLSearchParams();
		signupUserData.set("Email", `${this.state.email}`);
		signupUserData.set("Password", `${this.state.password}`);
		signupUserData.set("confirmPassword", `${this.state.confirmPassword}`);
		signupUserData.set("UserHandle", `${this.state.handle}`);

		const loginUserData = new URLSearchParams();
		loginUserData.set("UserName", `${this.state.email}`);
		loginUserData.set("Password", `${this.state.password}`);
		loginUserData.set(`grant_type`, "password");

		let signupBody = signupUserData.toString();
		let loginBody = loginUserData.toString();

		this.props.signupUser(signupBody, loginBody, this.props.history);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		console.log(errors);

		var email = "model.Email";
		var password = "model.Password";
		var userhandle = "model.UserHandle";
		var Confirmpassword = "model.ConfirmPassword";

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="monkey" className={classes.image} />
					<Typography variant="h2" className={classes.pageTitle}>
						Signup
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors[email] !== null ? errors[email] : ""}
							error={errors[email] != null ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors[password] !== null ? errors[password] : ""}
							error={errors[password] != null ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							className={classes.textField}
							helperText={
								errors.error === "EmptyFileds" ||
								errors.error === "confirmPassword"
									? errors.error_description
									: ""
							}
							error={
								errors.error === "EmptyFileds" ||
								errors.error === "confirmPassword"
									? true
									: false
							}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="handle"
							name="handle"
							type="handle"
							label="handle"
							className={classes.textField}
							helperText={errors[userhandle] !== null ? errors[userhandle] : ""}
							error={errors[userhandle] != null ? true : false}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors[Confirmpassword] ==
						"The password and confirmation password do not match." ? (
							<Typography variant="body2" className={classes.CustomError}>
								{errors[Confirmpassword]}
								{console.log(errors[Confirmpassword])}
							</Typography>
						) : (
							""
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							signup
							{loading && (
								<CircularProgress size={25} className={classes.progress} />
							)}
						</Button>
						<br />
						<small>
							Already have an accout? login <Link to="/login">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

const mapActionsToProps = {
	signupUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(signup));
