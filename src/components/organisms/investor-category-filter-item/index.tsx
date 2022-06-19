import { FC } from 'react';
import CustomTooltip from '@atoms/custom-tooltip';
import { IInvestoryCategory } from '@models/investor';
import IconLabel from '@molecules/icon-label';
import { Box } from '@mui/material';

interface InvestorCatFilterItemType {
	category?: IInvestoryCategory;
	categoryIndex?: number | undefined;
	icon?: any;
	areaRef?: any;
	handleMouseMove?: any;
	popperProps?: any;
	onClickFilter?: any;
	isActive?: boolean;
}

const InvestorCategoryFilterItem: FC<InvestorCatFilterItemType> = (props) => {
	const {
		category,
		categoryIndex,
		icon,
		onClickFilter,
		isActive,
		areaRef,
		handleMouseMove,
		popperProps,
	} = props;
	return (
		<IconLabel
			iconContanerClass=""
			mainClass=""
			iconComponent={
				<CustomTooltip
					title={
						<div className="bg-white w-full h-full ">
							{category?.name && (
								<div className="relative pl-4 text-[24px] font-medium mb-4">
									{category.name}
									<div className="absolute h-1 w-20 bg-primary bottom-0"></div>
								</div>
							)}
							{category?.description && (
								<div className="text-base pl-4 text-[#787878] mb-[16px] custom-line-height-28">
									{category.description}
								</div>
							)}
							{category?.image && (
								<img
									src={category.image}
									className="w-full"
									alt="Category banner"
								/>
							)}
						</div>
					}
					placement="top-start"
					arrow
					PopperProps={popperProps}
				>
					<Box
						ref={areaRef}
						onMouseMove={handleMouseMove}
						sx={{
							bgcolor: 'white',
							color: 'primary.contrastText',
							p: 0,
						}}
					>
						<div
							className={`circle circle${Number(categoryIndex) + 1}${
								isActive ? ' circle-active' : ''
							}`}
							onClick={onClickFilter}
						>
							{icon}
						</div>
					</Box>
				</CustomTooltip>
			}
		/>
	);
};

export default InvestorCategoryFilterItem;
