import { IBlockCategory } from '@models/code';
import { ICategories } from '@models/core';
import CategoryCascader from '@molecules/category-cascader';
import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getBlockCategory } from 'request/core';

export default function CategorySelector({
	control,
	categoryType,
}: {
	control: Control<any, object>;
	categoryType?: 'CODE' | 'ELECTRONIC' | 'COVER';
}) {
	const [categories, setCategories] = useState<ICategories[]>();
	const { data, isSuccess, isLoading } = useQuery(
		[`core-category`],
		() => getBlockCategory(`?category_type=${categoryType}&page_size=100`),
		{
			keepPreviousData: true,
			staleTime: Infinity,
		}
	);
	const categoryList: IBlockCategory[] = isSuccess ? data?.data.results : [];
	useEffect(() => {
		if (isSuccess) {
			const list: ICategories[] = [];
			categoryList.map((item) =>
				list.push({
					label: item.name ?? '',
					value: item.id ?? 0,
				})
			);
			setCategories(list);
		}
	}, [isSuccess]);

	return (
		<div className="mt-3">
			{isLoading && 'Loading....'}
			{categories && (
				<Controller
					control={control}
					name="category"
					defaultValue=""
					rules={{
						required: 'Select category',
					}}
					render={({ field: { onChange } }) => (
						<CategoryCascader
							options={categories}
							selected={(item: any) => {
								onChange(item.value ? item.value : '');
							}}
						/>
					)}
				/>
			)}
		</div>
	);
}
