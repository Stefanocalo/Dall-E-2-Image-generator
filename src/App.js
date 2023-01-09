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

  // ---- Random searches array ----

  const rndSearches = ['A photo of an astronaut riding a horse', 'A raccoon playing tennis at Wimbledon in the 1990s', 'Photo of hip hop cow in a denim jacket recording a hit single in the studio', 'Photo of hip hop cow in a denim jacket recording a hit single in the studio', 'An italian town made of pasta, tomatoes, basil and parmesan', 'Mona Lisa taking selfie', 'Mars populated by aliens', 'World populated by ants', 'A living walking cartoon chair singing', 'Avengers Disney style', 'baby hulk drawn with pastels', 'A flying dog', 'Superman in the Pixar universe' ];
  const rnd = Math.floor(Math.random() * 13);
  // -----------------------------------------

  const generateImage = async () => {

    const button = document.getElementById('button');
    const loading = document.querySelector('.loadingContainer')
    const imageContainer = document.querySelector('.imageContainer');

    button.disabled = true;
    imageContainer.classList.toggle('active');
    loading.classList.toggle('active');
    
    let response;
    // api call
    if (prompt.length === 0) {
      let rndSearch = rndSearches[rnd];
      setPrompt(rndSearch);
       response = await openai.createImage({
        prompt: rndSearch,
        n: 1,
        size: "512x512",
      });
    } else {
       response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
    }

    

      //Assign response url to result state variable

    setResult(response.data.data[0].url);

    loading.classList.remove('active');
    imageContainer.classList.remove('active');
    

    button.disabled = false;
    setPrompt('');

  };

  const handleChange = ({target}) => {
    setPrompt(target.value);
  };

  return (
    <div className='main'>
      <h2 data-testid = 'h2' >Generate an Image using Dall-E 2 API</h2>
      <div className='inputContainer'>
        <input 
          className='input'
          data-testid='input'
          placeholder='Search Rick & Morty in the Spiderman multiverse'
          onChange={handleChange}
          value={prompt}
          ></input>
      </div>
      <div className='buttonContainer'>
        <button
          onClick={generateImage}
          data-testid='button'
          disabled= {false}
          id='button'
        >{prompt ? 'Generate Image' : 'Generate Random Image'}</button>
      </div>
      <div className='loadingContainer'>
        <div className="circle_1"></div>
        <div className="circle_2"></div>
        <div className="circle_3"></div>
        <div className="circle_4"></div>
      </div>
      <div className='imageContainer' data-testid='result'>
        {
        result.length > 0 ? (
            <img className="resultImage" src={result} alt="result" data-testid='image' />
          ) : (
            <></>
        )}
        
      </div>
    </div>
  )

}

export default App;
