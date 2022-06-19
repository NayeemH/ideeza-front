/* eslint-disable react/jsx-pascal-case */
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import React from 'react';

import { AiFillStar } from 'react-icons/ai';

function NewsCard(props: any) {
	const {
		secClass,
		spnsrValue,
		spnsrValueClasses,
		desc,
		uprValue,
		datevalue,
		uprlabelClasses,
		lowerlabelClasses,
		bottomClass,
		innerClass,
		img,
		imgClass,
	} = props;
	return (
		<>
			<div className={secClass}>
				<img
					src={img}
					className={`w-full ${imgClass}`}
					alt=""
				/>
				<div className={innerClass}>
					<IconLabel
						tooltipProps={{ open: false }}
						labelValue={spnsrValue}
						iconContanerClass="text-lg"
						lableClass={{
							root: `text-[#999999] uppercase tracking-tight ml-1 text-base 2xl:text-xl font-proxima-nova ${spnsrValueClasses}`,
						}}
						iconComponent={<AiFillStar className="text-[#999999] text-xl" />}
					/>
					<Label
						value={uprValue}
						classes={{ root: `${uprlabelClasses}` }}
					/>
					<Label
						value={desc}
						classes={{ root: `${lowerlabelClasses}` }}
					/>
				</div>
				<Label
					value={datevalue}
					classes={{ root: `${bottomClass}` }}
				/>
			</div>
		</>
	);
}
NewsCard.defaultProps = {
	secClass: 'rounded-t-lg rounded-b-md overflow-hidden bg-white shadow-md',
	img: '/images/feeds/sponsor.png',
	imgClass: '',
	innerClass: 'pl-[20px] py-[20px] pr-[15px] ',
	uprlabelClasses: 'pt-1 text-base 2xl:text-xl text-sm',
	lowerlabelClasses: 'pt-4 tracking-tight text-base 2xl:text-xl pb-1',
	bottomClass: 'border-t border-gray-400 px-5 pt-1 pb-3 text-[#999999] text-base 2xl:text-xl',
};
export default NewsCard;
