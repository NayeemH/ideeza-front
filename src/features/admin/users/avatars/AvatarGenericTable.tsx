import CheckboxAtom from '@atoms/checkbox';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { pink } from '@mui/material/colors';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import AdminGenericTable from '@organisms/generic-table-admin';
import { useRouter } from 'next/router';
interface AvatarDataInterface {
	id: any;
	updated_at: any;
	created_at: any;
	is_visible: boolean;
	image: any;
	user_Type: any;
	category: any;
}
interface AvatarGenericTableProps {
	AvatarData?: AvatarDataInterface;
	filterCategory?: string | null;
	filterUser_Type?: string | null;
	dataList?: AvatarDataInterface[];
}

const AvatarGenericTable: React.FC<AvatarGenericTableProps> = (props) => {
	interface AvatarItemProps {
		id: any;
		checkbox: any;
		picture: any;
		user_Type: any;
		category: any;
		visibility: any;
		ellipsis: any;
	}
	const [rows, setRows] = useState<AvatarItemProps[]>([]);
	const router = useRouter();

	useEffect(() => {
		fetchAvatarsData();
	}, [props.dataList]);

	useEffect(() => {
		if (props.AvatarData !== undefined) {
			const item = {
				id: props.AvatarData?.id,
				checkbox: <CheckboxAtom />,
				picture: (
					<Avatar
						alt=""
						src={props.AvatarData?.image}
						className=" relative -right-7"
					/>
				),
				user_Type: props.AvatarData?.user_Type,
				category: props.AvatarData?.category,
				visibility: (
					<PinkSwitch
						{...label}
						defaultChecked
					/>
				),
				ellipsis: (
					<Dropdown
						mainClass="p-0 md:p-auto"
						icons={
							<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
						}
						itemsClasses={{
							root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
						}}
						options={[
							{
								name: 'View',
								value: 'View',
								func: () =>
									router.push(
										`/admin/users/marketing/avatars/${props.AvatarData?.id}`
									),
							},
							{
								name: 'Pause',
								value: 'Pause',
							},
							{
								name: 'Approved',
								value: 'Approved',
							},
							{
								name: 'Delete',
								value: 'Delete',
							},
						]}
					/>
				),
			};
			setRows((prev) => [...prev, item]);
		}
	}, [props.AvatarData]);

	const PinkSwitch = styled(Switch)(({ theme }) => ({
		'& .MuiSwitch-switchBase.Mui-checked': {
			color: pink[700],
			'&:hover': {
				backgroundColor: alpha(pink[700], theme.palette.action.hoverOpacity),
			},
		},
		'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
			backgroundColor: pink[700],
		},
	}));

	const label = { inputProps: { 'aria-label': 'Switch demo' } };

	// console.log(rows);

	const fetchAvatarsData = () => {
		setRows([]);
		props.dataList &&
			props.dataList.forEach((data) => {
				const item = {
					id: data?.id,
					checkbox: <CheckboxAtom />,
					picture: (
						<Avatar
							alt=""
							src={data?.image}
							className=" relative -right-7"
						/>
					),
					user_Type: data?.user_Type,
					category: data?.category,
					visibility: (
						<PinkSwitch
							{...label}
							defaultChecked
						/>
					),
					ellipsis: (
						<Dropdown
							mainClass="p-0 md:p-auto"
							icons={
								<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
							}
							itemsClasses={{
								root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
							}}
							options={[
								{
									name: 'View',
									value: 'View',
									func: () =>
										router.push(`/admin/users/marketing/avatars/${data?.id}`),
								},
								{
									name: 'Pause',
									value: 'Pause',
								},
								{
									name: 'Approved',
									value: 'Approved',
								},
								{
									name: 'Delete',
									value: 'Delete',
								},
							]}
						/>
					),
				};
				setRows((prev) => [...prev, item]);
			});
	};

	const onClickOrder = (value: any) => {
		// console.log('ordervalue: ', value);
		// const dataList = [...displayRows];
		const dataList = [...rows];
		if (value === 'user_Type' || value === 'category') {
			dataList.sort(function (a, b) {
				if (value === 'user_Type') {
					return a.user_Type.localeCompare(b.user_Type); //using String.prototype.localCompare()
				}
				if (value === 'category') {
					return a.category.localeCompare(b.category); //using String.prototype.localCompare()
				}
			});
		}
		// setdisplayRows(dataList);
		setRows(dataList);
	};

	return (
		<>
			<AdminGenericTable
				headers={['checkbox', 'picture', 'user_Type', 'category', 'visibility', 'ellipsis']}
				rowClicked="/admin/users/marketing/notification-center"
				// rows={displayRows}
				rows={rows}
				onClickOrder={onClickOrder}
			/>
		</>
	);
};

export default AvatarGenericTable;
