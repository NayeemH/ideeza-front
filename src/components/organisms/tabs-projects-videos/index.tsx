import Tab from '@atoms/tab';
import Tabs from '@atoms/tabs';
import TabPanel from '@features/user/parts/part-details/tabPanel';
import TabsProjectsVideosContent from '@organisms/tabs-projects-videos-content';
import React, { useState } from 'react';
import { a11yProps } from 'utils/utils';

const TabsProjectsVideos = (props: any) => {
	const {
		videos,
		images,
		defaultVideo,
		defaultImage,
		onClickSetDefaultMedia,
		onClickDeleteMedia,
	} = props;

	const [tabIndex, setTabIndex] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	const tabsData = [
		{
			name: 'Videos',
			component: (
				<TabsProjectsVideosContent
					type="video"
					mediaList={videos}
					defaultMediaUrl={defaultVideo}
					onClickSetDefaultMedia={onClickSetDefaultMedia}
					onClickDeleteMedia={onClickDeleteMedia}
				/>
			),
		},
		{
			name: 'Images',
			component: (
				<TabsProjectsVideosContent
					type="image"
					mediaList={images}
					defaultMediaUrl={defaultImage}
					onClickSetDefaultMedia={onClickSetDefaultMedia}
					onClickDeleteMedia={onClickDeleteMedia}
				/>
			),
		},
	];

	return (
		<div className="mt-16">
			<div className="mx-auto w-[420px]">
				<Tabs
					// for underline of tabs indicatorColor="white"
					variant="fullWidth"
					value={tabIndex}
					indicatorColor="primary"
					onChange={handleChange}
					classes={{
						root: `border-b border-gray-300 font-proxima-nova custom-border-project-tabs mt-[-60px]`,
					}}
					aria-label="simple tabs example"
				>
					{tabsData.map((value: any, key: number) => {
						return (
							<Tab
								key={key}
								classes={{
									root: `bg-white focus:bg-white focus:text-primary font-semibold text-xl tracking-tight max-w-[0] mr-2 transform-none py-1 px-0 outline-none  text-gray-500`,
									selected: `text-[#ff09d0] shadow-none custom-border-project-tab-selected`,
								}}
								label={value.name}
								{...a11yProps(key)}
							></Tab>
						);
					})}
				</Tabs>
			</div>
			{tabsData.map((value: any, key: number) => {
				return (
					<TabPanel
						value={tabIndex}
						key={key}
						index={key}
					>
						{value.component}
					</TabPanel>
				);
			})}
		</div>
	);
};

export default React.memo(TabsProjectsVideos);
