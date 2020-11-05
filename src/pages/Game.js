import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import { fetchQuestionsAPI } from '../redux/actions';

class Game extends React.Component {
  componentDidUpdate() {
    const { fetchQuestions, tokenResponse } = this.props;
    if (tokenResponse) {
      fetchQuestions(tokenResponse.token);
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        { loading ? <h2>Loading...</h2> : <GameHeader /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (endpoint) => dispatch(fetchQuestionsAPI(endpoint)),
});

const mapStateToProps = (state) => ({
  tokenResponse: state.user.tokenResponse,
  loading: state.user.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  tokenResponse: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};
