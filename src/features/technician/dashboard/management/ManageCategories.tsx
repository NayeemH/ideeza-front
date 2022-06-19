import Label from '@atoms/label';
import React, { useEffect, useState } from 'react';
import TabsMoleculeAbout from '@molecules/tabs-about';
import SearchInput from '@molecules/search-input';
import Button from '@atoms/button';
import BlocklySidebar from '@organisms/blockly-sidebar';
import { useAppSelector } from 'app/hooks';
import ManageCategoryTree from '@molecules/manage-category-tree';

const ManageCategories = () => {
	const [index, setIndex] = useState<any>(0);

	const openBlockMenu = useAppSelector((state) => state?.sidebar?.openBlockMenu);

	useEffect(() => {
		handleChange(openBlockMenu);
		setIndex(openBlockMenu);
	}, [openBlockMenu]);

	const handleChange = (newValue: any) => {
		setIndex(newValue);
	};
	return (
		<div className="md:pt-2">
			<Label
				value="Manage Categories"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white shadow-lg rounded-md p-4">
				<div className="space-y-3 lg:w-1/3 md:w-1/2 custom-tech-m-tab">
					<TabsMoleculeAbout
						index={index}
						handleChange={handleChange}
						tabsClasses="md:w-1/3 cus2-border-bottom mb-4"
						tabClasses="text-base 2xl:text-xl text-left font-sans whitespace-nowrap tracking-tight focus:text-current transform-none text-gray-700"
						tabsData={[
							{
								name: 'Electronics',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										this handleChange option should be changed
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
							{
								name: 'Code',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
							{
								name: 'Cover',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
							{
								name: 'App',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
							{
								name: 'Network',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
							{
								name: 'Blog',
								component: (
									<div className="shadow w-full">
										<SearchInput
											placeholder="Search trough categories..."
											className="bg-gray-100 rounded-none flex flex-row-reverse border-b border-gray-160"
											inputClass="custom-placeholder-m-tab custom-tech-management-bg  custom-placeholder-m-tab custom-tech-management-bg text-base 2xl:text-xl1 py-4 text-gray-700"
										/>
										<BlocklySidebar />
										<Button
											value="+ Add new category"
											className="text-current custom-tech-management-bg mt-0 text-base 2xl:text-xl border-0 shadow-none w-full rounded-none py-4 text-sm tracking-tight font-sans transform-none font-semibold"
										/>
									</div>
								),
							},
						]}
					/>
				</div>

				<div>
					<ManageCategoryTree />
				</div>
			</div>
		</div>
	);
};

export default ManageCategories;
