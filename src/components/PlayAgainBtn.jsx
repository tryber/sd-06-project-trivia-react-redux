import React from 'react';
import { Link } from 'react-router-dom';

const PlayAgainBtn = () => {
  return (
    <Link to="/" className="btn btn-warning" data-testid="btn-play-again">
    Play again!
    </Link>
  )
}

export default PlayAgainBtn;
