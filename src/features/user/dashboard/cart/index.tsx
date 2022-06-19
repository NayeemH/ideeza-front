import Button from '@atoms/button';
import Label from '@atoms/label';
import Loader from '@atoms/loader';
import IconLabel from '@molecules/icon-label';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ApiDataType, apiService } from 'utils/request';
import { setPlanCartItems, setPlanCartMeta } from '../user-payment/reducer';
import { formatAmount } from 'utils/utils';
import { toast } from 'react-toastify';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PricingPopup from '@organisms/pricing-popup';

const PricingCart = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session } = useSession();

	const [initPageRender, setInitPageRender] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<number | null>(null);
	const [showPricingPopup, setShowPricingPopup] = useState<boolean>(false);

	const { planCartMeta, planCartItems } = useAppSelector((state) => state?.planCart);

	useEffect(() => {
		getUserCartItems();
		setInitPageRender(false);
	}, []);

	const togglePricingPopup = () => setShowPricingPopup(!showPricingPopup);

	const getUserCartItems = async (page = 1, pageSize = 5) => {
		setLoading(true);
		const params: any = `?page=${page}&pageSize=${pageSize}`;
		const apiData: ApiDataType = {
			method: 'get',
			url: `/order/cart/${params}`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				const { order_items: cartItems, ...rest } = res?.data;
				const cartMeta = rest;
				// console.log('cartMeta--------', cartMeta)
				// console.log('cartItems--------', cartItems)
				dispatch(setPlanCartMeta(cartMeta || null));
				dispatch(setPlanCartItems(cartItems || []));
			}
			setLoading(false);
			// console.log('Post by id Error----', err)
		});
	};

	const onClickDeleteItem = async (id: number) => {
		setIsDeleting(id);
		const apiData: ApiDataType = {
			method: 'delete',
			url: `/order/item/${id}/`,
			token: true,
		};
		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				getUserCartItems();
				toast.success('Deleted cart item successfully');
			}
			if (err) {
				toast.error(err?.response?.data?.detail || 'Error deleting cart item');
			}
			return setIsDeleting(null);
		});
	};
	const makePayment = () => {
		router.push(`/${session?.user?.role.toLowerCase()}/dashboard/payment`);
	};

	return (
		<div className="bg-white shadow rounded-md p-7 min-h-[500px]">
			{loading && (
				<Loader
					type={initPageRender ? 'fixed' : 'relative'}
					isTransparentBg={initPageRender}
				/>
			)}
			{planCartItems?.length > 0 ? (
				<>
					<div className="mb-8">
						<h1 className="text-lg xl:text-[20px] font-sans text-[#333333] text-left font-semibold">
							Cart Items
						</h1>
					</div>
					{planCartItems.map((item: any, index: number) => (
						<div
							className="py-2 pb-4 my-2 border-b-[1px] border-b-slate-300"
							key={index}
						>
							<div className="flex items-center justify-between">
								<div className="mr-4 flex items-center">
									<div className="w-14 h-14 p-3 flex items-center justify-center border border-slate-300 rounded-full">
										<img
											src={item?.pricing_plan?.image || ''}
											alt=""
											className="h-full w-auto"
										/>
									</div>
									<div className="">
										{item?.pricing_plan?.name && (
											<div className="ml-4 text-lg font-medium capitalize">
												{item?.pricing_plan?.name || ''}
											</div>
										)}
										{item?.plan_package && (
											<div className="ml-4 text-sm capitalize">
												Plan Package: {item?.plan_package || ''}
											</div>
										)}
									</div>
								</div>
								<div className="mr-4 text-right">
									<div className="mr-2">Price</div>
									<div className="mr-2 font-medium text-xl">
										{formatAmount(item?.price)}
									</div>
								</div>
								<div className="flex items-center justify-center w-28">
									<span
										className={
											isDeleting !== item.id
												? 'cursor-pointer'
												: 'cursor-not-allowed pointer-events-none'
										}
									>
										<IconLabel
											tooltipProps={{ open: false }}
											mainClass="flex items-center"
											iconContanerClass="text-lg"
											lableClass={{
												root: 'text-blue-350 tracking-tight text-sm ml-2 font-sans',
											}}
											iconComponent={
												<MdDelete
													className={`cursor-pointer ${
														isDeleting === item.id
															? 'text-primary'
															: 'text-purple-400'
													}`}
												/>
											}
											onClick={() => onClickDeleteItem(item.id)}
											labelValue={
												isDeleting !== item.id ? 'Delete' : 'Deleting..'
											}
										/>
									</span>
								</div>
							</div>
						</div>
					))}
					{planCartMeta?.total_amount && (
						<div className="flex items-center justify-end mt-5">
							<div className="flex items-center mr-8 font-medium text-xl">
								<span className="mr-2">Total:</span>
								<span className="">{formatAmount(planCartMeta?.total_amount)}</span>
							</div>
							<div className="flex items-center">
								<Button
									value="Make Payment"
									iconEnd={<IoArrowForwardCircleOutline className="text-2xl" />}
									classes={{
										root: `flex text-white bg-primary tracking-tight font-sans capitalize p-2 px-4 mx-auto text-base 2xl:text-xl`,
									}}
									color="primary"
									onClick={makePayment}
								/>
							</div>
						</div>
					)}

					<div className="w-full text-center mt-28">
						<Button
							value="See All Pricing Plans"
							classes={{
								root: `flex tracking-tight font-sans capitalize p-2 px-4 mx-auto text-base 2xl:text-xl bg-white text-primary px-10`,
							}}
							onClick={() => togglePricingPopup()}
						/>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center">
					<UiEmptyPlaceholder title={'No cart item found!'} />
					<div className="w-full text-center mt-5">
						<Button
							value="See Pricing Plans"
							iconEnd={<IoArrowForwardCircleOutline className="text-2xl" />}
							classes={{
								root: `flex text-white bg-primary tracking-tight font-sans capitalize p-2 px-4 mx-auto text-base 2xl:text-xl`,
							}}
							color="primary"
							onClick={() => togglePricingPopup()}
						/>
					</div>
				</div>
			)}

			<div className="hidden">
				<img
					src="/images/confirmation.png"
					className="w-24 mb-4"
					alt="image"
				/>
				<Label
					value="Congratulations!"
					className="text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-primary font-sans"
				/>
				<Label
					value="Your payment is completed."
					className="text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-gray-700 font-sans"
				/>
			</div>
			<PricingPopup
				open={showPricingPopup}
				toggleOpen={togglePricingPopup}
				onSuccessAddToCart={async () => {
					await getUserCartItems();
					togglePricingPopup();
				}}
			/>
		</div>
	);
};

export default PricingCart;
