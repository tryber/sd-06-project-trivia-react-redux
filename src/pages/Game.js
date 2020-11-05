import React from 'react';
import { connect } from 'react-redux';
import GameHeader from '../components/GameHeader';
import { fetchQuestionsAPI, TOKEN_REQUEST } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
  }

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
