import { FC, useEffect, useState } from 'react';
import Label from '@atoms/label';
import { IPricingPlan } from '@models/pricing-plan';
import { useSession } from 'next-auth/react';
import { openLoginPopup } from 'reducers/login';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ApiDataType, apiService } from 'utils/request';
// import { addToCartSubscriptionAsync, getUserCartItemsAsync } from "@features/user/dashboard/user-payment/reducer";
import { toast } from 'react-toastify';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';
import {
	setActivePlanDuration,
	setActivePlanId,
	setPlanCartItems,
	setPlanCartMeta,
} from '@features/user/dashboard/user-payment/reducer';
import Loader from '@atoms/loader';
import PricingPlanSingle from '@organisms/pricing-plan-single';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
// import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

interface PricingHomeType {
	pricingPlans?: IPricingPlan[];
	hideTitleSection?: boolean;
	isPricingSlider?: boolean;
	placeholderImage?: string;
	hidePlaceholderImage?: boolean;
	onSuccessAddToCart?: () => void;
	onFailedAddToCart?: () => void;
}

const PricingPlans: FC<PricingHomeType> = (props) => {
	const {
		pricingPlans,
		hideTitleSection,
		placeholderImage,
		hidePlaceholderImage,
		onSuccessAddToCart,
		onFailedAddToCart,
		isPricingSlider,
	} = props;

	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();

	const PlanBgColor = ['bg-[#1fe58527]', 'bg-[#ff00c81f]', 'bg-[#5b17ae28]', 'bg-[#ecec0049]'];
	const colorsPlanBorder = ['#1FE586', '#FF00C7', '#6423B1', '#ECEC0E'];
	const bgPricingImage = ['bg-pricing2', 'bg-pricing', 'bg-pricing4', 'bg-pricing3'];

	const [plans, setPlans] = useState<IPricingPlan[]>([]);
	const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);
	const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const { planCartItems } = useAppSelector((state) => state?.planCart);
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		arrows: false,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		appendDots: (dots: any) => (
			<div
				style={{
					borderRadius: '10px',
					padding: '10px',
				}}
			>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
		nextArrow: <GrCaretNext className="text-xl text-gray-300" />,
		prevArrow: <GrCaretPrevious className="text-xl text-primary" />,
	};
	// const settings = {
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 500,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 3,

	// 	arrows: false,
	// 	// initialSlide: 0,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				infinite: true,
	// 				dots: true,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 600,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				initialSlide: 1,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 			},
	// 		},
	// 	],
	// 	appendDots: (dots: any) => (
	// 		<div
	// 			style={{
	// 				borderRadius: '10px',
	// 				padding: '10px',
	// 			}}
	// 		>
	// 			<ul style={{ margin: '0px' }}> {dots} </ul>
	// 		</div>
	// 	),
	// };

	useEffect(() => {
		getFilteredPricingPlans();
	}, [pricingPlans]);

	useEffect(() => {
		getUserCartItems();
	}, []);

	const handleLoginPopUp = () => {
		dispatch(openLoginPopup({ ref: '' }));
	};

	const getFilteredPricingPlans = () => {
		let result: IPricingPlan[] = [];
		result =
			pricingPlans?.filter(
				(plan: IPricingPlan) => plan.is_visible && plan.plan_type == 'USER'
			) || [];
		result =
			(result.length > 0 &&
				result.sort(
					(a: IPricingPlan, b: IPricingPlan) =>
						Number(a?.price_monthly || 0) - Number(b?.price_monthly || 0)
				)) ||
			[];
		setPlans(result);
	};

	const getUserCartItems = async () => {
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/order/cart/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res?.data) {
				const response = res?.data;
				const { order_items: cartItems, ...rest } = response;
				const cartMeta = rest;
				// console.log('cartMeta--------', cartMeta)
				// console.log('cartItems--------', cartItems)
				dispatch(setPlanCartMeta(cartMeta || null));
				dispatch(setPlanCartItems(cartItems || []));
				dispatch(setActivePlanId(cartItems ? cartItems[0]?.pricing_plan?.id : null));
				dispatch(setActivePlanDuration(cartItems ? cartItems[0]?.plan_package : 'MONTHLY'));
			}
			setLoading(false);
			// console.log('Post by id Error----', err)
		});
	};

	const onClickSubscribe = async (
		planId?: number | undefined,
		duration: 'MONTHLY' | 'YEARLY' = 'MONTHLY'
	) => {
		if (!planId) return;
		if (status === 'unauthenticated') {
			router.query.redirect = 'false';
			router.push(router, undefined, { scroll: false });
			return handleLoginPopUp();
		}
		if (session?.user?.role !== 'User') {
			return toast.error('Register as an user to subsribe a plan');
		}
		setSelectedPlanId(planId);
		setSubscribeLoading(true);
		// console.log('1. addToCartSubscription', planId)
		await clearPlanCart();
		await addToCartItem(planId, duration);
	};

	const clearPlanCart = async () => {
		if (planCartItems?.length > 0 && planCartItems[0]?.id) {
			await deletePlan(planCartItems[0].id);
			//TODO:: Remove this CODE
			// planCartItems.map(
			//   async (item: any) => await deletePlan(item.id)
			// )
		}
	};

	const deletePlan = async (id: number) => {
		const apiData: ApiDataType = {
			method: 'delete',
			url: `/order/item/${id}/`,
			token: true,
		};
		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				// toast.success('Deleted cart item successfully')
				return;
			}
			if (err) {
				toast.error(err?.response?.data?.detail || 'Error deleting cart item');
				setSubscribeLoading(false);
			}
		});
	};

	const addToCartItem = async (id: number, duration: 'MONTHLY' | 'YEARLY' = 'MONTHLY') => {
		await apiService(
			{
				method: 'post',
				url: `/subscription/pricing-plan/${id}/add_to_cart/`,
				data: {
					package: duration,
				},
				token: true,
			},
			(res: any, err: any) => {
				if (res) {
					const result = res?.data;
					toast.success(result?.detail || 'Pricing plan added to cart successfully');
					if (typeof onSuccessAddToCart === 'function') {
						return onSuccessAddToCart();
					}
				}
				if (err) {
					toast.error(
						err?.response?.data?.detail || 'Something went wrong to add to cart'
					);
					if (typeof onFailedAddToCart === 'function') {
						return onFailedAddToCart();
					}
					setSubscribeLoading(false);
					// setSubscribeLoading(false)
				}
				// console.log('Post by id Error----', err)
			}
		);
	};

	return (
		<>
			{loading && <Loader />}
			<div>
				{!hideTitleSection && (
					<>
						<div className="bg-header "></div>
						<div className="py-16 mt-20 ">
							<div className="w-[15%] m-auto">
								<Image
									src="/images/pricing-page/pricing-header-image.svg"
									className="w-[100%]"
									alt="image"
									width={'100%'}
									height={'100%'}
									layout="responsive"
								/>
							</div>

							<Label
								value="Pricing"
								className="text-gray-700 text-center text-xl xl:text-3xl 2xl:text-4xl font-medium mt-4"
							/>
						</div>
					</>
				)}

				{isPricingSlider ? (
					<>
						{plans?.length > 3 ? (
							<div
								className={`lg:full  w-[300px] md:w-[90%] mx-auto lg:h-[550px] custom-modal-slider`}
							>
								<Slider {...settings}>
									{plans.map((plan: any, index: number) => (
										<div
											className="lg:w-[371px] w-[300px] h-[550px]"
											key={index}
										>
											<PricingPlanSingle
												plan={plan}
												planIndex={index}
												borderColor={colorsPlanBorder[index]}
												pricingBottomBg={bgPricingImage[index]}
												onClickSubscribe={onClickSubscribe}
												isTickListBoxed={
													Number(plan?.price_monthly || 0) > 0
														? true
														: false
												}
												rootClasses={PlanBgColor[index] || 'bg-white'}
												btnLoading={
													selectedPlanId == plan.id && subscribeLoading
												}
												btnDisabled={subscribeLoading}
											/>
										</div>
									))}
								</Slider>
							</div>
						) : plans?.length > 0 && plans?.length <= 3 ? (
							<div
								className={`2xl:flex 2xl:justify-center px-[20px] md:px-[50px] 2xl:px-0 gap-[80px] 2xl:gap-[60px] pb-20 grid grid-cols-1 md:grid-cols-2 mb-[115px]`}
							>
								{plans.map((plan: any, index: number) => (
									<div
										className="md:w-[371px] h-[550px] mx-auto 2xl:mx-0"
										key={index}
									>
										<PricingPlanSingle
											plan={plan}
											planIndex={index}
											borderColor={colorsPlanBorder[index]}
											pricingBottomBg={bgPricingImage[index]}
											onClickSubscribe={onClickSubscribe}
											isTickListBoxed={
												Number(plan?.price_monthly || 0) > 0 ? true : false
											}
											rootClasses={PlanBgColor[index] || 'bg-white'}
											btnLoading={
												selectedPlanId == plan.id && subscribeLoading
											}
											btnDisabled={subscribeLoading}
										/>
									</div>
								))}
							</div>
						) : (
							<UiEmptyPlaceholder
								title="No pricing plan found!"
								hideImage={hidePlaceholderImage}
								image={placeholderImage}
							/>
						)}
					</>
				) : (
					<>
						{plans?.length > 0 ? (
							<div
								className={`2xl:flex 2xl:justify-center px-[20px] md:px-[50px] 2xl:px-0 gap-[80px] 2xl:gap-[60px] pb-20 grid grid-cols-1 md:grid-cols-2 mb-[115px]`}
							>
								{plans.map((plan: any, index: number) => (
									<div
										className="md:w-[371px] h-[550px] mx-auto 2xl:mx-0"
										key={index}
									>
										<PricingPlanSingle
											plan={plan}
											planIndex={index}
											borderColor={colorsPlanBorder[index]}
											pricingBottomBg={bgPricingImage[index]}
											onClickSubscribe={onClickSubscribe}
											isTickListBoxed={
												Number(plan?.price_monthly || 0) > 0 ? true : false
											}
											rootClasses={PlanBgColor[index] || 'bg-white'}
											btnLoading={
												selectedPlanId == plan.id && subscribeLoading
											}
											btnDisabled={subscribeLoading}
										/>
									</div>
								))}
							</div>
						) : (
							<UiEmptyPlaceholder
								title="No pricing plan found!"
								hideImage={hidePlaceholderImage}
								image={placeholderImage}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default PricingPlans;
