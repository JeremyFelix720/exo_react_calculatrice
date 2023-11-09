// Dans un premier temps, coder les enfants (boutons dans le parent "App")
// installer bootstrap pour les colonnes [OK]

import { useCallback, useState } from 'react'
import './App.scss'

function App() {
  const [numbersList, setNumbersList] = useState([] as string[])
  const [concatNumber, setConcatNumber] = useState("")
  const [previousOperator, setPreviousOperator] = useState("")
  const [result, setResult] = useState("")

  console.log("previousOperator = ", previousOperator)

  // Les fonctions anonymes dans la propriété "onClick" des boutons renvoit l'info passée en paramètre à la fonction handlerNumber
  const handlerNumbers = useCallback((value: string) => {

    setResult(result + value) // Mise à jour de la valeur qui s'affiche dans la zone "résultat"

    if(value !== "+" && value !== "-" && value !== "="){ // Si on a cliqué sur un nombre...
      console.log("Valeur cliquée : " + value)
      console.log("J'ai cliqué sur un nombre")
      setConcatNumber(concatNumber + value)
      setPreviousOperator("")
      console.log("previousOperator = ", previousOperator)

    } else {

      
      if(previousOperator == "+" || previousOperator == "-") { // Si on a cliqué 2 fois d'affilé sur un opérateur.
        numbersList.splice((numbersList.length-2), 1); // suppr. l'avant dernier élément du tableau à l'index "numbersList.length-2"
        //delete numbersList[numbersList.length-2]
        console.log("previousOperator (cliqué 2 fois sur un op.) = ", previousOperator)
      }
      

      setPreviousOperator(value) // nouvelle valeur de l'opérateur mis à jour.
      console.log("previousOperator = ", previousOperator)

      //setNumbersList([...numbersList, concatNumber])
      setNumbersList(numbersList.concat(concatNumber, value)) // permet de rajouter un élément dans un tableau avec le setState.
      setConcatNumber("")
    }

    if(value == "=") {
      let operation = 0;
      let calculResult = 0;

      if(numbersList[numbersList.length-1] == "+" || numbersList[numbersList.length-1] == "-") {
        //numbersList.splice((numbersList.length-1), 1); // suppr le dernier élément du tableau à l'index "numbersList.length-1"
        numbersList.pop() // suppr le dernier élément du tableau à l'index "numbersList.length-1"
      }
      
      // PROBLEME : le calcul ne prend pas en compte le dernier concatNumber du tableau numbersList.
      for (let index = 0; index < numbersList.length; index++) {
        //if(numbersList[index]) {
          console.log("element à l'index " + index + " : ", numbersList[index])
          if(numbersList[index] == "+") {
            operation = parseInt(numbersList[index-1]) + parseInt(numbersList[index+1])
            calculResult += operation
          } else if(numbersList[index] == "-") {
            operation = parseInt(numbersList[index-1]) - parseInt(numbersList[index+1])
            calculResult += operation
          }
        //}
        setResult(calculResult.toString())
        console.log(numbersList);
      }
    }
  }, [result, numbersList, concatNumber, previousOperator])

  console.log("concatNumber : " + concatNumber)

/*
const numbersCalcul = useMemo(() => {
  return props.value + cpt
}, [props.value, cpt])
*/
// Dans le handler : je calcule UN groupe de nombre
// Dans le useMemo : je récup la 1ère valeur PUIS j'utilise un deuxième hander pour vérifier quel est l'opérateur utilisé








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




// PROBLEME : il faut appuyer sur le "+" ou le "-" pour que la value concatNumber apparaisse.

/* SOLUTION :

mettre le même handler pour les chiffres et les opérateurs qui sert à :

- rajouter la valeur du bouton (directement si c'est un "-" ou un "+" et si s'en est pas un, continuer de concatener - le rajout de concatNumber se fait si la value est un opérateur)

- faire un useState "operator" pour conserver la valeur du précedent opérateur rentré (si on a cliqué sur un nombre avant, il doit être vide. Si on a cliqué sur un op., il doit être remplacé)



- faire un état "calculResult" inialisé à 0



- coder le handlerResult après (quand on clique sur le "=").

- s'il le useState n'est pas vide, supprimer le dernier element du tableau

- ["25", "+", "12"]

- incrémenter la boucle for +2 et commencer par l'index 1 :

s'il y a un element dans le tableau ET que l'opérateur est "+", alors faire
setCalculResult += tab[index-1] + tab[index+1]

- setResult(calculResult.toString)


*/
