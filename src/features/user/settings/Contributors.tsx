import Label from '@atoms/label';
import { Divider } from '@mui/material';
import AddNewContributor from '@organisms/add-new-contributor';
import Admin from '@organisms/admin';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';

function Contributors() {
	const [auth, setAuth] = useState<any>();

	const [AllContributorsdata, setContributordata] = useState<any>([]);
	const state = useAppSelector((state) => state?.auth?.userData);
	const totaldata = useAppSelector(({ auth }) => auth);
	// const toggleOpen = () => SetPopup(!popup);
	useEffect(() => {
		setAuth(state);
	}, [state]);
	// useEffect(() => {
	//   // if (auth) dispatch(onContributorGet());
	// }, [auth]);
	useEffect(() => {
		if (totaldata) {
			setContributordata(totaldata);
		}
	}, [totaldata]);

	const get_id = () => {
		// dispatch(onContributorDelete(e));
	};
	return (
		<div className="max-w-4xl w-full font-proxima-nova">
			<Label
				value="Contributors"
				classes={{
					root: 'text-primary text-xl xl:text-2xl  font-semibold  border-b border-[#D7D7D7] pb-3',
				}}
			/>
			<div className="p-6 md:px-8 bg-white rounded-lg mt-5 mb-10">
				<AddNewContributor />
				<Divider className={' mb-5 mt-1 mr-3'} />
				<Label
					value="Existing Contributor"
					classes={{
						root: 'text-[#333333] text-xl tracking-tight font-semibold  pb-2',
					}}
				/>
				<div className="space-y-5  ">
					<Admin
						heading="Admin"
						handle_change={() => get_id()}
						data={AllContributorsdata}
						bodyValue="Can manage all aspects of the Page. They can: send messages and publish as the Page, respond to and delete comments on the Page, create new products, see which admin created a post or comment, view insights, edit Ideeza account details from the Page and assign Page roles."
						// contName="Jon Cochran"
						// contAbout="Admin"
						// iconsideValue="Car"
					/>
					<Admin
						heading="Admin"
						handle_change={() => get_id()}
						data={AllContributorsdata}
						bodyValue="Can manage all aspects of the Page. They can: send messages and publish as the Page, respond to and delete comments on the Page, create new products, see which admin created a post or comment, view insights, edit Ideeza account details from the Page and assign Page roles."
						// contName="Jon Cochran"
						// contAbout="Admin"
						// iconsideValue="Car"
					/>
				</div>
			</div>
		</div>
	);
}

export default Contributors;
