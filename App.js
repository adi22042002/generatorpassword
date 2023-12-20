import { useState,useCallback,useRef } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
const [length, setLength] = useState(8)
const [numberAllowed,setNumberAllowed]=useState(false)
const [charAllowed,setcharAllowed]=useState(true);
const[password,setPassword]=useState("");
//ref hook 
const passwordRef=useRef(null);

 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="qwertyuiopasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";
  if(numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*(){}[]_-+=`";
  for (let i = 1; i <length; i++) {
    let char=Math.floor(Math.random()*str.length
    +1)
    pass+=str.charAt(char);
    setPassword(pass);

  }
 },[length,numberAllowed,charAllowed,setPassword])
 const copyPasssword=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 },[password])
useEffect(() => {
  passwordGenerator()

 
}, [length,numberAllowed,charAllowed,passwordGenerator])
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center my-3'> password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3  '
      placeholder='password'
      readOnly
      ref={passwordRef} />
      <button onClick={copyPasssword} className='outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0'> Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex item-center gap-x-1'>
        <input type="range"
        min={6}
        max={125}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)
        }} />
        <label >Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllowed}
        id='numberinput' onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }} />
        <label htmlFor="numberinput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={charAllowed}
        id='inputnumbert' onChange={()=>{
          setcharAllowed((prev)=>!prev);
        }} />
        <label htmlFor="inputnumber">characters</label>
      </div>
    </div>
   </div>
   </>
  );
}

export default App;
