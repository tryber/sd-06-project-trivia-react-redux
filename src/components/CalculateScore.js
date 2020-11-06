import React from "react";



const calculateScore = (timer, difficulty) => {
  const { scorePlayer } = this.props;
  const onePoint = 1;
  const twoPoints = 2;
  const threePoints = 3;
  const tenPoints = 10;
  const localstorageScore = JSON.parse(localStorage.getItem('state'));
  switch (difficulty) {
  case 'easy':
    initialScore += localstorageScore.player.score + tenPoints + (timer * onePoint);
    break;
  case 'medium':
    initialScore += localstorageScore.player.score + tenPoints + (timer * twoPoints);
    break;
  case 'hard':
    initialScore += localstorageScore.player.score + tenPoints + (timer * threePoints);
    break;
  default:
    break;
  }
};

export default calculateScore;
