import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import React from 'react';
import { BsFlag } from 'react-icons/bs';

function TabReviewsDataUpper(props: any) {
	const {
		mainClass,
		leftSide,
		tabAvatar,
		innerSpanClass1,
		labelInnerClass1,
		innerSpanClass2,
		rightSideIcon,
		labelClass2,
		labelInner1,
		IconClass,
		labelInner2,
		valueInner1,
		rightLabelClass,
		valueInner2,
		rightValue,
		avatarSrc,
	} = props;

	return (
		<>
			<div className={mainClass}>
				<div className={leftSide}>
					<AvatarAtom
						variant="circular"
						className={tabAvatar}
						src={[avatarSrc]}
					/>
					<Label
						value={
							<>
								<span className="text-base font-semibold">{labelInner1}</span>
								<span className={innerSpanClass1}>{labelInner2}</span>
							</>
						}
						classes={{
							root: `${labelInnerClass1}`,
						}}
					/>
					<Label
						value={
							<>
								<span className="text-primary text-base font-semibold">
									{valueInner1}
								</span>
								<span className={innerSpanClass2}>{valueInner2}</span>
							</>
						}
						classes={{
							root: `${labelClass2}`,
						}}
					/>
				</div>
				<div>
					<IconLabel
						tooltipProps={{ open: false }}
						labelValue={rightValue}
						iconContanerClass="text-2xl"
						mainClass={rightSideIcon}
						lableClass={{
							root: `${rightLabelClass}`,
						}}
						iconComponent={<BsFlag className={IconClass} />}
					/>
				</div>
			</div>
		</>
	);
}
TabReviewsDataUpper.defaultProps = {
	mainClass: 'sm:flex mb-2 sm:mb-0 items-center justify-between',
	leftSide: 'sm:flex mb-2 sm:mb-0 items-center',
	tabAvatar: 'h-12 w-12',
	innerSpanClass1: 'text-[#999999]  text-[14px]',
	labelInnerClass1: 'text-xs  font-semibold text-gray-700 leading-4 flex flex-col pl-1 pr-4',
	innerSpanClass2: 'text-[#999999]  text-[14px]',
	labelClass2:
		'text-xs text-primary font-semibold flex flex-col pl-4 -mt-1 border-l border-current',
	rightSideIcon: 'flex items-center',
	IconClass: 'text-[#999999] text-2xl mr-3',
	rightLabelClass: 'text-[#999999] tracking-tight  text-base',
};
export default TabReviewsDataUpper;
