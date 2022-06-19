import React, { useEffect, useState } from 'react';
import TabsProjectsGeneralInfo from '@organisms/tabs-projects-general-info';
import { BsCreditCard2Back } from 'react-icons/bs';
import { FaPaypal } from 'react-icons/fa';
import PricingPaymentDurationRadio from '@organisms/pricing-payment-duration-radio';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ApiDataType, apiService } from 'utils/request';
import {
	setActivePlanDuration,
	setActivePlanId,
	setPlanCartItems,
	setPlanCartMeta,
} from '@features/user/dashboard/user-payment/reducer';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';
import PricingPaymentByPaypal from '@organisms/pricing-payment-paypal';
import PricingPaymentByCards from '@organisms/pricing-payment-cards';

const PricingPayment = (props: any) => {
	const {
		onSuccesPaymentCards,
		onFailedPaymentCards,
		onSuccesPaymentPaypal,
		onFailedPaymentPaypal,
		onClickCancelPaymentCards,
		onClickSubmitPaymentCards,
		onClickCancelPaymentPaypal,
		onClickSubmitPaymentPaypal,
	} = props;

	const dispatch = useAppDispatch();

	const [durationValue, setDurationValue] = useState<any>('');
	const [payment, setPayment] = useState<number>(0);
	const [initLoader, setInitLoader] = useState<boolean>(false);
	const [updateCartLoader, setUpdateCartLoader] = useState<boolean>(false);
	const [initRender, setInitRender] = useState<boolean>(true);

	const {
		planCartMeta: cartMeta,
		planCartItems,
		activePlanId: planId,
		activePlanDuration: planDuration,
	} = useAppSelector((state) => state?.planCart);

	const planCartItemId = planCartItems ? planCartItems[0]?.id : null;
	const planCartItem = planCartItems ? planCartItems[0] : null;

	// console.log('planCartItems --------', planCartItems)
	// console.log('planId, planDuration --------', planId, planDuration)

	useEffect(() => {
		if (initRender) {
			getUserCartItems();
			setInitRender(false);
		}
	}, []);

	useEffect(() => {
		setDurationValue(planDuration);
	}, [planDuration]);

	const getUserCartItems = async () => {
		setInitLoader(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `/order/cart/`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res?.data) {
				/* @ts-ignore */
				const { order_items: cartItems, ...rest } = res.data;
				const cartMeta = rest;
				dispatch(setPlanCartMeta(cartMeta || null));
				dispatch(setPlanCartItems(cartItems || []));
				dispatch(setActivePlanId(cartItems ? cartItems[0]?.pricing_plan?.id : null));
				dispatch(setActivePlanDuration(cartItems ? cartItems[0]?.plan_package : 'MONTHLY'));
			}
			setInitLoader(false);
		});
	};

	const deletePlan = async (id: number) => {
		const apiData: ApiDataType = {
			method: 'delete',
			url: `/order/item/${id}/`,
			token: true,
		};
		await apiService(apiData, (res: any, err: any) => {
			if (res) return;
			if (err) {
				toast.error(err?.response?.data?.detail || 'Error updating cart item');
				return setUpdateCartLoader(false);
			}
		});
	};

	const addToCartItem = async (
		id: number,
		duration: string | 'MONTHLY' | 'YEARLY' = 'MONTHLY'
	) => {
		await apiService(
			{
				method: 'post',
				url: `/subscription/pricing-plan/${id}/add_to_cart/`,
				data: {
					package: duration,
				},
				token: true,
			},
			async (res: any, err: any) => {
				if (res) await getUserCartItems();
				if (err) {
					toast.error(
						err?.response?.data?.detail || 'Something went wrong to update to cart'
					);
					return setUpdateCartLoader(false);
				}
			}
		);
	};

	const handleChangeDuration = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!planCartItemId || !planId) return;
		setUpdateCartLoader(true);
		await deletePlan(planCartItemId);
		await addToCartItem(planId, (event.target as HTMLInputElement).value);
		setUpdateCartLoader(false);
	};

	const handleChangePayment = (event: any, newValue: any): void => {
		setPayment(newValue);
	};

	return (
		<>
			<div className="bg-white rounded-[20px] relative">
				{(initLoader || updateCartLoader) && (
					<Loader
						type="relative"
						isTransparentBg
					/>
				)}
				<div className="grid 2xl:grid-cols-[520px_minmax(805px,_1fr)] p-[30px] gap-[40px]">
					<div className="rounded-[10px] bg-[#FBFBFB] p-[30px] border border-[#E6E6E6]">
						<h1 className="text-[24px] font-[600] leading-[30px] text-[#333333] font-proxima-nova pb-[15px] border-b border-[#E6E6E6]">
							Set Payments details
						</h1>
						<div className="w-full">
							<PricingPaymentDurationRadio
								value={durationValue}
								handleChange={handleChangeDuration}
								cartMeta={cartMeta}
								cartItem={planCartItem}
							/>
						</div>
					</div>
					<div className="rounded-[10px] bg-[#FBFBFB] p-[30px] border border-[#E6E6E6]">
						<h1 className="text-[24px] font-[600] leading-[30px] text-[#333333] font-proxima-nova pb-[15px] border-b border-[#E6E6E6]">
							Choose Payment Method:
						</h1>
						<TabsProjectsGeneralInfo
							tabsClasses="border-b pricing-tab-container w-[365px] px-3 mb-[20px] mr-[40px]"
							tabClasses="bg-transparent focus:transparent focus:text-primary text-[20px] tracking-tight  max-w-[0] font-proxima-nova transform-none py-1 px-0"
							handleChange={handleChangePayment}
							selected="text-[#ff09d0]"
							index={payment}
							tabsData={[
								{
									name: (
										<div className="flex items-center ">
											<BsCreditCard2Back className="mr-[10px]" />
											<div className="text-[20px] font-[600]">
												Credit card
											</div>
										</div>
									),
									textColor: 'primary',
									component: (
										<PricingPaymentByCards
											onSuccessPayment={onSuccesPaymentCards}
											onFailedPayment={onFailedPaymentCards}
											onClickCancel={onClickCancelPaymentCards}
											onClickSubmit={onClickSubmitPaymentCards}
										/>
									),
								},
								{
									name: (
										<div className="flex items-center">
											<FaPaypal className="mr-[10px]" />
											<div className="text-[20px] font-[600]">Paypal</div>
										</div>
									),
									textColor: 'primary',
									component: (
										<PricingPaymentByPaypal
											onSuccessPayment={onSuccesPaymentPaypal}
											onFailedPayment={onFailedPaymentPaypal}
											onClickCancel={onClickCancelPaymentPaypal}
											onClickSubmit={onClickSubmitPaymentPaypal}
										/>
									),
								},
							]}
						/>
					</div>
				</div>
				<div className="text-center pb-[30px] text-[20px] font-proxima-nova leading-[30px]">
					Your subscription will renew automatically by charging your payment method on
					file until you cancel.
				</div>
			</div>
		</>
	);
};

export default PricingPayment;
