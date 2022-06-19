import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface IDropDownProps {
	Menu: React.FC<{
		open?: boolean;
		label?: string;
		onClick?(): void;
		onOpen?(): void;
	}>;
	Item: React.FC<{
		label?: string;
		onClick?(): void;
	}>;
}

function getValidChildren(children: any) {
	const array = React.Children.toArray(children).filter((child) =>
		React.isValidElement(child)
	) as React.ReactElement[];
	return array.length > 0;
}

const DropDown: IDropDownProps = {
	Menu: (props) => {
		const [open, setOpen] = useState(props.open);

		const handleClick = () => {
			setOpen(!open);

			if (!open && typeof props.onOpen === 'function') {
				props.onOpen();
			}
		};

		useEffect(() => {
			setOpen(props.open);
		}, [props.open]);

		return (
			<div
				style={{
					position: 'relative',
					zIndex: 1,
				}}
				onClick={handleClick}
			>
				<div className="pl-[20px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova form-select">
					{props.label}
				</div>

				{open && (
					<div
						style={{
							position: 'absolute',
							zIndex: 9999,
							top: '48px',
							left: 0,
							right: 0,
							background: '#ffffff',
							borderRadius: 5,
							padding: 5,
							boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
						}}
					>
						{props.children}
					</div>
				)}
			</div>
		);
	},

	Item: (props) => {
		const [expanded, setExpanded] = useState(false);

		const handleClick = (e: React.MouseEvent) => {
			e.stopPropagation();

			setExpanded(!expanded);
			if (props.onClick) {
				props.onClick();
			}
		};

		return (
			<>
				<Box
					sx={{
						padding: '5px 9px',
						background: '#ffffff',
						borderRadius: 1,
						cursor: 'pointer',

						'&:hover': {
							background: '#eeeeee',
						},
					}}
					onClick={handleClick}
				>
					{props.label}

					{props.children && getValidChildren(props.children) && (
						<span style={{ float: 'right' }}>
							{!expanded ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
						</span>
					)}
				</Box>

				{props.children && getValidChildren(props.children) && expanded && (
					<div style={{ paddingLeft: 20 }}>{props.children}</div>
				)}
			</>
		);
	},
};

export { DropDown };
