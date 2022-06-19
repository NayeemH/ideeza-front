import Button from '@atoms/button';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import FixedPrice from '@organisms/fixed-price-proposal';
import HourlyPrice from '@organisms/Hourly-price';
import React, { useState } from 'react';

const Conversation = () => {
	const [type, setType] = useState('Fixed-price');
	return (
		<div>
			<Label
				value="Terms:"
				className="text-2xl text-primary font-bold my-4"
			/>

			<div className="w-full grid grid-cols-4 items-start">
				{type === 'Fixed-price' && <FixedPrice />}
				{type === 'Hourly' && <HourlyPrice />}
				<div className="ml-2 -mt-2">
					<Dropdown
						icons={
							<Label
								value={type}
								className=" text-primary font-bold text-sm w-full"
							/>
						}
						itemsClasses={{
							root: ' hover:text-primary text-zinc-500',
						}}
						options={[
							{
								value: 'Fixed price',
								name: 'Fixed price',
								func: () => setType('Fixed-price'),
							},
							{
								value: 'Hourly',
								name: 'Hourly',
								func: () => setType('Hourly'),
							},
						]}
						className="w-full"
					/>
				</div>
			</div>
			<div className="flex justify-start mb-1 mt-4">
				<Button
					value="Send"
					className="text-white bg-primary mx-2 px-5 text-xl font-semibold"
				/>
				<Button
					value="Cancel"
					className="text-gray-500 font-bold overflow-hidden bg-white px-5 border-2"
				/>
			</div>
		</div>
	);
};

export default Conversation;
