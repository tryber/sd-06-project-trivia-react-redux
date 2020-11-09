import { loadState } from '../../services/localStorage';
import { ADD_QUESTIONS, SCORE_RANKING } from '../actions';

const INITIAL_STATE = {
  arrayQuestion: [],
  ranking: loadState('ranking', []),
};

// A chave ranking deve conter a seguinte estrutura:
// [
//   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
// ]

// function tratarRanking(ranking, action) {
//   const rankingCopia = ranking.map((objScore) => ({ ...objScore }));
//   const actionRanking = action.payload.ranking;
//   const objASerAlterado = rankingCopia
//     .find((objScoreCopia) => objScoreCopia.name === actionRanking.name);

//   if (objASerAlterado) {
//     objASerAlterado.score += actionRanking.score;
//     return rankingCopia;
//   }

//   return rankingCopia.concat(action.payload.ranking);
// }

function questionsInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, arrayQuestion: [...action.payload.questionsResults] };
  // case SCORE_RANKING:
  //   return {
  //     ...state,
  //     ranking: tratarRanking(state.ranking, action),
  //   };
  default:
    return state;
  }
}

export default questionsInformation;
