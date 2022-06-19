import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AiOutlineBars, AiOutlineInfoCircle } from 'react-icons/ai';
import { FaRegHandshake } from 'react-icons/fa';
import { GiInjustice } from 'react-icons/gi';
import { TiDocumentText } from 'react-icons/ti';
import TabContentMainNFTAbout from '@organisms/tab-content-mainNFT-about';
import TabContentMainNFTSale from '@organisms/tab-content-mainNFT-NetSale';
import SellerTab from '@organisms/tabs-projects-sellers';
import TabContentLegal from '@organisms/tab-content-legal';
import TabContentProjectActivities from '@organisms/tab-content-project-activities';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { getActivitiessAsync } from '@features/user/reducer';
import { useSession } from 'next-auth/react';

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

const TabProjectMainNFT: React.FC<any> = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const { activities } = useAppSelector(({ dashboard }) => dashboard);
	const dispatch = useDispatch();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch(getActivitiessAsync());
		}
	}, [status]);
	return (
		<Box sx={{ width: '100%' }}>
			<Box className="w-full flex justify-center xl:justify-start">
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					classes={{ root: 'xl:-mt-4' }}
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
					<Tab
						label={
							<span className="flex items-center">
								<span>
									<TiDocumentText className="text-3xl" />
								</span>{' '}
								<span className="ml-2">Contributers</span>
							</span>
						}
						className="p-2"
						{...a11yProps(2)}
					/>
					<Tab
						label={
							<span className="flex items-center">
								<span>
									<GiInjustice className="text-3xl" />
								</span>{' '}
								<span className="ml-2">Legal</span>
							</span>
						}
						className="p-2"
						{...a11yProps(3)}
					/>
					<Tab
						label={
							<span className="flex items-center">
								<span>
									<AiOutlineBars className="text-3xl" />
								</span>{' '}
								<span className="ml-2">Activities</span>
							</span>
						}
						className="p-2"
						{...a11yProps(4)}
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
			<TabPanel
				value={value}
				index={2}
			>
				<SellerTab />
			</TabPanel>
			<TabPanel
				value={value}
				index={3}
			>
				<TabContentLegal />
			</TabPanel>
			<TabPanel
				value={value}
				index={4}
			>
				<TabContentProjectActivities activities={activities} />
			</TabPanel>
		</Box>
	);
};

export default React.memo(TabProjectMainNFT);
