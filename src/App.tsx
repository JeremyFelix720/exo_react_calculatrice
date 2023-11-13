// Dans un premier temps, coder les enfants (boutons dans le parent "App").
// installer bootstrap pour les colonnes. [OK]

import { useCallback, useState } from 'react'
import './App.scss'

function App() {
  const [numbersList, setNumbersList] = useState([] as string[])
  const [concatNumber, setConcatNumber] = useState("")
  const [previousOperator, setPreviousOperator] = useState("")
  const [result, setResult] = useState("")
  
  /*
  console.log("CHARGEMENT DE LA PAGE")
  console.log("numbersList : " + numbersList)
  console.log("concatNumber : " + concatNumber)
  console.log("previousOperator : " + previousOperator)
  console.log("result : " + result)
  */

  // Les fonctions anonymes dans la propriété "onClick" des boutons renvoit l'info passée en paramètre à la fonction handlerNumber.
  const handlerNumbers = (value: string) => {

    let newResult = result + value
    let newConcatNumber = ""
    let newPreviousOperator = ""
    let newNumberList = numbersList.slice()

    //console.log("numbersList[numbersList.length-1] = " + numbersList[numbersList.length-1])
    if(newNumberList[newNumberList.length-1]=="=" || value == "C") { // Si on veut refaire un calcul après avoir déjà fait une opération précédement.
      
      newNumberList = ["0"]
      newResult = "0"

      //return 0
    } else if(value == "-" || value == "+" || value == "/" || value == "x" || value == "="){ // Si on a cliqué sur un opérateur...
      
      newPreviousOperator = value // nouvelle valeur de l'opérateur mis à jour.
      
      if(previousOperator == "-" || previousOperator == "+" || previousOperator == "/" || previousOperator == "x") { // Si on a cliqué 2 fois d'affilé sur un opérateur.

        newNumberList[newNumberList.length-1] = value

        // Mise à jour du résulat affiché avec la nouvelle valeur de l'opérateur.
        let numbersListFilling = "";
        for (let index = 0; index < newNumberList.length; index++) {
          numbersListFilling += newNumberList[index];
        }
        newResult = numbersListFilling
      } else {
        newNumberList.push(concatNumber)
        newNumberList.push(value)
        newConcatNumber = ""
      }
    } else { // Si on a cliqué sur un nombre...

      if (result == "0") {
        newNumberList = [""]
        newResult = ""
      }

      newConcatNumber += value
      newPreviousOperator = ""
    }

    if(value == "=") {
      console.log("TOTO : " + newNumberList)

      let calculResult = 0;

      if(["/", "+", "-", "=", "x"].find(operator => operator === newNumberList[newNumberList.length-1])) {
        newNumberList.pop() // supprime le dernier élément du tableau à l'index "numbersList.length-1".
      }

      for (let index = 1; index < newNumberList.length; index+=2) {
        //console.log("TEST")
        //console.log(numbersList[index])
        if(newNumberList[index] && newNumberList[index+1]) {
          //console.log("element à l'index " + index + " : ", numbersList[index])
          if(newNumberList[index] == "-") {
            if(index==1){
              calculResult = parseFloat(newNumberList[index-1]) - parseFloat(newNumberList[index+1])
            } else {
              calculResult -= parseFloat(newNumberList[index+1])
            }
          } else if(newNumberList[index] == "+") {
            if(index==1){
              calculResult = parseFloat(newNumberList[index-1]) + parseFloat(newNumberList[index+1])
            } else {
              calculResult += parseFloat(newNumberList[index+1])
            } 
          } else if(newNumberList[index] == "/") {
            if(index==1){
              calculResult = parseFloat(newNumberList[index-1]) / parseFloat(newNumberList[index+1])
            } else {
              calculResult /= parseFloat(newNumberList[index+1])
            } 
          } else if(newNumberList[index] == "x") {
            if(index==1){
              calculResult = parseFloat(newNumberList[index-1]) * parseFloat(newNumberList[index+1])
            } else {
              calculResult *= parseFloat(newNumberList[index+1])
            } 
          }
        }
        newResult.toString()
      }
    }

    // SETTERS

    setNumbersList(newNumberList)
    setPreviousOperator(newPreviousOperator)
    setConcatNumber(newConcatNumber)
    setResult(newResult) // Mise à jour de la valeur qui s'affiche dans la zone "résultat"

  }

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
            <button onClick={() => handlerNumbers("-")} className='col-6'>-</button>
            <button onClick={() => handlerNumbers("+")} className='col-6'>+</button>
            <button onClick={() => handlerNumbers("/")} className='col-6'>/</button>
            <button onClick={() => handlerNumbers("x")} className='col-6'>x</button>
            <button onClick={() => handlerNumbers("=")} className='col-6'>=</button>
            <button onClick={() => handlerNumbers("C")} className='col-6'>C</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


// Les setters ne se modifient qu'à la fin des fonctions, pas au moment où on écrit "set(...)". Introduire autant de variables que de setter au début des fonctions puis mettre à jour les états à la fin seulement ! [OK]




// previousResult usestate
// Si on clique sur "=" : setPreviousResult(parseInt(result))

// Dans handlerNumbers, si on clique sur un opérateur :
// if previousResult != 0
// vider tableau numbersList
// index 0 : previousNumber  /  index 1 : opérateur cliqué
// setPreviousResult(0)

// rajouter une touche "C" pour tout effacer (pareil quand on tape un nombre après le resultat d'une opération)
// mettre numbersList = []
// mettre le previousResult a 0




// Il faut continuer à faire des calculs après un premier résultat.


// ENFANTS
