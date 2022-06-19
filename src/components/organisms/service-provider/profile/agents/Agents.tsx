import React from 'react';
import Agent from '@organisms/agent';

const Agents = () => {
	return (
		<div>
			<Agent
				friends={[
					{
						user: {
							profile_photo: '/images/choose-your-avatar/avatar1.png',
							first_name: 'kalam',
							last_name: 'ovi',
						},
						mutual_friends: 20,
					},
					{
						user: {
							profile_photo: '/images/choose-your-avatar/avatar1.png',
							first_name: 'kalam',
							last_name: 'ovi',
						},
						mutual_friends: 20,
					},
					{
						user: {
							profile_photo: '/images/choose-your-avatar/avatar1.png',
							first_name: 'kalam',
							last_name: 'ovi',
						},
						mutual_friends: 20,
					},
					{
						user: {
							profile_photo: '/images/choose-your-avatar/avatar1.png',
							first_name: 'kalam',
							last_name: 'ovi',
						},
						mutual_friends: 20,
					},
				]}
			/>
		</div>
	);
};

export default Agents;
