import { languages } from './languages'
import React from 'react';
import { clsx } from 'clsx';
import { getFarewellText } from './utils'
export default function App() {

/**
 * Backlog:
 * 
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * - Choose a random word from a list of words
 * - Make the New Game button reset the game
 * - Confetti drop when the user wins
 * 
 * Challenge: Choose a random word from a list of words
 * 
 * 1. Create a new function in utils.js that chooses a random
 *    word from the imported array of words and returns it
 * 2. import the function into this file
 * 3. Figure out where to use that function.
 */


  // state values
  const [guessed, setGuessed] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('react');

  // derived values
  const wrongGuessCount = guessed.filter(letter => !currentWord.includes(letter)).length;
  const wonGame = Array.from(currentWord).every(letter => guessed.includes(letter));
  const lostGame = (wrongGuessCount >= languages.length - 1)
  const isGameOver = lostGame || wonGame;

  // variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const lastGuessLetter = guessed[guessed.length - 1];
  const lastGuessRight = currentWord.includes(lastGuessLetter);
  // bid farewell to lost langs
  function bidFarewell() {
    return wrongGuessCount > 0
      && !lastGuessRight
      && !isGameOver
      && getFarewellText(languages[wrongGuessCount - 1].name)
  }


  // languages
  const langElements = languages.map((lang, idx) => {

    return (
      <span
        className={clsx('lang-chip', wrongGuessCount > idx && 'lost')}
        style={{
          backgroundColor: lang.backgroundColor,
          color: lang.color,
        }}
        key={lang.name}
      >
        {lang.name}
      </span>
    )
  });

  // word blocks
  const wordBlocks = Array.from(currentWord).map((letter, index) => {
    const correct = guessed.includes(letter) && currentWord.includes(letter);
    return (
      <span
        className='word-block'
        key={index}
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

  return (
    <main>
      <header className="header">
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section
        className={clsx("status", wonGame && 'won', lostGame && 'lost', bidFarewell() && 'lost-lang')}
        aria-live='polite'
        role='status'
      >
        {bidFarewell() && <p>{bidFarewell()}</p>}
        {wonGame && <>
          <h1>You win!</h1>
          <h2>Well done! 🎉</h2>
        </>}
        {lostGame && <>
          <h1>Game over!</h1>
          <h2>You lose! Better start learning Assembly 😭</h2>
        </>}
      </section>

      <section className='lang-container'>
        {langElements}
      </section>

      <section className='word-blocks'>{wordBlocks}</section>

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

      <section className='keyboard'>{keyboard}</section>

      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}