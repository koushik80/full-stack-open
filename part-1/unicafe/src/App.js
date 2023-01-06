import { useState } from 'react';
import Statistics from './components/Statistics';

const Header = props => <h1>{ props.name }</h1>

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  });

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  );

  const handleGoodClick = () => {
    setClicks({...clicks, good: clicks.good + 1})
  };

  const handleNeutralClick = () => {
      setClicks({...clicks, neutral: clicks.neutral + 1})
  };

  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1})
  };

  return (
    <div>
      <Header name="give feedback" />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header name="statistics" />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App;