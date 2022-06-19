import AppleftSideBar from '@organisms/app-left-sidebar';
import AppMiddleBar from '@organisms/app-middle-bar';
import AppRightSideBar from '@organisms/app-right-sidebar';
import React, { useState } from 'react';
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const UserApp = () => {
	const [isAppSettings, setIsAppSettings] = useState(false);
	const [isAppMain, setIsAppMain] = useState(true);
	return (
		<>
			<div className="grid grid-cols-12">
				<div className="col-span-2">
					<AppleftSideBar
						isAppSettings={isAppSettings}
						setIsAppSettings={setIsAppSettings}
						isAppMain={isAppMain}
						setIsAppMain={setIsAppMain}
					/>
				</div>
				<div className="col-span-8">
					<div className="bg-gray-100 h-full">
						<AppMiddleBar
							isAppSettings={isAppSettings}
							setIsAppSettings={setIsAppSettings}
							isAppMain={isAppMain}
							setIsAppMain={setIsAppMain}
						/>
					</div>
				</div>
				<div className="col-span-2">
					<AppRightSideBar />
				</div>
			</div>
		</>
	);
};

export default UserApp;
