import React from 'react';
import Modal from 'react-modal';

import MapView from './../components/MapView';
import generateCollectables from './../components/generateCollectables';

Modal.setAppElement('#root');

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AppContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			center: {lat: 0, lng: 0},
			zoom: 11,
			collectables: [],
			modalIsOpen: false
		}

		this.onKey = this.onKey.bind(this);
		this.setInitialLocation = this.setInitialLocation.bind(this);
		this.openModal = this.openModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
		document.onkeydown = this.onKey;
	}

	openModal() {
	    this.setState({modalIsOpen: true});
	}

	closeModal() {
	    this.setState({modalIsOpen: false});
	}

	onKey(e) {

	    e = e || window.event;

	    if (e.keyCode == '87') {
	        // W
	        this.setState({
	        	center: {lat: this.state.center.lat += .0005, lng: this.state.center.lng}
	        });
	    }
	    else if (e.keyCode == '65') {
	        // A
	        this.setState({
	        	center: {lat: this.state.center.lat, lng: this.state.center.lng -= .0005}
	        });
	    }
	    else if (e.keyCode == '68') {
	       // D
	       this.setState({
	        	center: {lat: this.state.center.lat, lng: this.state.center.lng += .0005}
	        });
	    }
	    else if (e.keyCode == '83') {
	       // S
	       this.setState({
	        	center: {lat: this.state.center.lat -= .0005, lng: this.state.center.lng}
	       });
	    }

	   this.checkCollect();

	}

	checkCollect() {
		const {center} = this.state;
		for (var i in this.state.collectables) {
			const c = this.state.collectables[i];
			if (distance(center.lat, center.lng, c.lat, c.lng) < 0.02) {
				this.state.collectables.splice(i, 1);
				this.setState({ ...this.state, collectables: this.state.collectables})
			}
		}

		if(this.state.collectables.length <= 0) {
			this.openModal();
		}
	}

	setInitialLocation(position) {
		const center = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		const collectables = generateCollectables(center);
		this.setState({collectables, center});
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(this.setInitialLocation);
	}
 
  	render() {
	    if (!navigator.geolocation) {
	        return <div>geolocation is not supported by this browser.</div>
	    }
	    if (this.state.center.lat == 0) {
	    	return <div style={{width: '100%', padding: '200px 50%'}}>loading</div>;
	    }
	  	return (
	  		<div>
	  			<Modal
		          isOpen={this.state.modalIsOpen}
		          onRequestClose={this.closeModal}
		          style={modalStyles}
		          contentLabel="Example Modal"
		        >

		          <h2>Youve Done it!</h2>
		          <div>here is your clue: CLUE 1</div>
		          <button onClick={this.closeModal}>close</button>
		        </Modal>
		  		<MapView center={this.state.center} collectables={this.state.collectables} />
		  	</div>
		);
	}
}


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

export default AppContainer;
