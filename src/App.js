import {React} from 'react';
import { useState } from 'react';
import './App.css';

function App () {

  // Declaring state
  const [prompt, setPrompt] = useState('');

  const generateImage = async () => {};

  const handleChange = ({target}) => {
    setPrompt(target.value);
  }

  return (
    <div className='main'>
      <h2>Generate an Image using Dall-E 2 API</h2>

      <textarea className='input'
        placeholder='Search Rick & Morty in the Spiderman multiverse'
        onChange={handleChange}
      />
      <button
        onClick={generateImage}
      >Generate Image</button>
    </div>
  )

}

export default App;
