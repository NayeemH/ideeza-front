import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@atoms/button';
import Label from '@atoms/label';
import { apiService } from 'utils/request';
import Loader from '@atoms/loader';
import CheckboxAtom from '@atoms/checkbox';
import AdminCustomSelect from '@molecules/custom-select-admin';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FORMINPUT } from 'utils/styles';

const ManageEditPricingPlan = () => {
	interface FeatureInterface {
		active_project?: string;
		additional_teammate?: boolean;
		teammate_cost?: number;
		in_platform_purchase?: boolean;
		consult_support?: boolean;
		network?: boolean;
		electronics?: boolean;
		code?: boolean;
		cover?: boolean;
		general?: boolean;
		social?: boolean;
	}

	interface PricingDataProps {
		id?: any;
		features?: FeatureInterface;
		updated_at?: string;
		created_at?: string;
		is_visible?: boolean;
		name?: string;
		slogan?: string;
		image?: string;
		type?: any;
		plan_type?: string;
		price_monthly?: string;
		price_yearly?: string;
		trial_period?: number;
		is_popular?: boolean;
	}

	const [PricingDataDetail, setPricingDataDetail] = useState<PricingDataProps>();
	const [loading, setLoading] = useState(true);
	const [ImageFile, setImageFile] = useState('');
	const [planName, setPlanName] = useState(null);
	const [slogan, setSlogan] = useState(null);
	const [plan_type, setPlanType] = useState(null);
	const [type, setType] = useState(null);

	const [is_popular, setIs_popular] = useState<any>(false);
	const [electronics, setElectronics] = useState<any>(false);
	const [code, setCode] = useState<any>(false);
	const [cover, setCover] = useState<any>(false);
	const [general, setGeneral] = useState<any>(false);
	const [social, setSocial] = useState<any>(false);
	const [network, setNetwork] = useState<any>(false);
	const [app, setApp] = useState<any>(false);

	const [additional_teammate, setAdditional_teammate] = useState<any>(false);
	const [teammate_cost, setTeammate_cost] = useState(null);
	const [active_project, setActive_project] = useState(null);
	const [in_platform_purchase, setIn_platform_purchase] = useState<any>(false);
	const [consult_support, setConsult_support] = useState<any>(false);
	const [trial_period, setTrial_period] = useState(null);

	const [price_monthly, setPrice_monthly] = useState(null);
	const [price_yearly, setPrice_yearly] = useState(null);
	const { register, handleSubmit, reset } = useForm();
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		setLoading(true);
		if (id !== undefined) fetchPricingDataDetail();
	}, [id]);

	const fetchPricingDataDetail = async () => {
		await apiService(
			{
				method: 'get',
				url: `/subscription/pricing-plan/${id}`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					console.log('Pricing Plan: ', res?.data);
					setPricingDataDetail(res?.data);
				}
				if (error) {
					if (error?.response?.status === 404) {
						toast.dismiss();
						toast.warning('No blog found');
						router.push('/admin/users/marketing/pricing-plans');
					}
				}
				setLoading(false);
			}
		);
	};

	const handleImageFile = (e: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				// setImageFile(reader.result);
			}
		};
		setImageFile(e.target.files[0]);
	};

	const handleReset = () => {
		setActive_project(null);
		setAdditional_teammate(false);
		setTeammate_cost(null);
		setIn_platform_purchase(false);
		setConsult_support(false);
		setNetwork(false);
		setElectronics(false);
		setCode(false);
		setCover(false);
		setGeneral(false);
		setSocial(false);
		setPlanName(null);
		setSlogan(null);
		setImageFile('');
		setType(null);
		setPrice_monthly(null);
		setPrice_yearly(null);
		setTrial_period(null);
		setIs_popular(false);
	};

	const handlerSubmit = async (data: any) => {
		if (data) {
			if (!type) {
				toast.warn("Don't forget to select a type!");
				return;
			}
			const formData = new FormData();
			// console.log("data: ", data);
			formData.append('updated_at', new Date().toString());
			formData.append('created_at', new Date().toString());
			formData.append('is_visible', 'true');
			formData.append('name', data?.name);
			formData.append('slogan', data?.slogan);
			if (typeof ImageFile !== 'undefined' && ImageFile !== '') {
				formData.append('image', ImageFile);
			}
			if (plan_type) {
				formData.append('plan_type', plan_type);
			}
			formData.append('price_monthly', data?.price_monthly);
			formData.append('price_yearly', data?.price_yearly);
			formData.append('trial_period', data?.trial_period);
			formData.append('is_popular', is_popular);
			formData.append('features[code]', code);
			formData.append('features[cover]', cover);
			formData.append('features[social]', social);
			formData.append('features[network]', network);
			formData.append('features[electronics]', electronics);
			formData.append('features[teammate_cost]', data?.teammate_cost);
			formData.append('features[active_project]', data?.active_project);
			formData.append('features[additional_teammate]', additional_teammate);
			formData.append('features[in_platform_purchase]', in_platform_purchase);

			setLoading(true);
			await apiService(
				{
					method: 'put',
					url: `/subscription/pricing-plan/${id}`,
					token: true,
					data: formData,
				},
				(res: any, error: any) => {
					if (res) {
						setLoading(false);
						toast.dismiss();
						toast.success('Updated successfully');
						// ConfirmCreate(res?.data);
						reset();
						handleReset();
						router.replace('/admin/users/marketing/pricing-plans');
						return;
					}
					if (error) {
						toast.error('Updating Pricing Plan Failed');
						setLoading(false);
					}
				}
			);
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<form onSubmit={handleSubmit(handlerSubmit)}>
						<div>
							<div className="grid grid-cols-2 gap-2 mr-5">
								<div className="">
									<span>Name</span>{' '}
									<input
										{...register('name', { required: 'Plan Name Is Required' })}
										type="text"
										className={FORMINPUT}
										placeholder="Type Plan Name"
										// value={planName}
										onChange={(e: any) => setPlanName(e.target.value)}
									/>
								</div>
								<div className="">
									<span>Slogan</span>{' '}
									<input
										{...register('slogan', { required: 'Slogan Is Required' })}
										type="text"
										className={FORMINPUT}
										placeholder="Type Slogan Plan"
										// value={slogan}
										onChange={(e: any) => setSlogan(e.target.value)}
									/>
								</div>
								<div className="">
									<span>Type</span>{' '}
									<AdminCustomSelect
										placeholder="Choose one of the above"
										options={[
											{ name: 'Public', value: 'Public' },
											{ name: 'Private', value: 'Private' },
										]}
										onchangeSelect={(value: any) => setType(value)}
									/>
								</div>
								<div className="flex ">
									<CheckboxAtom
										checked={is_popular}
										onChange={() => setIs_popular(!is_popular)}
									/>
									<span>Most Popular?</span>{' '}
									<input
										type="file"
										name=""
										className={FORMINPUT}
										id=""
										onChange={handleImageFile}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<div>
									<Label
										value="Enable Features"
										className="text-primary text-3xl my-3"
									/>
								</div>
								<div className="flex">
									<div className="flex">
										<CheckboxAtom
											checked={electronics}
											onChange={() => setElectronics(!electronics)}
										/>
										<span>Electronics</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={code}
											onChange={() => setCode(!code)}
										/>
										<span>Code</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={cover}
											onChange={() => setCover(!cover)}
										/>
										<span>Cover</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={general}
											onChange={() => setGeneral(!general)}
										/>
										<span>General</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={social}
											onChange={() => setSocial(!social)}
										/>
										<span>Social</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={network}
											onChange={() => setNetwork(!network)}
										/>
										<span>Network</span>
									</div>
									<div className="flex">
										<CheckboxAtom
											checked={app}
											onChange={() => setApp(!app)}
										/>
										<span>App</span>
									</div>
								</div>
								<div className="flex">
									<div className="mr-5">Active Projects</div>{' '}
									<input
										{...register('active_project')}
										type="number"
										min={0}
										placeholder="No. of active projects"
										onChange={(e: any) => setActive_project(e.target.value)}
										className="bg-[#FBFBFB] rounded mr-3 pl-5 py-3 mt-3 text-lg hover:bg-white border border-[#E6E6E6] hover:border-primary hover:shadow transition-all duration-500 ease-in-out w-full focus:border-primary focus-visible:outline-none placeholder-[#D6D6D6]"
									/>
								</div>
								<div className="flex mr-5">
									<CheckboxAtom
										checked={additional_teammate}
										onChange={() =>
											setAdditional_teammate(!additional_teammate)
										}
									/>
									<span>Enable Additional Teammate?</span>{' '}
									<input
										{...register('teammate_cost')}
										type="number"
										className={FORMINPUT}
										placeholder="Cost/Month"
										// value={teammate_cost}
										min="0"
										onChange={(e: any) => setTeammate_cost(e.target.value)}
									/>
								</div>
								<div className="flex mr-5">
									<div>
										<CheckboxAtom
											checked={in_platform_purchase}
											onChange={() =>
												setIn_platform_purchase(!in_platform_purchase)
											}
										/>
										<span>In Platform Purchases</span>{' '}
									</div>
									<div>
										<CheckboxAtom
											checked={consult_support}
											onChange={() => setConsult_support(!consult_support)}
										/>
										<span>Consult Support</span>{' '}
									</div>
								</div>
								<div className="flex mr-5">
									<span>Trial Period</span>{' '}
									<input
										{...register('trial_period')}
										type="number"
										className={FORMINPUT}
										// placeholder="Type Plan Name"
										// value={trial_period}
										min="0"
										max="2147483647"
										onChange={(e: any) => setTrial_period(e.target.value)}
									/>{' '}
								</div>
							</div>
							<div className="grid gap-2">
								<div>
									<Label
										value="Pricing"
										className="text-primary text-3xl my-3"
									/>
								</div>
								<div className="grid grid-cols-2 gap-2 mr-5">
									<div className="flex mr-5">
										<span className="mr-3">Monthly</span>{' '}
										<input
											{...register('price_monthly')}
											type="number"
											className={FORMINPUT}
											placeholder="Type Monthly Payment"
											// value={price_monthly}
											min="0"
											onChange={(e: any) => setPrice_monthly(e.target.value)}
										/>
									</div>
									<div className="flex">
										<span className="mr-3">Yearly</span>{' '}
										<input
											{...register('price_yearly')}
											type="number"
											className={FORMINPUT}
											placeholder="Type Year Payment"
											// value={price_yearly}
											min="0"
											onChange={(e: any) => setPrice_yearly(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-row-reverse mt-2">
								<Button
									onClick={() => {
										reset();
										handleReset();
										router.replace('/admin/users/marketing/pricing-plans');
									}}
									value="Cancel"
									className="text-gray-600 mr-5"
									variant="outlined"
								/>
								<Button
									// onClick={handleSubmit}
									loading={loading}
									type="submit"
									value="Send"
									className="text-white bg-primary mr-1"
									color="primary"
								/>
							</div>
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default ManageEditPricingPlan;
