// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
"use strict";
import React from "react";

export default class GifsList extends React.Component {
	render() {
		let searchHeader = <h2>Gifs result: </h2>;
		if(this.props.gifs.length === 0)
		{
			searchHeader = "";
		}

		return (
			<div className="gifresult">
				{
					searchHeader
				}
				
				<ul>
				{
					this.props.gifs.map(function (gif, index) {
						return (
							<li key={gif.id}>
								<a href={gif.url}><img src={gif.img} /></a>
							</li>
						)
					}, this)
				}
				</ul>
			</div>
		);
	}
}