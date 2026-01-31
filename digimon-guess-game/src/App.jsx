import './App.css'
import { useState } from 'react';

const response = await fetch('https://digimon-api.vercel.app/api/digimon', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});

const data = await response.json();
const random = Math.floor(Math.random() * data.length);

function App() {
  const [randomIndex, setRandomIndex] = useState(random)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    console.log(answer === data?.[randomIndex]?.name);
  }

  const handleReset = () => {
    const newRandom = Math.floor(Math.random() * data.length);
    setRandomIndex(newRandom)
  }

  return (
    <>
      <h1>Digimon guessing game</h1>
      <div className="card">
        <img src={data?.[randomIndex]?.img} />
        <form autoComplete="off" action="submit" onSubmit={handleSubmit}>
          <label>¿Cuál es este digimon?
            <input type="text" id="answer" name="answer" />
          </label>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button>
            Comprobar respuesta
          </button>
        </form>
      </div>
    </>
  )
}

export default App
