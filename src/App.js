import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)


  async function getMemes(){
    setLoading(true)
    setMemes([])
    const key = 'u5pAJTfWhI6vjMR4hpHDb1RVWz70XGJs'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">

          <TextField fullWidth variant="outlined"
            InputLabelProps={{color:'primary'}}

            id="outline-secondary"
            label="Meme Search"
            color="secondary"
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> {
              if(e.key==='Enter') getMemes()
            }}
          />
          <Button variant="contained" 
            color="secondary"
            onClick={getMemes}>
            <SearchIcon color="primary"/>
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />}

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>
    </div>
  );
}

function Meme({images, title, url}){
  return <div className="meme">
    <td onClick={()=> window.open(url, "_blank")}>
      <img src={images.fixed_height.url} alt="meme" />
    </td>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
