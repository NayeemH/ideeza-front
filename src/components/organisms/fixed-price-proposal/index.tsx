import Label from '@atoms/label';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { FORMINPUT } from 'utils/styles';

const FixedPrice = () => {
	return (
		<div className="col-span-3">
			<Label
				value="Total Amount"
				className="text-2xl text-gray-600 font-bold"
			/>
			<input className={FORMINPUT + ''} />
			<Label
				value="Time Consuming"
				className="text-2xl text-gray-600 font-bold mt-4"
			/>
			<select
				name="cars"
				id="cars"
			>
				<option value="volvo">1 Day</option>
				<option value="saab">2 Day</option>
				<option value="mercedes">7 Day</option>
			</select>
			<div className="mt-4">
				<Label
					value="Advance Option:"
					className="text-2xl font-bold text-primary"
				/>
				<Label
					value={
						<>
							Start Date{' '}
							<span>
								<AiFillQuestionCircle className="text-primary inline" />
							</span>{' '}
						</>
					}
					className="text-[22px] font-bold mb-1"
				/>
				<input className={FORMINPUT + ' '} />
			</div>
		</div>
	);
};

export default FixedPrice;
