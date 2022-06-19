import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaRegHandshake } from 'react-icons/fa';
import TabContentMainNFTAbout from '@organisms/tab-content-mainNFT-about';
import TabContentMainNFTSale from '@organisms/tab-content-mainNFT-NetSale';

import { AiOutlineInfoCircle } from 'react-icons/ai';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const TabProjectVertualNFT: React.FC<any> = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					className="custom-mainNft-tabs"
				>
					<Tab
						label={
							<span className="flex items-center">
								<span>
									<AiOutlineInfoCircle className="text-3xl" />
								</span>{' '}
								<span className="ml-2">About</span>
							</span>
						}
						className="p-2"
						{...a11yProps(0)}
					/>
					<Tab
						label={
							<span className="flex items-center">
								<span>
									<FaRegHandshake className="text-3xl" />
								</span>{' '}
								<span className="ml-2">NFT Sales</span>
							</span>
						}
						className="p-2"
						{...a11yProps(1)}
					/>
				</Tabs>
			</Box>
			<TabPanel
				value={value}
				index={0}
			>
				<TabContentMainNFTAbout />
			</TabPanel>
			<TabPanel
				value={value}
				index={1}
			>
				<TabContentMainNFTSale />
			</TabPanel>
		</Box>
	);
};

export default React.memo(TabProjectVertualNFT);
