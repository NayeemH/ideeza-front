import Button from '@atoms/button';
import Label from '@atoms/label';
import AdditionalInformation from '@organisms/additional-information';
import EditProfileInformation from '@organisms/edit-profile-information';
import StepVerification from '@organisms/step-verifications';
import TypeYourAccount from '@organisms/type-of-account';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserDataAsync } from 'reducers/auth';
import { apiService } from 'utils/request';
import { FORMINPUT } from 'utils/styles';

function General() {
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<any>({});
	const [languages, setLanguages] = useState<any>([]);
	const [selectedLanguage, setSelectedLanguage] = useState<any>([]);
	const [selectedSkill, setSelectedSkill] = useState<any>([]);
	const [skillList, setSkillList] = useState<any>([]);
	const SetlanguageList = (data: any) => {
		setSelectedLanguage(data.target.value);
	};
	const SetSkillList = (data: any) => {
		setSelectedSkill(data.target.value);
	};

	const userData = useAppSelector(({ auth }) => auth?.userData);

	const [loading, setLoading] = useState(false);

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
	const [timezone, setTimezone] = useState<any>(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [permissionType, setPermissionType] = useState<any>('');
	const [facebook, setFacebook] = useState<any>('');
	const [instagram, setInstagram] = useState<any>('');
	const [linkedin, setLinkdin] = useState<any>('');
	const [twitter, setTwitter] = useState<any>('');
	const [youtube, setYoutube] = useState<any>('');
	// const [errorsFromApi, setErrorsFromApi] = useState("");

	const urlPattern = /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

	const handleClick = ({ data }: any) => {
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
		formData.append('first_name', firstName);
		formData.append('last_name', lastName);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('address', address);
		formData.append('gender', gender);
		formData.append('website', website);
		formData.append('about_me', about);
		formData.append('work', work);
		formData.append('school', school);
		// formData.append("time", time);
		formData.append('timezone', timezone?.value);
		formData.append('selected_languages', selectedLanguage); //person name represents selected languages
		formData.append('social_media', JSON.stringify(social_media));
		formData.append('dob', dob);
		if (typeof profilePhoto === 'object') {
			formData.append('profile_photo', profilePhoto);
		}
		postSkill();
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

	const getLanguages = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/language/`,
				token: true,
			},
			(res: any) => {
				console.log('lang', res);

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
				console.log('name', res);

				if (res) setSkillList(res?.data?.results);
			}
		);
	};
	const skillData = {
		skill: selectedSkill?.id,
	};
	const postSkill = async () => {
		await apiService(
			{
				method: 'post',
				url: `/account/user-skill/`,
				token: true,
				data: skillData,
			},
			(res: any) => {
				console.log('skill', res);
			}
		);
	};

	useEffect(() => {
		getLanguages();
		getSkill();
	}, []);

	const methods = useForm({});
	useEffect(() => {
		if (userData) {
			setUser(userData);
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
			setWork(userData?.work);
			setFacebook(userData?.social_media?.facebook);
			setInstagram(userData?.social_media?.instagram);
			setTwitter(userData?.social_media?.twitter);
			setYoutube(userData?.social_media?.youtube);
		}
	}, [userData]);
	return (
		<form
			onSubmit={methods.handleSubmit(handleClick)}
			className="lg:w-8/12 xl:w-[70%] w-full pt-3 space-y-12 flex flex-col items-center"
		>
			<div className="w-full">
				<Label
					classes={{
						root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl font-sans font-bold flex justify-between items-center w-full',
					}}
					value={
						<>
							Edit Profile Informations{' '}
							<span className="text-zinc-400 text-base 2xl:text-xl font-sans font-normal">
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
				/>
			</div>
			<div className="w-full">
				<Label
					classes={{
						root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl font-sans font-bold flex justify-between items-center w-full',
					}}
					value={
						<>
							Additional Informations{' '}
							<span className="text-zinc-400 text-base 2xl:text-xl font-normal">
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
					timezone={timezone}
					setTimezone={setTimezone}
					permissionType={permissionType}
					setPermissionType={setPermissionType}
				/>
			</div>
			<div className="w-full">
				<Label
					classes={{
						root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl font-sans font-bold flex justify-between items-center w-full',
					}}
					value={
						<>
							Profile Photo{' '}
							<span className="text-zinc-400 text-base 2xl:text-xl font-normal">
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
			<div className="w-full">
				<Label
					classes={{
						root: 'text-primary border-b border-gray-750 tracking-tight pb-1 mb-5 texl-lg 2xl:text-2xl font-sans font-bold flex justify-between items-center w-full',
					}}
					value={
						<>
							Type of your Account{' '}
							<span className="text-zinc-400 text-base 2xl:text-xl font-normal">
								*Requried
							</span>
						</>
					}
				/>
				<TypeYourAccount />
			</div>
			<div className="w-full">
				<Label
					classes={{
						root: 'text-primary border-b border-gray-750 pb-1 mb-5 texl-lg 2xl:text-2xl font-sans font-bold flex justify-between items-center w-full',
					}}
					value={<>Social Media Accounts</>}
				/>
				<div className="social-media rounded-lg bg-white shadow-md space-y-4 p-7 pb-10 md:px-7 px-4 w-full">
					<div className="grid grid-cols-2 gap-4 my-4">
						<Label
							classes={{
								root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-base 2xl:text-xl shadow-none tracking-tight font-sans font-bold',
							}}
							value="Facebook"
						/>
						<input
							type="text"
							className={FORMINPUT}
							// {...bindFacebook}
							value={facebook}
							onChange={(e?: any) => setFacebook(e.target.value)}
							placeholder={'Enter Facebook profile url'}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Label
							classes={{
								root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-base 2xl:text-xl shadow-none tracking-tight font-sans font-bold',
							}}
							value="Instagram"
						/>
						<input
							type="text"
							className={FORMINPUT}
							value={instagram}
							onChange={(e?: any) => setInstagram(e.target.value)}
							placeholder={'Enter your instagram account link'}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Label
							classes={{
								root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-base 2xl:text-xl shadow-none tracking-tight font-sans font-bold',
							}}
							value="Linkedin"
						/>
						<input
							type="text"
							className={FORMINPUT}
							value={linkedin}
							onChange={(e?: any) => setLinkdin(e.target.value)}
							placeholder={'Enter linkedin profile url'}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4 my-4">
						<Label
							classes={{
								root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-base 2xl:text-xl shadow-none tracking-tight font-sans font-bold',
							}}
							value="Twitter"
						/>
						<input
							type="text"
							className={FORMINPUT}
							value={twitter}
							onChange={(e?: any) => setTwitter(e.target.value)}
							placeholder={'Enter twitter profile url'}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4 my-4">
						<Label
							classes={{
								root: 'text-gray-700 border-b border-gray-300 pb-1 mb-2 text-base 2xl:text-xl shadow-none tracking-tight font-sans font-bold hover:text-primary',
							}}
							value="Youtube"
						/>
						<input
							type="text"
							// defaultValue={user?.social_media?.youtube || ""}
							className={FORMINPUT}
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
	);
}

export default General;
