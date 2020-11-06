import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsAPI } from '../redux/actions';
import GameHeader from '../components/GameHeader';
import Timer from '../components/TimerBar';


class Game extends React.Component {
  constructor() {
    super();

    this.handlePage = this.handlePage.bind(this);
  }
  componentDidUpdate() {
    const { fetchQuestions, tokenResponse } = this.props;
    if (tokenResponse) {
      fetchQuestions(tokenResponse.token);
    }
  }

  handlePage() {
    const { loading } = this.props;
    if (loading) {
      return <h2>Loading...</h2> 
    } else {
      return (
        <div>
        <GameHeader />
        <Timer />
      </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this.handlePage() }
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
