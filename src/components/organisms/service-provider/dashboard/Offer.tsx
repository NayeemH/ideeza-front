import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import React, { useState } from 'react';
import { FORMINPUT } from 'utils/styles';

const Offer = () => {
	const [type, setType] = useState('Fixed-price');
	return (
		<div>
			<div className="grid grid-cols-4 items-start overflow-x-hidden">
				<Label
					value={
						<>
							Project Duration: <span className="text-primary">29 Sep -16 Oct</span>
						</>
					}
					className="text-[22px] col-span-3 "
				/>
				<div className="w-full flex justify-end ml-3">
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
			{type === 'Hourly' ? (
				<div>
					<Label
						value="Weekly Payment"
						className="text-2xl text-gray-600 font-bold"
					/>
					<input
						className={FORMINPUT + ''}
						placeholder="Yes"
					/>
					<Label
						value="Hourly Rate"
						className="text-2xl text-gray-600 font-bold"
					/>
					<input
						className={FORMINPUT + ''}
						placeholder="33.00 /hr"
					/>
					<Label
						value="Weekly Limit"
						className="text-2xl text-gray-600 font-bold"
					/>
					<input
						className={FORMINPUT + ''}
						placeholder="40 hrs/week"
					/>
				</div>
			) : (
				<Label
					value={
						<>
							Cost: <span className="text-primary p-2 bg-zinc-100 ml-1">$255</span>
						</>
					}
					className="text-[22px] my-2"
				/>
			)}

			<div className="flex items-center mb-5">
				<CheckboxAtom />
				<Label
					value={
						<>
							Yes, I understand and agree to the{' '}
							<span className="text-primary">ideeza Terms of Service , </span>
							including <span className="text-primary">User Agreement</span> and
							<span className="text-primary"> privacy Policy.</span>
						</>
					}
					className="text-xl"
				/>
			</div>
			<div className="mb-2">
				{' '}
				<Button
					value="Except Offer"
					className="bg-primary font-bold text-white px-2 mx-2"
				/>
				<Button
					value="Cancel"
					className="text-gray-500 font-bold overflow-hidden bg-white px-2 border-2"
				/>
			</div>
		</div>
	);
};

export default Offer;
