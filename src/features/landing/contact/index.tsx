import { useEffect, useState } from 'react';
import Label from '@atoms/label';
import TabsMolecule from '@molecules/tabs';
import IconLabel from '@molecules/icon-label';
import Steppers from '@molecules/steppers';
import { GoMail } from 'react-icons/go';
import { IoCallOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Phone from '@organisms/support-phone';
import EmailCenterAsk from '@organisms/email-center/email-center-ask';
import EmailCenterReview from '@organisms/email-center/email-center-review';
import EmailCenterComplete from '@organisms/email-center/email-center-complete';
import { IContactUs } from '@models/contact';
import { ApiDataType, apiService } from 'utils/request';
import { ISelectBasicOption } from '@molecules/select-basic';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from 'app/hooks';
import { openLoginPopup } from 'reducers/login';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';
import { validateEmail } from 'utils/utils';
import { toast } from 'react-toastify';

export default function ContactPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session, status } = useSession();

	const activeLogoClasses = 'text-xl sm:text-2xl md:text-3xl tracking-tight text-white ';

	const inactiveLogoClasses = 'text-xl sm:text-2xl md:text-3xl tracking-tight text-gray-600';
	const activeClass2 = ' mr-2 text-white text-3xl md:text-7xl ';
	const inactiveClass2 = 'mr-2  text-3xl md:text-7xl text-gray-600';

	const initCategoryOptions = [
		{
			name: 'Purchase a package',
			value: 'Purchase a package',
		},
		{
			name: 'Refund Policy',
			value: 'Refund Policy',
		},
		{
			name: 'Report suspicious activity',
			value: 'Report suspicious activity',
		},
		{
			name: 'Data Issue',
			value: 'Data Issue',
		},
	];

	const [index, setIndex] = useState<number>(0);
	const [emailPage, setEmailPage] = useState<number>(0);
	const [active, setActive] = useState<string>('email');
	const [sentEmailSuccess, setSentEmailSuccess] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [categoryOptions] = useState<ISelectBasicOption[]>(initCategoryOptions);
	const [email, setEmail] = useState<string>('');
	const [emailSubject, setEmailSubject] = useState<string>('');
	const [emailBody, setEmailBody] = useState<string>('');
	const [emailHelpText, setEmailHelpText] = useState<string>('');
	const [emailSubjectHelpText, setEmailSubjectHelpText] = useState<string>('');
	const [emailBodyHelpText, setEmailBodyHelpText] = useState<string>('');
	const [categoryHelpText, setCategoryHelpText] = useState<string>('');
	const [contactFormLoading, setContactFormLoading] = useState<boolean>(false);

	useEffect(() => {
		if (selectedCategory?.trim()) setCategoryHelpText('');
	}, [selectedCategory]);

	useEffect(() => {
		if (email?.trim()) setEmailHelpText('');
	}, [emailSubject]);

	useEffect(() => {
		if (emailSubject?.trim()) setEmailSubjectHelpText('');
	}, [emailSubject]);

	useEffect(() => {
		if (emailBody?.trim()) setEmailBodyHelpText('');
	}, [emailBody]);

	const onClickEmailTab = () => {
		setActive('email');
		if (sentEmailSuccess) {
			setEmailPage(0);
			setSentEmailSuccess(false);
		}
	};

	const onClickChatTab = () => {
		setActive('chat');
		if (status === 'unauthenticated') {
			router.query.redirect_db = 'message';
			router.push(router, undefined, { scroll: false });
			return handleSignUpPopUp();
		}
		if (session?.user?.role) {
			router.push(`/${session?.user?.role.toLowerCase()}/dashboard/message`);
		}
	};

	const handleSignUpPopUp = () => {
		dispatch(openLoginPopup({ ref: '' }));
	};

	const handleEmailTabIncrement = () => {
		setEmailPage((prev: number) => Number(prev) + 1);
	};
	const handleEmailTabDecrement = () => {
		setEmailPage((prev: number) => Number(prev) - 1);
	};

	const handleChange = (event: any, newValue: any) => {
		setIndex(Number(newValue));
	};

	const resetFormError = () => {
		setCategoryHelpText('');
		setEmailHelpText('');
		setEmailSubjectHelpText('');
		setEmailBodyHelpText('');
	};

	const onClickContinueAskTab = () => {
		if (!selectedCategory) {
			return setCategoryHelpText('Please, select a category.');
		}

		resetFormError();
		handleEmailTabIncrement();
	};

	const checkEmailSendValidation = (email: string, subject: string, body: string): boolean => {
		let checkEmail = false;
		let checkSubject = false;
		let checkBody = false;

		//--------------- Checking email
		if (!email.trim()) {
			setEmailHelpText('Enter your email');
			checkEmail = false;
		} else if (!validateEmail(email.trim())) {
			setEmailHelpText('Enter a valid email');
			checkEmail = false;
		} else {
			setEmailHelpText('');
			checkEmail = true;
		}

		if (!subject?.trim()) {
			setEmailSubjectHelpText('Write a subject');
			checkSubject = false;
		} else {
			setEmailSubjectHelpText('');
			checkSubject = true;
		}

		if (!body?.trim()) {
			setEmailBodyHelpText('Write email body');
			checkBody = false;
		} else {
			setEmailBodyHelpText('');
			checkBody = true;
		}

		if (checkEmail && checkSubject && checkBody) return true;
		return false;
	};

	const handleSendAction = () => {
		if (!checkEmailSendValidation(email, emailSubject, emailBody)) return;

		resetFormError();

		const formBody = {
			category: selectedCategory,
			email: email,
			subject: emailSubject,
			body: emailBody,
		};
		sendContactEmail(formBody);
	};

	const resetEmailFields = () => {
		setSelectedCategory('');
		setEmail('');
		setEmailSubject('');
		setEmailBody('');
	};

	const sendContactEmail = async (formData: IContactUs) => {
		setContactFormLoading(true);
		const apiData: ApiDataType = {
			method: 'post',
			url: 'core/contact-us/email/',
			data: formData,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				handleEmailTabIncrement();
				setContactFormLoading(false);
				setSentEmailSuccess(true);
				resetEmailFields();
				toast.success('Email has been sent successfully.');
			}
			if (err) {
				toast.error('Failed to send email.');
				setSubmitErrors(err?.response?.data);
				setContactFormLoading(false);
			}
			// console.log('error---', err)
		});
	};

	const setSubmitErrors = (errors: any) => {
		setEmailHelpText((errors?.email && errors?.email[0]) || '');
		setEmailSubjectHelpText((errors?.subject && errors?.subject[0]) || '');
		setEmailBodyHelpText((errors?.body && errors?.body[0]) || '');
	};

	if (emailPage < 0) {
		setEmailPage(0);
	}
	if (emailPage > 2) {
		setEmailPage(2);
	}

	return (
		<>
			<div className="xl:px-32 md:px-16 md:pt-16 p-4 mb-[115px] ">
				<Label
					value="Support Center"
					classes={{
						root: `text-[#333333] text-center mt-36 font-bold xl:text-[35px] text-[24px] font-[500] leading-[52px] font-poppins`,
					}}
				/>
				<div className="my-2 w-full mt-14 overflow-x-hidden">
					<TabsMolecule
						tabsClasses="border-b pb-[50px] mb-4 grid xl:grid-cols-[700px_700px_700px] grid-cols-1 md:pr-16 overflow-hidden relative xl:left-[25%]"
						tabClasses={
							// (active === "email" ? "bg-primary" : "bg-white") +
							'  rounded-md text-base tracking-tight md:mr-4 mr-2 mb-3 p-0 md:mb-0 text-gray-700 font-sans transform-none shadow-md shadow-none border border-solid border-[#E6E6E6]'
						}
						selected="border-0 text-primary bg-primary"
						handleChange={handleChange}
						index={index}
						// scrollable={true}
						tabsData={[
							{
								name: (
									<IconLabel
										labelValue="Email"
										mainClass="flex md:flex-col items-center justify-center w-full h-full py-[25px]"
										iconContanerClass="text-2xl "
										lableClass={{
											root:
												active === 'email'
													? activeLogoClasses
													: inactiveLogoClasses,
										}}
										iconComponent={
											<GoMail
												className={
													active === 'email'
														? activeClass2
														: inactiveClass2
												}
											/>
										}
										tooltipProps={{ open: false }}
										onClick={onClickEmailTab}
									/>
								),
								// textColor: "primary",
								component: (
									<div className="mt-8">
										<Steppers
											currentStep={emailPage}
											className="md:w-[500px] mx-auto"
											options={['Ask', 'Review', 'Complete']}
											icons={{
												1: (
													<span className="p-4 w-12 flex items-center justify-center h-12 rounded-full border-current z-[1000]">
														1
													</span>
												),
												2: (
													<span className="p-4 w-12 flex items-center justify-center h-12 rounded-full border-current z-[1000]">
														2
													</span>
												),
												3: (
													<span className="p-4 w-12 flex items-center justify-center h-12 rounded-full border-current z-[1000]">
														3
													</span>
												),
											}}
										/>
										<div className="bg-white rounded-[20px] border shadow-none md:p-8 p-5 mx-auto lg:w-3/5 md:w-4/5 mt-[50px]">
											{emailPage === 0 && (
												<EmailCenterAsk
													category={selectedCategory}
													handleCategory={(e: any) => {
														setSelectedCategory(e.target.value);
													}}
													categoryOptions={categoryOptions}
													onClickContinue={onClickContinueAskTab}
													categoryError={categoryHelpText ? true : false}
													categoryHelpText={categoryHelpText}
												/>
											)}
											{emailPage === 1 && (
												<EmailCenterReview
													emailAddress={email}
													handleEmailAddress={(e: any) =>
														setEmail(e.target.value)
													}
													emailSubject={emailSubject}
													handleEmailSubject={(e: any) =>
														setEmailSubject(e.target.value)
													}
													emailBody={emailBody}
													handleEmailBody={(e: any) =>
														setEmailBody(e.target.value)
													}
													handleSendAction={handleSendAction}
													onClickBack={handleEmailTabDecrement}
													loading={contactFormLoading}
													errorEmailAddress={emailHelpText ? true : false}
													errorEmailSubject={
														emailSubjectHelpText ? true : false
													}
													errorEmailBody={
														emailBodyHelpText ? true : false
													}
													emailAddressHelpText={emailHelpText}
													emailSubjectHelpText={emailSubjectHelpText}
													emailBodyHelpText={emailBodyHelpText}
												/>
											)}
											{emailPage === 2 && <EmailCenterComplete />}
										</div>
									</div>
								),
							},
							{
								name: (
									<IconLabel
										labelValue="Chat"
										mainClass="flex md:flex-col items-center justify-center w-full h-full py-[25px]"
										iconContanerClass="text-2xl"
										lableClass={{
											root:
												active === 'chat'
													? activeLogoClasses
													: inactiveLogoClasses,
											// "text-xl sm:text-2xl md:text-3xl tracking-tight text-gray-800 hover:text-white"
										}}
										iconComponent={
											<IoChatbubbleEllipsesOutline
												className={
													active === 'chat'
														? activeClass2
														: inactiveClass2
												}
											/>
										}
										tooltipProps={{ open: false }}
										onClick={onClickChatTab}
									/>
								),
								component: (
									<div className="p-16 h-64 flex items-center justify-center text-center relative">
										<Loader
											type={'relative'}
											isTransparentBg
										/>
										<h4 className="text-center text-black text-lg">
											{'Redirecting to chat'}
										</h4>
									</div>
								),
							},
							{
								name: (
									<IconLabel
										labelValue="Phone"
										mainClass="flex md:flex-col text-red-800 items-center justify-center w-full h-full py-6 md:px-7 px-6"
										iconContanerClass="text-2xl"
										lableClass={{
											root:
												active === 'phone'
													? activeLogoClasses
													: inactiveLogoClasses,

											// root: "text-xl sm:text-2xl md:text-3xl tracking-tight text-gray-800 hover:text-white",
										}}
										iconComponent={
											<IoCallOutline
												className={
													active === 'phone'
														? activeClass2
														: inactiveClass2
												}
											/>
										}
										tooltipProps={{ open: false }}
										onClick={() => setActive('phone')}
									/>
								),
								component: <Phone />,
							},
						]}
					/>
				</div>
			</div>
		</>
	);
}
