// Dans un premier temps, coder les enfants (boutons dans le parent "App")

// installer bootstrap pour les colonnes

import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  const handlerNumbers = (value: number) => {
    console.log(value);
    

  }

  return (
    <>
      <div id="app" className='container'>
        <div className='row justify-content-center'>
        <div className='result row col-12'>
          <p>***</p>
        </div>
          <div className='row justify-content-center col-9'>
            <button onClick={() => handlerNumbers(7)} className='col-4'>7</button>
            <button onClick={() => handlerNumbers(8)} className='col-4'>8</button>
            <button onClick={() => handlerNumbers(9)} className='col-4'>9</button>
            <button onClick={() => handlerNumbers(4)} className='col-4'>4</button>
            <button onClick={() => handlerNumbers(5)} className='col-4'>5</button>
            <button onClick={() => handlerNumbers(6)} className='col-4'>6</button>
            <button onClick={() => handlerNumbers(1)} className='col-4'>1</button>
            <button onClick={() => handlerNumbers(2)} className='col-4'>2</button>
            <button onClick={() => handlerNumbers(3)} className='col-4'>3</button>
            <button onClick={() => handlerNumbers(0)} className='col-4'>0</button>
          </div>
          <div className='column col-3'>
            <button className='col-12'>-</button>
            <button className='col-12'>+</button>
            <button className='col-12'>=</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

// ENFANTS





