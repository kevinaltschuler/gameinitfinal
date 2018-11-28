import React from 'react';
import mapAPIkey from '../../CREDS.js';
import GoogleMapReact from 'google-map-react';

class AppContainer extends React.Component {
	static defaultProps = {
	    center: {
	      lat: 59.95,
	      lng: 30.33
	    },
	    zoom: 11
	};
 
  	render() {
	  	return (
		  	<div style={{ height: '100vh', width: '100%' }}>
			    <GoogleMapReact
			      bootstrapURLKeys={{ key: mapAPIkey }}
			      defaultCenter={this.props.center}
			      defaultZoom={this.props.zoom}
			    >
			    </GoogleMapReact>
			 </div>
		);
	}
}

export default AppContainer;
