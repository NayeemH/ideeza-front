import { FC, useRef, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { TiPlus } from 'react-icons/ti';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Label from '@atoms/label';
import Button from '@atoms/button';
import IconLabel from '@molecules/icon-label';
import Box from '@mui/material/Box';
// import Tooltip from "@mui/material/Tooltip";
import { Instance } from '@popperjs/core';
import { PricingPlanProps } from '@models/pricing-plan';
import { formatAmount } from 'utils/utils';
import { IoClose } from 'react-icons/io5';

const PricingPlanSingle: FC<PricingPlanProps> = (props) => {
	const {
		plan,
		rootClasses,
		pricingBottomBg,
		borderColor,
		planNameClasses,
		planSloganClasses,
		planLogoClasses,
		tickIconClasses,
		tickLabelClasses,
		isTickListBoxed,
		plusLabelClasses,
		btnGroupClasses,
		btnHelperClasses,
		onClickSubscribe,
		btnLoading,
		btnDisabled,
	} = props;

	const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const popperRef = useRef<Instance>(null);
	const areaRef = useRef<HTMLDivElement>(null);
	const [isShownBottomPrice, setIsShownBottomPrice] = useState(false);
	const onMouseEnterBottomPrice = () => setIsShownBottomPrice(!isShownBottomPrice);

	const handleMouseMove = (event: React.MouseEvent) => {
		positionRef.current = { x: event.clientX, y: event.clientY };

		if (popperRef.current != null) {
			popperRef.current.update();
		}
	};

	const tickListBoxedClasses =
		'bg-white grid grid-cols-2 gap-x-[90px] xl:py-[14px] xl:pl-[24px] xl:p-[24px] xl:mt-[30px] xl:mx-0 rounded';
	const priceMonthly = Number(plan?.price_monthly || 0);
	const priceYearly = Number(plan?.price_yearly || 0);
	const isFreePlan = priceMonthly <= 0;
	const activeProjectCount = plan?.features?.active_project;
	const additionalTeammate = plan?.features?.additional_teammate;
	const teammateCost = plan?.features?.teammate_cost;

	return (
		<div
			className={`flex h-full w-full flex-col justify-between mt-10 rounded-lg  transform transition duration-500 hover:scale-y-105 opacity-70 hover:opacity-100 cursor-pointer relative shadow-3xl ${rootClasses}`}
			onMouseEnter={onMouseEnterBottomPrice}
			onMouseLeave={onMouseEnterBottomPrice}
		>
			{plan?.is_popular && (
				<div className="text-[16px] leading-[29px] font-poppins bg-primary text-white w-[233px] absolute left-0 top-[-40px] rounded-tr-[10px] py-[5px] text-center">
					Most Popular
				</div>
			)}

			<div className="px-[20px]">
				<div className="flex  text-center space-x-14 lg:space-x-8 xl:space-x-[20px] pt-[20px]">
					{plan?.image && (
						<img
							src={plan.image}
							className={planLogoClasses}
							alt="logo"
						/>
					)}
					<div className="flex flex-col items-start">
						{plan?.name && (
							<Label
								value={plan.name}
								classes={{ root: `${planNameClasses}` }}
							/>
						)}
						{plan?.slogan && (
							<Label
								value={plan.slogan}
								classes={{ root: `${planSloganClasses}` }}
							/>
						)}
						<hr
							className={`border-t-2 xl:border-t-3 w-14 mt-2 border-[${borderColor}]`}
						/>
					</div>
				</div>
				<div
					className={`pl-3 mt-6 p-3  lg:mx-2 ${
						isTickListBoxed ? tickListBoxedClasses : 'space-y-2 mx-16 mt-10'
					}`}
				>
					<IconLabel
						mainClass="flex items-center mr-3 bg-transparent"
						tooltipProps={{ open: false }}
						labelValue={'Electronics'}
						iconContanerClass="text-lg"
						lableClass={{
							root: `tracking-tight font-poppins ${tickLabelClasses}`,
						}}
						iconComponent={
							(plan?.features?.electronics && (
								<GoCheck className={tickIconClasses} />
							)) || <IoClose className="text-red-600" />
						}
					/>
					<IconLabel
						mainClass="flex items-center mr-3 bg-transparent"
						tooltipProps={{ open: false }}
						labelValue={'Code'}
						iconContanerClass="text-lg"
						lableClass={{
							root: `tracking-tight font-poppins ${tickLabelClasses}`,
						}}
						iconComponent={
							(plan?.features?.code && <GoCheck className={tickIconClasses} />) || (
								<IoClose className="text-red-600" />
							)
						}
					/>
					<IconLabel
						mainClass="flex items-center mr-3 bg-transparent"
						tooltipProps={{ open: false }}
						labelValue={'Cover'}
						iconContanerClass="text-lg"
						lableClass={{
							root: `tracking-tight font-poppins ${tickLabelClasses}`,
						}}
						iconComponent={
							(plan?.features?.cover && <GoCheck className={tickIconClasses} />) || (
								<IoClose className="text-red-600" />
							)
						}
					/>
					<IconLabel
						mainClass="flex items-center mr-3 bg-transparent"
						tooltipProps={{ open: false }}
						labelValue={'Social'}
						iconContanerClass="text-lg"
						lableClass={{
							root: `tracking-tight font-poppins ${tickLabelClasses}`,
						}}
						iconComponent={
							(plan?.features?.social && <GoCheck className={tickIconClasses} />) || (
								<IoClose className="text-red-600" />
							)
						}
					/>
				</div>
				{
					// Starts: Plus Icon Feature list
					!isFreePlan && (
						<div className={`mx-auto space-y-1 xl:ml-[30px] mt-[20px]`}>
							{activeProjectCount > 0 && (
								<IconLabel
									mainClass="flex items-start"
									tooltipProps={{ open: false }}
									labelValue={`
                    ${activeProjectCount} active project${(activeProjectCount > 1 && 's') || ''}${
										(additionalTeammate &&
											` per account (additional teammate ${formatAmount(
												teammateCost,
												0
											)}/month)`) ||
										''
									}
                  `}
									iconContanerClass="text-lg"
									lableClass={{
										root: `tracking-tight font-poppins ${plusLabelClasses}`,
									}}
									iconComponent={<TiPlus className="text-lg text-primary mt-1" />}
								/>
							)}
							{
								plan?.features?.in_platform_purchase && (
									// <Tooltip
									//   title={<div> {" "} <span className="text-primary">In platform purchases</span> - (Third party service costs) Cloud - App marketingservice - Certification - Manufacturing patents, Industrial designers,engineers, marketing, AI, big data, graphic designers, lawyers </div>}
									//   placement="top"
									//   PopperProps={{ popperRef, anchorEl: {
									//     getBoundingClientRect: () => {
									//       return new DOMRect( positionRef.current.x, areaRef.current!.getBoundingClientRect().y,	0, 0);
									//     }},
									//   }}
									//   arrow
									// >
									<Box
										ref={areaRef}
										onMouseMove={handleMouseMove}
									>
										<IconLabel
											mainClass="flex items-start"
											tooltipProps={{ open: false }}
											labelValue={'In platform purchases'}
											iconContanerClass="text-lg"
											lableClass={{
												root: `tracking-tight font-poppins ${plusLabelClasses}`,
											}}
											iconComponent={
												<TiPlus className="text-lg text-primary mt-1" />
											}
										/>
									</Box>
								)
								// </Tooltip>
							}
							{plan?.features?.consult_support && (
								<IconLabel
									mainClass="flex items-start"
									tooltipProps={{ open: false }}
									labelValue={'Consult support'}
									iconContanerClass="text-lg"
									lableClass={{
										root: `tracking-tight font-poppins ${plusLabelClasses}`,
									}}
									iconComponent={<TiPlus className="text-lg text-primary mt-1" />}
								/>
							)}
						</div>
					)
					// Ends: Plus Icon Feature list
				}
			</div>
			<div className={`${pricingBottomBg} h-full z-50 w-full`}>
				<Label
					value={plan?.is_public ? 'Public' : 'Private'}
					classes={{
						root: 'text-xl lg:text-[24px] 2xl:text-[32px] font-normal text-center uppercase font-poppins text-[#333333] absolute bottom-[142px] left-[124px] opacity-[0.2]',
					}}
				/>
				<div
					className={`flex ${
						isShownBottomPrice ? 'flex-col-reverse' : 'flex-col'
					} items-center mx-auto absolute custom-bottom-p w-full px-10 ${btnGroupClasses}`}
				>
					<Button
						iconEnd={<FaLongArrowAltRight className="text-4xl font-bold" />}
						value={isFreePlan ? 'Free' : `${formatAmount(priceMonthly, 3)}`}
						classes={{
							root: 'bg-white text-xl xl:text-[24px] font-semibold shadow-md rounded-xl py-4 w-full',
						}}
						className={`text-[${borderColor}]`}
						loading={btnLoading}
						disabled={btnDisabled}
						onClick={() => onClickSubscribe(plan?.id, 'MONTHLY')}
					/>
					{
						!isFreePlan && (
							<div
								className={`bg-[#333333] px-10 py-1.5 shadow-md rounded-none text-white text-[14px] 2xl:text-base ${
									isShownBottomPrice ? 'rounded-t-2xl' : 'rounded-b-2xl'
								} ${btnHelperClasses}`}
								onClick={() => onClickSubscribe(plan?.id, 'YEARLY')}
							>
								{`${formatAmount(priceMonthly, 0)} X 12 = ${formatAmount(
									priceYearly,
									0
								)}`}
							</div>
						)
						// : (
						//   <div
						//     className={`bg-[#333333] px-10 py-1.5 shadow-md rounded-none text-white text-[14px] 2xl:text-base ${
						//       isShownBottomPrice ? "rounded-t-2xl" : "rounded-b-2xl"
						//     } ${btnHelperClasses}`}
						//   >
						//     {`${formatAmount(0, 0)} X 12 = ${formatAmount(0, 0)}`}
						//   </div>
						// )
					}
				</div>
			</div>
		</div>
	);
};

PricingPlanSingle.defaultProps = {
	rootClasses: 'bg-pink-100',
	popularTagImgClasses: 'h-18 w-18',
	planLogoClasses: 'w-[54px] h-[58px]',
	planNameClasses: 'xl:text-[24px] text-lg leading-[41px] text-[#333333] font-[500] font-poppins',
	planSloganClasses:
		'text-[18px] leading-[24px] text-left text-[#787878] font-poppins uppercase font-normal',
	tickIconClasses: 'text-[#01FF00] w-5',
	tickLabelClasses: 'text-[16px] leading-[29px] text-[#333333] pl-2',
	plusLabelClasses: 'text-[16px] leading-[29px] text-[#333333] pl-1',
	isTickListBoxed: true,
};
export default PricingPlanSingle;
