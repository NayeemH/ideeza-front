import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ContributorUserItem from '@features/user/projects/project-details/project-contributors-dialog/ContributorUserItem';
import { apiService } from '../../../../../utils/request';
import { TextField } from '@mui/material';
import Loader from '@molecules/loader';

interface ProjectContributorsDialogProps {
	open: boolean;
	onClose(): void;
	projectData: any;
}

const ProjectContributorsDialog: React.FC<ProjectContributorsDialogProps> = (props) => {
	const { projectData, open, onClose } = props;
	const contributors =
		projectData?.project_contributors?.length > 0 ? projectData?.project_contributors : [];

	const [myFriends, setMyFriends] = useState<{
		loading: boolean;
		next: null | string;
		limit: number;
		page: number;
		search: string;
		results: any[];
	}>({
		loading: true,
		next: null,
		limit: 4,
		page: 1,
		search: '',
		results: [],
	});

	const getMyFriends = () => {
		setMyFriends((prev) => ({
			...prev,
			loading: true,
		}));

		apiService(
			{
				method: 'get',
				url: `/account/friend/?page=${myFriends.page}&page_size=${myFriends?.limit}&search=${myFriends.search}`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const data = res?.data;
					const friends = [...myFriends.results];

					if (data?.results && data?.results.length > 0) {
						data?.results?.forEach((friendData: any) => {
							const inFriendsIndex = friends.findIndex(
								(f) => Number(f?.id) === Number(friendData?.id)
							);
							if (inFriendsIndex === -1) {
								friends.push(friendData);
							}
						});
					}

					setMyFriends((prev) => ({
						...prev,
						loading: false,
						next: data?.next,
						results: friends,
					}));
				}
				if (err) {
					console.log(err);
				}
			}
		);
	};

	const loadMoreFriends = () => {
		setMyFriends((prev) => ({
			...prev,
			page: prev.page + 1,
		}));
	};

	const handleChangeFriendSearch = (e: any) => {
		setMyFriends((prev) => ({
			...prev,
			search: e?.target?.value,
			page: 1,
			next: null,
			results: [],
		}));
	};

	useEffect(() => {
		getMyFriends();
	}, [myFriends.page]);

	useEffect(() => {
		getMyFriends();
	}, [myFriends.search]);

	useEffect(() => {
		getMyFriends();
	}, []);

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth="lg"
				sx={{
					'& .MuiPaper-root': {
						width: 400,
					},
				}}
			>
				<div className="p-5">
					<h3 className="text-center text-primary font-bold">Contributors</h3>
					<div>
						<TextField
							variant={'outlined'}
							placeholder={'Search'}
							fullWidth={true}
							size={'small'}
							sx={{
								border: '1px solid #eeeeee',
								borderRadius: '10px',
								marginTop: '10px',
							}}
						/>

						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							{contributors.length > 0 ? (
								contributors.map((contributor: any, index: number) => (
									<ContributorUserItem
										key={index}
										userData={contributor?.user}
										projectData={projectData}
									/>
								))
							) : (
								<div className={'p-5 flex justify-center align-center'}>
									No Contributors
								</div>
							)}
						</List>
					</div>

					<h3 className="text-center text-primary mt-10 font-bold">
						Invite new contributor
					</h3>
					<div>
						<TextField
							variant={'outlined'}
							placeholder={'Search'}
							fullWidth={true}
							size={'small'}
							sx={{
								border: '1px solid #eeeeee',
								borderRadius: '10px',
								marginTop: '10px',
							}}
							value={myFriends.search}
							onChange={handleChangeFriendSearch}
						/>
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							{myFriends.results.length > 0 ? (
								myFriends.results.map((friend: any, index: number) => (
									<ContributorUserItem
										key={index}
										userData={friend?.user}
										projectData={projectData}
									/>
								))
							) : !myFriends.loading ? (
								<div className={'p-5 flex justify-center align-center'}>
									No Friends
								</div>
							) : null}
						</List>
					</div>

					{myFriends.loading && (
						<div className="text-center mt-1">
							<Loader />
						</div>
					)}

					{myFriends.next && !myFriends.loading && (
						<div className="text-center mt-1">
							<b
								className={'text-primary cursor-pointer text-xs'}
								onClick={loadMoreFriends}
							>
								Load More
							</b>
						</div>
					)}
				</div>
			</Dialog>
		</>
	);
};

export default ProjectContributorsDialog;
