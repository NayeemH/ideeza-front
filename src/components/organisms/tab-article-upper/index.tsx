import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import React from 'react';

function TabArticleUpper(props: any) {
	const {
		articalValue1,
		articalValue1Class,
		articalDate,
		articalDateClass,
		articalText,
		articalTextClass,
		valueLabel,
		iconLines,
		valueIcon,
		labelInnerClass,
		valueLabel2,
		valueIcon2,
		valueLabel3,
		valueIcon3,
		imgClass,
		imgSrc,
	} = props;
	return (
		<>
			<Label
				value={articalValue1}
				classes={{ root: `${articalValue1Class}` }}
			/>
			<Label
				value={articalDate}
				classes={{ root: `${articalDateClass}` }}
			/>
			<Label
				value={articalText}
				classes={{ root: `${articalTextClass}` }}
			/>
			<div className={iconLines}>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={valueLabel}
					iconContanerClass="text-xl"
					lableClass={{
						root: `${labelInnerClass}`,
					}}
					iconComponent={valueIcon}
				/>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={valueLabel2}
					iconContanerClass="text-lg"
					lableClass={{
						root: `${labelInnerClass}`,
					}}
					iconComponent={valueIcon2}
				/>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={valueLabel3}
					iconContanerClass="text-lg"
					lableClass={{
						root: `${labelInnerClass}`,
					}}
					iconComponent={valueIcon3}
				/>
			</div>
			<hr />
			<div className="md:w-2/5 w-full rounded-lg overflow-hidden my-2">
				<img
					src={imgSrc ?? '/images/bg.png'}
					className={imgClass}
					alt="Banner"
				/>
			</div>
		</>
	);
}
TabArticleUpper.defaultProps = {
	articalValue1Class: 'md:text-md text-[#333333] text-base 2xl:text-[24px]  font-semibold',
	articalDateClass: 'text-[#757575] 2xl:text-base sm  pt-2 underline ',
	articalTextClass: 'text-base 2xl:text-xl  text-gray-925 py-7 w-5/6',
	iconLines: 'flex pb-7',
	labelInnerClass: 'text-md text-gray-700  px-2',
	imgClass: 'w-full h-full',
	valueIcon: 'text-gray-800',
	valueIcon3: 'text-gray-800',
};
export default TabArticleUpper;
