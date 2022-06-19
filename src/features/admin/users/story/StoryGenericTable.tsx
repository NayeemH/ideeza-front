import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import AdminGenericTable from '@organisms/generic-table-admin';
import { useRouter } from 'next/router';
interface StoryDataInterface {
	id: any;
	updated_at: any;
	created_at: any;
	category: any;
	status: any;
	title: any;
	description: any;
	cover_file: any;
}
interface StoryGenericTableProps {
	StoryData?: StoryDataInterface;
	filterStatus?: string | null;
	filterCategory?: string | null;
	dataList?: StoryDataInterface[];
}

const StoryGenericTable: React.FC<StoryGenericTableProps> = (props) => {
	interface StoryItemProps {
		id: any;
		checkbox: any;
		name: any;
		category: any;
		updated_date: any;
		status: any;
		ellipsis: any;
	}
	const [rows, setRows] = useState<StoryItemProps[]>([]);
	const router = useRouter();

	useEffect(() => {
		fetchStoryData();
	}, [props.dataList]);

	useEffect(() => {
		if (
			props.StoryData?.id &&
			props.StoryData?.updated_at &&
			props.StoryData?.created_at &&
			props.StoryData?.category &&
			props.StoryData?.status &&
			props.StoryData?.title &&
			props.StoryData?.description &&
			props.StoryData?.cover_file
		) {
			const item = {
				id: props.StoryData?.id,
				checkbox: <CheckboxAtom />,
				name: props.StoryData?.title,
				category: props.StoryData?.category,
				updated_date: props.StoryData.updated_at
					? new Date(props.StoryData?.updated_at).toDateString()
					: new Date(props.StoryData?.created_at).toDateString(),
				status: props.StoryData?.status,
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
										`/admin/users/marketing/success-story/${props.StoryData?.id}`
									),
							},
							{
								name: 'Edit',
								value: 'Edit',
								func: () =>
									router.push(
										`/admin/users/marketing/success-story/edit/${props.StoryData?.id}`
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
	}, [props.StoryData]);

	const fetchStoryData = () => {
		setRows([]);
		props.dataList &&
			props.dataList.forEach((data) => {
				const item = {
					id: data?.id,
					checkbox: <CheckboxAtom />,
					name: data?.title,
					category: data?.category,
					updated_date: data.updated_at
						? new Date(data?.updated_at).toDateString()
						: new Date(data?.created_at).toDateString(),
					status: data?.status,
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
											`/admin/users/marketing/success-story/${data?.id}`
										),
								},
								{
									name: 'Edit',
									value: 'Edit',
									func: () =>
										router.push(
											`/admin/users/marketing/success-story/edit/${data?.id}`
										),
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
		const dataList = [...rows];
		if (value === 'status' || value === 'category') {
			dataList.sort(function (a, b) {
				if (value === 'status') {
					return a.status.localeCompare(b.status); //using String.prototype.localCompare()
				}
				if (value === 'category') {
					return a.category.localeCompare(b.category); //using String.prototype.localCompare()
				}
			});
		}
		setRows(dataList);
	};

	return (
		<>
			<AdminGenericTable
				headers={['checkbox', 'name', 'category', 'updated_date', 'status', 'ellipsis']}
				rowClicked="/admin/users/marketing/success-story"
				// rows={displayRows}
				rows={rows}
				onClickOrder={onClickOrder}
			/>
			{/* {showPagination()} */}
		</>
	);
};

export default StoryGenericTable;
