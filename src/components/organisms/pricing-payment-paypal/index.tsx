import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Loader from '@atoms/loader';
import {
	PayPalButtons,
	PayPalScriptProvider,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ApiDataType, apiService } from 'utils/request';

interface IPricingPaymentByCardsProps {
	onSuccessPayment?: () => void;
	onFailedPayment?: () => void;
	onClickCancel?: () => void;
	onClickSubmit?: () => void;
}

const PricingPaymentByPaypal = (props: IPricingPaymentByCardsProps) => {
	const { onSuccessPayment, onFailedPayment, onClickCancel, onClickSubmit } = props;

	const style = {
		layout: 'vertical',
		color: 'gold', // "blue" | "silver" | "white" | "black" | "gold"
		label: 'pay', //"paypal" | "checkout" | "buynow" | "pay" | "installment" | "subscribe" | "donate";
		height: 50,
		shape: 'rect', //"rect" | "pill",
	};

	const PAYPAL_SANDBOX_BASE_URL: any = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_BASE_URL;
	const PAYPAL_CLIENT_ID: any = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const PAYPAL_APP_SECRET: any = process.env.NEXT_PUBLIC_PAYPAL_APP_SECRET;

	const [clientToken, setClientToken] = useState('');
	const [isCapturing, setIsCapturing] = useState(false);
	const [loadingToken, setloadingToken] = useState(false);

	useEffect(() => {
		generateClientToken();
	}, []);

	// call this function to create your client token
	const generateClientToken = async () => {
		setloadingToken(true);
		const accessToken = await generateAccessToken();

		if (!accessToken) {
			return setloadingToken(false);
		}
		const response = await fetch(`${PAYPAL_SANDBOX_BASE_URL}/v1/identity/generate-token`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Accept-Language': 'en_US',
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		// console.log('client_token Data-----------', data)
		setClientToken(data?.client_token || data?.clientToken);
		setloadingToken(false);
		return data.client_token;
	};

	// access token is used to authenticate all REST API requests
	const generateAccessToken = async () => {
		const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString('base64');
		let data: any = null;
		const response = await fetch(`${PAYPAL_SANDBOX_BASE_URL}/v1/oauth2/token`, {
			method: 'post',
			body: 'grant_type=client_credentials',
			headers: {
				Authorization: `Basic ${auth}`,
			},
		});
		data = await response.json();
		return data.access_token;
		// console.log('Access Token Data-----------', data)
	};

	const createOrderPaypal = async () => {
		let result: any = null;
		const apiData: ApiDataType = {
			method: 'post',
			url: `/payment/paypal/create-order/`,
			token: true,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				result = res?.data;
				// console.log('Create Order result---------------', result)
			}
			if (err) {
				// console.log('Create Order Error----', err?.response?.data?.detail)
				toast.error(err?.response?.data?.detail || 'Error in payment, try agian later!');
			}
		});
		return result;
	};

	const captureOrderPaypal = async (orderID?: number, payerID?: number) => {
		setIsCapturing(true);
		let result: any = null;
		const apiData: ApiDataType = {
			method: 'post',
			url: `/payment/paypal/capture-order/`,
			data: { orderID, payerID },
			token: true,
		};

		await apiService(apiData, (res: any, err: any) => {
			if (res) {
				result = res?.data;
				// console.log('Capture API res----', res)
				toast.success('Payment Successful!');
				if (typeof onSuccessPayment === 'function') onSuccessPayment();
				setIsCapturing(false);
			}
			if (err) {
				// console.log('Capture API err----', err?.response?.data?.detail)
				toast.error(err?.response?.data?.detail || 'Error in payment, try agian later!');
				setIsCapturing(false);
				if (typeof onFailedPayment === 'function') onFailedPayment();
			}
		});
		return result;
	};

	const ButtonWrapper = ({ showSpinner }: any) => {
		// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
		// This is the main reason to wrap the PayPalButtons in a new component
		const [{ isPending }] = usePayPalScriptReducer();

		return (
			<>
				{((showSpinner && isPending) || isCapturing) && <div className="spinner" />}
				<PayPalButtons
					style={{
						layout: 'vertical',
						color: 'gold', // "blue" | "silver" | "white" | "black" | "gold"
						label: 'pay', //"paypal" | "checkout" | "buynow" | "pay" | "installment" | "subscribe" | "donate";
						height: 50,
						shape: 'rect', //"rect" | "pill",
					}}
					disabled={false}
					forceReRender={[style]}
					fundingSource={undefined}
					createOrder={async () => {
						const orderData = await createOrderPaypal();
						// console.log('orderId------------', orderData)
						return orderData?.orderID;
					}}
					onApprove={async (data: any) => {
						// console.log('capture------------', data)
						return await captureOrderPaypal(data?.orderID, data?.payerID);
					}}
					onClick={() => {
						if (typeof onClickSubmit === 'function') onClickSubmit();
					}}
				/>
			</>
		);
	};
	return (
		<div className="bg-white p-[20px] rounded-[10px] border border-[#E6E6E6] relative min-h-[405px]">
			{loadingToken && (
				<Loader
					type="relative"
					isTransparentBg
					transparentBg="bg-white/40"
				/>
			)}
			<div className="pb-[30px] border-b">
				<p className="text-center leading-[34px] font-proxima-nova text-[24px] text-[#787878] px-[112px] py-[75px]">
					To purchase with PayPal, please click the "Pay With PayPal" button. A pop-up
					will appear and you will be prompted to complete your payment.
				</p>
			</div>
			<div className="flex justify-between mt-[20px]">
				<div className="flex gap-2 items-start w-[50%]">
					<CheckboxAtom
						color="primary"
						className="p-0"
					/>
					<p>I confirm to save and use my PAYPAL for future payments</p>
				</div>
				<div className="flex gap-[15px] h-[57px]">
					{/* <Button
                        // onClick={onClickApply}
                        value="PAY with PAYPAL"
                        className="text-white text-[18px] bg-primary capitalize  py-[15px] shadow-none border rounded-[6px]"
                        color="primary"
                    /> */}
					{clientToken && (
						<>
							<Button
								onClick={() => {
									if (typeof onClickCancel === 'function') onClickCancel();
								}}
								value="Cancel"
								className="text-[18px] bg-[#FBFBFB] capitalize px-[40px] py-[5px] shadow-none border rounded-[6px] border-[#E6E6E6] border-solid leading-none h-[50px]"
								color="inherit"
							/>
							<PayPalScriptProvider
								options={{
									'client-id': PAYPAL_CLIENT_ID,
									components: 'buttons,hosted-fields',
									'data-client-token': clientToken,
									'disable-funding': 'credit',
									intent: 'capture',
									vault: false,
									// debug: true
								}}
							>
								<div className="mb-0 w-52">
									<ButtonWrapper showSpinner={false} />
								</div>
							</PayPalScriptProvider>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PricingPaymentByPaypal;
