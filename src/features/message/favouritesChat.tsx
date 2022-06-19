import Label from '@atoms/label';
import { Avatar } from '@mui/material';
import React from 'react';
function FavouritesChat() {
	return (
		<div>
			<h4 className="text-md font-semibold mb-2 px-4">Favourites</h4>
			<div className="flex flex-nowrap overflow-x-auto px-4">
				<div className="flex flex-col items-center mr-6">
					<Avatar
						className="xl:w-20 xl:h-20  w-10 h-10"
						src={'/images/choose-your-avatar/avater13.png'}
					/>
					<div>
						<Label
							className=""
							value="Daniel"
						/>
					</div>
				</div>
				<div className="flex flex-col items-center mr-6">
					<Avatar
						className="xl:w-20 xl:h-20  w-10 h-10"
						src={'/images/choose-your-avatar/avater13.png'}
					/>
					<div>
						<Label
							className=""
							value="Daniel"
						/>
					</div>
				</div>
				<div className="flex flex-col items-center mr-6">
					<Avatar
						className="xl:w-20 xl:h-20  w-10 h-10"
						src={'/images/choose-your-avatar/avater13.png'}
					/>
					<div>
						<Label
							className=""
							value="Daniel"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FavouritesChat;
