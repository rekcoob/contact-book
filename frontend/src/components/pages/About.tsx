import React from 'react';

export const About: React.FC = () => {
	return (
		<div>
			<h1>About This App</h1>
			<p className="my-1">
				This is a full stack React app for keeping contacts
			</p>
			<p className="bg-dark p">
				<strong>Version: </strong> 1.0.0
			</p>
		</div>
	);
};
