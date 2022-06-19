import Label from '@atoms/label';
import React from 'react';

function AboutHeader(props: any) {
	const { user } = props;

	return (
		<div className="bg-gray-150">
			<Label
				value="See and manage the data in your IDEEZA's account"
				classes={{
					root: `text-primary md:text-xl xl:text-2xl 2xl:text-3xl tracking-normal font-bold`,
				}}
			/>
			<Label
				value="Your data includes the things you do, like searches, and the things you create, like new products."
				classes={{
					root: `mt-3 text-base 2xl:text-xl text-gray-600 tracking-tight`,
				}}
			/>
			<div className="grid md:grid-cols-5 gap-7 mt-6">
				<div className="flex items-center md:col-span-2 space-x-7">
					<img
						src={`${
							user?.profile_photo
								? user?.profile_photo
								: 'https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218407987?b=1&k=6&m=1218407987&s=612x612&w=0&h=qcSUpMACVcryz4b_wHTRW7ZSxpG3VtkJRn-bPibCT1Q='
						}`}
						alt="thumbnail"
						className="w-36 h-36 rounded-3xl"
					/>
					<div className="flex flex-col">
						<Label
							value={`${user?.first_name} ${user?.last_name}`}
							classes={{
								root: `md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-500 font-sans`,
							}}
						/>
						<Label
							value={user?.email}
							classes={{
								root: `text-base 2xl:text-xl mt-2 text-gray-600 tracking-tight font-sans`,
							}}
						/>
						<Label
							value={user?.last_login}
							classes={{
								root: `text-base 2xl:text-xl text-gray-600 tracking-tight font-sans`,
							}}
						/>

						{/* TODO ::social_media data or format not found */}
						<div className="mt-2 flex space-x-3">
							<img
								src="/images/logo/awesome-facebook.png" //here image is missig
								className="w-6 "
								alt="fb"
							/>
							<img
								src="/images/logo/awesome-linkedin-in.png"
								className="w-6 "
								alt="in"
							/>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md px-4 py-3 md:col-span-3">
					<Label
						value="About me"
						classes={{
							root: `texl-lg 2xl:text-2xl text-gray-500 font-bold font-sans`,
						}}
					/>
					<Label
						value={user?.about_me || 'No description found !'}
						classes={{
							root: `text-base 2xl:text-xl mt-2 text-gray-850 font-sans`,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default AboutHeader;
