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

// Redux stuf
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = () => ({ ...theme });

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			console.log("here");
			console.log(nextProps);
			this.setState({ errors: nextProps.UI.errors });
		} else if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: "" });
			this.handleClose();
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const userDataObject = new URLSearchParams();
		userDataObject.set("UserName", `${this.state.email}`);
		userDataObject.set("Password", `${this.state.password}`);
		userDataObject.set(`grant_type`, "password");

		let userData = userDataObject.toString();

		this.props.loginUser(userData, this.props.history);
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
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={AppIcon} alt="monkey" className={classes.image} />
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={
								errors.error === "EmptyFileds" || errors.error === "Username"
									? errors.error_description
									: ""
							}
							error={
								errors.error === "EmptyFileds" || errors.error === "Username"
									? true
									: false
							}
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
							helperText={
								errors.error === "EmptyFileds" || errors.error === "Password"
									? errors.error_description
									: ""
							}
							error={
								errors.error === "EmptyFileds" || errors.error === "Password"
									? true
									: false
							}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.error === "invalid_grant" ? (
							<Typography variant="body2" className={classes.CustomError}>
								{errors.error_description}
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
							Login
							{loading && (
								<CircularProgress size={25} className={classes.progress} />
							)}
						</Button>
						<br />
						<small>
							Don't have an accout? sign up <Link to="/signup">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

login.propTypes = {
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
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(login));
