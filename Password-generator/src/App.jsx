import { useState , useCallback , useEffect ,useRef} from 'react'

function App() {
  // const [count, setCount] = useState(0)
  const [length , setLength] = useState(8)
  const [numberAllow , setnumberAllow] = useState(false)
  const [charAllow , setCharAllow] = useState(false)
  const [password , setPassword] = useState("")

  // useRef hook use
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*()[]{}"

    for(let i = 1 ; i<=length ; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)

    }

    setPassword(pass)
  } , [length, numberAllow,charAllow,setPassword])
 
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(password)
  } , [password])
  useEffect(()=>{
    passwordGenerator()
  } , [length ,numberAllow ,charAllow , passwordGenerator])
  return (
    <>
    <div className=' w-4/5 h-40 max-w-md mx-auto shadow-md  rounded-lg px-4 my-15 text-orange-500 bg-gray-700'> 
      <h1 className='text-white text-center my-7 mx-3'> Password Generator </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input type="text"
        value={password}
        className='outline-none w-full py-1 px=3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py0.5 shrink-0' > copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label > Length: {length}</label>
      </div>
         <div className=" flex items-center gap-x-1 ">
          <input type="checkbox"
            defaultChecked={numberAllow}
            id='numberInput'
            onChange={() =>{
              setnumberAllow((prev) =>!prev);
            }}
            />

            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className=" flex items-center gap-x-1 ">
              <input type="checkbox"
                defaultChecked={charAllow}
                id='characterInput'
                onChange={() =>{
                  setCharAllow((prev) =>!prev);
                }}
                />

                <label htmlFor="characterInput">Charaters</label>
          </div>
        </div>

    </div>
    </>

  )
}

export default App
