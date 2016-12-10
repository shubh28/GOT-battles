import React,{Component} from 'react';
import {Container,ListGroupItem,ListGroupItemHeading,ListGroupItemText,Col,Input,FormGroup,Row} from 'reactstrap';

export default class BattleList extends Component{
	render(){
		var key = this.props.data;
		return(
			<ListGroupItem>
				<ListGroupItemHeading className="text-sm-center"><strong>{key.name}</strong></ListGroupItemHeading><br></br>
				<ListGroupItemText>
						<strong>Status : </strong>{key.outcome}<br></br>
						<strong>Attacker King : </strong>{key.attacker_king}<br></br>
						<strong>Defender King : </strong>{key.defender_king}<br></br>
						<strong>Location : </strong>{key.location}<br></br>
						<strong>Region : </strong>{key.region}<br></br>
						<strong>My Army Size : </strong>{key.attacker_size}<br></br>
						<strong>Opposite Army Size : </strong>{key.defender_size}<br></br>
						<strong>My Commander : </strong>{key.attacker_commander}<br></br>
						<strong>Opposite Commander : </strong>{key.defender_commander}<br></br>						
				</ListGroupItemText>
			</ListGroupItem>
		);
	}
}