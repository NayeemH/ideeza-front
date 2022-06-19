import React, { useEffect, useState } from 'react';
import { ICategories } from '@models/core';
import { useQuery } from 'react-query';
import { getBlockCategory, getBlockChildCategories } from '../../../request/core';
import { IBlockCategory } from '@models/code';
import { DropDown } from '@atoms/multi-level-dropdown';

interface ICategoryMultipleSelectorProps {
	categoryType?: 'CODE' | 'ELECTRONIC' | 'COVER';
	selectedCategory?: {
		id: string;
		name: string;
	};

	onSelect?(id: any): void;
}

interface IChildCategoriesProps {
	parentCategory: IBlockCategory;

	onSelect(id: any, name: string): void;
}

const ChildCategories: React.FC<IChildCategoriesProps> = (props) => {
	const { parentCategory: category } = props;
	const [children, setChildren] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const public_children: any = [];

	if (children && children.length > 0) {
		children.forEach((child: any) => {
			if (child?.is_visible === true) {
				public_children.push(child);
			}
		});
	}

	const private_children: any = [];

	if (children && children.length > 0) {
		children.forEach((child: any) => {
			if (child?.is_visible === false) {
				private_children.push(child);
			}
		});
	}

	const getChildCategories = () => {
		if (category && category?.id) {
			getBlockChildCategories(category?.id.toString())
				.then(({ data }) => {
					const cats = data?.results;
					setLoaded(true);
					setChildren(cats ?? []);
				})
				.catch(() => {
					setLoaded(true);
				});
		}
	};

	useEffect(() => {
		if (!loaded) {
			getChildCategories();
		}
	}, []);

	return (
		<>
			{public_children?.length > 0 && (
				<DropDown.Item label={'Public'}>
					{public_children.map((child: any, index: number) => (
						<DropDown.Item
							key={index}
							label={child?.name}
							onClick={() => {
								if (!child?.has_children && child && child?.name) {
									props.onSelect(child?.id, child?.name);
								}
							}}
						>
							{child?.has_children && (
								<ChildCategories
									parentCategory={child}
									onSelect={props.onSelect}
								/>
							)}
						</DropDown.Item>
					))}
				</DropDown.Item>
			)}

			{private_children?.length > 0 && (
				<DropDown.Item label={'Private'}>
					{private_children.map((child: any, index: number) => (
						<DropDown.Item
							key={index}
							label={child?.name}
							onClick={() => {
								if (!child?.has_children && child && child?.name) {
									props.onSelect(child?.id, child?.name);
								}
							}}
						>
							{child?.has_children && (
								<ChildCategories
									parentCategory={child}
									onSelect={props.onSelect}
								/>
							)}
						</DropDown.Item>
					))}
				</DropDown.Item>
			)}
		</>
	);
};

const CategoryMultipleSelector: React.FC<ICategoryMultipleSelectorProps> = (props) => {
	const initialSelectedCategory = {
		id: '',
		name: 'Select Category',
	};

	const [selectedCategory, setSelectedCategory] = useState<{
		id: string;
		name: string;
	}>(props.selectedCategory ?? initialSelectedCategory);

	const { data, isSuccess, refetch } = useQuery(
		[`core-category`],
		() => getBlockCategory(`?category_type=${props.categoryType}&page_size=100`),
		{
			keepPreviousData: false,
			staleTime: Infinity,
		}
	);

	const [open, setOpen] = useState(false);

	const categoryList: IBlockCategory[] = isSuccess ? data?.data.results : [];

	const handleSelectCategory = (id: any, name: string) => {
		setOpen(false);
		setSelectedCategory((prev) => ({
			...prev,
			id,
			name,
		}));

		if (typeof props.onSelect === 'function') {
			props.onSelect(id);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			const list: ICategories[] = [];

			categoryList.map((item) =>
				list.push({
					label: item.name ?? '',
					value: item.id ?? 0,
				})
			);
		}
	}, [isSuccess]);

	useEffect(() => {
		setSelectedCategory(props.selectedCategory ?? initialSelectedCategory);
		refetch();
	}, [props.selectedCategory]);

	return (
		<div className="">
			<DropDown.Menu
				label={selectedCategory.name}
				open={open}
				onOpen={() => setOpen(true)}
				// style={{"border-0"}}
			>
				{categoryList.map((category, index) => (
					<DropDown.Item
						key={index}
						label={category?.name}
						onClick={() => {
							if (!category?.has_children && category && category?.name) {
								handleSelectCategory(category?.id, category?.name);
							}
						}}
					>
						{category?.has_children && (
							<ChildCategories
								parentCategory={category}
								onSelect={handleSelectCategory}
							/>
						)}
					</DropDown.Item>
				))}
			</DropDown.Menu>
		</div>
	);
};

export default CategoryMultipleSelector;
