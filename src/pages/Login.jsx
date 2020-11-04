import React from 'react';
import { userLogin } from '../actions';
import { connect } from 'react-redux';
class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     email: '',
  //     disabled: true,
  //   }
  // }

  render() {
    return (
      <section>
        <h1>Login - Play Trivia</h1> 
        <form>
          <label htmlFor="input-player-name"> Name
            <input 
              data-testid="input-player-name"
              id ="input-player-name"
              type="text"
            />
          </label>
          <label htmlFor="input-gravatar-name"> E-Mail
            <input
              data-testid="input-gravatar-name"
              id="input-gravatar-name"
              type="text"
            />
          </label>
          <button data-testid="btn-play" >
            Jogar
          </button>
        </form>
      </section>
    );
  };
}

// mapStateToProps, mapDispatchToProps
export default connect(
  null,
  null)(Login);
