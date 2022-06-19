import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
export type IFormData = {
	[k: string]: boolean;
};
export default function PrivacySettingsForm({
	methods,
	loading,
}: {
	methods: UseFormReturn<IFormData, object>;
	loading: boolean;
}) {
	return (
		<div className="lg:w-8/12 md:w-10/12 pb-4 font-proxima-nova">
			<div className="space-y-6">
				<Label
					value={'Social Connections'}
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl tracking-tight font-semibold border-b pb-2 border-gray-300 mb-4',
					}}
				/>
				<div className="rounded-md bg-white shadow">
					<div className="">
						<div className="border-b max-w-[790px] md:px-6 px-4 py-4">
							<p className="mb-4 text-[#333333] text-base">
								Social Connections highlights your Ideeza activity, which may
								include your username, Facebook profile photo, and recent locations
								you visited to your Facebook friends who are also on Ideeza.
							</p>
							<p className="mb-4 text-[#333333] text-base">
								If you turn off this feature, you will still be connected to
								Facebook, but your Ideeza activity will not be shared to other
								Facebook friends on Ideeza. Your public Ideeza activity (such as
								public reviews) on the platform will still be shown to other Ideeza
								users.
							</p>
							<p className="mb-2 text-[#333333] text-base">
								If you want to disconnect your Facebook account from Ideeza, go to
								General to learn more.
							</p>
						</div>

						<label className="p-4 flex">
							<input
								type="checkbox"
								className="text-primary mt-1"
								{...methods.register('social_connections')}
							/>
							<span className="ml-2 text-[#333333] ">
								Share my activity with my Facebook friends that are also on Ideeza
								(recommended)
							</span>
						</label>
					</div>
				</div>

				<Label
					value={'Add Ideeza to Facebook Timeline'}
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl  tracking-tight font-semibold border-b pb-2 border-gray-300 mb-4',
					}}
				/>
				<div className="rounded-md bg-white shadow">
					<div className="">
						<div className="border-b max-w-[790px] md:px-6 px-4 py-4">
							<p className="mb-4 text-[#333333] text-base">
								Check this box to automatically publish your Wish Lists to Facebook.
							</p>
							<p className="mb-4 text-[#333333] text-base">
								They'll show up in your Facebook Timeline and your friends' News
								Feed and Ticker.
							</p>
							<p className="mb-2 text-[#333333] text-base">
								If you want to disconnect your Facebook account from Ideeza, go to
								General to learn more.
							</p>
						</div>

						<label className="p-4 flex">
							<input
								type="checkbox"
								className="text-primary mt-1"
								{...methods.register('facebook_timeline')}
							/>
							<span className="ml-2 text-[#333333] text-base">
								Share my activity with my Facebook friends that are also on Ideeza
								(recommended)
							</span>
						</label>
					</div>
				</div>

				<Label
					value={'Your Products & Profile in Search Engines'}
					classes={{
						root: 'text-primary texl-lg 2xl:text-2xl  tracking-tight font-semibold border-b pb-2 border-gray-300 mb-4',
					}}
				/>
				<div className="rounded-md bg-white shadow">
					<div className="">
						<div className="border-b max-w-[790px] md:px-6 px-4 py-4">
							<p className="mb-4 text-[#333333]  text-base">
								Search engines attract lots of traffic to your profile and generate
								interest and connections for our users.
							</p>
							<p className="mb-4 text-[#333333]  text-base">
								Perhaps you want to be listed on Ideeza but have concerns about your
								products and profile being advertised more widely. You can turn off
								search indexing, preventing search engines such as Google and Bing
								from displaying your pages in their search results.
							</p>
						</div>

						<label className="p-4 flex">
							<input
								type="checkbox"
								className="text-primary mt-1"
								{...methods.register('search_engine')}
							/>
							<span className="ml-2 text-[#333333]  text-base">
								Include my profile and products in search engines like Google and
								Bing (recommended)
							</span>
						</label>
					</div>
				</div>
			</div>
			<div className="text-center mt-8">
				<Button
					disabled={loading}
					loading={loading}
					value="Save"
					type="submit"
					color="primary"
					variant="contained"
					className="shadow-none bg-primary text-white tracking-tight capitalize px-12 py-2 text-base 2xl:text-xl"
				/>
			</div>
		</div>
	);
}
