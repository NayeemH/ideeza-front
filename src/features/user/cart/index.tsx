import Steppers from '@molecules/steppers';
import CartAddService from '@organisms/cart-add-service';
import CartConfrimation from '@organisms/cart-confirmation';
import CartContent from '@organisms/cart-content';
import CartDelivery from '@organisms/cart-delivery';
import CartOverviewHome from '@organisms/cart-overview';
import CartPayment from '@organisms/cart-payment';
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { FaClipboardList, FaTelegramPlane } from 'react-icons/fa';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
// import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
function UserCartHome() {
	const [cartPage, setCartPage] = useState(0);
	const handleCartPage = () => {
		setCartPage((prev) => prev + 1);
	};
	const handleCartPageDecrement = () => {
		setCartPage((prev) => prev - 1);
	};
	if (cartPage < 0) {
		setCartPage(0);
	}
	// const handleBackAction = (e: any) => {
	//   history.back();
	// };
	// const handleSendAction = (e: any) => {
	//   //API call for send email
	// };
	if (cartPage > 6) {
		setCartPage(6);
	}
	return (
		<>
			<Steppers
				currentStep={cartPage}
				className="mx-auto mt-10 mb-10"
				options={['Overview', 'Cart', 'Add Service', 'Delivery', 'Payment', 'Confirmation']}
				icons={{
					1: <FaClipboardList className="p-3 w-16 h-16 rounded-full" />,
					2: <AiOutlineShoppingCart className="p-3 w-16 h-16 rounded-full " />,
					3: <BiUserPlus className="p-2 w-16 h-16 rounded-full" />,
					4: <FaTelegramPlane className=" p-3 w-16 h-16 rounded-full" />,
					5: <BsCreditCard className=" p-3 w-16 h-16 rounded-full" />,
					6: <IoCheckmarkDoneCircleOutline className="p-3 w-16 h-16 rounded-full" />,
				}}
			/>

			{/* <div className="bg-white rounded-lg shadow-md md:p-8 p-5 mx-auto lg:w-3/5 md:w-4/5"> */}

			{/* {cartPage === 0 && <CartOverviewHome setEmailPage={handleCartPage} />} */}
			{cartPage === 0 && <CartOverviewHome setCartPage={handleCartPage} />}
			{cartPage === 1 && (
				<CartContent
					setCartPage={handleCartPage}
					handleCartPageDecrement={handleCartPageDecrement}
				/>
			)}
			{cartPage === 2 && (
				<CartAddService
					setCartPage={handleCartPage}
					handleCartPageDecrement={handleCartPageDecrement}
				/>
			)}
			{cartPage === 3 && (
				<CartDelivery
					setCartPage={handleCartPage}
					handleCartPageDecrement={handleCartPageDecrement}
				/>
			)}
			{cartPage === 4 && (
				<CartPayment
					setCartPage={handleCartPage}
					handleCartPageDecrement={handleCartPageDecrement}
				/>
			)}
			{cartPage === 5 && (
				<CartConfrimation
				// setCartPage={handleCartPage}
				// handleCartPageDecrement={handleCartPageDecrement}
				/>
			)}
		</>
	);
}
export default UserCartHome;
