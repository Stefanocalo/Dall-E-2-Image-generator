import {React, useSyncExternalStore} from 'react';
import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';


function App () {

  // ---- Declaring state ----

    // Prompt state variable
  const [prompt, setPrompt] = useState('');

    //API call result state variable
  
  const [result, setResult] = useState('')

  // -----------------------------------------


  // ---- Declare configuration variable ----

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_DALLE_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  
  // -----------------------------------------

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setResult(response.data.data[0].url);
  };

  const handleChange = ({target}) => {
    setPrompt(target.value);
  };

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
      <div className='imageContainer'>
        {
        result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
        )}
        
      </div>
    </div>
  )

}

export default App;
