import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, QuestionCard, Loading } from '../components';
import { getQuestions } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const { token, dispatchQuestions } = this.props;
    await dispatchQuestions(token);
    this.updateState();
  }

  updateState() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? <Loading /> : <QuestionCard />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(getQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.array,
  dispatchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
