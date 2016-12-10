import React, { Component } from 'react';
import { Container,Row,Col } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router';
import Mynav from './Mynav';
import Kings from './Kings';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['name']

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			kings : [],
			searchTerm : ''
		};
		this.renderCard = this.renderCard.bind(this);
		this.searchUpdated = this.searchUpdated.bind(this);
	}
	componentDidMount() {
		//getting all the kings
	    axios.get('http://localhost:3000/kings')
	      .then(res => {
	        const kings = res.data;
	        this.setState({ kings });
	      });
  	}
  	renderCard(key){
  		//rendering all the kings in card form
  		return(
  			<Kings kingData={key} key={key.name}/>
	  	);
  	}
	searchUpdated (term) {
		//search filter to search by name
		this.setState({searchTerm: term})
	}
	render() {
		const filteredKings = this.state.kings.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
		return (
			<div>
				<Mynav/>
				  <Container>
				  	<Row>
				  		<br></br>
			  			<h1 className="text-xs-center">Kings from Westeros</h1>
			  			<br></br>
			  			<Row><Col sm={{size:8,offset:2}}><SearchInput className="form-cont" placeholder="Search by King name" onChange={this.searchUpdated} /></Col></Row><br></br>
			  			{filteredKings.map(this.renderCard)}
				  	</Row>
				  </Container>
			</div>	  
		);
}
}
