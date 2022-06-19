import SearchInput from '@molecules/search-input';
import { IoIosArrowDown } from 'react-icons/io';

const NewsFeedFilters = (props: any) => {
	const {
		search,
		sortBy,
		onChangeSearch,
		onChangeSortBy,
		onEnterSearch,
		sortByOptions,
		searchPlaceholder,
		className,
	} = props;

	return (
		<div className={className}>
			<SearchInput
				change={onChangeSearch}
				keyDown={onEnterSearch}
				value={search}
				placeholder={searchPlaceholder}
				className="pl-2 border border-solid"
				inputClass="bg-white rounded-lg text-base 2xl:text-xl py-4 px-5"
			/>
			<div className="flex items-center flex-wrap gap-[15px] w-full mt-6 lg:justify-start 2xl:justify-between">
				<div className="flex justify-between 2xl:justify-center">
					<div className="mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
						Sort by
					</div>
					<div className="relative">
						<IoIosArrowDown className="absolute right-[10px] xl:right-[10px] top-[8px] xl:top-[14px]" />
						<select
							value={sortBy}
							onChange={onChangeSortBy}
							className="px-4 xl:px-[25px] xl:pr-[35px] py-[5px] xl:py-[9px] rounded bg-white ml-2 text-base text-[#333333] focus:outline-none focus:border-primary appearance-none"
						>
							{sortByOptions.map((item: any, index: number) => (
								<option
									className="text-[#999999]"
									key={index}
									value={item.value}
								>
									{item.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex justify-between 2xl:justify-center">
					<div className=" whitespace-nowrap mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
						Browse by Category
					</div>
					<div className="relative">
						<IoIosArrowDown className="absolute right-[10px] xl:right-[10px] top-[8px] xl:top-[14px]" />
						<select
							//   value={sortBy}
							//   onChange={onChangeSortBy}
							className="px-4 xl:px-[25px] pr-[40px] xl:pr-[35px] py-[5px] xl:py-[9px] rounded bg-white ml-2 text-base text-[#333333] focus:outline-none focus:border-primary appearance-none"
						>
							{/* {sortByOptions.map((item: any, index: number) => ( */}
							<option
								className="text-[#999999]"
								value="category1"
							>
								category1
							</option>
							<option
								className="text-[#999999]"
								value="category2"
							>
								category2
							</option>
							<option
								className="text-[#999999]"
								value="category3"
							>
								category3
							</option>
							<option
								className="text-[#999999]"
								value="category4"
							>
								category4
							</option>

							{/* ))} */}
						</select>
					</div>
				</div>
				<div className="flex justify-between 2xl:justify-center">
					<div className="mr-2 text-[#101010] font-proxima-nova text-base 2xl:text-xl flex items-center">
						From
					</div>
					<div className="relative">
						<IoIosArrowDown className="absolute right-[10px] xl:right-[10px] top-[8px] xl:top-[14px]" />
						<select
							//   value={sortBy}
							//   onChange={onChangeSortBy}
							className="px-4 xl:px-[25px] pr-[40px] xl:pr-[35px] py-[5px] xl:py-[9px] rounded bg-white ml-2 text-base text-[#333333] focus:outline-none focus:border-primary appearance-none"
						>
							{/* {sortByOptions.map((item: any, index: number) => ( */}
							<option
								className="text-[#999999]"
								value="Last week"
							>
								Last week
							</option>
							<option
								className="text-[#999999]"
								value="category2"
							>
								category2
							</option>
							<option
								className="text-[#999999]"
								value="category3"
							>
								category3
							</option>
							<option
								className="text-[#999999]"
								value="category4"
							>
								category4
							</option>

							{/* ))} */}
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

NewsFeedFilters.defaultProps = {
	searchPlaceholder: 'Search...',
	className: '',
};

export default NewsFeedFilters;
