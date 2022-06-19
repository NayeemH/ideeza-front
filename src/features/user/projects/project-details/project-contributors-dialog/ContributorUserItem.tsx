import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { apiService } from '../../../../../utils/request';
import { useDetectSelfUser } from '../../../../../app/hooks';
import { toast } from 'react-toastify';
import { Dialog } from '@mui/material';
import Button from '@atoms/button';

interface ContributorUserItemProps {
	userData: any;
	projectData: any;
}

const ContributorUserItem: React.FC<ContributorUserItemProps> = (props) => {
	const router = useRouter();
	const { userData, projectData } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const contributorRoles = ['GUEST', 'REPORTER', 'DEVELOPER', 'MAINTAINER '];
	const [contributorRole, setContributorRole] = useState<string>('');

	const isSelfUser = useDetectSelfUser(userData?.id);
	const userFullName = `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`.trim();
	const userProfilePhoto = userData?.profile_photo ?? '';
	const userEmail = userData?.email ?? '';

	const gotoUserProfile = () => router.push(`/user/profile/${userData?.id}`);
	const gotoMessages = () => router.push(`/user/dashboard/message/?user_id=${userData?.id}`);

	const [invitationDialogOpen, setInvitationDialogOpen] = useState(false);

	const [friendConnection, setFriendConnection] = useState<{
		loading: boolean;
		isFriend: boolean;
		isFollower: boolean;
	}>({
		loading: true,
		isFollower: false,
		isFriend: false,
	});

	const checkFriendConnection = () => {
		apiService(
			{
				method: 'get',
				url: `/account/user/${userData?.id}/connection/`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					setFriendConnection((prev) => ({
						...prev,
						loading: false,
						isFriend: res?.data?.is_friend ?? false,
						isFollower: res?.data?.is_follower ?? false,
					}));
				}
				if (err) {
					console.log(err);
				}
			}
		);
	};

	const addFriend = () => {
		apiService(
			{
				method: 'post',
				url: `/account/friend/add-friend/`,
				data: {
					user_id: userData?.id,
				},
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					setFriendConnection((prev) => ({
						...prev,
						loading: false,
						isFriend: false,
						isFollower: true,
					}));
					toast.dismiss();
					toast.success('Friend request sent!');
				}
				if (err) {
					console.log(err);
				}
			}
		);
	};

	const unfriend = () => {
		apiService(
			{
				method: 'delete',
				url: `/account/friend/${userData?.id}/`,
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					setFriendConnection((prev) => ({
						...prev,
						loading: false,
						isFriend: false,
					}));
					toast.dismiss();
					toast.success('Unfriend successful!');
				}
				if (err) {
					console.log(err);
				}
			}
		);
	};

	const addContributor = () => {
		if (isSelfUser) {
			toast.error('You can not send invitation to yourself!');
			return;
		}
		if (contributorRole === '') {
			toast.error('Please select a role!');
			return;
		}

		apiService(
			{
				method: 'post',
				url: `/project/contributor/`,
				data: {
					project: projectData?.id,
					role: contributorRole,
					user: userData?.id,
				},
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					setFriendConnection((prev) => ({
						...prev,
						loading: false,
						isFriend: false,
					}));
					setInvitationDialogOpen(false);
					toast.dismiss();
					toast.success('Invitation sent successfully!');
				}
				if (err) {
					if (err?.response && err?.response?.status === 400) {
						toast.error('You already have invited this user!');
					}
				}
			}
		);
	};

	useEffect(() => {
		if (Number(userData?.id) > 0) {
			checkFriendConnection();
		}
	}, [userData?.id]);

	return (
		<>
			<ListItem
				alignItems="flex-start"
				secondaryAction={
					<>
						<IconButton
							aria-label="more"
							id="long-button"
							aria-controls={open ? 'long-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							BackdropProps={{
								style: { backgroundColor: 'transparent', opacity: '0' },
							}}
							PaperProps={{
								style: {
									maxHeight: 200,
									width: '20ch',
									marginLeft: '-180px',
								},
							}}
						>
							<MenuItem onClick={gotoMessages}>Send message</MenuItem>
							{!isSelfUser && !friendConnection.loading && (
								<>
									{friendConnection.isFriend ? (
										<MenuItem onClick={unfriend}>Unfriend</MenuItem>
									) : friendConnection.isFollower ? (
										<MenuItem onClick={unfriend}>
											Unsend friend request
										</MenuItem>
									) : (
										<MenuItem onClick={addFriend}>Send friend request</MenuItem>
									)}
								</>
							)}
							<MenuItem onClick={gotoUserProfile}>See profile</MenuItem>
							<MenuItem onClick={() => setInvitationDialogOpen(true)}>
								Send Invitation
							</MenuItem>
						</Menu>
					</>
				}
			>
				<ListItemAvatar>
					<Avatar
						alt={userFullName}
						src={userProfilePhoto}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={userFullName}
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								{userEmail}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>

			<Dialog
				open={invitationDialogOpen}
				onClose={() => setInvitationDialogOpen(false)}
				sx={{
					'& .MuiBackdrop-root': {
						background: 'rgb(194 194 194 / 13%) !important',
					},
					'& .MuiPaper-root': {
						width: 350,
						boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px !important',
					},
				}}
			>
				<div className="p-5">
					<h3 className={'mb-4'}>Invite Contributor</h3>
					<div className={'mt-2 text-sm'}>
						<b>{projectData?.name}</b>
					</div>
					<p className={'mt-2 text-sm'}>
						{projectData?.description.length > 200
							? projectData?.description.slice(0, 180) + '...'
							: projectData?.description}
					</p>

					<div className={'mt-6 text-sm'}>
						<div>Add to team</div>
						<select
							style={{
								border: '1px solid #eeeeee',
								padding: '7px 10px',
								borderRadius: '10px',
								width: '100%',
								boxSizing: 'border-box',
								outline: 0,
							}}
							value={contributorRole}
							onChange={(e: any) => setContributorRole(e?.target?.value)}
						>
							<option>Select</option>
							{contributorRoles.map((role, index) => (
								<option
									key={index}
									value={role}
								>
									{role}
								</option>
							))}
						</select>
					</div>

					<div className={'mt-6 text-center'}>
						<Button
							className={'bg-primary text-white hover:text-primary hover:bg-white'}
							variant={'outlined'}
							value={'Send'}
							onClick={addContributor}
						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ContributorUserItem;
