const ADD_TIMER = 'ADD_TIMER';
const ADD_STOP = 'ADD_STOP';

const addTimerAction = (seconds) => ({ type: ADD_TIMER, seconds });
const addStopAction = (stop) => ({ type: ADD_STOP, stop });

export { addTimerAction, addStopAction, ADD_TIMER, ADD_STOP };
