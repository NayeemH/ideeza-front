import Link from 'next/link';
import React, { Component } from 'react';

class NotFound extends Component {
	render() {
		return (
			<div
				className="flex justify-center items-center"
				style={{ height: '100vh' }}
			>
				<div className="p-10">
					<div
						style={{
							maxWidth: '500px',
							margin: '0 auto 2rem',
						}}
					>
						<img
							className="w-full"
							src="/static/images/404.jpg"
							alt="404"
						/>
					</div>
					<div className="text-center pt-8">
						<Link href="/">
							<a className="bg-gray-800 text-white py-2 px-4">Back to Homepage</a>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

class ErrorDefault extends Component {
	render() {
		return (
			<div className="p-10">
				<div className="text-center">
					<img
						src="/static/images/opps.png"
						alt="Opps..."
						style={{
							display: 'table',
							margin: '0 auto',
						}}
					/>
					<p>An error occurred on client</p>
				</div>
			</div>
		);
	}
}

export { NotFound, ErrorDefault };
