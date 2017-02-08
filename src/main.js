import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as icons from './icons';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			items: [],
			active: 0
		};
		this.handleTab = this.handleTab.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}
	componentDidMount() {
		//Load XML file
	    const xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "data/data.xml", false);
	    xhttp.send();
	    const xmlDoc = xhttp.responseXML;
	    //Get totals
	    const totals = xmlDoc.getElementsByTagName('total');
	    if(!totals.length) return;
	    //Create array of objects
	    let items = [];
	    for (let i = 0; i < totals.length; i++) {
	    	const total = totals[i];
	    	items.push({
	    		name: total.getAttribute('for'),
	    		url: total.getAttribute('url'),
	    		points: total.textContent
	    	});
	    }
	    this.setState({
	    	items
	    });
	}
	handleInput(event){
		const items = this.state.items;
		items[event.target.dataset.key].name = event.target.value;
		this.setState({
			items
		});
	}
	handleTab(event){
		this.setState({
			active: event.target.dataset.key
		});
	}
	renderTabs(){
		return this.state.items.map((item, key)=>{
			const index = key + 1;
			return(
				<li id={"tab-"+index}
					onClick={this.handleTab}
					key={key}
					data-key={key}
					aria-controls={'panel-'+index}
					aria-selected={key == this.state.active ? true : false}
					role="tab"
					className={'tablist__tab ' + (key == this.state.active ? 'tablist__tab--is-active' : null)}>
					{item.name}
				</li>
			);
		});
	}
	renderIcon(key){
		switch (key){
			case 0:
				return icons.c3p0;
			case 1:
				return icons.vadar;
			case 2:
				return icons.bb8;
			case 3:
				return icons.fett;
			default:
				return <span>No Icon</span>;
		}
	}
	renderItems(){
		return this.state.items.map((item, key)=>{
			const index = key + 1;
          	return(
	          	<div className={'m_tabpanel ' + (key==this.state.active ? 'm_tabpanel--is-active': null)}
	          		key={key} id={"panel-"+index}
	          		aria-labelledby={"tab-"+index}
	          		aria-hidden={key == this.state.active ? true : false}
	          		role="tabpanel">
	          		<div className="m_tabpanel_icon">
	          			{this.renderIcon(key)}
	          		</div>
		            <div className="m_tabpanel_content">
		            	<input type="text" 
		            			data-key={key}
		            			onChange={this.handleInput}
		            			value={item.name}
		            			className="m_tabpanel_input"/>
		              	<h2 className="m_tabpanel_title">{item.name}</h2>
		              	<p>{item.points} points</p>
		            </div>
	          	</div>
        	);
		});
	}
	render(){
		return(
			<div>
				<ul role="tablist" className="m_tablist">
					{this.renderTabs()}
				</ul>
				<div className="c_tabpanels">
					{this.renderItems()}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));