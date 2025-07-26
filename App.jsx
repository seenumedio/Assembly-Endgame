import { languages } from './languages'
import React from 'react';
export default function App() {

  /**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * Display the keyboard ⌨️. Use <button>s for each letter
 * since it'll need to be clickable and tab-accessible.
 */

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = Array.from(alphabet).map(alpha => {
    return <button className='alphabet'>{alpha.toUpperCase()}</button>
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