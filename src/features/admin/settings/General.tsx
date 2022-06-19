import Button from '@atoms/button';
import Label from '@atoms/label';
import AdditionalInformation from '@organisms/additional-information';
import EditProfileInformation from '@organisms/edit-profile-information';
import StepVerification from '@organisms/step-verifications';
import TypeYourAccount from '@organisms/type-of-account';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserDataAsync } from 'reducers/auth';
import { apiService } from 'utils/request';
import { FORMINPUT } from 'utils/styles';
// import Developer from '../../../../public/images/choose-your-avatar/developer_avatar.png';
// /images/choose-your-avatar/developer_avatar.png';

function General() {
	const dispatch = useAppDispatch();
	// const [user, setUser] = useState<any>({});
	const [languages, setLanguages] = useState<any>([]);
	const [selectedLanguage, setSelectedLanguage] = useState<any>([]);
	const [selectedSkill, setSelectedSkill] = useState<any>([]);
	const [userCurrentSkills, setUserCurrentSkills] = useState<any>([]);

	const [skillList, setSkillList] = useState<any>([]);

	const SetlanguageList = (data: any) => {
		setSelectedLanguage([...data]);
	};
	const SetSkillList = (data: any) => {
		// console.log(data);

		setSelectedSkill([...selectedSkill, data]);
	};

	const userData = useAppSelector(({ auth }) => auth?.userData);
	const userSubscription = useAppSelector(({ auth }) => auth?.userData?.current_subscription);

	const [loading, setLoading] = useState(false);
	const [loadingPlan, setLoadingPlan] = useState(false);
	const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null);

	const [firstName, setFirstName] = useState<any>('');
	const [lastName, setLastName] = useState<any>('');
	const [gender, setGender] = useState<any>('');
	const [email, setEmail] = useState<any>('');
	const [address, setAddress] = useState<any>('');
	const [dob, setDOB] = useState<any>('');
	const [website, setWebsite] = useState<any>('');
	const [phone, setPhone] = useState<any>('');
	const [about, setAbout] = useState<any>('');
	const [profilePhoto, setProfilePhoto] = useState<any>('');
	const [school, setSchool] = useState<any>('');
	const [work, setWork] = useState<any>('');
	// const [timezone, setTimezone] = useState<any>("");
	const [timezone, setTimezone] = useState<any>();
	// Intl.DateTimeFormat().resolvedOptions().timeZone
	const [permissionType, setPermissionType] = useState<any>('');
	const [facebook, setFacebook] = useState<any>('');
	const [instagram, setInstagram] = useState<any>('');
	const [linkedin, setLinkdin] = useState<any>('');
	const [twitter, setTwitter] = useState<any>('');
	const [youtube, setYoutube] = useState<any>('');
	// const [selectedLanguagesIds, setSelectedLanguagesIds] = useState<any>([]);
	// const [errorsFromApi, setErrorsFromApi] = useState("");
	const profileInformationRef = useRef<any>();
	const additionalInformationRef = useRef<any>();
	const profilePhotoRef = useRef<any>();
	const accountTypeRef = useRef<any>();
	const socialMediaRef = useRef<any>();

	// eslint-disable-next-line no-useless-escape
	const urlPattern = /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/; //regex to validate url

	const handleClick = () => {
		const social_media = {
			facebook,
			instagram,
			linkedin,
			twitter,
			youtube,
		};

		if (website && !urlPattern.test(website)) {
			toast.dismiss();
			toast.error('enter valid url for your website');
			setLoading(false);
			return;
		}

		setLoading(true);

		const formData: any = new FormData();
		if (address) {
			formData.append('address', address);
		}
		if (selectedLanguage.length !== 0) {
			const Ids = selectedLanguage.map((selectedLan: any) => selectedLan?.id);
			// console.log(Ids);

			// formData.append('languages', JSON.stringify(Ids));
		}
		formData.append('first_name', firstName);
		formData.append('last_name', lastName);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('address', address);
		gender && formData.append('gender', gender);
		formData.append('website', website);
		formData.append('about_me', about);
		formData.append('work', work);
		formData.append('school', school);

		// console.log('lan', selectedLanguagesIds);

		timezone?.value && formData.append('timezone', timezone?.value);

		formData.append('social_media', JSON.stringify(social_media));
		formData.append('dob', dob);
		// console.log("profilePhoto: ", profilePhoto)
		if (typeof profilePhoto === 'object') {
			profilePhoto && formData.append('profile_photo', profilePhoto);
		}

		userData?.id &&
			dispatch(
				updateUserDataAsync({
					id: userData.id,
					payload: formData,
				})
			).then((res) => {
				if (res.payload) {
					toast.dismiss();
					toast.success('Updated successfully!');
					setLoading(false);
				} else {
					toast.dismiss();
					toast.warning('Please recheck your form once again!');
					setLoading(false);
				}
			});

		// dispatch(onProfilePut(filterQueryParams(data), userData.id));
	};

	const methods = useForm({});

	const getUserSubscriptionPlan = async (planId: number) => {
		if (!planId) return;
		setLoadingPlan(true);
		await apiService(
			{
				method: 'get',
				url: `/subscription/pricing-plan/${planId}/`,
				token: true,
			},
			(res: any) => {
				if (res) setSubscriptionPlan(res?.data);
			}
		);
		setLoadingPlan(false);
	};
	const getLanguages = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/language/`,
				token: true,
			},
			(res: any) => {
				if (res) setLanguages(res?.data?.results);
			}
		);
	};
	const getSkill = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/skill/`,
				token: true,
			},
			(res: any) => {
				// console.log('name', res);

				if (res) setSkillList(res?.data?.results);
			}
		);
	};
	const getUserSkills = async () => {
		if (userData?.id) {
			await apiService(
				{
					method: 'get',
					url: `/account/user-skill/?user__id=${userData?.id}`,
					token: true,
				},
				(res: any) => {
					// console.log(res);
					if (res) setUserCurrentSkills(res?.data?.results);
				}
			);
		}
	};

	useEffect(() => {
		getLanguages();
		getSkill();
	}, []);

	useEffect(() => {
		if (userData) {
			// setUser(userData);
			setFirstName(userData?.first_name);
			setLastName(userData?.last_name);
			setEmail(userData?.email);
			setGender(userData?.gender);
			setDOB(userData?.dob);
			setPhone(userData?.phone);
			setWebsite(userData?.website);
			setAbout(userData?.about_me);
			setAddress(userData?.address);
			setProfilePhoto(userData?.profile_photo);
			setTimezone(userData?.timezone);
			setWork(userData?.work);
			setFacebook(userData?.social_media?.facebook);
			setInstagram(userData?.social_media?.instagram);
			setTwitter(userData?.social_media?.twitter);
			setYoutube(userData?.social_media?.youtube);
		}
		if (userData?.languages?.length !== 0) {
			const result: any[] = [];
			// console.log('languages of specific user', userData?.languages);
			// console.log('languages from db', languages);

			if (userData?.languages) {
				for (const userLan of userData.languages) {
					const lan = languages.filter((o1: any) => o1.id === userLan.id);

					if (lan) {
						result.push(lan);
					}
				}
			}

			// console.log(result);
			setSelectedLanguage(result);
		}

		getUserSkills();
	}, [userData]);

	useEffect(() => {
		if (userSubscription?.pricing_plan) {
			getUserSubscriptionPlan(userSubscription?.pricing_plan);
		}
	}, [userSubscription]);

	return (
		<>
			<div className="flex flex-col md:flex-row gap-x-10  items-start font-proxima-nova">
				<div className="w-full sm:w-96 bg-white py-9 pl-10 xl:fixed  flex flex-col justify-start rounded-lg">
					<Label
						value="Edit Profile Informations"
						className="text-lg lg:text-xl font-semibold mb-3 xl:mb-11 hover:text-primary hover:cursor-pointer "
						onClick={() =>
							profileInformationRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'start',
							})
						}
					/>
					<Label
						value="Additional Informations"
						className="text-lg lg:text-xl font-semibold mb-3 xl:mb-11 hover:text-primary hover:cursor-pointer "
						onClick={() =>
							additionalInformationRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'start',
							})
						}
					/>
					<Label
						value="Profile Photo"
						className="text-lg lg:text-xl font-semibold mb-3 xl:mb-11 hover:text-primary hover:cursor-pointer "
						onClick={() =>
							profilePhotoRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'start',
							})
						}
					/>
					<Label
						value="Type of your Account"
						className="text-lg lg:text-xl font-semibold mb-3 xl:mb-11 hover:text-primary hover:cursor-pointer "
						onClick={() => {
							accountTypeRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'start',
							});
						}}
					/>
					<Label
						value="Social Media Account"
						className="text-lg lg:text-xl font-semibold hover:text-primary hover:cursor-pointer "
						onClick={() => {
							socialMediaRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'start',
							});
						}}
					/>
				</div>
				<form
					onSubmit={methods.handleSubmit(handleClick)}
					className="lg:w-8/12 xl:w-[741px] w-full xl:ml-[500px] mt-4  xl:-mt-2 space-y-12 flex flex-col items-center pb-4"
				>
					<div
						ref={profileInformationRef}
						className="w-full"
					>
						<Label
							classes={{
								root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl  font-semibold flex justify-between items-center w-full',
							}}
							value={
								<>
									Edit Profile Informations{' '}
									<span className="text-zinc-400 2xl:text-base text-sm  font-normal">
										*Requried
									</span>
								</>
							}
						/>
						<EditProfileInformation
							userData={userData}
							firstName={firstName}
							setFirstName={setFirstName}
							lastName={lastName}
							setLastName={setLastName}
							email={email}
							setEmail={setEmail}
							gender={gender}
							setGender={setGender}
							dob={dob}
							setDOB={setDOB}
							phone={phone}
							setPhone={setPhone}
							website={website}
							setWebsite={setWebsite}
							about={about}
							setAbout={setAbout}
							setAddress={setAddress}
							address={address}
							skillList={skillList}
							value={selectedSkill?.name}
							change={SetSkillList}
							userCurrentSkills={userCurrentSkills}
							getUserSkills={getUserSkills}
						/>
					</div>
					<div
						ref={additionalInformationRef}
						className="w-full"
					>
						<Label
							classes={{
								root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl  font-semibold flex justify-between items-center w-full',
							}}
							value={
								<>
									Additional Informations{' '}
									<span className="text-zinc-400 2xl:text-base text-sm  font-normal">
										*Optional
									</span>
								</>
							}
						/>
						<AdditionalInformation
							school={school}
							setSchool={setSchool}
							work={work}
							languagesList={languages}
							setWork={setWork}
							value={selectedLanguage}
							change={SetlanguageList}
							timezone={timezone || ''}
							setTimezone={setTimezone}
							permissionType={permissionType}
							setPermissionType={setPermissionType}
						/>
						{/* <div className="hidden">{languages}</div> TODO: Remove this line */}
					</div>
					<div
						ref={profilePhotoRef}
						className="w-full"
					>
						<Label
							classes={{
								root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl  font-semibold flex justify-between items-center w-full',
							}}
							value={
								<>
									Profile Photo{' '}
									<span className="text-zinc-400 2xl:text-base text-sm  font-normal">
										*Requried
									</span>
								</>
							}
						/>
						<StepVerification
							photo={profilePhoto || '/images/placeholder.jpg'}
							onChangeProfilePhoto={setProfilePhoto}
						/>
					</div>
					<div
						ref={accountTypeRef}
						className="w-full"
					>
						<Label
							classes={{
								root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl  font-semibold flex justify-between items-center w-full',
							}}
							value={
								<>
									Type of your Account{' '}
									<span className="text-zinc-400 2xl:text-base text-sm  font-normal">
										*Requried
									</span>
								</>
							}
						/>
						<TypeYourAccount
							plan={subscriptionPlan}
							loading={loadingPlan}
						/>
					</div>
					<div
						ref={socialMediaRef}
						className="w-full"
					>
						<Label
							classes={{
								root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl  font-semibold flex justify-between items-center w-full',
							}}
							value={<>Social Media Accounts</>}
						/>
						<div className="social-media rounded-lg bg-white  space-y-4 p-7 pb-10 md:px-7 px-4 w-full">
							<div className="grid grid-cols-2 gap-4 my-4">
								<Label
									classes={{
										root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-gray-700 md:text-base text-sm shadow-none tracking-tight  ',
									}}
									value="Facebook"
								/>
								<input
									type="text"
									className={
										FORMINPUT +
										' border border-[#7A7A7A] placeholder-[#999999] text-[#333333] border-opacity-40'
									}
									// {...bindFacebook}
									value={facebook}
									onChange={(e?: any) => setFacebook(e.target.value)}
									placeholder={'Enter Facebook profile url'}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4 my-4">
								<Label
									classes={{
										root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-gray-700 md:text-base text-sm shadow-none tracking-tight  ',
									}}
									value="Instagram"
								/>
								<input
									type="text"
									className={
										FORMINPUT +
										' border border-[#7A7A7A] placeholder-[#999999] text-[#333333] border-opacity-40'
									}
									value={instagram}
									onChange={(e?: any) => setInstagram(e.target.value)}
									placeholder={'Enter your instagram account link'}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4 my-4">
								<Label
									classes={{
										root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-gray-700 md:text-base text-sm shadow-none tracking-tight  ',
									}}
									value="Linkedin"
								/>
								<input
									type="text"
									className={
										FORMINPUT +
										' border border-[#7A7A7A] placeholder-[#999999] text-[#333333] border-opacity-40'
									}
									value={linkedin}
									onChange={(e?: any) => setLinkdin(e.target.value)}
									placeholder={'Enter linkedin profile url'}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 my-4">
								<Label
									classes={{
										root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-gray-700 md:text-base text-sm shadow-none tracking-tight  ',
									}}
									value="Twitter"
								/>
								<input
									type="text"
									className={
										FORMINPUT +
										' border border-[#7A7A7A] placeholder-[#999999] text-[#333333] border-opacity-40'
									}
									value={twitter}
									onChange={(e?: any) => setTwitter(e.target.value)}
									placeholder={'Enter twitter profile url'}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 my-4">
								<Label
									classes={{
										root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-gray-700 md:text-base text-sm shadow-none tracking-tight  hover:text-primary',
									}}
									value="Youtube"
								/>
								<input
									type="text"
									// defaultValue={user?.social_media?.youtube || ""}
									className={
										FORMINPUT +
										' border border-[#7A7A7A] placeholder-[#999999] text-[#333333] border-opacity-40'
									}
									value={youtube}
									onChange={(e?: any) => setYoutube(e.target.value)}
									// {...bindYoutube}
									placeholder={'Enter youtube profile url'}
								/>
							</div>
						</div>
					</div>
					<Button
						type="submit"
						value="Save"
						loading={loading}
						classes={{
							root: 'bg-primary px-24 py-3 mt-16 tracking-tight capitalize shadow-none text-base 2xl:text-xl text-white',
						}}
					/>
				</form>
			</div>
		</>
	);
}

export default General;
