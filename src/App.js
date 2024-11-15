
import { useState } from 'react';
import './App.css';
import random from 'random-string-generator';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {

  const [pass,setpass] = useState(random());
  const [range,setrange] = useState(8);
  const [btntext, setbtntext] = useState('Copy'); 
  const [copyStatus, setCopyStatus] = useState(false); 


  const [options, setOptions] = useState({
    lower: false,
    upper: false,
    numeric: false,
    symbols: false,
  });

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: !prevOptions[name],
    }));
  };

  const formhandle = () => {
     
    let a = 'scoped:abcdef';
    if(options.upper){
      a = 'upper';
    }
    if(options.lower){
      a = 'lower';
    }
    if(options.upper && options.lower){
      a = 'alphanumeric';
    }
    if(options.numeric){
      a = 'numeric';
    }
    if(options.upper && options.numeric){
      a = 'uppernumeric';
    }
    if(options.lower && options.numeric){
      a = 'lowernumeric';
    }
    if(options.lower && options.upper && options.numeric){
      a = 'scoped:ABCDEabcdef123456789';
    }
    if(options.symbols){
      a = 'scoped:=&}![%+=#{;*(_.)]$';
    }
    if(options.symbols && options.upper){
      a = 'scoped:ABCDE=&}![%+=#{;*(_.)]$';
    }
    if(options.symbols && options.lower){
      a = 'scoped:abcde=&}![%+=#{;*(_.)]$';
    }
    if(options.symbols && options.numeric){
      a = 'scoped:123456789=&}![%+=#{;*(_.)]$';
    }
    if(options.symbols && options.upper && options.lower){
      a = 'scoped:ABCDEabcde=&}![%+=#{;*(_.)]$';
    }
    if(options.lower && options.upper && options.numeric && options.symbols){
      a = 'scoped:ABCDEabcdef123456789=&}![%+=#{;*(_.)]$';
    }
    let p = random(parseInt(range), a);
    setpass(p);
   
  }
  const onCopyText = () => {
    setCopyStatus(true);
    
    setbtntext('Copied');
    setTimeout(() => setCopyStatus(false), 2000);
    setTimeout(() => setbtntext('Copy'), 2000);
    // Reset status after 2 seconds
  };






  return (
    <div className="App">
      <h1>Password Generator</h1>
      <form onChange={formhandle}>
      <div className="input-container">
        <input type="text" className="input-field" value={pass} onChange={(e) => setpass(e.target.value)}  name="pass" placeholder="password generate" />
        <CopyToClipboard text={pass} onCopy={onCopyText}>
        <button type="button" className="copy"><i className="fa fa-copy"></i>{btntext} {copyStatus}</button>
        
        </CopyToClipboard>
        
      </div>
      <div className="type-container">
        <div className="length">
          <label >Length:{range}</label>
          <input type="range" className="range"   onChange={(e) => setrange(e.target.value) } name="range" min="0" max="100" />
        </div>
        <div className="checkbox-container">
         
          <input type="checkbox" className="checkbox"  onChange={handleCheckboxChange} name="upper" />
          <label>Uppercases</label>
        </div>
        <div className="checkbox-container">
          
          <input type="checkbox" className="checkbox"  onChange={handleCheckboxChange} name="lower" />
          <label>Lowercases</label>
        </div>
        <div className="checkbox-container">
          
          <input type="checkbox" className="checkbox"  onChange={handleCheckboxChange} name="numeric" />
          <label>Numbers</label>
        </div>
        <div className="checkbox-container">
          
          <input type="checkbox" className="checkbox"  onChange={handleCheckboxChange} name="symbols" />
          <label>Symbols</label>
        </div>
      </div>
      </form>
    </div>
  );
}

export default App;
