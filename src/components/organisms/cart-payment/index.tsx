import Button from '@atoms/button';
import CartPaymentSecond from '@organisms/cart-payment-second';
import React from 'react';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
export default function CartPayment(props: any) {
	const { setCartPage, handleCartPageDecrement } = props;
	//   const [cartItem, setCartItem] = useState();
	//   const cart = useSelector(({ cart }) => cart?.cart);
	// const route = useRouteMatch();
	// console.log("route", route);
	//   useEffect(() => {
	//     setCartItem(cart);
	//   }, [cart]);
	return (
		<div>
			{/* <div className="flex md:justify-center">
        <CartStepper currentStep={0} />
      </div> */}
			<div className="bg-white shadow rounded-lg p-7">
				{/* {cartItem?.product?.map((v, k) => ( */}
				<>
					<div className="bg-gray-150 rounded-lg p-8 pb-4 pr-5 lg:pl-42">
						<div className="max-h-72 overflow-y-auto pr-10 mb-5">
							{/* <PaymentTable /> */}
						</div>
						<CartPaymentSecond />
					</div>
				</>
				{/* ))} */}

				{/* <CartFooter btnNext={"/user/cart/CartContent"} /> */}
				<div
					className={`flex md:flex-row flex-col space-y-3 w-full items-center justify-between md:space-y-0 md:space-x-3`}
				>
					<Button
						value="Back Step"
						iconStart={<IoArrowBackCircleOutline className="text-2xl" />}
						classes={{
							root: `text-white bg-primary tracking-tight font-sans capitalize p-2 px-4 text-base 2xl:text-xl`,
						}}
						//   onClick={() => {
						//     history.replace(btnBack);
						//   }}
						onClick={handleCartPageDecrement}
						color="primary"
					/>

					<Button
						value="Continue Shopping"
						classes={{
							root: `border-2 bg-white shadow-none border-solid border-current text-primary px-4 text-base 2xl:text-xl p-2 tracking-tight font-sans capitalize `,
						}}
					/>

					<Button
						value="Next Step"
						iconEnd={<IoArrowForwardCircleOutline className="text-2xl" />}
						// classes={{
						//   root: `text-white bg-current border border-solid border-current tracking-tight font-sans capitalize p-2 px-4 text-base 2xl:text-xl ${btnNext}`,
						// }}
						classes={{
							root: `flex text-white bg-primary tracking-tight font-sans capitalize mt-5 p-2 px-4 mx-auto text-base 2xl:text-xl`,
						}}
						//   onClick={() => {
						//     if (handleNextBtn) handleNextBtn();
						//     history.replace(btnNext);
						//   }}
						color="primary"
						onClick={setCartPage}
					/>
				</div>
			</div>
		</div>
	);
}
