import Bullet from './Components/Bullet'
import Heart from './Components/Heart'
import React from 'react';
import { clsx } from 'clsx';
import { getFarewellText, getWord } from './utils'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from "framer-motion";
export default function App() {

  // state values
  const [guessed, setGuessed] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState("love");
  const [names, setNames] = React.useState({ self: "", comrade: "" });
  const [showGame, setShowGame] = React.useState(false);

  // derived values
  const wrongGuessCount = guessed.filter(letter => !currentWord.includes(letter)).length;
  const wonGame = Array.from(currentWord).every(letter => guessed.includes(letter));
  const lostGame = (wrongGuessCount >= names.comrade.length);
  const isGameOver = lostGame || wonGame;

  // variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const lastGuessLetter = guessed[guessed.length - 1];
  const lastGuessRight = currentWord.includes(lastGuessLetter);

  {/* names */ }
  function updateNames(e) {
    const { value, name } = e.target;
    setNames(prev => ({ ...prev, [name]: value.toUpperCase() }));
  }
  // name blocks
  const self = Array.from(names.self).map(letter =>
    <span
      className='name-chip'
      style={{
        backgroundColor: "#3A658D",
        borderColor: "#00AAFF",
      }}
      key={nanoid()}
    >
      {letter.toUpperCase()}
    </span>
  )
  const comrade = Array.from(names.comrade).map((letter, idx) =>
    <motion.span
      className='name-chip'
      style={{
        backgroundColor: "#9D35A3",
        borderColor: "#F765FF"
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={wrongGuessCount > idx
        ? { opacity: 0, scale: 0 }
        : { opacity: 1, scale: 1 }
      }
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      key={nanoid()}
    >
      {letter.toUpperCase()}
    </motion.span>
  )

  // flames calc
  function flamesCalc() {
    const flames = ['friendship', 'love', 'affection', 'marriage', 'enemies', 'siblings'];
    const comrade = Array.from(names.comrade);
    const self = Array.from(names.self).filter(char => {
      const idx = comrade.indexOf(char);
      if (idx !== -1) {
        comrade.splice(idx, 1);
        return false;
      }
      return true;
    });
    const count = self.concat(comrade).length;
    while (flames.length !== 1) {
      let i = 0;
      for (let j = count; j > 1; j--) {
        i = (i + 1) % flames.length;
      }
      flames.splice(i, 1);
    }
    return flames[0];
  }

  // word blocks
  const wordBlocks = Array.from(currentWord).map((letter, index) => {
    const correct = guessed.includes(letter) && currentWord.includes(letter);
    const missingLetter = lostGame && !guessed.includes(letter);
    return (
      <span
        className={clsx('word-block', missingLetter && 'missing')}
        key={nanoid()}
      >
        {correct && letter.toUpperCase()}
      </span>)
  });

  // keyboard
  function handleClick(letter) {
    setGuessed(prevArr => {
      const prevSet = new Set(prevArr);
      prevSet.add(letter);
      return Array.from(prevSet);
    });
  }

  const keyboard = Array.from(alphabet).map(alpha => {
    return (
      <button
        className={clsx(
          'alphabet',
          guessed.includes(alpha) &&
          (currentWord.includes(alpha)
            ? 'correct'
            : 'wrong')
        )}
        disabled={isGameOver}
        aria-label={`Letter ${alpha}`}
        aria-disabled={guessed.includes(alpha)}
        onClick={() => handleClick(alpha)}
        key={alpha}
      >
        {alpha.toUpperCase()}
      </button>
    )
  })

  // enterBtn
  function handleEnter() {
    setShowGame(true);
    setCurrentWord(getWord(flamesCalc()));
    return true;
  }

  function resetGame() {
    setGuessed([]);
    setNames({ self: "", comrade: "" });
    setShowGame(false);
  }

  {/* App */ }
  return (
    <main>
      {wonGame && currentWord !== "" &&
        <>
        <Confetti
          recycle={false}
          numberOfPieces={1000}
        />
        <Heart flames={flamesCalc()} />
        </>}
      <header className="header">
        <h1>FLAMES</h1>
        <p>
          Want to know the bond btw you and ur comrade?
          {showGame && "Save your comrade's life from danger!"}
        </p>
      </header>

      <section>
        <label className='self'>Your Name:
          <input
            type="text"
            id='self'
            name='self'
            onChange={updateNames}
            value={names.self}
            maxLength={12}
            disabled={showGame}
          />
        </label>
        <label className='comrade'>Your Comrade's:
          <input
            type="text"
            id='comrade'
            name='comrade'
            onChange={updateNames}
            value={names.comrade}
            maxLength={12}
            disabled={showGame}
          />
        </label>
      </section>

      <section className='names-container'>
        <div
          className='self-container'
        >{self}
        </div>
        <div className='comrade-container'>{showGame && !isGameOver ? <Bullet comrade={comrade} /> : comrade}</div>
      </section>
      

      {showGame && <section className='word-blocks'>{wordBlocks}</section>}

      {/* for sr-only */}
      <section
        className='sr-only'
        aria-live='polite'
        role='status'
      >
        {lastGuessRight
          ? `Correct: The letter ${lastGuessLetter} is present`
          : `Oops: The letter ${lastGuessLetter} is wrong`
        }
        <p>
          Current word: {Array.from(currentWord).map(letter =>
            guessed.includes(letter) ? letter + '.' : 'blanck'
          ).join(" ")}
        </p>
      </section>

      {showGame && !isGameOver && <section className='keyboard'>{keyboard}</section>}

      {self.length && comrade.length ?
        <button
          className="new-game"
          disabled = {showGame&&!isGameOver}
          onClick={isGameOver ? resetGame : handleEnter}
        >
          {isGameOver ? 'Reset' : 'Enter'}
        </button> : null}
    </main>
  )
}