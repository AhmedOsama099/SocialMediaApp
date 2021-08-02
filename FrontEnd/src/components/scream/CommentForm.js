import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonTemp from "../../Util/ButtonTemp";

//MUI stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import theme from "../../Util/theme";

//redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
import { render } from "@testing-library/react";

const styles = () => ({
	...theme,
});

class CommentForm extends Component {
	state = {
		body: "",
		errors: {},
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

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.state.body !== "") {
			this.props.submitComment(
				{ Body: this.state.body.toString() },
				this.props.screamId
			);
		} else {
			this.setState({ errors: { Comment: "Field can't be empty" } });
		}
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
			</Grid>
		) : null;
		return commentFormMarkUp;
	}
}

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
	withStyles(styles)(CommentForm)
);
