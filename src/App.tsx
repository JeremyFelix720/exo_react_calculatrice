// Dans un premier temps, coder les enfants (boutons dans le parent "App").
// installer bootstrap pour les colonnes. [OK]

import { useCallback, useState } from 'react'
import './App.scss'

function App() {
  const [numbersList, setNumbersList] = useState([] as string[])
  const [concatNumber, setConcatNumber] = useState("")
  const [previousOperator, setPreviousOperator] = useState("")
  const [result, setResult] = useState("")
  
  console.log("CHARGEMENT DE LA PAGE")
  console.log("numbersList : " + numbersList)
  console.log("concatNumber : " + concatNumber)
  console.log("previousOperator : " + previousOperator)
  console.log("result : " + result)

  // Les fonctions anonymes dans la propriété "onClick" des boutons renvoit l'info passée en paramètre à la fonction handlerNumber.
  const handlerNumbers = useCallback((value: string) => {

    setResult(result + value) // Mise à jour de la valeur qui s'affiche dans la zone "résultat"

    console.log("numbersList[numbersList.length-1] = " + numbersList[numbersList.length-1])
    if(numbersList[numbersList.length-1]=="=") { // Si on veut refaire un calcul après avoir déjà fait une opération précédement.
      setNumbersList([])
      setResult(value)
    }
    if(value == "+" || value == "-" || value == "="){ // Si on a cliqué sur un opérateur...
      
      setPreviousOperator(value) // nouvelle valeur de l'opérateur mis à jour.
      
      if(previousOperator == "+" || previousOperator == "-") { // Si on a cliqué 2 fois d'affilé sur un opérateur.

        console.log("Le previousOperator, c'est : " + previousOperator)
        console.log("Le numbersList, c'est : " + numbersList)

        numbersList[numbersList.length-1] = value

        // Mise à jour du résulat affiché avec la nouvelle valeur de l'opérateur.
        let numbersListFilling = "";
        for (let index = 0; index < numbersList.length; index++) {
          numbersListFilling += numbersList[index];
        }
        setResult(numbersListFilling)
      } else {
        numbersList.push(concatNumber)
        numbersList.push(value)
        setConcatNumber("")
      }
    } else { // Si on a cliqué sur un nombre...
      setConcatNumber(concatNumber + value)
      setPreviousOperator("")
    }

    if(value == "=") {
      let calculResult = 0;

      if(numbersList[numbersList.length-1] == "+" || numbersList[numbersList.length-1] == "-") {
        numbersList.pop() // supprime le dernier élément du tableau à l'index "numbersList.length-1".
      }

      for (let index = 1; index < numbersList.length; index+=2) {
        console.log("TEST")
        console.log(numbersList[index])
        if(numbersList[index] && numbersList[index+1]) {
          console.log("element à l'index " + index + " : ", numbersList[index])
          if(numbersList[index] == "+") {
            if(index==1){
              calculResult = parseInt(numbersList[index-1]) + parseInt(numbersList[index+1])
            } else {
              calculResult += parseInt(numbersList[index+1])
            }
          } else if(numbersList[index] == "-") {
            if(index==1){
              calculResult = parseInt(numbersList[index-1]) - parseInt(numbersList[index+1])
            } else {
              calculResult -= parseInt(numbersList[index+1])
            }
          }
        }
        setResult(calculResult.toString())
      }
    }
  }, [result, numbersList, concatNumber, previousOperator])

  return (
    <>
      <div id="app" className='container'>
        <div className='row justify-content-center'>
        <div className='result row col-12'>
          <p>{result}</p>
        </div>
          <div className='row justify-content-center col-9'>
            <button onClick={() => handlerNumbers("7")} className='col-4'>7</button>
            <button onClick={() => handlerNumbers("8")} className='col-4'>8</button>
            <button onClick={() => handlerNumbers("9")} className='col-4'>9</button>
            <button onClick={() => handlerNumbers("4")} className='col-4'>4</button>
            <button onClick={() => handlerNumbers("5")} className='col-4'>5</button>
            <button onClick={() => handlerNumbers("6")} className='col-4'>6</button>
            <button onClick={() => handlerNumbers("1")} className='col-4'>1</button>
            <button onClick={() => handlerNumbers("2")} className='col-4'>2</button>
            <button onClick={() => handlerNumbers("3")} className='col-4'>3</button>
            <button onClick={() => handlerNumbers("0")} className='col-4'>0</button>
          </div>
          <div className='column col-3'>
            <button onClick={() => handlerNumbers("-")} className='col-12'>-</button>
            <button onClick={() => handlerNumbers("+")} className='col-12'>+</button>
            <button onClick={() => handlerNumbers("=")} className='col-12'>=</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

// ENFANTS
