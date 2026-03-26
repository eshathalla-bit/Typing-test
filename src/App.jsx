import { useState,useCallback, useEffect,useRef } from 'react'

import React from 'react'

function App() {
  const [Time,setTime]=useState(30)
  const [TimerRunning,setTimerRunning]=useState(false)
  const [Text,setText]=useState('')
  const [Speed,setSpeed]=useState(0)
  const [FinalSpeed,setFinalSpeed]=useState(null)
  const [Error,setError]=useState(0)
   const accuracy = FinalSpeed > 0? (FinalSpeed-Error>0?((FinalSpeed - Error) / FinalSpeed) * 100:0): 0;
   const grossWPM = FinalSpeed ? (FinalSpeed / 5) * 2 : 0;
   const netWPM = grossWPM * (accuracy / 100);
  
  const [Input,setInput]=useState('')
  const [List,setList]=useState([])
  
  const [SelectedText,setSelectedText]=useState([])


  const SpeedRef=useRef(0)
  const intervalRef=useRef(null)
  const inputRef=useRef(null)
  useEffect(()=>{
    SpeedRef.current=Speed
  },[Speed])
  useEffect(()=>{
    return()=>{
      if (intervalRef.current !== null) {
           clearInterval(intervalRef.current)
      }
    }
  },[])
  const timer =()=>{
         intervalRef.current=setInterval(() => {
         
           setTime((prev)=>{
            if(prev===0){
              clearInterval(intervalRef.current)
              intervalRef.current=null
              setTimerRunning(false)
              setTime(30)
              setText(textshown())
              setInput('')
              setFinalSpeed(SpeedRef.current)
              
            }
            else{ return prev-1}
         })//gives latest value and not 59 all the time if wrote(time-1)
           
        }, 1000);
  }
  

  const handleClick=()=>{
    timer()
    setFinalSpeed('')
    setSpeed(0)
    setError(0)
    setText(textshown())
    setTimerRunning(true)
    setTimeout(() => inputRef.current.focus(), 0)

  }
  const textshown=useCallback(()=>{
    
    const textoptions = [
  "the sun rises over the hills and brings light to the quiet land birds begin to sing as the fresh air moves gently across the fields and the day slowly comes to life",
  
  "she walked through the forest and felt the cool breeze on her face the trees stood tall around her as leaves moved softly and created a calm and peaceful space",
  
  "the boy opened his book and started reading with full focus his thoughts moved into a world of stories and ideas that made him feel curious and excited",
  
  "they sat near the river and watched the water flow in a smooth and steady motion the sound of nature helped them relax and enjoy the quiet moment together",
  
  "the teacher explained the lesson in a simple way so every student could understand the class listened with interest and learned something new with ease",
  
  "he looked at the sky and saw clouds slowly drifting above him the world felt still and calm as he stood there thinking about simple things in life",
  
  "the friends gathered in the evening and shared stories full of joy and laughter their bond grew stronger as they spent more time together in a happy mood",
  
  "she practiced typing every day to improve her speed and accuracy over time she became more confident and could type quickly without making many mistakes",
  
  "the road stretched far ahead and seemed to go on without an end the journey felt long but each step brought new experiences and lessons to learn",
  
  "the child played in the garden and enjoyed the warm sunlight around them the simple moments of joy made the day feel bright and full of energy"
];
     const sent=Math.floor(Math.random()*textoptions.length)
     setSelectedText(textoptions[sent].toLowerCase().split(""))
      return textoptions[sent]
    
  },[])

  const checkCorrect=(array)=>{
    if (SelectedText.length === 0) return;
    let count=0
       for(let i=0;i<array.length;i++){
        if(array[i]!==SelectedText[i]){
          count++
        }
       }
       
       setError(count)
  }


 return(
    <div className='fixed inset-0 flex items-center justify-center bg-yellow-200 text-white z-50 p-4'>
    <div className='bg-gray-800 p-10 rounded-2xl max-w-3xl w-full text-center border border-gray-700 space-y-6'>
      <h1 className='text-orange-400'>TYPING TEST</h1>
      <div id='timer'>
      <p className='text-6xl font-bold mb-6'>{Time}</p>
      <button onClick={handleClick}
        className='px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors'
        disabled={TimerRunning}>
        {TimerRunning? 'Running..':'START TIMER '}
      </button>
      </div>
      
    <div id='text'>
     <p >{Text}</p>
      <input type='text'
      value={Input}
      ref={inputRef}
      
      onChange={(e)=>{
        const value = e.target.value;
         

       setInput(value);

       const arr = value.toLowerCase().split("");
       setList(arr);

       checkCorrect(arr);
       setSpeed(value.length);
      }}
       placeholder="write here"
       className="w-full p-4 text-lg rounded-lgp-5 border rounded "
      disabled={!TimerRunning}
      ></input>
       <div className="space-y-2 mt-4">
       {TimerRunning && (
       <div className="mt-4 space-y-2">
          <p className="text-purple-300">Live Speed: {Speed}</p>
          <p className="text-red-400">Errors: {Error}</p>
       </div>
)}
     {!TimerRunning && (
         <div className="mt-6 space-y-3 text-center">

        <p className="text-orange-300 text-2xl font-bold">Net WPM: {netWPM.toFixed(2)}</p>

        <p className="text-blue-300 text-lg">Accuracy: {accuracy.toFixed(2)}%</p>

  </div>
     )}
       </div>
      </div>
      <div>
         

      </div>
    </div>
    </div>
  )
}

export default App
