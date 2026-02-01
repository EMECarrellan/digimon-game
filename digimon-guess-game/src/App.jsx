import './App.css'
import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti'


function App() {
  const [randomIndex, setRandomIndex] = useState(null)
  const [digimonInfo, setDigimonInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(Number(localStorage.getItem("score")));
  const [autocomplete, setAutocomplete] = useState([]);
  const jsConfetti = new JSConfetti()
  
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

  useEffect(() => {
        localStorage.setItem("score", score)
      }, [score])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userGuess = answer.toLowerCase().trim();
    const realName = digimonInfo[randomIndex]?.name.toLowerCase();
    
    if (userGuess === realName) {
      setMessage("Has acertado")
      setScore(prevScore => prevScore + 100)
      jsConfetti.addConfetti()
    } else {
      setMessage("Inténtalo de nuevo")
    }
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

    if (answer.length > 0) {
      const filtered = digimonInfo
      .filter( item => item.name.toLowerCase().includes(answer.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))
      setAutocomplete(filtered)
    } else {
      setAutocomplete([])
    }
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
      <h2>Puntuación: {score}</h2>
      <div className="card">
        <img src={digimonInfo?.[randomIndex]?.img} />
        <form action="submit" onSubmit={handleSubmit}>
          <label>¿Cuál es este digimon?
            <div>
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={handleChange}
          />
          {autocomplete.length > 0 && 
            <ul>
            {autocomplete.map((item, index) => (
            <li key={index} onClick={() => {
              setAnswer(item.name);
              setAutocomplete([]);
              }}>
              <img src={item.img} alt="" />{item.name}
            </li>
          ))}
            </ul>
          }

          </div>
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
