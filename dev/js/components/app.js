// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
// GiphyAPI https://github.com/Giphy/GiphyAPI
// SpotifyAPI https://developer.spotify.com/web-api/search-item/
// omdbAPI https://www.omdbapi.com/
"use strict";
import React from "react";
import SearchForm from "./search-form";
import SearchResult from "./search-result";

let gifs = [];
let tracks = [];
let movies = [];
let giflimit = 10;
let tracklimit = 10;

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gifs,
			tracks,
			movies
		};

		this.changedState = this.changedState.bind(this);
	}

	render() {
		return (
			<div className="container">
				<SearchForm
					search={this.search.bind(this)}
				 />
				<SearchResult
					gifs={this.state.gifs}
					tracks={this.state.tracks}
					movies={this.state.movies}
				 />
			</div>
		);
	}

	search(input) {
		input=input.replace(" ", "%20");
		console.log("searching for: " + input);
		this.giphySearch(input);
		this.spotifySearch(input);
		this.omdbSearch(input);
	}

	omdbSearch(input) {
		let URL = "http://www.omdbapi.com/?apikey=163a8325&s=" + input + "&type=movie";
		let omdbAPI = new XMLHttpRequest();
		// response
		omdbAPI.addEventListener("load", function() {
			let response = JSON.parse(this.responseText);
			let result = response.Search;
			// Clear array
			movies.splice(0, movies.length);
			// Parse data
			for (let val of result) {
				let movie = {
					id: val.imdbID,
					img: (val.Poster != "N/A") ? val.Poster : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
					title: val.Title,
					year: val.Year,
					url: "http://www.imdb.com/title/"+val.imdbID+"/"
				};
				movies.push(movie);
			}
		});

		omdbAPI.onload = this.changedState;
		omdbAPI.open("GET", URL);
		omdbAPI.send();
	}

	spotifySearch(input) {
		let URL = "https://api.spotify.com/v1/search?type=track&limit="+ tracklimit +"&q=" + input;
		let spotifyAPI = new XMLHttpRequest();
		// response
		spotifyAPI.addEventListener("load", function() {
			let response = JSON.parse(this.responseText);
			let result = response.tracks.items;
			//console.log(result);
			// Clear array
			tracks.splice(0, tracks.length);
			// Parse data
			for (let val of result) {
				//console.log(val);
				let artists = [];
				for (let art of val.artists) {
					artists.push(art.name);
				}
				//console.log(artists);

				let track = {
					id: val.id,
					img: val.album.images[0].url,
					artist: artists,
					url: val.external_urls.spotify,
					name: val.name
				};
				//console.log(track);
				tracks.push(track);
			}
		});

		spotifyAPI.onload = this.changedState;
		spotifyAPI.open("GET", URL);
		spotifyAPI.send();
	}

	giphySearch(input) {
		let URL = "http://api.giphy.com/v1/stickers/search?limit="+ giflimit +"&q=" + input + "&api_key=dc6zaTOxFJmzC";
		let giphyAPI = new XMLHttpRequest();
		// response
		giphyAPI.addEventListener("load", function() {
			let response = JSON.parse(this.responseText);
			let result = response.data;
			// Clear array
			gifs.splice(0, gifs.length);
			// Parse data
			for (let val of result) {
				//console.log(val);
				let gif = {
					id: val.id,
					url: val.bitly_url,
					img: val.images.downsized.url,
					date: val.import_datetime,
					rating: val.rating,
					slug: val.slug
				};
				//console.log(gif);
				gifs.push(gif);
			}
		});

		// send
		giphyAPI.onload = this.changedState;
		giphyAPI.open("GET", URL);
		giphyAPI.send();
	}

	changedState() {
		this.setState({
				gifs: gifs,
				tracks: tracks,
				movies: movies
		});
	}
}