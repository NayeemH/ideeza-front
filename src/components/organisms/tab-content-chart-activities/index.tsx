import CustomSelect from '@molecules/custom-select';
import GenericTable from '@organisms/generic-table';
import React from 'react';
import { IoHandRightSharp } from 'react-icons/io5';
// import { BsGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
// import SelectBasic from "@molecules/select-basic";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const ChartActivitiesNFT: React.FC<any> = () => {
	// const [period, setPeriod] = useState<string>("");
	// const [activites, setActivites] = useState<string>("");
	// const [type, setType] = useState<string>("");
	const growthData = [
		{
			name: '1/15',
			pv: 4,
		},
		{
			name: '1/18',
			pv: 5,
		},
		{
			name: '1/21',
			pv: 5.5,
		},
		{
			name: '1/24',
			pv: 5.5,
		},
		{
			name: '1/27',
			pv: 5.8,
		},
		{
			name: '1/30',
			pv: 5.8,
		},
		{
			name: '2/2',
			pv: 5.8,
		},
		{
			name: '2/5',
			pv: 5.8,
		},
	];
	return (
		<div className="">
			<div className="border p-[30px] rounded-[6px]">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-[20px]">
					<div className=" flex gap-2 flex-wrap">
						{/* <SelectBasic
              value={period}
              options={[
                {
                  name: "Last 24Hrs",
                  value: "Last 24Hrs",
                },
                {
                  name: "Last Week",
                  value: "Last Week",
                },
                {
                  name: "Last Month",
                  value: "Last Month",
                },
              ]}
              handleChange={(e: any) => setPeriod(e.target.value)}
              placeholder={"period"}
              // error={genderError ? true : false}
              // helpText={genderError}
              selectClasses=" border border-[#CCCCCC] rounded-[5px] w-full text-[16px] leading-[29px] text-[#333333] mb-3 "
              labelClasses="py-0"
            />
            <SelectBasic
              value={activites}
              options={[
                {
                  name: "Last 24Hrs",
                  value: "Last 24Hrs",
                },
                {
                  name: "Last Week",
                  value: "Last Week",
                },
                {
                  name: "Last Month",
                  value: "Last Month",
                },
              ]}
              handleChange={(e: any) => setActivites(e.target.value)}
              placeholder={"activites"}
              // error={genderError ? true : false}
              // helpText={genderError}
              selectClasses=" border border-[#CCCCCC] rounded-[5px] w-full text-[16px] leading-[29px] text-[#333333] mb-3"
            />
            <SelectBasic
              value={type}
              options={[
                {
                  name: "Last 24Hrs",
                  value: "Last 24Hrs",
                },
                {
                  name: "Last Week",
                  value: "Last Week",
                },
                {
                  name: "Last Month",
                  value: "Last Month",
                },
              ]}
              handleChange={(e: any) => setType(e.target.value)}
              placeholder={"activites"}
              // error={genderError ? true : false}
              // helpText={genderError}
              selectClasses=" border border-[#CCCCCC] rounded-[5px] w-full text-[16px] leading-[29px] text-[#333333]"
            /> */}
						<div className="flex justify-center mr-[20px]">
							<CustomSelect
								options={[
									{ name: 'Car', value: 'Car' },
									{ name: 'Mobile', value: 'Mobile' },
									{ name: 'NFT', value: 'NFT' },
								]}
								inputClassName="focus:outline-none w-[120px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
								placeholder="period"
								unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded mt-2 border top-10 text-xl"
								arrowColor=" text-[#333333] ml-[-2rem]"
								arrowColorTop=" text-primary ml-[-2rem]"
							/>
						</div>
						<div className="flex justify-center mr-[20px]">
							<CustomSelect
								options={[
									{ name: 'Car', value: 'Car' },
									{ name: 'Mobile', value: 'Mobile' },
									{ name: 'NFT', value: 'NFT' },
								]}
								inputClassName="focus:outline-none w-[120px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
								placeholder="activites"
								unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded mt-2 border top-10 text-xl"
								arrowColor=" text-[#333333] ml-[-2rem]"
								arrowColorTop=" text-primary ml-[-2rem]"
							/>
						</div>
						<div className="flex justify-center mr-[20px]">
							<CustomSelect
								options={[
									{ name: 'Car', value: 'Car' },
									{ name: 'Mobile', value: 'Mobile' },
									{ name: 'NFT', value: 'NFT' },
								]}
								inputClassName="focus:outline-none w-[120px] rounded py-[10px] px-[20px] text-[#333333] placeholder:text-[#333333] text-base shadow-none border"
								placeholder="Type"
								unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 rounded mt-2 border top-10 text-xl"
								arrowColor=" text-[#333333] ml-[-2rem]"
								arrowColorTop=" text-primary ml-[-2rem]"
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div>
							<h5 className="text-[12px">90 Day Avg. Price</h5>
							<h5 className="text-[12px] text-primary font-semibold">=459.1355</h5>
						</div>
						<div>
							<h5 className="text-[12px">90 Day Volume</h5>
							<h5 className="text-[12px] text-primary font-semibold">=678.55</h5>
						</div>
					</div>
					{/* <div className="absolute right-5 bg-white p-4">
            <div className="flex">
              <SelectBasic
                value={period}
                options={[
                  {
                    name: "Last 24Hrs",
                    value: "Last 24Hrs",
                  },
                  {
                    name: "Last Week",
                    value: "Last Week",
                  },
                  {
                    name: "Last Month",
                    value: "Last Month",
                  },
                ]}
                handleChange={(e: any) => setPeriod(e.target.value)}
                placeholder={"Price: Low to High"}
                // error={genderError ? true : false}
                // helpText={genderError}
                selectClasses=" border border-[#CCCCCC] rounded-[5px] w-full text-md xl:text-[16px] text-[#333333] mb-3"
              />
              <div className="mb-2 p-2 px-3 border rounded-md ml-3 flex items-center">
                <BsFillGridFill className="mr-1 text-xl " />
                <div className="h-8 w-[1px] bg-gray-300 mr-1"></div>
                <BsGrid3X3GapFill className="text-xl" />
              </div>
            </div>
          </div> */}
				</div>

				<ResponsiveContainer
					width="100%"
					height={400}
				>
					<LineChart data={growthData}>
						<XAxis dataKey="name" />
						<YAxis />
						<CartesianGrid
							stroke="#eee"
							strokeDasharray="5 5"
						/>
						<Line
							type="monotone"
							dataKey="pv"
							stroke="#7460EE"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="border p-[30px] pr-[15px] rounded-[6px] mt-[30px]">
				<div className="h-[425px] overflow-y-auto pr-[25px]">
					<GenericTable
						headers={['offers', 'Item', 'Price', 'Quantity', 'From', 'To', 'Time']}
						rows={[
							{
								id: 1,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers</h5>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: '9 hour ago',
							},
							{
								id: 3,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers </h5>
										<span className="text-primary text-[11px] ml-1">
											expired
										</span>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: '12 hour ago',
							},
							{
								id: 2,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers </h5>
										<span className="text-primary text-[11px] ml-1">
											expired
										</span>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: 'a day ago',
							},
							{
								id: 4,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers </h5>
										<span className="text-primary text-[11px] ml-1">
											expired
										</span>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: 'a day ago',
							},
							{
								id: 5,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers </h5>
										<span className="text-primary text-[11px] ml-1">
											expired
										</span>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: 'a day ago',
							},
							{
								id: 6,
								offers: (
									<div className="flex items-center">
										<IoHandRightSharp />
										<h5 className="ml-1">Offers </h5>
										<span className="text-primary text-[11px] ml-1">
											expired
										</span>
									</div>
								),
								Item: (
									<div className="flex items-center">
										<img
											src="/images/token-img.png"
											alt=""
										/>
										<h5 className="ml-1">Token 314</h5>
									</div>
								),
								Price: (
									<>
										<div className="flex items-center">
											<img
												src="/images/icon/price-up-icon.svg"
												className="w-3 h-3"
												alt="icon"
											/>
											<h5 className="ml-1 text-[14px]">2.5</h5>
										</div>
										<h5 className="text-[12px]">$9,050.99</h5>
									</>
								),
								Quantity: 1,
								From: 'Preee...',
								To: '---',
								Time: 'a day ago',
							},
						]}
						tableHeaderColor="border-[#E6E6E6]"
						tableCellStyle="text-[16px] font-normal font-proxima-nova "
						tableCellStyleBody="border-[#E6E6E6]"
						isCellClicked={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(ChartActivitiesNFT);
