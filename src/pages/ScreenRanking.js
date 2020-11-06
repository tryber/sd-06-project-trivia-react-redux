import React from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js/md5';

function ScreenRanking() {
  const ranking = JSON.parse(localStorage.getItem('RANKING')).sort((a, b
	) => b.score - a.score);
		
  return(
    <div className="main-content">
		{ranking.map((item, index) => { 
		const hash = MD5(item.picture).toString();
		return (
		<div>
			<span data-test={`player-name-${ index }`}>{ item.name }</span>
  <span data-test={`player-name-${ index }`}>{ item.score }</span>
  <img src={`https://www.gravatar.com/avatar/${hash}`} alt="image" />
    </div>);
      })}
      <div>
      <Link to="/">
        <button data-testid="btn-go-home">VOLTAR AO INÍCIO</button>
      </Link>
      </div>
    </div>);
}

export default ScreenRanking;
