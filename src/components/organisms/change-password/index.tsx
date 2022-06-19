import Button from '@atoms/button';
import Label from '@atoms/label';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { PASSWORDFORMINPUT } from 'utils/styles';
export type IFormData = {
	[k: string]: string;
};

export default function ChangePassword({
	methods,
	loading,
}: {
	methods: UseFormReturn<IFormData, object>;
	loading: boolean;
}) {
	const password = useRef({});
	const [showPreviousPassword, setShowPreviousPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	password.current = methods.watch('password', '');
	return (
		<>
			<Label
				value="Change your password"
				className="font-bold font-sans text-primary texl-2xl 2xl:text-2xl pb-4"
			/>
			<div className="rounded-lg w-full bg-white shadow-md py-3 md:px-6 px-4 mb-6">
				<div className="lg:w-4/6 space-y-4 pt-2">
					<div>
						<label className="grid grid-cols-2 mb-4">
							<span className="text-lg">Old Password</span>
							<div className="flex">
								<input
									className={PASSWORDFORMINPUT + ' border border-gray-300 py-1 '}
									type={showPreviousPassword ? 'text' : 'password'}
									{...methods.register('old_password', {
										required: 'Enter Old Password.',
									})}
								/>
								{showPreviousPassword ? (
									<FaRegEye
										onClick={() => setShowPreviousPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8   cursor-pointer"
									/>
								) : (
									<FaRegEyeSlash
										onClick={() => setShowPreviousPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8  cursor-pointer"
									/>
								)}
							</div>
						</label>
						<label className="grid grid-cols-2 mb-4">
							<span className="text-lg">New Password</span>
							<span className="flex">
								<input
									className={PASSWORDFORMINPUT + ' border border-gray-300 '}
									type={showNewPassword ? 'text' : 'password'}
									{...methods.register('password', {
										required: 'Enter New Password.',
										minLength: {
											value: 6,
											message: 'Password must have at least 6 characters',
										},
									})}
								/>
								{showNewPassword ? (
									<FaRegEye
										onClick={() => setShowNewPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8   cursor-pointer"
									/>
								) : (
									<FaRegEyeSlash
										onClick={() => setShowNewPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8   cursor-pointer"
									/>
								)}
							</span>
						</label>
						<label className="grid grid-cols-2">
							<span className="text-lg">Confirm Password</span>
							<span className="flex">
								<input
									className={PASSWORDFORMINPUT + ' border border-gray-300 '}
									type={showNewPassword ? 'text' : 'password'}
									{...methods.register('password2', {
										required: 'Enter Confirm Password.',
										validate: (value) =>
											value == password.current ||
											'The passwords do not match',
									})}
								/>
								{showNewPassword ? (
									<FaRegEye
										onClick={() => setShowNewPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8   cursor-pointer"
									/>
								) : (
									<FaRegEyeSlash
										onClick={() => setShowNewPassword((prev) => !prev)}
										className="mt-2 text-2xl -ml-8   cursor-pointer"
									/>
								)}
							</span>
						</label>
					</div>
					<div className="flex items-center justify-center pt-4 pb-2">
						<Button
							type="submit"
							value="Update Password"
							variant="contained"
							color="primary"
							className={
								'bg-primary py-2 text-white font-sans tracking-tight text-base 2xl:text-xl capitalize px-8'
							}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
