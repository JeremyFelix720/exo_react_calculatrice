// Dans un premier temps, coder les enfants (boutons dans le parent "App")

// installer bootstrap pour les colonnes [OK]




import { useCallback, useMemo, useState } from 'react'
import './App.scss'

function App() {
  const [numbersList, setNumbersList] = useState([] as string[])
  const [concatNumber, setConcatNumber] = useState("")
  //const [operatorsList, setOperatorsList] = useState([])
  const [result, setResult] = useState("")

/*
  const roll = useCallback(() => {
    const rand = Math.ceil(Math.random()*6)
    props.onRoll(rand); // Pour faire remonter la nouvelle valeur au parent "App".
    setValue(rand) // Toujours modifier la valeur en dernier dans la fonction !
}, [props.onRoll])
*/

  // Les fonctions anonymes dans la propriété "onClick" des boutons renvoit l'info passée en paramètre à la fonction handlerNumber
  const handlerNumbers = useCallback((value: string) => {

    setResult(result + value) // Mise à jour de la valeur qui s'affiche dans la zone "résultat"

    setConcatNumber(concatNumber + value)
    
  }, [result, numbersList])


  const handlerOperators = useCallback((value: string) => {

      setResult(result + value) // Mise à jour de la valeur qui s'affiche dans la zone "résultat"

      //setNumbersList([...numbersList, concatNumber]) // permet de rajouter un élément dans un tableau avec le setState.
      //setNumbersList([...numbersList, value])

      console.log("concatNumber : " + concatNumber)

      //setNumbersList([...numbersList, concatNumber])
      setNumbersList(numbersList.concat(concatNumber, value)) // permet de rajouter un élément dans un tableau avec le setState.

      setConcatNumber("")

  }, [concatNumber, numbersList])

  console.log(numbersList);




/*
const numbersCalcul = useMemo(() => {
  return props.value + cpt
}, [props.value, cpt])
*/

// Dans le handler : je calcule UN groupe de nombre
// Dans le useMemo : je récup la 1ère valeur PUIS j'utilise un deuxième hander pour vérifier quel est l'opérateur utilisé



/*

// Calcul du résultat de l'opération (quand on clique sur le "=") avec les tableaux des nombres et des opérateurs rentrés
const numbersCalcul = useMemo(() => {


  
  //setResult(numbersList[0])
  for (let index = 0; index < numbersList.length-1; index++) {
    
    // let previousNumber = numbersList[index]
    // let nextNumber = numbersList[index+1]


    if(numbersList[index] == "+") {
      setResult(previousNumber + nextNumber)

    } else if(operatorsList[index] == "-") {
      setResult(previousNumber - nextNumber)

    } else {
      
    }

  }
  //return result
}, [numbersList])

numbersCalcul(numbersList){

}

*/

//
const handlerResult = useCallback(() => {

  let resultCalcul = numbersList[0]
  //setResult(numbersList[0])

   for (let index = 0; index < numbersList.length-1; index++) {
    
    let previousNumber = numbersList[index]
    let nextNumber = numbersList[index+1]

    if(numbersList[index] == "+") {
      
    } else if(numbersList[index] == "-") {
      

    } else {
      
    }

    setResult(resultCalcul);
  }

  /*
  const numbersCalcul = useMemo(() => {
    //setResult(numbersList[0])
    for (let index = 0; index < numbersList.length-1; index++) {
      
    }
  })
  */
}, [numbersList])



//numbersCalcul(numbersList){}


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
            <button onClick={() => handlerOperators("-")} className='col-12'>-</button>
            <button onClick={() => handlerOperators("+")} className='col-12'>+</button>
            <button onClick={() => handlerResult()} className='col-12'>=</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

// ENFANTS


