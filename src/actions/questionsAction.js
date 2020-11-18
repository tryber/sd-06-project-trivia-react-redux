const ADD_QUESTIONS = 'ADD_QUESTIONS';

const questionsAction = (questions) => ({ type: ADD_QUESTIONS, questions });

export default questionsAction;
export { ADD_QUESTIONS };
