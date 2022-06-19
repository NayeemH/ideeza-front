import React, { FC } from 'react';
import { MenuItem as Item, Collapse } from '@mui/material';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// import Proptype from "prop-types";
import Label from '../label';
// import Image from "next/image";
// import Image from "next/image";
// import { NextRouter, withRouter } from "next/router";

// interface WithRouterProps {
//   route?: NextRouter;
// }

interface MenuItemProps {
	icon: string;
	value?: string;
	click?: () => void;
	route?: boolean;
	isChildren?: boolean;
	drawerOpen?: boolean;
}

const MenuItem: FC<MenuItemProps> = (props) => {
	const { icon, value, route, click, isChildren, drawerOpen } = props;

	const activeRouteStyle = isChildren ? 'text-primary' : 'text-white bg-primary hover:bg-primary';
	const textColor = isChildren ? 'text-primary' : 'text-white';
	const iconRoute = isChildren ? 'active-sidebar-children-icon' : 'bright';

	return (
		<div className="w-full flex flex-col">
			<Item
				onClick={click}
				className={`${
					route
						? activeRouteStyle
						: 'text-gray-600 menu-item hover:text-white hover:bg-primary'
				}  md:py-3 py-1 xl:py-5 w-full rounded-md xl:my-0.5 whitespace-normal  transition-all`}
			>
				<img
					src={icon}
					className={`${route ? iconRoute : ''} `}
					alt=""
				/>
				{/* <Image
          src={icon}
          className={`${route ? iconRoute : ""}`}
          width={20}
          height={24}
          alt="image"
        /> */}

				{/* {drawerOpen && ( */}
				<Label
					classes={{
						root: `${
							route ? textColor : 'text-gray-700'
						}  text-base ml-3 menu-label tracking-tight truncate whitespace-nowrap ${
							drawerOpen ? 'opacity-100 transition-all' : 'opacity-0'
						}`,
					}}
					value={value}
				/>
				{/* )} */}
				{props?.children ? (
					route ? (
						<FiChevronUp className="ml-auto " />
					) : (
						<FiChevronDown className="ml-auto" />
					)
				) : null}
			</Item>
			<Collapse
				in={route}
				timeout="auto"
				unmountOnExit
			>
				{props?.children}
			</Collapse>
		</div>
	);
};
// MenuItem.prototype = {
//   icon: Proptype.element,
//   value: Proptype.string,
//   click: Proptype.func,
// };
// MenuItem.defaultProps = {
//   click: () => {},
// };
export default MenuItem;
