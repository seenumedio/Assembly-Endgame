import { languages } from './languages'
import React from 'react';
import { clsx } from 'clsx';
export default function App() {

  /**
 * Goal: Allow the user to start guessing the letters
 * 
 * Challenge: Update the keyboard when a letter is right
 * or wrong.
 * 
 * Bonus: use the `clsx` package to easily add conditional 
 * classNames to the keys of the keyboard. Check the docs 
 * to learn how to use it 📖
 */
  const [currentWord, setCurrentWord] = React.useState('react');
  const wordBlocks = Array.from(currentWord).map((letter, index) => {
    return (
      <span
        className='word-block'
        key={index}
      >
        {letter.toUpperCase()}
      </span>)
  });

  const [guessed, setGuessed] = React.useState([]);

  function handleClick(letter) {
    setGuessed(prevArr => {
      const prevSet = new Set(prevArr);
      prevSet.add(letter);
      return Array.from(prevSet);
    });
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
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

  const langElements = languages.map(lang => (
    <span
      className='lang-chip'
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      }}
      key={lang.name}
    >
      {lang.name}
    </span>
  )
  );



  return (
    <main>
      <header className="header">
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="status won">
        <h1>You win!</h1>
        <h2>Well done! 🎉</h2>
      </section>

      <section className='lang-container'>
        {langElements}
      </section>
      <section className='word-blocks'>{wordBlocks}</section>
      <section className='keyboard'>{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  )
}