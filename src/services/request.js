// import MD5 from 'crypto-js/hmac-md5';

const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
const five = 5; // mudar para 5 de novo

export async function apiQuestions(token, numberQuestions = five) {
  const requestApiQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
  const requestJsonQuestions = await requestApiQuestions.json();

  console.log('requestApiQuestions', requestApiQuestions);
  return requestJsonQuestions;
}

export async function apiToken() {
  const requestApiToken = await fetch(TOKEN_API);
  const requestJsonToken = await requestApiToken.json();

  const { token } = requestJsonToken;
  const questions = await apiQuestions(token);
  console.log('questions', questions);

  return { token, questions };
}

// export async function apiGravatar(email) {
//   // console.log('MD5', typeof MD5);

//   const hash = CryptoJS.MD5(email);
//   console.log('hash', hash);
//   // const requestApiGravatar = await fetch(`https://www.gravatar.com/avatar/${md5(email)`);
//   // const requestJsonGravatar = await requestApiGravatar.json();

//   return hash;
// }

// 1- Cadastra um email no gravatar e bota sua imagem bonitinha.
// 2- Na aplicação, gera um hash a partir desse email com o md5, to CryptoJS, como tá no README
// 3- Junta a hash com a url do gravatar pra ter a imagem que vc salvou lá.

// A Implementação é feita baseada no e-mail. Esse email deve ser transformado em uma hash MD5 (https://br.gravatar.com/site/implement/hash/). Para gerar tal hash, recomendamos utilizar o CryptoJs.

// Por exemplo:

// Garantida a instalação do CryptoJS no projeto, importe o MD5: import md5 from 'crypto-js/md5';

// Converta o email do usuário: md5(emailDoUsuário)

// Após a geração da hash, basta adicionar o valor gerado no final da URL

// // Formato de URL necessário:
// https://www.gravatar.com/avatar/${hash-gerada}

// // Exemplo de URL com hash de uma pessoa
// https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50

// // Exemplo de imagem exibida com a URL
// <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
