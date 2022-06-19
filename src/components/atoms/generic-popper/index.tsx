import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { IoSettingsSharp } from 'react-icons/io5';
import { useOutsideClickHandler } from 'utils/utils';

export default function SimplePopper({ clickableComponent, popperComponent }: any) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const ref = React.useRef(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	useOutsideClickHandler(ref, () => setAnchorEl(null));

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	return (
		<div>
			<button
				aria-describedby={id}
				type="button"
				onClick={handleClick}
			>
				{clickableComponent ? (
					clickableComponent
				) : (
					<IoSettingsSharp className={`text-3xl text-[#787878]`} />
				)}
			</button>
			<Popper
				id={id}
				open={open}
				anchorEl={anchorEl}
			>
				<div
					className=""
					ref={ref}
				>
					{popperComponent ? (
						popperComponent
					) : (
						<>
							<div className="w-full flex justify-center">
								<div className="arrow-up"></div>
							</div>
							<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
								<div className="cursor-pointer">Delete</div>
							</Box>
						</>
					)}
				</div>
			</Popper>
		</div>
	);
}
