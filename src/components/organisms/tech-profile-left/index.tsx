import Label from '@atoms/label';
import { format } from 'date-fns';
import { AUTHOR_AVATAR_PLACEHOLDER } from 'enums/blog';
import React from 'react';

const MyProfileLeftSideTech = ({ profile }: any) => {
	return (
		<>
			<div className="bg-left pt-14">
				<div className="2xl:w-96 lg:w-80 2xl:h-96 lg:h-80 w-80 h-80 mx-auto rounded-full overflow-hidden shadow-current">
					<img
						src={profile?.profile_photo ?? AUTHOR_AVATAR_PLACEHOLDER}
						alt="Profile"
						className="2xl:w-96 lg:w-80 2xl:h-96 lg:h-80 w-80 h-80 rounded-full"
						srcSet=""
					/>
				</div>
			</div>

			<div className="pt-8">
				{profile?.address && (
					<Label
						value={profile?.address}
						className="text-primary text-center font-sans tracking-tight text-base 2xl:text-xl uppercase"
					/>
				)}
				{(profile?.first_name || profile?.last_name) && (
					<Label
						value={profile?.first_name + ' ' + profile?.last_name}
						className="text-gray-700 text-center md:text-2xl xl:text-3xl 2xl:text-5xl font-meri font-bold tracking-tight mt-2 mb-3"
					/>
				)}
				{profile?.work && (
					<Label
						value={profile?.work}
						className="text-gray-700 text-center font-sans font-normal tracking-tight texl-lg 2xl:text-2xl uppercase"
					/>
				)}
			</div>

			<div className="p-5 pt-14 pb-5">
				<Label
					value={
						<>
							<span>ABOUT ME</span>
						</>
					}
					classes={{
						root: `space-x-2 whitespace-nowrap text-primary text-base  font-bold font-sans flex items-center`,
					}}
				/>{' '}
				<hr className="w-full" />
				{profile?.about_me && (
					<div className="flex justify-between space-x-2 my-5 items-start">
						<Label
							value={profile?.about_me}
							className="text-gray-700 font-sans font-normal tracking-tight text-base 2xl:text-xl"
						/>
					</div>
				)}
				<>
					<div className="flex xl:flex-row lg:flex-col  pt-10">
						<div className="pr-6">
							{profile?.dob && (
								<>
									<Label
										value={format(
											new Date(new Date(profile?.dob)),
											'MMM d, yyyy'
										)}
										className="text-gray-700 font-sans font-bold tracking-tight text-base 2xl:text-xl"
									/>
									<Label
										value="Birthday date"
										className="custom-newsfeed-subt-color font-sans font-normal tracking-tight text-base 2xl:text-xl"
									/>
								</>
							)}
						</div>
						<div className="pr-6">
							{profile?.role && (
								<>
									<Label
										value={profile?.role}
										className="text-gray-700 font-sans font-bold tracking-tight text-base 2xl:text-xl"
									/>
									<Label
										value="Hobbies"
										className="custom-newsfeed-subt-color font-sans font-normal tracking-tight text-base 2xl:text-xl"
									/>
								</>
							)}
						</div>
						<div className="pr-6">
							{profile?.date_joined && (
								<>
									<Label
										// value="Nob 17, 2018"
										value={format(
											new Date(profile?.date_joined),
											'MMM d, yyyy'
										)}
										className="text-gray-700 font-sans font-bold tracking-tight text-base 2xl:text-xl"
									/>
									<Label
										value="Member Since"
										className="custom-newsfeed-subt-color font-sans font-normal tracking-tight text-base 2xl:text-xl"
									/>
								</>
							)}
						</div>
					</div>
					{/* <Label
              value={
                <>
                  <span className="w-24 mt-16">SKILLS</span>
                  <hr className="w-full mt-16" />
                </>
              }
              classes={{
                root: `space-x-2 pb-8 whitespace-nowrap custom-newsfeed-subt-color text-base  font-bold flex items-center`,
              }}
            /> */}
				</>
			</div>
		</>
	);
};

export default MyProfileLeftSideTech;
