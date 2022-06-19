import React from 'react';
import Label from '@atoms/label';
import LoginHistoryTable from '@organisms/login-history-table';
function LoginHistory() {
	{
		return (
			<>
				<Label
					value="Login History"
					className="font-bold font-sans text-primary text-2xl pb-4"
				/>
				<div className="rounded-lg bg-white shadow-md py-3 md:px-6 px-4">
					{/* <LoginHistoryTable data={data} /> */}
					{/* <GenericTable headers={["Browser/Device", "Location", ""]} /> */}
					<LoginHistoryTable />
					<Label
						value="If you see something unfamiliar change your password."
						className="font-sans tracking-tight text-gray-850 text-sm text-right py-2"
					/>
				</div>
			</>
		);
	}
}
export default LoginHistory;
