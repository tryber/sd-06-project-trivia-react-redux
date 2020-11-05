import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Components/Header'

class Trivia extends React.Component {
  render() {
    const { userEmail, avatar, name, questions } = this.props;
    console.log(questions);

    return (
      <div className="trivia">
       <Header />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    avatar: state.user.avatar,
    name: state.user.name,
    questions: state.trivia.questions,
  };
}

export default connect(mapStateToProps, null)(Trivia);

Trivia.propTypes = {
  userEmail: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
