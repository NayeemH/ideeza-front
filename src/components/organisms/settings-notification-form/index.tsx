import { UseFormReturn } from 'react-hook-form';

export type INotificationFormData = {
	[k: string]: boolean;
};

export default function SettingsNotificationForm({
	methods,
	name,
	data,
}: {
	data: any;
	methods: UseFormReturn<INotificationFormData, object>;
	name: string;
}) {
	return (
		<div className="mt-3 max-w-full pb-[25px]">
			<>
				<label className="block mb-[18px]">
					<input
						type="checkbox"
						className="w-4 h-4 accent-slate-50 mr-3"
						defaultChecked={data?.email}
						{...methods.register(`${name}.email`)}
					/>
					<span className="ml-2 text-gray-600 text-xl font-light">Email</span>
				</label>
				<label className="block mb-[18px]">
					<input
						type="checkbox"
						defaultChecked={data?.notification}
						{...methods.register(`${name}.notification`)}
						className="w-4 h-4 accent-slate-50 mr-3"
					/>
					<span className="ml-2 text-gray-600 text-xl font-light">
						Notification to mobile devices
					</span>
				</label>
				<label className="block mb-[18px]">
					<input
						type="checkbox"
						defaultChecked={data?.text_message}
						{...methods.register(`${name}.text_message`)}
						className="w-4 h-4 accent-slate-50 mr-3"
					/>
					<span className="ml-2 text-gray-600 text-xl font-light">Text messages</span>
				</label>
			</>
		</div>
	);
}
