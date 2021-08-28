import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import ScreamSkeleton from "../Util/ScreamSkeleton";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    let recentScreamMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.ScreamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Grid container spacing={10}>
        <Grid item lg={8} sm={12} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item lg={4} sm={12} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
