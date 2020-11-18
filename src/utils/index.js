// Array manipulation:

export function insertIndexIntoAnswers(array) {
  const arrayWithIndexes = [];

  array.forEach((item, index) => {
    const newItem = { answer: item, index };
    arrayWithIndexes.push(newItem);
  });

  return arrayWithIndexes;
}

export function randomizeAnswers(correctAnswer, wrongAnswers) {
  const withIndex = insertIndexIntoAnswers(wrongAnswers);

  const RANDOM_ANSWERS = [{ correctAnswer, isCorrect: true }, ...withIndex];

  for (let i = RANDOM_ANSWERS.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = RANDOM_ANSWERS[i];
    RANDOM_ANSWERS[i] = RANDOM_ANSWERS[j];
    RANDOM_ANSWERS[j] = temp;
  }

  return RANDOM_ANSWERS;
}

// Local Storage management

export function createLocalStore(
  name = 'nome',
  score,
  gravatarEmail = 'nome@nome.com',
  assertions = 0,
) {
  const createdObject = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail,
    },
  };
  const stringfiedObject = JSON.stringify(createdObject);
  localStorage.setItem('state', stringfiedObject);
}

// Score

export function calculateScore(timer, questionDifficulty) {
  const baseScore = 10;
  const multiplierPerDifficulty = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const questionMultiplier = multiplierPerDifficulty[questionDifficulty];
  const questionScore = baseScore + (timer * questionMultiplier);

  return questionScore;
}

// Ranking
export function saveRankingLocalStorage(name, score = 0, gravatarEmail) {
  let currentRanking = JSON.parse(localStorage.getItem('ranking'));
  const newPlayer = {
    name,
    score,
    gravatarEmail,
  };

  currentRanking = [...currentRanking, newPlayer];
  const strigifyRanking = JSON.stringify(currentRanking);
  localStorage.setItem('ranking', strigifyRanking);
}
