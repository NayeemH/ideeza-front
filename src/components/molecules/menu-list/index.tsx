import React, { useState, useEffect } from 'react';
import { MenuList as Menu } from '@mui/material';
import MenuItem from '@atoms/menu-item';
// import { IoClose } from "react-icons/io5";
type IProps = {
	list: any;
	location: any;
	toggle?: () => void;
	className?: string;
	isChildren?: boolean;
	open?: boolean;
	// isChildrenAndSquized?: boolean;
};
function MenuList(props: IProps) {
	const { list, location, className, isChildren, open } = props;
	const [drawerOpen, setDrawerOpen] = useState<any>();

	useEffect(() => {
		setDrawerOpen(open);
	}, [open]);
	// console.log(isChildren, "children");
	// console.log(list, "list");
	// console.log(open, "open");
	return (
		<Menu className={className + ' mx-5 pt-[25px]'}>
			{list?.map((v: any, k: number) => {
				return (
					<MenuItem
						key={k * 10}
						value={v?.name}
						icon={v?.icon}
						click={v.click}
						route={v?.route?.includes(location)}
						isChildren={isChildren}
						drawerOpen={drawerOpen}
						// open={open}
					>
						{v?.children ? (
							<MenuList
								open={drawerOpen}
								isChildren={true}
								list={v?.children}
								location={location}
							/>
						) : null}
					</MenuItem>
				);
			})}
		</Menu>
	);
}
export default MenuList;
