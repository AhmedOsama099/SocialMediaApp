import React, { Component } from "react";
import ButtonTemp from "../../Util/ButtonTemp";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.screamId
			)
		)
			return true;
		else return false;
	};

	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	};

	unlikeScream = () => {
		this.props.unLikeScream(this.props.screamId);
	};

	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to="/login">
				<ButtonTemp tip="Like">
					<FavoriteBorder color="primary"></FavoriteBorder>
				</ButtonTemp>
			</Link>
		) : this.likedScream() ? (
			<ButtonTemp tip="Undo like" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</ButtonTemp>
		) : (
			<ButtonTemp tip="Like" onClick={this.likeScream}>
				<FavoriteBorder color="primary" />
			</ButtonTemp>
		);

		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.object.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likeScream,
	unLikeScream,
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
