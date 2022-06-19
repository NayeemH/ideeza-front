import React from 'react';
import { Menu, MenuItem, IconButton, Fade } from '@mui/material';

// interface DropdownProps {
//   options: Array<{
//     name: string;
//     value: number;
//   }>;
//   itemsClasses: string;
//   icons: React.ReactNode;
//   className: string;
//   children: React.ReactNode;
// }

const Dropdown: React.FC<any> = ({
	options,
	itemsClasses,
	icons,
	className,
	// children,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: any): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			{/* <div onClick={handleClick}>{children}</div> */}
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={`outline-none  md:z-10 ${className}`}
			>
				{icons}
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted={false}
				open={open}
				onClose={() => handleClose()}
				TransitionComponent={Fade}
				className="fixed"
			>
				{options?.map((v: any, k: any) => (
					<MenuItem
						classes={itemsClasses}
						key={k}
						value={v.value}
						onClick={() => {
							handleClose();
							if (v.func) {
								v.func();
							}
						}}
					>
						{v.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default Dropdown;
