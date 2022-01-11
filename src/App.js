import { HashRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import { useState, createContext } from 'react';
import './App.css';
import Header from './Components/Header';
import Result from './Components/Result';
import MovieInfo from './Components/MovieInfo';
import Footer from './Components/Footer';
import Loader from './Components/Loader';

export  const AppContext = createContext(null);


function App() {

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [results, setResults] = useState([ ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = () => {
    if (query==='') {
      setError(true);
      setTimeout( ()=> setError(false), 2000 );
    }else {
      setError(false);
      setLoading(true);
      Axios.get(`https://imdb-api.com/en/API/Search/k_m9o0n90c/${query}`).then(response => {
        setResults(response.data.results);
        setLoading(false);
      }).catch(err => console.log('error',err));
    }
  }

  return (
    <HashRouter basename='/' >
      <AppContext.Provider value={{ selectedMovie, setSelectedMovie, setLoading }} >
        <div className="app">
          <Header/>
          <div className="wrapper">
            { loading && <Loader /> }
            <Routes>          
              <Route path='/' exact element={ (
                <>
                  <div className="query-area">
                    <div className="searchbox">
                      <input type="text" placeholder='Search movie...' id='search' onChange={ (e)=> setQuery(e.target.value) } />
                      <button id='search-btn' onClick={ search } >Search</button>
                    </div>
                    { error && <p className="msg">Please enter a search term</p> }
                  </div>
                  
                  <div className="results">
                    { results.map(movie => <Result key={ movie.id } movie={ movie } /> ) }
                  </div>                
                </>
                ) }  />
              <Route path='/searchid=:movieid' element={ <MovieInfo/> } />
           </Routes>
          </div>
          <Footer/>
        </div>
      </AppContext.Provider>
    </HashRouter>
  );
}

export default App;
