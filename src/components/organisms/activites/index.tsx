import React from 'react';
import LabelFields from '@molecules/label-field';
import { IoHandRightSharp } from 'react-icons/io5';
import GenericTable from '@organisms/generic-table';
// import Activity from '@molecules/activites';

function DashboardActivity({ activities }: any) {
	return (
		<div className="w-full overflow-x-auto">
			<div className="lg:pr-0 mb-2 flex items-center justify-between pb-3 mt-[30px]">
				{activities?.length > 0 && (
					<LabelFields
						mainClass="pb-0"
						value="Last activities"
						selectdivclass="hidden"
						labelClasses="text-base xl:text-2xl 2xl:text-3xl font-semibold"
						btnValue="View last activity"
						goTo="LastActivity"
						buttonclasses="rounded-[10px] text-[#333333] bg-white py-2"
					/>
				)}
				{/* <Button
          onClick={handleWebCollaboration}
          value={badge}
          className="text-white text-base bg-primary ml-3 shadow-none capitalize px-6 py-2"
          color="primary"
        /> */}
			</div>
			<div className="space-y-3 w-full overflow-x-auto border-t border-gray-300 pt-[20px]">
				<div className="max-h-[330px] max-w-full overflow-y-auto user-dashboard-activities">
					<GenericTable
						isCellClicked={false}
						tableHeaderColor="capitalize"
						headers={['', 'Item', 'Price', 'Quantity', 'From', 'To', 'Time']}
						rows={[
							{
								id: 1,
								'': (
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
								'': (
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
								'': (
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
								'': (
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
								'': (
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
						hasBorder={false}
					/>
					{/* {activities?.length > 0 ? (
						activities?.map((val: any, index: any) => {
							return (
								<Activity
									key={index}
									date={val?.time}
									title={val?.title}
									description={val?.description}
								/>
							);
						})
					) : (
						<p className="text-center h-full flex items-center justify-center w-full text-gray-500">
							User Have No Activity!
						</p>
					)} */}
				</div>
			</div>
		</div>
	);
}

export default DashboardActivity;
