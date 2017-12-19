// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
"use strict";
import React from "react";

export default class TracksList extends React.Component {
	render() {
		let searchHeader = <h2>Music result: </h2>;
		if(this.props.tracks.length === 0)
		{
			searchHeader = "";
		}

		return (
			<div className="trackresult">
				{
					searchHeader
				}
				
				<ul>
				{
					this.props.tracks.map(function (track, index) {
						return (
							<li key={track.id}>
								<a href={track.url}>
									<img src={track.img} />
									<h3>{track.name}</h3>
									<ul className="artist">
										{
											track.artist.map(function (artist, index) {
												return (
													<li key={index}><p>{artist}</p></li>
												)
											}, this)
										}
									</ul>
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