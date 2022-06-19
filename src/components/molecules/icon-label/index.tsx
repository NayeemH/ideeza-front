import React from 'react';
import Label from '@atoms/label';
import { Tooltip } from '@mui/material';

interface IProps {
	mainClass?: string;
	iconContanerClass?: string;
	labelIconContaniter?: any;
	uploadContentContainer?: any;
	iconComponent?: JSX.Element | React.ReactNode;
	labelValue?: any;
	isRookie?: any;
	lableClass?: any;
	labelClassName?: any;
	iconContent?: any;
	labelContent?: any;
	iconContentLeft?: any;
	contentName?: any;
	iconContentRight?: any;
	labelStyle?: React.CSSProperties;
	tooltipProps?: any;
	rawClick?: boolean;
	isLabelIconContaniner?: boolean;
	isUploadContent?: boolean;
	goto?: any;
	onClick?: (e?: any) => void;
	style?: React.CSSProperties;
}

function IconLabel(props: IProps) {
	const {
		mainClass = 'flex items-center mr-3 bg-white',
		iconContanerClass = 'bg-white flex items-center justify-center text-3xl rounded-full w-8 h-8',
		iconComponent,
		labelValue,
		lableClass = { root: 'text-base 2xl:text-xl text-[#999999]' },
		labelClassName,
		labelStyle,
		tooltipProps,
		onClick,
		goto,
		rawClick,
		isLabelIconContaniner,
		uploadContentContainer,
		isUploadContent,
		labelIconContaniter,
		iconContent,
		labelContent,
		iconContentLeft,
		style,
		contentName,
		iconContentRight,
		isRookie,
	} = props;
	return (
		<div
			className={mainClass}
			onClick={(e: any) =>
				onClick !== undefined ? (rawClick ? onClick(e) : onClick(goto)) : ''
			}
			style={style}
		>
			{isLabelIconContaniner ? (
				<div className={`flex items-center xl:gap-2 ${labelIconContaniter}`}>
					<div className="">{iconContent}</div>
					<div className="">{labelContent}</div>
				</div>
			) : isUploadContent ? (
				<div className={`flex items-center xl:gap-2 ${uploadContentContainer}`}>
					<div className="">{iconContentLeft}</div>
					<div className="text-primary">{contentName}</div>
					<div className="">{iconContentRight}</div>
				</div>
			) : (
				<>
					<Tooltip
						{...tooltipProps}
						title={labelValue || ' '}
					>
						<div className={iconContanerClass}>{iconComponent}</div>
					</Tooltip>
					<Label
						value={labelValue}
						classes={lableClass}
						className={labelClassName}
						style={labelStyle}
					/>
					{isRookie && (
						<div className="xl:py-[10px] py-[7px] ml-[20px] md:ml-[120px] xl:ml-0 lg:ml-[60px] 2xl:ml-[50px] text-[16px] text-white bg-primary xl:px-[30px] px-[15px] cursor-pointer rounded-[6px]">
							Rookie
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default IconLabel;
