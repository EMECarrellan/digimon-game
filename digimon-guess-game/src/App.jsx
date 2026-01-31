import './App.css'
import { useState, useEffect } from 'react';


function App() {
  const [randomIndex, setRandomIndex] = useState(null)
  const [digimonInfo, setDigimonInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then((res) => res.json())
    .then((data) => {
      setDigimonInfo(data);
      const random = Math.floor(Math.random() * data.length);
      setRandomIndex(random)
      setIsLoading(false)
    })
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userGuess = answer.toLowerCase().trim();
    const realName = digimonInfo[randomIndex]?.name.toLowerCase();
    
    userGuess === realName
    ? setMessage("Has ganado")
    : setMessage("Inténtalo de nuevo")
    
    setAnswer('')
  }

  const handleReset = () => {
    const newRandom = Math.floor(Math.random() * digimonInfo.length);
    setRandomIndex(newRandom);
    setMessage('');
    setAnswer('');
  }

  const handleChange = (e) => {
    setAnswer(e.target.value);
  }

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

return (
    <>
      <h1>Digimon guessing game</h1>
      <div className="card">
        <img src={digimonInfo?.[randomIndex]?.img} />
        <form autoComplete="off" action="submit" onSubmit={handleSubmit}>
          <label>¿Cuál es este digimon?
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={handleChange}
            />
          </label>
          <p>{message}</p>
          <button type="button" onClick={handleReset}>
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
