import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
export default function CartConfrimation() {
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
			<div className="bg-white shadow rounded-md p-7 py-20 flex flex-col items-center">
				{/* {cartItem?.product?.map((v, k) => ( */}
				<>
					<img
						src="/images/confirmation.png"
						className="w-24 mb-4"
						alt="image"
					/>
					<Label
						value="Congratulations!"
						className=" text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-primary font-sans"
					/>
					<Label
						value="Your order is accepted."
						className=" text-xl xl:text-3xl 2xl:text-4xl text-center font-bold text-gray-600 font-sans"
					/>
				</>
				{/* ))} */}

				{/* <CartFooter btnNext={"/user/cart/CartContent"} /> */}
				<div
					className={`flex md:flex-row flex-col space-y-3 w-full items-center justify-between md:space-y-0 md:space-x-3`}
				>
					<Button
						value="Track Order"
						iconEnd={<IoArrowForwardCircleOutline className="text-2xl" />}
						// classes={{
						//   root: `text-white bg-current border border-solid border-current tracking-tight font-sans capitalize p-2 px-4 text-base 2xl:text-xl ${btnNext}`,
						// }}
						className="flex text-white bg-primary tracking-tight font-sans capitalize mt-5 p-2 px-4 mx-auto text-base 2xl:text-xl"
						//   onClick={() => {
						//     if (handleNextBtn) handleNextBtn();
						//     history.replace(btnNext);
						//   }}
						color="primary"
						// onClick={setCartPage}
					/>
				</div>
			</div>
		</div>
	);
}
