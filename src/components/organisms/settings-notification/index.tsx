import Label from '@atoms/label';
import SettingsNotificationForm, {
	INotificationFormData,
} from '@organisms/settings-notification-form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import Link from 'next/link';

export default function SettingsNotification({
	methods,
}: {
	methods: UseFormReturn<INotificationFormData, object>;
}) {
	const { userData }: any = useAppSelector(({ auth }) => auth);
	const profile_settings = userData ? userData.profile_setting : null;

	const account_support = profile_settings ? profile_settings.account_support : null;
	const messages = profile_settings ? profile_settings.messages : null;
	const reminders = profile_settings ? profile_settings.reminders : null;
	const policy_community = profile_settings ? profile_settings.policy_community : null;

	return (
		<div className="w-full grid md:grid-cols-3 gap-y-6 gap-11  font-proxima-nova">
			{/* <div> */}
			<div className="mb-14">
				<Label
					value="Messages"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-4 border-[#D7D7D7]',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<Label
						value={'Receive messages to:'}
						classes={{
							root: `leading-6 text-[#999999] text-base tracking-normal border-b pb-2 border-gray-300 mb-6`,
						}}
					/>
					<SettingsNotificationForm
						methods={methods}
						name="messages"
						data={messages}
					/>
				</div>
			</div>
			<div className="mb-14">
				<Label
					value="Contact Information"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-4 border-[#D7D7D7] mb-4',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<Label
						value={
							<>
								This information can be edited from your profile page.{' '}
								<Link href={'/user/settings/general'}>
									<span className="text-primary underline cursor-pointer">
										Edit profile{' '}
									</span>
								</Link>
							</>
						}
						classes={{
							root: `leading-6 text-[#999999] text-base tracking-normal border-b pb-2 border-gray-300 mb-6`,
						}}
					/>
					<p className="flex justify-between ">
						<span className="ml-2 text-gray-600 text-xl font-light">Email</span>
						<span>{userData?.email}</span>
					</p>
					<p className="flex justify-between ">
						<span className="ml-2 text-gray-600 text-xl font-light">Phone number:</span>
						<span>{userData?.phone}</span>
					</p>
				</div>
			</div>
			<div className="mb-14">
				<Label
					value="Text Messages"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-4 border-[#D7D7D7] mb-4',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<p className="flex flex-col justify-between ">
						<span className="ml-2 text-gray-600 text-xl font-light">
							Receive SMS notification to:
						</span>
						<select className="border bg-white rounded-sm mx-2 focus:outline-none">
							<option>{userData?.phone}</option>
						</select>
					</p>
				</div>
			</div>
			<div className="mb-14">
				<Label
					value="Reminders"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-5 border-[#D7D7D7] mb-4',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<Label
						value={
							'Recieve reminders, requests to write a review, and other reminders related to your activities on Ideeza.'
						}
						classes={{
							root: `leading-6 text-[#999999] text-base tracking-normal border-b pb-6 border-gray-300 mb-6`,
						}}
					/>
					<SettingsNotificationForm
						methods={methods}
						name="reminders"
						data={reminders}
					/>
				</div>
			</div>

			<div className="mb-14">
				<Label
					value="Account support"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-4 border-[#D7D7D7] mb-4',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<Label
						value={
							'We may need to send you messages regarding your account, legal notifica-tions, security and privacy matters, and customer support requests.'
						}
						classes={{
							root: `leading-6 text-[#999999] text-base tracking-normal border-b pb-2 border-gray-300 mb-6`,
						}}
					/>
					<SettingsNotificationForm
						methods={methods}
						name="account_support"
						data={account_support}
					/>
				</div>
			</div>
			{/* </div> */}
			{/* <div className=""> */}
			<div className="mb-14">
				<Label
					value="Policy and community"
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl font-proxima-nova font-semibold border-b pb-4 border-[#D7D7D7] mb-4',
					}}
				/>
				<div className={`bg-white  p-5 rounded-md mt-[22px]`}>
					<Label
						value={
							'Recieve updates on regulations and stay informed about advocacy efforts to create responsible laws on Ideeza.'
						}
						classes={{
							root: `leading-6 text-gray-400 font-light text-lg tracking-normal border-b pb-2 border-gray-300 mb-6`,
						}}
					/>
					<SettingsNotificationForm
						methods={methods}
						name="policy_community"
						data={policy_community}
					/>
				</div>
			</div>

			{/* </div> */}
		</div>
	);
}
