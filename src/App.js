import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Settings, Feedback, Ranking, Game, Login, NotFound } from './pages';
import { recoverPlayerRankingAction, updateAuthenticationAction,
  playerLoginAction } from './actions';

class App extends React.Component {
  constructor() {
    super();
    this.saveRanking = this.saveRanking.bind(this);
  }

  componentDidMount() {
    const { recoverPlayerRanking, updateAuthentication, login } = this.props;
    const storageRanking = localStorage.getItem('ranking');
    const storageAuthentication = localStorage.getItem('authentified');
    let storagePlayer = localStorage.getItem('state');
    storagePlayer = (storagePlayer !== null) && JSON.parse(storagePlayer).player;
    if (storageRanking !== null && JSON.parse(storageRanking) !== []) {
      recoverPlayerRanking(JSON.parse(storageRanking));
    }
    if (storageAuthentication !== null) {
      updateAuthentication(storageAuthentication);
    }
    if (storagePlayer !== null) {
      login(storagePlayer);
    }
  }

  componentDidUpdate() {
    this.saveRanking();
  }

  componentWillUnmount() {
    this.saveRanking();
  }

  saveRanking() {
    const { ranking } = this.props;
    localStorage.setItem('ranking', JSON.stringify(ranking));
    return true;
  }

  render() {
    return (
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  recoverPlayerRanking: (e) => dispatch(recoverPlayerRankingAction(e)),
  updateAuthentication: (e) => dispatch(updateAuthenticationAction(e)),
  login: (e) => dispatch(playerLoginAction(e)),
});

App.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.shape).isRequired,
  recoverPlayerRanking: PropTypes.func.isRequired,
  updateAuthentication: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
