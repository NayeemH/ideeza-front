import Contributor from '@molecules/contributor';
import SearchInput from '@molecules/search-input';
import AddFirstContributor from '@organisms/add-first-contributor';
import React, { useEffect, useState } from 'react';
import { apiService } from '../../../utils/request';
import Loader from '@molecules/loader';
import { DialogContent, DialogTitle } from '@mui/material';
import Button from '@atoms/button';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
// import { Popover } from '@mui/material';
import { useRouter } from 'next/router';
import { useDetectSelfUser } from 'app/hooks';
import Label from '@atoms/label';
import { useSession } from 'next-auth/react';

const Contributors = ({ project_id }: any) => {
	const noContributer = false;
	const [friendsLoading, setFriendLoading] = useState<boolean>(false);
	const [totalFriends, setTotalFriends] = useState(0);
	const [myFriends, setFriends] = useState<any[]>([]);
	const [page, setPage] = useState<any>(1);
	// const [sendContributionOpen, setSendContributionOpen] = useState<boolean>(false);
	const [selectedUserId, setSelectedUserId] = useState<any>(null);
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [contribution, setContribution] = useState<any>(false);
	const [conDialogOpen, setConDialogOpen] = useState<any>(false);
	const [contributionItem, setContributionItem] = useState<any>(false);
	const router = useRouter();
	const { data: session } = useSession();
	// console.log('session-------', session?.user?.id)

	const getMyFriends = async () => {
		setFriendLoading(true);

		await apiService(
			{
				method: 'get',
				url: `/account/friend/?page=${page}&page_size=4`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setTotalFriends(Number(data?.count));
					setFriends([...myFriends, ...data.results]);
					setFriendLoading(false);
					return;
				}
				setFriendLoading(false);
			}
		);
	};

	const createContributor = async () => {
		const formData = {
			role: contributionItem,
			project: project_id,
			user: selectedUserId,
		};
		// console.log('1. data=========', formData)
		await apiService(
			{
				method: 'post',
				url: `/project/contributor/`,
				token: true,
				data: formData,
			},
			(res: any, error: any) => {
				// console.log('2. data=========', formData)
				if (res) {
					toast.dismiss();
					toast.success('Send successfully!');
					// setSendContributionOpen(false);
					setContribution(false);
					setConDialogOpen(false);
					return;
				}

				if (error.response && error.response.status === 400) {
					toast.dismiss();
					toast.error('Already sent!');
					// setSendContributionOpen(false);
					setContribution(false);
					setConDialogOpen(false);
				}
			}
		);
	};

	useEffect(() => {
		getMyFriends();
	}, [page]);

	const goToMessages = async () => {
		await apiService(
			{
				method: 'post',
				url: `/chat/room/`,
				token: true,
				data: selectedUserId,
			},
			(res: any) => {
				if (res) {
					//   console.log(res);
					return;
				}
			}
		);
		router.push(`/user/dashboard/message/?id=${selectedUserId}`);
	};

	const isSelfUser = useDetectSelfUser(selectedUserId);
	const [isFriend, setIsFriend] = useState<boolean>(false);
	const [connectionId, setConnectionId] = useState(null);
	const [connectStatus, setConnectStatus] = useState<any>('Send friend request');
	const [isConnecting, setIsConnecting] = useState<boolean>(false);

	// const userProfileRoute = `/user/profile/${selectedUserId}`;

	const updateConnectStatus = (is_follower: any = false, is_friend: any = false) => {
		if (is_friend && is_follower) {
			setConnectStatus('unfriend');
		} else if (!is_friend && is_follower) {
			setConnectStatus('following');
		} else {
			setConnectStatus('Send friend request');
		}
	};

	useEffect(() => {
		if (selectedUserId && selectedUserId !== '') {
			checkConnection();
		}
	}, [selectedUserId]);

	const checkConnection = async () => {
		if (!isSelfUser) {
			setIsConnecting(true);
			await apiService(
				{
					method: 'get',
					url: `account/user/${selectedUserId}/connection/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						const { data } = res;
						setConnectionId(data.friend_id);
						setIsFriend(data.is_friend);
						updateConnectStatus(data?.is_follower, data?.is_friend);
						return setIsConnecting(false);
					}
				}
			);
			setIsConnecting(false);
		}
	};

	const onClickConnectBtn = async () => {
		if (connectStatus === 'following') {
			return toast.error('Friend Request has already been sent.');
		}
		if (!isFriend && connectStatus === 'Send friend request') {
			setIsConnecting(true);
			await apiService(
				{
					method: 'post',
					url: `/account/friend/add-friend/`,
					data: {
						user_id: selectedUserId,
					},
					token: true,
				},
				(res: any, err: any) => {
					if (res) {
						// const {data} = res;
						setIsFriend(false);
						toast.success(
							'Successfully sent friend request, currently you are following this user.'
						);
						updateConnectStatus(true, false);
						setIsConnecting(false);
						return;
					}
					if (err?.response?.data?.detail) {
						setIsConnecting(false);
						return toast.error(
							err?.response?.data?.detail || 'Failed to send friend request!'
						);
					}
				}
			);
		} else if (isFriend && connectStatus === 'unfriend') {
			setIsConnecting(true);
			await apiService(
				{
					method: 'delete',
					url: `/account/friend/${connectionId}/`,
					token: true,
				},
				(res: any, err: any) => {
					if (res) {
						//const {data} = res;
						setIsFriend(false);
						toast.success('Unfriend request has been succeed!');
						updateConnectStatus();
						setIsConnecting(false);
						return;
					}
					if (err?.response?.data?.detail) {
						setIsConnecting(false);
						return toast.error(
							err?.response?.data?.detail || 'Failed to send unfriend request!'
						);
					}
				}
			);
		}
	};

	const visitProfile = () => router.push(`/user/profile/${selectedUserId}`);

	return (
		<div className="w-80 pb-3 bg-white font-sans rounded-xl">
			{noContributer ? (
				<AddFirstContributor />
			) : (
				<>
					<div className="px-4 overflow-y-auto h-80 z-[100000000]">
						{!contribution && (
							<div className="py-3  ">
								<SearchInput />
							</div>
						)}
						{/*<p className="text-right custom-color-1 mb-3">invite contributor</p>*/}
						{friendsLoading && <Loader />}
						{contribution ? (
							<div className="bgWhite p-[30px] items-center">
								<img src="/images/contri.png" />
								<p className="font-semibold fnt-t4-small">
									{`${selectedUser?.user?.first_name} ${selectedUser?.user?.last_name}`}
								</p>
								<p className="mt-3">Invite your team and start</p>
								<Button
									onClick={() => setConDialogOpen(true)}
									value="Invite contributor"
									className="text-white mt-3 bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
								/>
							</div>
						) : (
							myFriends.map((friend: any, index: number) => (
								<>
									{
										<Contributor
											data={friend}
											key={index}
											index={index + 1}
											onClick={() => {
												if (session?.user?.id == friend?.user?.id) {
													toast.dismiss();
													return toast.error('Can not invite self');
												}
												setSelectedUser(friend);
												setSelectedUserId(friend?.user?.id);
												// setSendContributionOpen(true);
											}}
											goToMessages={goToMessages}
											onClickConnectBtn={onClickConnectBtn}
											isConnecting={isConnecting}
											connectStatus={connectStatus}
											visitProfile={visitProfile}
											setContribution={setContribution}
										/>
									}
									{/* <SimplePopper clickableComponent={.} */}
								</>
							))
						)}
					</div>
					{!contribution && totalFriends > myFriends.length && (
						<p
							onClick={() => setPage(page + 1)}
							className="custom-color-1 text-center cursor-pointer fnt-t3-small my-1"
						>
							Load more
						</p>
					)}
				</>
			)}

			<Dialog
				onClose={() => setConDialogOpen(false)}
				open={conDialogOpen}
			>
				<DialogTitle>Invite for contribution?</DialogTitle>
				<DialogContent style={{ width: 400 }}>
					<div>
						<p className="font-semibold fnt-t4-small">Friends Account</p>
						<p className="font-semibold fnt-t4-small">
							{`${selectedUser?.user?.first_name} ${selectedUser?.user?.last_name}`}
						</p>
						<div className="">
							<Label
								value="Add to team"
								className="text-base text-[##333333]"
							/>
							<select
								className="bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
								onChange={(e) => setContributionItem(e.target.value)}
								name=""
								id=""
							>
								{[
									{ name: 'Guest', value: 'GUEST' },
									{ name: 'Reporter', value: 'REPORTER' },
									{ name: 'Developer', value: 'DEVELOPER' },
									{ name: 'Maintainer', value: 'MAINTAINER' },
								].map((val: any) => (
									<option
										value={val.value}
										key={val.value}
									>
										{val.name}
									</option>
								))}
							</select>
						</div>
						<div
							className={'mt-10'}
							style={{ textAlign: 'right' }}
						>
							<Button
								value="Cancel"
								className="text-black transform-none rounded-sm tracking-tight py-1 px-12 mr-2"
								onClick={() => {
									setContribution(false);
									setConDialogOpen(false);
									// setSendContributionOpen(false);
								}}
							/>
							<Button
								value="Send"
								className="text-white bg-primary transform-none rounded-sm tracking-tight py-1 px-12"
								onClick={createContributor}
							/>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
	//   )};
};

export default Contributors;
