import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import AdminGenericTable from '@organisms/generic-table-admin';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { pink } from '@mui/material/colors';
import { useRouter } from 'next/router';

interface FeatureInterface {
	active_project?: string;
	additional_teammate?: boolean;
	teammate_cost?: number;
	in_platform_purchase?: boolean;
	consult_support?: boolean;
	network?: boolean;
	electronics?: boolean;
	code?: boolean;
	cover?: boolean;
	general?: boolean;
	social?: boolean;
}

interface PricingDataInterface {
	id?: any;
	features?: FeatureInterface;
	updated_at?: string;
	created_at?: string;
	is_visible?: boolean;
	name?: string;
	slogan?: string;
	image?: string;
	type?: any;
	plan_type?: string;
	price_monthly?: string;
	price_yearly?: string;
	trial_period?: number;
	is_popular?: boolean;
}

interface PricingGenericTableProps {
	PricingData?: PricingDataInterface;
	filterType?: string | null;
	dataList?: PricingDataInterface[];
}

const PricingGenericTable: React.FC<PricingGenericTableProps> = (props) => {
	interface PricingItemProps {
		id: any;
		checkbox: any;
		name: any;
		type: any;
		visibility: any;
	}
	const [rows, setRows] = useState<PricingItemProps[]>([]);
	// const [displayRows, setdisplayRows] = useState<PricingItemProps[]>([]);
	// const [pageRows, setPageRows] = useState<PricingItemProps[]>([]);
	// const userId = useAppSelector((state) => state?.auth?.userData?.id);
	const router = useRouter();

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

	useEffect(() => {
		fetchPricingsData();
	}, [props.dataList]);

	useEffect(() => {
		if (props.PricingData !== undefined) {
			const item = {
				id: props.PricingData?.id,
				checkbox: <CheckboxAtom />,
				name: props.PricingData?.name,
				type: props.PricingData?.type,
				visibility: (
					<PinkSwitch
						{...label}
						defaultChecked
						value={props.PricingData?.is_visible}
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
										`/admin/users/marketing/pricing-plans/${props.PricingData?.id}`
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
	}, [props.PricingData]);

	const fetchPricingsData = () => {
		setRows([]);
		props.dataList &&
			props.dataList.forEach((data) => {
				const item = {
					id: data?.id,
					checkbox: <CheckboxAtom />,
					name: data?.name,
					type: data?.type,
					visibility: (
						<PinkSwitch
							{...label}
							defaultChecked
							value={data?.is_visible}
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
											`/admin/users/marketing/pricing-plans/${data?.id}`
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
				// setdisplayRows((prev) => [...prev, item]);
			});
	};

	const onClickOrder = (value: any) => {
		// console.log('ordervalue: ', value);
		const dataList = [...rows];
		if (value === 'type') {
			dataList.sort(function (a, b) {
				if (value === 'type') {
					return a.type.localeCompare(b.type); //using String.prototype.localCompare()
				}
				// if (value === 'group_Type') {
				//     return a.group_Type.localeCompare(b.group_Type); //using String.prototype.localCompare()
				// }
			});
		}
		// setdisplayRows(dataList);
		setRows(dataList);
	};

	// const getAllBlogData = (payload: any) => console.warn(payload); //

	return (
		<>
			<AdminGenericTable
				headers={['checkbox', 'name', 'type', 'visibility', 'ellipsis']}
				rowClicked="/admin/users/marketing/pricing-plans"
				// rows={displayRows}
				rows={rows}
				onClickOrder={onClickOrder}
			/>
			{/* {showPagination()} */}
		</>
	);
};

export default PricingGenericTable;
