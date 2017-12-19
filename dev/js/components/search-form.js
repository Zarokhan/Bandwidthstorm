// Robin Andersson, AE5929, paul.robin.andersson@gmail.com
"use strict";
import React from "react";

export default class SearchForm extends React.Component {
	render() {
		return (
			<div className="searchform">
				<h1>bandwidthstorm</h1>
				<h2>Robin Andersson, Assignment 6</h2>
				<form>
					<input type="text" ref={(searchinput) => this.searchinput = searchinput} placeholder="bandwidthstorm search query" />
					<button onClick={this.handleSearch.bind(this)} >Search</button>
				</form>
			</div>
		);
	}

	handleSearch(event) {
		event.preventDefault();
		let input = this.searchinput.value;
		if (input.length == 0) {
			alert("Enter search term");
			return;
		}

		this.props.search(input);
	}
}