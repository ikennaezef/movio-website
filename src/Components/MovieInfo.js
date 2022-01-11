import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import './MovieInfo.css';

const MovieInfo = () => {

	const { selectedMovie } = useContext(AppContext);

	return (
		<div className='movie-wrapper' >
			<Link className='home-link' to='/' >Back to Home Page</Link>
			{ selectedMovie && (
			<div className='movie'>	
				<img src={selectedMovie.image} alt="movie-poster" className='movie-poster' />
				<div className="movie-info">
					<h1 className="movie-name"> { selectedMovie.title } </h1>
					<h5 className="movie-type"> { selectedMovie.type } { selectedMovie.runtimeMins && ` - ${ selectedMovie.runtimeMins } mins` }  </h5>
					<h4 className="movie-year"> { selectedMovie.year } </h4>
					<p className="movie-plot"> { selectedMovie.plot } </p>
					<p className="movie-genre"> <strong>Genre: </strong> { selectedMovie.genres } </p>
					<p className="movie-director"> <strong>Director(s): </strong> { selectedMovie.directors } </p>
					<p className="movie-actors"> <strong>Actors: </strong> { selectedMovie.actorList.slice(0, 8).map(actor => actor.name + ', ' ) }  </p>
					<p className="movie-rating"> <strong>imDb Rating: </strong> { selectedMovie.imDbRating } </p>
				</div>
			</div>
			)}
			
		</div>
	)
}

export default MovieInfo