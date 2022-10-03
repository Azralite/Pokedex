import { Fragment, useState } from 'react';
import pokeball from './pokedex.png';
import './App.css';

function App() {
  const [card, setCard] = useState();
  const [fieldValue, setFieldValue] = useState(
    localStorage.getItem('pokemon') || ''
  );

  let recherchePokemon = async () => {
    let pokemon = fieldValue.toLowerCase().replace(' ', '-');
    if (pokemon === '') {
      setCard(undefined);
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((info) => info.json())
        .then((data) => parseData(data));
    }
  };

  let parseData = (data) => {
    const { id, name, types, stats, sprites } = data;
    setCard({ id, name, types, stats, sprites });
  };

  let handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      recherchePokemon();
    }
  };

  let handleChange = (event) => {
    setFieldValue(event.target.value);
    localStorage.setItem('pokemon', event.target.value);
  };

  let choosRandomPokemon = async () => {
    setFieldValue('');
    let i = Math.floor(Math.random() * 904) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((info) => info.json())
      .then((data) => parseData(data));
  };

  return (
    <div className="App">
      <h1>POKEDEX</h1>
      <div className="selection">
        <input
          className="textArea"
          type="text"
          placeholder="Search pokemon"
          value={fieldValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={recherchePokemon}>Choose</button>
        <h2 style={{ margin: 0 }}>OR</h2>
        <button onClick={choosRandomPokemon}>Random</button>
      </div>
      <div className={card ? 'card' : 'cardEmpty'}>
        {card ? (
          <Fragment>
            <img
              src={card.sprites.front_default}
              alt="img of the pokemon"
            ></img>
            <h2>{card.name.toUpperCase()}</h2>
            <div className={`type ${card.types[0].type.name}`}>
              TYPE : {card.types[0].type.name.toUpperCase()}
            </div>
            <div className="number">N°{card.id}</div>
            <div className="stat">
              <h3>HP</h3>
              <p className="statPoint">{card.stats[0].base_stat}</p>
              <h3>ATTACK</h3>
              <p className="statPoint">{card.stats[1].base_stat}</p>
              <h3>DEF</h3>
              <p className="statPoint">{card.stats[2].base_stat}</p>
              <h3>SPECIAL ATTACK</h3>
              <p className="statPoint">{card.stats[3].base_stat}</p>
              <h3>SPECIAL DEF</h3>
              <p className="statPoint">{card.stats[4].base_stat}</p>
              <h3>SPEED</h3>
              <p className="statPoint">{card.stats[5].base_stat}</p>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <img className="pokeball" alt="pokeball" src={pokeball}></img>
            <h2>SEARCH POKEMON</h2>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
