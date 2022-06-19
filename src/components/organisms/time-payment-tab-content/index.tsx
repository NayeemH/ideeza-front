// import AvatarAtom from "@atoms/avatar";
import SingleMiniTabContent from '@molecules/single-mini-tab-content';
import GenericTable from '@organisms/generic-table';
import React from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';

const TimePaymentTabContent: React.FC<any> = () => {
	return (
		<>
			<div className="bg-white">
				<div className="flex justify-between py-[20px] px-4">
					<SingleMiniTabContent
						spentWorkTime="Last 24hrs"
						time="0:00 hrs"
						income="has't worked yet"
					/>
					<SingleMiniTabContent
						spentWorkTime="This Week"
						time="0:00 hrs"
						income="Of 23hr limit"
					/>
					<SingleMiniTabContent
						spentWorkTime="Last Week"
						time="0:00 hrs"
						income="$0.00 Paid"
					/>
					<SingleMiniTabContent
						spentWorkTime="Since Start"
						time="96:40 hrs"
						income="$5800.00"
					/>
				</div>
				<hr />
				<div className="px-4 mt-[30px]">
					<h3 className="text-primary text-[22px] font-semibold pb-[50px]">
						Timesheet this week
					</h3>
					<div className="flex justify-between items-center mb-2 pl-3">
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">MON</h3>
							<h3 className="text-[18px] font-semibold">11/9</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">TUE</h3>
							<h3 className="text-[18px] font-semibold">11/10</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">WED</h3>
							<h3 className="text-[18px] font-semibold">11/11</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">THUS</h3>
							<h3 className="text-[18px] font-semibold">11/12</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">FRI</h3>
							<h3 className="text-[18px] font-semibold">11/13</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">SAT</h3>
							<h3 className="text-[18px] font-semibold">11/14</h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold">SUN</h3>
							<h3 className="text-[18px] font-semibold">11/15</h3>
						</div>
						<div className="hours w-[8%]">
							<h3 className="text-[18px] font-semibold">Hours</h3>
						</div>
						<div className="rate w-[8%]">
							<h3 className="text-[18px] font-semibold">Rate</h3>
						</div>
						<div className="amount w-[8%]">
							<h3 className="text-[18px] font-semibold">Amount</h3>
						</div>
					</div>
					<div className="flex justify-between items-center h-[50px] bg-[#F6F6F6] mb-[25px]">
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="single-timesheet w-[8%]">
							<h3 className="text-[18px] font-semibold"></h3>
						</div>
						<div className="hours w-[8%]">
							<h3 className="text-[18px] font-semibold">0:00</h3>
						</div>
						<div className="rate w-[8%]">
							<h3 className="text-[18px] font-semibold">$60.00/hr</h3>
						</div>
						<div className="amount w-[8%]">
							<h3 className="text-[18px] font-semibold">$0.00</h3>
						</div>
					</div>
					<hr />
					<div className="flex justify-between mt-[50px] items-center pb-[50px]">
						<h3 className="text-primary text-[22px] font-semibold">
							Additional payments and credits
						</h3>
						<div className="flex items-center gap-5">
							<p className="font-semibold font-base">
								Last 30 days: <span>$0.00</span>{' '}
							</p>
							<AiOutlineSchedule className="text-4xl text-primary" />
						</div>
					</div>
					<GenericTable
						headers={['Date', 'Description', 'Charge', 'Invoice']}
						rows={[
							{
								Date: 'Date',
								Description: 'Description',
								Charge: 'Charge',
								Invoice: 'Invoice',
							},
						]}
					/>
				</div>
			</div>
		</>
	);
};
TimePaymentTabContent.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default TimePaymentTabContent;
