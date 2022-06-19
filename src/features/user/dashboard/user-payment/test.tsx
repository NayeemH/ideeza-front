import { useState, useEffect } from 'react';
import {
	PayPalScriptProvider,
	PayPalHostedFieldsProvider,
	PayPalHostedField,
	// usePayPalHostedFields,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { ApiDataType, apiService } from 'utils/request';
import Button from '@atoms/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loader from '@atoms/loader';

export default function UserPaymentHome() {
	const router = useRouter();

	const PAYPAL_SANDBOX_BASE_URL = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_BASE_URL;
	// const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
	// const PAYPAL_APP_SECRET = process.env.NEXT_PUBLIC_PAYPAL_APP_SECRET

	const INVALID_COLOR = { color: '#dc3545' };

	// TODO: Remove Following 3 lines, provided by backend dev
	// PAYPAL_SANDBOX_BASE_URL: "https://api-m.sandbox.paypal.com",
	// PAYPAL_CLIENT_ID: "AW9J-N6nNX1xRxMMPTTDHJ9IG0PUhmjlpTw131Uqr8DaRj2QUeMhqp7A7Qiga4EmGAxMMy5ZN9BI2V7B",
	// PAYPAL_APP_SECRET: "EEZ3QB29jvI0FkqyP68FhosFCQHqtbuvrbVnZ6HRg9tv_pfYFHkmhdQF0tD6vDHPmKuCa2Szl6dRB7a0"

	const [clientToken, setClientToken] = useState(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const [paying] = useState(false);
	// const hostedField = usePayPalHostedFields();

	// // console.log('hostedField-----', hostedField)

	useEffect(() => {
		generateClientToken();
	}, []);

	const handleClick = async (data: any) => {
		return;
		// if(hostedField) console.log('if hostedField-----', hostedField)
		// console.log('data--- handleClick', data)
		// return await captureOrderPaypal(data?.orderID, data?.payerID)
	};

	// call this function to create your client token
	const generateClientToken = async () => {
		const accessToken = await generateAccessToken();
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
		return data.client_token;
	};

	// access token is used to authenticate all REST API requests
	const generateAccessToken = async () => {
		// const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString("base64");
		const auth = Buffer.from(
			'AbEiVDKUlGNMuU7Pd-j1Yk8e8iagOJ131r79yM45NI3NK34pUT4pwfFj99L9pkirzR69u_FiAJQ4poxS' +
				':' +
				'ELjTYBD2OLxI6zKQF3rPOg4lueRVAAQz42VeKglvjOn1TSTLbx_r83rzvx-VsBumBBfU5L_GkUD73CxF'
		).toString('base64');
		const response = await fetch(`${PAYPAL_SANDBOX_BASE_URL}/v1/oauth2/token`, {
			method: 'post',
			body: 'grant_type=client_credentials',
			headers: {
				Authorization: `Basic ${auth}`,
			},
		});
		const data = await response.json();

		// console.log('Access Token Data-----------', data)
		return data.access_token;
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
				// // console.log('Create Order result---------------', result)
			}
			if (err) {
				// console.log('Create Order Error----', err?.response?.data?.detail)
				toast.error(err?.response?.data?.detail || 'Error in payment');
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
				setIsCapturing(false);
				return router.push('/user/dashboard/cart');
			}
			if (err) {
				// console.log('Capture API err----', err?.response?.data?.detail)
				toast.error(err?.response?.data?.detail || 'Error in payment, try agian later!');
				return setIsCapturing(false);
			}
			// // console.log('Post by id Error----', err)
		});
		return result;
	};

	// This values are the props in the UI
	const style = { layout: 'vertical' };

	// Custom component to wrap the PayPalButtons and handle currency changes
	const ButtonWrapper = ({ showSpinner }: any) => {
		// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
		// This is the main reason to wrap the PayPalButtons in a new component
		const [{ isPending }] = usePayPalScriptReducer();

		return (
			<>
				{((showSpinner && isPending) || isCapturing) && <div className="spinner" />}
				<PayPalButtons
					style={{ layout: 'vertical' }}
					disabled={false}
					forceReRender={[style]}
					fundingSource={undefined}
					createOrder={async () => {
						const orderData = await createOrderPaypal();
						// console.log('orderId------------', orderData)
						return orderData?.orderID;
					}}
					onApprove={async (data: any, actions: any) => {
						// console.log('capture------------', data)
						return await captureOrderPaypal(data?.orderID, data?.payerID);
					}}
				/>
			</>
		);
	};

	return (
		<>
			<div className="bg-white shadow rounded-md p-7 min-h-[500px] pt-8 pb-8 px-8 mb-5">
				<div className="mb-8">
					<h1 className="text-xl font-sans text-[#333333] text-left font-semibold">
						Payment
					</h1>
				</div>
				{clientToken ? (
					<PayPalScriptProvider
						options={{
							// "client-id": PAYPAL_CLIENT_ID, // our ClientId from Env
							// "client-id": "AdOu-W3GPkrfuTbJNuW9dWVijxvhaXHFIRuKrLDwu14UDwTTHWMFkUwuu9D8I1MAQluERl9cFOd7Mfqe", // Demo ClientId
							// "client-id": "AW9J-N6nNX1xRxMMPTTDHJ9IG0PUhmjlpTw131Uqr8DaRj2QUeMhqp7A7Qiga4EmGAxMMy5ZN9BI2V7B", // our ClientId
							'client-id':
								'AbEiVDKUlGNMuU7Pd-j1Yk8e8iagOJ131r79yM45NI3NK34pUT4pwfFj99L9pkirzR69u_FiAJQ4poxS', // My 'Test-Store' ClientId
							components: 'buttons,hosted-fields',
							'data-client-token': clientToken,
							'disable-funding': 'credit',
							intent: 'capture',
							vault: false,
							// debug: true
						}}
					>
						<div className="mb-0">
							<ButtonWrapper showSpinner={false} />
						</div>

						<PayPalHostedFieldsProvider
							createOrder={async () => {
								const orderData = await createOrderPaypal();
								// console.log('orderId------------', orderData)
								return orderData?.orderID;
							}}
							styles={{
								'.valid': { color: '#28a745' },
								'.invalid': { color: '#dc3545' },
							}}
						>
							<div className="my-5">
								<span className="border border-slate-300 rounded-full text-base font-medium text-slate-900 p-2">
									OR
								</span>
							</div>

							<div className="mb-3">
								<label htmlFor="card-number">
									Card Number
									<span style={INVALID_COLOR}>*</span>
								</label>
								<PayPalHostedField
									id="card-number"
									className="card-field rounded-lg border border-gray-300 h-12 px-5 py-3 text-base mb-3"
									// style={CUSTOM_FIELD_STYLE}
									hostedFieldType="number"
									options={{
										selector: '#card-number',
										placeholder: '4111 1111 1111 1111',
									}}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="cvv">
									CVV<span style={INVALID_COLOR}>*</span>
								</label>
								<PayPalHostedField
									id="cvv"
									className="card-field rounded-lg border border-gray-300 h-12 px-5 py-3 text-base mb-3"
									// style={CUSTOM_FIELD_STYLE}
									hostedFieldType="cvv"
									options={{
										selector: '#cvv',
										placeholder: '123',
										maskInput: true,
									}}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="expiration-date">
									Expiration Date
									<span style={INVALID_COLOR}>*</span>
								</label>
								<PayPalHostedField
									id="expiration-date"
									className="card-field rounded-lg border border-gray-300 h-12 px-5 py-3 text-base mb-3"
									// style={CUSTOM_FIELD_STYLE}
									hostedFieldType="expirationDate"
									options={{
										selector: '#expiration-date',
										placeholder: 'MM/YYYY',
									}}
								/>
							</div>
							<div className="w-full flex items-start mb-3">
								<Button
									value={paying ? <div className="spinner tiny" /> : 'Pay'}
									classes={{
										root: `text-white bg-primary tracking-tight font-sans capitalize p-2 px-4 mx-auto text-base 2xl:text-xl`,
									}}
									disabled={paying}
									color="primary"
									onClick={handleClick}
								/>
							</div>
						</PayPalHostedFieldsProvider>
						<div className="w-full mt-28">
							<Button
								value="See All Pricing Plans"
								classes={{
									root: `tracking-tight font-sans capitalize p-2 px-4 mx-auto text-base 2xl:text-xl bg-white text-primary px-10`,
								}}
								onClick={() => router.push('/pricing')}
							/>
						</div>
					</PayPalScriptProvider>
				) : (
					<Loader />
				)}
			</div>
		</>
	);
}
