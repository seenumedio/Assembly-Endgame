import { languages } from './languages'
import React from 'react';
import { clsx } from 'clsx';
export default function App() {

  /**
   * Backlog:
   * 
   * - Farewell messages in status section
   * - Fix a11y issues
   * - Make the new game button work
   * - Choose a random word from a list of words
   * - Confetti drop when the user wins
   */

  // state values
  const [guessed, setGuessed] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('react');

  // derived values
  const wrongGuessCount = guessed.filter(letter => !currentWord.includes(letter)).length;
  const wonGame = Array.from(currentWord).every(letter => guessed.includes(letter));
  const lostGame = (wrongGuessCount === 8)
  const isGameOver = lostGame || wonGame;

  // variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz"


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

      <section className={clsx("status", wonGame && 'won', lostGame && 'lost')}>
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
      <section className='keyboard'>{keyboard}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}