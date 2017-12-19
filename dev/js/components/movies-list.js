// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
"use strict";
import React from "react";

export default class MoviesList extends React.Component {
	render() {
		let searchHeader = <h2>Movie result: </h2>;
		if(this.props.movies.length === 0)
		{
			searchHeader = "";
		}

		return (
			<div className="movieresult">
				{
					searchHeader
				}
				
				<ul>
				{
					this.props.movies.map(function (movie, index) {
						return (
							<li key={movie.id}>
								<a href={movie.url}>
									<img src={movie.img} />
									<h3>{movie.title}</h3>
									<p>{movie.year}</p>
								</a>
							</li>
						)
					}, this)
				}
				</ul>
			</div>
		);
	}
}