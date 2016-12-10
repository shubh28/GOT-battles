import React, { Component } from 'react';
import { Container,Row,Col,Card, CardImg, CardText, CardBlock,CardTitle, CardSubtitle, Button } from 'reactstrap';
import {Link} from 'react-router';

export default class Kings extends Component{
	render(){
		var key = this.props.kingData;
		var name = key.name.split('/')[0];
		return(
			<Col sm={{size:4}}>
				<Card >
					<CardImg width="100%" height="70%" src={key.img_url} className="image-responsive" />
					<CardBlock>
						<CardTitle>{key.name}</CardTitle>
						<Link to={name}><Button>Get Battles</Button></Link>
					</CardBlock>
				</Card>
	  		</Col>
		);
	}
}