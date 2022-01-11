import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Result.css';
const Result = ( { movie } ) => {

	const { setSelectedMovie, setLoading } = useContext(AppContext);

	const navigate = useNavigate();

	const onclick =() => {
		setLoading(true);
		Axios.get(`https://imdb-api.com/en/API/Title/k_m9o0n90c/${movie.id}`).then(response => {
			setSelectedMovie(response.data);
			setLoading(false);
			navigate(`/searchid=:${movie.id}`);
		});		
	}

	const shorten =(string) => {
		if (string.length > 20) {
			return string.slice(0, 21) + '...';
		}else {
			return string;
		}
	}


	return (
		<div className='result' >
			<img src={ movie.image } alt="movie-poster" className="movie-image" />
			<h3 className="movie-title">{ shorten(movie.title) }</h3>
			<button id="more-btn" onClick={onclick} >See More</button>
		</div>
	)
}

export default Result