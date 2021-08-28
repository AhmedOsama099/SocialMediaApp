import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import ScreamSkeleton from "../Util/ScreamSkeleton";
import ProfileSkeleton from "../Util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class user extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    // console.log(handle);
    this.props.getUserData(handle);
    axios
      .get(`https://localhost:44392/api/Screams/GetUserProfile/`, {
        params: { handle: handle },
      })
      .then((res) => this.setState({ profile: res.data.user }))
      .catch((err) => console.log(err));
  }

  render() {
    const { screams, loading } = this.props.data;

    const screamMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>This user has no screams!!</p>
    ) : (
      screams?.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    );

    return (
      <Grid container spacing={10}>
        <Grid item lg={8} sm={12} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item lg={4} sm={12} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
