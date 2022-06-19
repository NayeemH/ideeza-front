import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { FORMINPUT } from 'utils/styles';

const HourlyPrice = () => {
	return (
		<div className="col-span-3">
			<Label
				value="Hourly Rate"
				className="text-2xl text-gray-600 font-bold"
			/>
			<input className={FORMINPUT + ''} />
			<Label
				value="Weekly Limit"
				className="text-2xl text-gray-600 font-bold mt-4"
			/>
			<input className={FORMINPUT + ''} />
			<div className="mt-4">
				<Label
					value="Advance Option:"
					className="text-2xl font-bold text-primary"
				/>
				<Label
					value={
						<>
							Weekly Payment
							<span>
								<AiFillQuestionCircle className="text-primary inline" />
							</span>
						</>
					}
					className="text-[22px] font-bold mb-1"
				/>
				<CheckboxAtom /> <span>Yes</span>
				<CheckboxAtom /> <span>No</span>
			</div>
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

export default HourlyPrice;
