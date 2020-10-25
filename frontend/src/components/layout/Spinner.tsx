import React from 'react';
import spinner from './spinner.gif';

export const Spinner: React.FC = () => (
	<>
		<img
			src={spinner}
			style={{ width: '200px', margin: 'auto', display: 'block' }}
			alt="Loading..."
		/>
	</>
);
