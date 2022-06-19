import SearchInput from '@molecules/search-input';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { IElectronicsPart } from '@models/electronics';
import Button from '@atoms/button';
import Loader from '@atoms/loader';
import { apiService } from 'utils/request';

function SearchPart({
	selectedPart,
	searchedPart,
	onChangeSearchPart,
}: {
	selectedPart: (item: IElectronicsPart) => void;
	searchedPart: any;
	onChangeSearchPart(part: any): any;
}) {
	const [search, setSearch] = useState('');
	const [selectPart, setSelectPart] = useState<IElectronicsPart>();
	const [isLoading, setIsLoading] = useState(true);
	const [partList, setPartList] = useState([]);

	const handleSelect = (item: IElectronicsPart) => {
		selectedPart(item);
	};

	const onChangeSerach = (e: any) => {
		setSearch(e.target.value);
		searchOctoPart(e.target.value);
		searchDatasheet(e.target.value);
	};

	const searchOctoPart = (searchValue: any) => {
		setIsLoading(true);

		const apiData: any = {
			method: 'get',
			url: `/octopart/search-part/?query=${searchValue}`,
			token: true,
		};

		apiService(apiData, (res: any, err: any) => {
			if (res) {
				setPartList(res?.data?.results);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		});
	};

	const searchDatasheet = (searchValue: any) => {
		setIsLoading(true);

		const query = `[{"mpn":"${searchValue}"}]`;

		const apiData: any = {
			method: 'get',
			url: `/octopart/match-part-datasheets/?query=${query}`,
			token: true,
		};

		apiService(apiData, (res: any, err: any) => {
			if (res) {
				console.log('DATASHEET', res);
			} else {
				setIsLoading(false);
			}
		});
	};

	return (
		<div className="2xl:px-[140px]">
			<SearchInput
				change={onChangeSerach}
				// placeholder={
				//   <Label value="Search the name of the product or click here for create new part" />
				// }
				placeholder="Search the name of the product or click here for create new part"
				className="bg-white flex flex-row-reverse border border-solid border-[#E7E7E7] rounded-[6px]"
				inputClass="text-base 2xl:text-xl py-3 text-gray-900"
				iconClass="text-gray-900"
			/>
			{search ? (
				<div className="bg-white border border-solid border-[#E7E7E7] rounded-[6px] overflow-hidden mt-[16px]">
					{searchedPart && (
						<div className="flex justify-between items-center p-4 bg-gray-50 border-b">
							<div className="flex items-center gap-4">
								<Avatar
									src={
										searchedPart?.icon
											? searchedPart?.icon
											: '/images/add-part-p-icon.svg'
									}
								/>
								<div className="text-gray-600 ">
									<p className="text-base 2xl:text-xl eina-font-sb03">
										{searchedPart?.name}
									</p>
									<p className="text-base 2xl:text-xl">
										{searchedPart?.description}
									</p>
								</div>
							</div>
							<div>
								<span className="shadow px-[30px] py-2 rounded border border-gray-100 text-gray-600 flex items-center gap-2">
									<img
										src="/images/-e-pdf.png"
										alt="icon"
									/>
									<span>Datasheet</span>
								</span>
							</div>
						</div>
					)}

					<div className="p-6 px-[30px] relative">
						{isLoading ? (
							<div className="w-full min-h-[500px]">
								<Loader type="relative" />
							</div>
						) : (
							<div className="border border-solid border-[#E7E7E7]">
								<table className="w-full">
									<thead className="text-left text-lg">
										<tr className="text-[#333333] text-[18px] font-semibold font-promixa-nova md:text-base xl:text-xl border-b border-[#E6E6E6] py-[28px] cursor-pointer">
											<th className="px-[30px] leading-[80px]">Name</th>
											<th className="px-[30px] leading-[80px]">Brand</th>
											<th className="px-[30px] leading-[80px]">Package</th>
											<th className="px-[30px] leading-[80px]">
												Manufacturer
											</th>
											<th className="px-[30px] leading-[80px]">Action</th>
										</tr>
									</thead>
									<tbody>
										{partList &&
											partList.map((singlePart: any, key: any) => (
												<tr
													key={singlePart?.item?.uid}
													className={`${
														key % 2 === 0 ? 'bg-[#FBFBFB] ' : 'bg-white'
													} text-[#787878] text-sm md:text-base xl:text-xl border-b border-[#E6E6E6] py-[28px] cursor-pointer`}
												>
													<td
														className="px-[30px] mx-auto leading-[80px]"
														onClick={() => setSelectPart(singlePart)}
													>
														{singlePart?.item?.mpn ?? 'N/A'}
													</td>
													<td className="px-[30px] mx-auto leading-[80px]">
														{singlePart?.item?.brand
															? singlePart?.item?.brand?.name
															: 'N/A'}
													</td>
													<td className="px-[30px] mx-auto leading-[80px]">
														N/A
													</td>
													<td className="text-primary px-[30px] mx-auto leading-[80px]">
														{singlePart?.item?.manufacturer
															? singlePart?.item?.manufacturer?.name
															: 'N/A'}
													</td>
													<td>
														<Button
															onClick={() => handleSelect(singlePart)}
															value="Select"
															className="bg-white text-[#666666] shadow-none border border-solid border-[#E7E7E7] rounded-full px-[30px] py-[10px] my-2 whitespace-nowrap tracking-tight transform-none text-lg font-sans leading-4"
															color="inherit"
														/>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default SearchPart;
