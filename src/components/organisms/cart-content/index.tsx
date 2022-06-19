import Button from '@atoms/button';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import React from 'react';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
export default function CartContent(props: any) {
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
					<div className="flex items-center justify-between w-full pb-2 pr-2">
						<Label
							// value={v?.user_product?.project?.title}
							value={'Cart Content'}
							className="text-lg cursor-pointer transition-all font-semibold text-primary tracking-tight font-sans"
						/>
						<Dropdown
							icons={
								<img
									src="/images/icon/user-msg-setting.svg"
									alt="setting"
									className="h-4"
								/>
							}
							itemsClasses={{
								root: 'font-sans text-sm px-4 w-32 py-3 hover:text-primary text-gray-300',
							}}
							options={[
								{
									name: 'View',
									value: 'View',
								},
							]}
						/>
					</div>
					{/* <CartOverview cartitem={[v]} /> */}
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
