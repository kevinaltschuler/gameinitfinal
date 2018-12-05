import React from 'react';
let mapAPIkey;
try {
	mapAPIkey = require('../../CREDS.js').default;
} catch (ex) {
    console.log(ex, 'no creds file so using env var');
}
import GoogleMapReact from 'google-map-react';
import styles from './styles.js';
import Collectable from './Collectable';
import Player from './Player';
import generateCollectables from './generateCollectables';

class MapView extends React.Component {
	static defaultProps = {
	    center: {
	      lat: 0,
	      lng: 0
	    },
	    zoom: 15
	};

  	render() {

	    if (!navigator.geolocation) {
	        return <div>geolocation is not supported by this browser.</div>
	    }

	    const key = mapAPIkey || process.env.GOOGLEMAPSAPIKEY;

	    console.log(key);

	  	return (
		  	<div style={{ height: '100vh', width: '100%' }}>
			    <GoogleMapReact
			      bootstrapURLKeys={{ key }}
			      center={this.props.center}
			      zoom={this.props.zoom}
			      options={{styles: styles}}
			    >
			    	{this.props.collectables.map((c, index) => <Collectable key={index} lat={c.lat} lng={c.lng} />)}
			    	<Player
			    		lat={this.props.center.lat}
			    		lng={this.props.center.lng}
			    	/>
			    </GoogleMapReact>
			 </div>
		);
	}
}

export default MapView;
