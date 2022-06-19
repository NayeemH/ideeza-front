import Button from '@atoms/button';
import AddServiceDrawer from '@organisms/add-service-drawer';
import AddServiceSection from '@organisms/add-service-section';
import ServicesHeader from '@organisms/add-services-header';
import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
export default function CartAddService(props: any) {
	const { setCartPage, handleCartPageDecrement } = props;
	const [show, setShow] = useState(false);
	const toggeShow = () => {
		setShow(!show);
	};
	//   const [cartItem, setCartItem] = useState();
	//   const cart = useSelector(({ cart }) => cart?.cart);
	// const route = useRouteMatch();
	// console.log("route", route);
	//   useEffect(() => {
	//     setCartItem(cart);
	//   }, [cart]);
	return (
		<div>
			<div className="bg-white shadow rounded-lg p-7">
				<div className="bg-white rounded-lg">
					<div className="w-full lg:p-7 p-4 md:pt-2 lg:pt-2 lg:pb-5">
						<ServicesHeader
							value1="In order to add services first choose your product :"
							placeholder="Lamboghini"
							InputPlaceholder="Search services..."
						/>
					</div>
					<hr />
					<div className="lg:pl-7 px-4 pt-8 relative">
						<div className="lg:pr-14 space-y-14 max-h-70vh overflow-y-auto mr-2">
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection />
							<AddServiceSection isUnavailable={true} />
						</div>
						<div className="flex items-center h-full absolute top-0 right-0">
							<div
								className="bg-gray-600 px-2 py-4 rounded-l-2xl shadow cursor-pointer"
								onClick={toggeShow}
							>
								<FaChevronLeft
									color="white"
									fontSize="17"
								/>
							</div>
						</div>
						<div className="absolute right-0 top-0 pt-5 z-50">
							{show === true ? (
								<AddServiceDrawer
									value="Selected Services"
									onClick={toggeShow}
								/>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
				<div
					className={`flex md:flex-row flex-col space-y-3 w-full items-center justify-between md:space-y-0 md:space-x-3 mt-10`}
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
