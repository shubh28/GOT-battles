import React,{Component} from 'react';
import axios from 'axios';
import {Container,ListGroupItem,ListGroupItemHeading,ListGroupItemText,Col,Input,FormGroup,Row} from 'reactstrap';
import Mynav from './Mynav';
import BattleList from './BattleList';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['name', 'attacker_king', 'defender_king']
export default class Battle extends Component{
	constructor(props){
		super(props);
		this.state = {
			battles : [],
			tagBattles : [],
			searchTerm : '',
			tags : []
		};
		this.renderBattle = this.renderBattle.bind(this);
		this.searchUpdated = this.searchUpdated.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
	}
	componentDidMount(){
		//getting all the battles of king selected
		var name = this.props.params.king
		axios.get('http://localhost:3000/battles/'+name)
	      .then(res => {
	        const battles = res.data;
	        const tagBattles = res.data;
	        this.setState({ battles,tagBattles });
	      });
	    //getting tags to be used for filtering
	    axios.get('http://localhost:3000/battles/filter/tags')
	      .then(res => {
	        const tags = res.data;
	        this.setState({ tags });
	      });
	}
	renderBattle(key){
		//render the battles with all the data
		return(
			<BattleList data={key} key={key.name}/>
		);
	}
	searchUpdated (term) {
		//setting state for the search filter
	    this.setState({searchTerm: term})
	}
	applyFilter(event){
		//custom function for battle type filter
		var tag = event.target.value;
		var tagBattles = this.state.battles.filter(obj=>{
			//console.log(obj);
			if(tag === 'All'){
				return true;
			}
			else{	
				if(obj.battle_type === tag)
					return true;
				else
					return false	
			}
		});
		this.setState({tagBattles})
	}
	render(){
		const filteredBattles = this.state.tagBattles.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
		return(
			<div>
				<Mynav />
				<Container ><br></br>
					<h1 className="text-sm-center">Battles Faught By {this.props.params.king}</h1>
					<br></br>
					<Row>
				        <Col sm={8}>
				        	<SearchInput className="form-cont" placeholder="Search by Battle name,attacker name or defender name " onChange={this.searchUpdated} />
				        </Col>
				        <Col sm={4}>
					        <FormGroup>
					          <Input type="select" onChange={this.applyFilter}>
					          	<option>All</option>
					        	{this.state.tags.map(key=>{
					        		return(
					        			<option key={key} value={key}>{key}</option>
					        		);
					        	})}
					          </Input>
					        </FormGroup>
					    </Col>   
					</Row>     	        
						{filteredBattles.map(this.renderBattle)}
				</Container>
			</div>	
		);
	}
}