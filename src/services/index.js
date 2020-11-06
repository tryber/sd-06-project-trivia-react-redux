export const reqToken = async () => {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await api.json();
  return data;
};

export const reqQuestions = async (token) => {
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await api.json();
  return data;
};

// export const fetchAPIQuestions = async () => {
//     const token = localStorage.getItem('token').token;
//     const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const responseQuestions = await apiQuestions.json();
//     if (responseQuestions.response_code === 3) {
//       const { history } = this.props;
//       localStorage.removeItem('token');
//       window.alert('Tempo expirado - Faça login novamente');
//       history.push('/');
//     } else {
//       this.setState({ questions: responseQuestions.results });
//     }
//   }
