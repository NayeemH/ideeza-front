import AvatarAtom from '@atoms/avatar';
import CustomSelect from '@molecules/custom-select';
import SearchInput from '@molecules/search-input';
import GenericTable from '@organisms/generic-table';
import Image from 'next/image';
import React from 'react';

export default function NftMarketRankingHome() {
	return (
		<>
			<div className="bg-header pt-20"></div>
			<div className="py-[50px]">
				<div className="text-center mb-[50px]">
					<h2 className="text-[45px] pb-[15px]">Top NFTs</h2>
					<p className=" w-[100%] m-auto text-primary text-[20px]">
						At IDEEZA, we want to give back the power to create to everyone
					</p>
				</div>

				<div className="flex flex-col md:flex-row justify-center gap-4 relative mb-[40px]">
					<div className="flex justify-center">
						<CustomSelect
							options={[
								{ name: 'All chains', value: 'All chains' },
								{ name: 'Mobile', value: 'Mobile' },
								{ name: 'NFT', value: 'NFT' },
							]}
							inputClassName="focus:outline-none   p-3 text-[#561F80] rounded-md border border-gray-300 text-base shadow-md"
							placeholder="Select a Chain"
							unorderedList="absolute overflow-y-auto w-full   bg-white rounded-md rounded-t-lg border border-gray-300 mt-2 shadow-lg flex flex-wrap gap-4 z-10  top-10 text-xl"
							arrowColor="text-gray-500 -ml-8"
							arrowColorTop=" text-primary -ml-8"
						/>
					</div>
					<div className="flex justify-center">
						<CustomSelect
							options={[
								{ name: 'All categories', value: 'All categories' },
								{ name: 'Mobile', value: 'Mobile' },
								{ name: 'NFT', value: 'NFT' },
							]}
							inputClassName="focus:outline-none  rounded-md border border-gray-300 p-3 text-[#561F80] text-base shadow-md"
							placeholder="Select a categories"
							unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded-md rounded-t-lg border border-gray-300 mt-2 top-10 text-xl"
							arrowColor="text-gray-500 -ml-8"
							arrowColorTop=" text-primary -ml-8"
						/>
					</div>
					<div className="flex justify-center">
						<CustomSelect
							options={[
								{ name: 'Last 24Hrs', value: 'Last 24Hrs' },
								{ name: 'Mobile', value: 'Mobile' },
								{ name: 'NFT', value: 'NFT' },
							]}
							inputClassName="focus:outline-none  rounded-md border border-gray-300 p-3 text-[#561F80] text-base shadow-md"
							placeholder="Select time"
							unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded-md rounded-t-lg border border-gray-300 mt-2 top-10 text-xl"
							arrowColor="text-gray-500 -ml-8"
							arrowColorTop=" text-primary -ml-8"
						/>
					</div>
					<div className="2xl:absolute right-10 mx-3 md:mx-0">
						<SearchInput
							iconClass="text-primary"
							containerClassInput="border border-gray-400 border-solid p-0"
							inputClass="2xl:w-[300px] placeholder-[#333333] text-[16px] p-3 "
						/>
					</div>
				</div>
				<div className="h-[400px] w-[80%] m-auto overflow-y-auto">
					<GenericTable
						headers={[
							'Collectons',
							'Volume',
							'24h%',
							'7d%',
							'Floor Price',
							'Owners',
							'Items',
						]}
						rows={[
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											{/* <img
                        src="/images/icon/price-up-icon.svg"
                        className="w-3 h-3"
                        alt="icon"
                      /> */}
											<Image
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
												width={'100%'}
												height={'100%'}
												layout="responsive"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
							{
								id: 1,
								Collectons: (
									<div className="flex items-center w-[300px]">
										<p>1</p>
										<AvatarAtom
											variant="circular"
											src="/images/choose-your-avatar/developer_avatar.png"
										/>
										<h5 className="ml-1">Karafuru</h5>
									</div>
								),
								Volume: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">16,951.36</h5>
										</div>
									</>
								),
								'24h%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">16.36%</h5>
										</div>
									</>
								),
								'7d%': (
									<>
										<div className="flex items-center text-green-500">
											<div>+</div>
											<h5 className="ml-1 text-[14px]">33.36%</h5>
										</div>
									</>
								),
								'Floor Price': (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">3.15</h5>
										</div>
									</>
								),
								Owners: (
									<>
										<h5 className="text-[14px] text-left">3.5K</h5>
									</>
								),
								Items: (
									<>
										<h5 className="text-[14px] text-left">5.6K</h5>
									</>
								),
							},
						]}
					/>
				</div>
			</div>
		</>
	);
}
