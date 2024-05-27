import { useState , useCallback } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  const [length , setLength] = useState(8)
  const [numberAllow , setnumberAllow] = useState(false)
  const [charAllow , setCharAllow] = useState(false)
  const [password , setPassword] = useState("")

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*()[]{}"

    for(let i = 1 ; i<Array.length ; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      pass = str.charAt(char)

    }

    setPassword(pass)
  } , [length, numberAllow,charAllow,setPassword])
 
  return (
    <>
    <div className=' w-full h-40 max-w-md mx-auto shadow-md  rounded-lg px-4 my-15 text-orange-500 bg-gray-700'> 
      <h1 className='text-white text-center my-7 mx-3'> Password Generator </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input type="text"
        value={password}
        className='outline-none w-full py-1 px=3'
        placeholder='Password'
        readOnly
        />
        <button className='outline-none bg-blue-700 text-white px-3 py0.5 shrink-0' > copy</button>
      </div>
      <div className="flex text-sm gap-x-2"></div>
      <div className="flex items-center gap-x-1">
        <input 
        type="rang" 
        min={6}
        max={80}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label > Length: {length}</label>
      </div>
        <input type="checkbox"
          defaultChecked={numberAllow}
          id='numberInput'
          onChange={() =>{
            setnumberAllow((prev) =>!prev);
          }}
          />

          <label htmlFor="numberInput">Numbers</label>

    </div>
    </>

  )
}

export default App
