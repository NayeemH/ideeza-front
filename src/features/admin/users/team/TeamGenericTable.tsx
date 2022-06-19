import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { pink } from '@mui/material/colors';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import AdminGenericTable from '@organisms/generic-table-admin';
import { useRouter } from 'next/router';
interface TeamDataInterface {
	id: any;
	is_visible: boolean;
	name: any;
	position: any;
	type: any;
	role: any;
	first_name: any;
	last_name: any;
	about_me: any;
}
interface TeamGenericTableProps {
	TeamData?: TeamDataInterface;
	filterPosition?: string | null;
	filterType?: string | null;
	dataList?: TeamDataInterface[];
}

const TeamGenericTable: React.FC<TeamGenericTableProps> = (props) => {
	interface TeamItemProps {
		id: any;
		checkbox: any;
		name: any;
		position: any;
		type: any;
		visibility: any;
		ellipsis: any;
	}
	const [rows, setRows] = useState<TeamItemProps[]>([]);
	const router = useRouter();

	useEffect(() => {
		fetchTeamData();
	}, [props.dataList]);

	useEffect(() => {
		if (props.TeamData !== undefined) {
			const item = {
				id: props.TeamData?.id,
				checkbox: <CheckboxAtom />,
				name: `${props.TeamData?.first_name} ${props.TeamData?.last_name}`,
				position: props.TeamData?.position,
				type: props.TeamData?.type,
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
										`/admin/users/marketing/team/${props.TeamData?.id}`
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
	}, [props.TeamData]);

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

	const fetchTeamData = () => {
		setRows([]);
		props.dataList &&
			props.dataList.forEach((data) => {
				const item = {
					id: data?.id,
					checkbox: <CheckboxAtom />,
					name: `${data?.first_name} ${data?.last_name}`,
					position: data?.about_me,
					type: data?.role,
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
										router.push(`/admin/users/marketing/team/${data?.id}`),
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
		const dataList = [...rows];
		if (value === 'type' || value === 'position') {
			dataList.sort(function (a, b) {
				if (value === 'type') {
					return a.type.localeCompare(b.type); //using String.prototype.localCompare()
				}
				if (value === 'position') {
					return a.position.localeCompare(b.position); //using String.prototype.localCompare()
				}
			});
		}
		setRows(dataList);
	};

	return (
		<>
			<AdminGenericTable
				headers={['checkbox', 'name', 'position', 'type', 'visibility', 'ellipsis']}
				rowClicked="/admin/users/marketing/notification-center"
				// rows={displayRows}
				rows={rows}
				onClickOrder={onClickOrder}
			/>
		</>
	);
};

export default TeamGenericTable;
