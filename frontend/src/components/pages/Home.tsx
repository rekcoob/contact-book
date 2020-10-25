import React from 'react';

export const Home: React.FC = () => {
	return (
		<div className="my-3">
			<h1 className="text-center my-2 large">
				Welcome to <span className="text-primary">Contact Book</span>
			</h1>

			<div className="text-center my-2">
				<h4 style={{ marginTop: '1rem', fontSize: '2rem' }}>Test Login is</h4>
				<p className="lead">
					<b>email:</b> test@gmail.com <br />
					<b>password:</b> 123456
				</p>
				{/* <p className="bg-dark p">
					<strong>Version: </strong> 1.0.0
				</p> */}
			</div>
		</div>
	);
};
