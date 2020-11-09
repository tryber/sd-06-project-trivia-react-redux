export async function getAccessToken() {
  const tokenUrl = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(tokenUrl);
  const { token } = await response.json();

  return token;
}

export async function getTriviaQuestion(token, config) {
  const baseTriviaUrl = `https://opentdb.com/api.php?token=${token}`;

  const configUrl = Object.keys(config).reduce((baseString, currentConfig) => {
    if (!config[currentConfig]) {
      return baseString;
    }

    const pattern = `&${currentConfig}=${config[currentConfig]}`;

    return baseString + pattern;
  }, baseTriviaUrl);

  const response = await fetch(configUrl);
  const { results } = await response.json();

  return results;
}
