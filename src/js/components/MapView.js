import React from 'react';
import mapAPIkey from '../../CREDS.js';
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
	    zoom: 11
	};

  	render() {

	    if (!navigator.geolocation) {
	        return <div>geolocation is not supported by this browser.</div>
	    }

	  	return (
		  	<div style={{ height: '100vh', width: '100%' }}>
			    <GoogleMapReact
			      bootstrapURLKeys={{ key: mapAPIkey }}
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
