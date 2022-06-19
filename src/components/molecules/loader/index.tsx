import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress />
			</div>
		</>
	);
}

export default Loader;
