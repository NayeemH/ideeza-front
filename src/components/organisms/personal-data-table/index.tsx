import PersonalLabel from '@molecules/personal-label';
import { useRouter } from 'next/router';
import React from 'react';

function PersonalTable(props: any) {
	const { user } = props;
	const router = useRouter();
	return (
		<div className="bg-white  rounded-lg md:rounded-xl shadow-md p-4 md:p-8 mt-5 md:mt-8 grid md:grid-cols-2 md:gap-8">
			<div className="">
				<PersonalLabel
					value="Gender"
					value2={user?.gender}
					mainClass="grid md:grid-cols-3 grid-cols-2 gap-4 py-3 px-1 "
					value2Class=" text-gray-500"
				/>
				<PersonalLabel
					value="Birth date"
					value2={user?.dob}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Address"
					value2={user?.address}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Phone number"
					value2={user?.phone}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Timezone"
					value2={user?.timezone}
					value2Class="text-gray-500"
				/>

				<PersonalLabel
					value="Languages"
					value2={user?.languages?.map((a: any) => a.name)?.join()}
					value2Class="text-gray-500"
				/>

				<PersonalLabel
					value="Preferred language"
					value2={user?.preferred_language?.name}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Website"
					value2={user?.website}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Skills"
					value2={user?.user_skills?.map((a: any) => a?.skill?.name)?.join()}
					value2Class="text-gray-500"
				/>
				{/* TODO:: school or education not found */}
				<PersonalLabel
					value="School"
					value2={user?.school}
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Work"
					value2={user?.work}
					value2Class="text-gray-500"
				/>
				{/* TODP: credit_card data or strucutre not found */}
				<PersonalLabel
					value="Credit/Debit card"
					value2={
						<div className="flex items-center">
							{' '}
							<img
								src="/assets/images/mastercard.png"
								className="w-6 mr-3"
								alt=""
								srcSet=""
							/>{' '}
							**** **** **** **** ####{' '}
						</div>
					}
					mainClass="md:border-b"
					value2Class="text-gray-500"
				/>
			</div>
			<div className="">
				<PersonalLabel
					value="Paypal account"
					value2={user?.paypal}
					mainClass="grid md:grid-cols-3 grid-cols-2 gap-4 py-3 px-1 "
					value2Class="text-gray-500"
				/>
				{/* TODO:: Ideeza account number not found */}
				<PersonalLabel
					value="Ideeza account number"
					value2="#381203841"
					value2Class="text-gray-500"
				/>
				<PersonalLabel
					value="Log in history"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/profile/2')}
				/>
				<PersonalLabel
					value="Reviews"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/profile/2')}
				/>

				{/* //TODO:: rating not found */}
				<PersonalLabel
					value="Rating"
					value2={user?.rating}
					value2Class="text-gray-500"
				/>
				{/* TODO:: add link to speicific pages */}
				<PersonalLabel
					value="Friends"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/profile/2')}
				/>
				<PersonalLabel
					value="Messages"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/dashboard/message')}
				/>
				<PersonalLabel
					value="Blog articles"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/dashboard/blog')}
				/>
				<PersonalLabel
					value="Product/project blueprint"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/dashboard/projects')}
				/>
				<PersonalLabel
					value="Tasklist"
					value2="Show"
					value2Class="text-primary"
					click={() => router.push('/user/dashboard/projects')}
				/>
				<PersonalLabel
					value="Track order"
					value2={`${user?.projects_count} active products`}
					mainClass="border-b"
					value2Class="text-primary"
					click={() => router.push('/user/dashboard/projects')}
				/>
			</div>
		</div>
	);
}

export default PersonalTable;
