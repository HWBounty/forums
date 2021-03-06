// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Bounty from "../../components/bounty/Bounty";
import BountyFilter from "../../components/layout/BountyFilter";
import BountySkeleton from "../../util/BountySkeleton";
//import Profile from "../components/profile/Profile";

// MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../util/theme";

// Redux
import { connect } from "react-redux";
import { getBounties } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

const styles = {
  ...theme.spreadIt,
};

function getQueryVariable(variable, querystring) {
  var query = querystring.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export class forumshome extends Component {
  state = {
    bounties: null,
  };

  componentDidMount() {
    console.log(getQueryVariable("t", this.props.location.search));
    this.props.getBounties(
      getQueryVariable("t", this.props.location.search)
        ? getQueryVariable("t", this.props.location.search) + "?0?time"
        : "all?0?time"
    );
  }

  render() {
    const { bounties, loading } = this.props.data;
    const { classes } = this.props;
    let recentBountiesMarkup = !loading ? (
      bounties.map((bounty) => <Bounty key={bounty.bountyID} bounty={bounty} />)
    ) : (
      <BountySkeleton />
    );
    return (
      <div className={classes.rootPadding}>
        <Grid container spacing={7}>
          <Grid item sm={12} xs={12}>
            <BountyFilter />
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentBountiesMarkup}
          </Grid>

          {/*<Grid item sm={4} xs={12}>
            <Profile />
    </Grid>*/}
        </Grid>
      </div>
    );
  }
}

forumshome.propTypes = {
  getBounties: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getBounties })(
  withStyles(styles)(forumshome)
);
