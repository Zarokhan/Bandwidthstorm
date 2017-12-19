// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
"use strict";
import React from "react";
import GifsList from "./gifs-list";
import TracksList from "./tracks-list";
import MoviesList from "./movies-list";

export default class SearchResult extends React.Component {
	render() {
		return (
			<div className="searchresult">
				<GifsList
					gifs={this.props.gifs}
				/>
				<TracksList
					tracks={this.props.tracks}
				/>
				<MoviesList
					movies={this.props.movies}
				/>
			</div>
		);
	}
}