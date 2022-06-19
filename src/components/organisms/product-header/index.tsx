import React, { useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import Input from '@atoms/input';
import IconLabel from '@molecules/icon-label';
import { useRouter } from 'next/router';
// import { useFetch } from "../../../app/api";
// import { toast } from "react-toastify";
import Label from '@atoms/label';
import { IoCubeOutline, IoLogoElectron } from 'react-icons/io5';
import { BsCodeSlash } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
// import { IoIosCellular } from "react-icons/io";
import { ImCheckmark } from 'react-icons/im';
import { useAppDispatch } from 'app/hooks';
import PricingPopup from '@organisms/pricing-popup';
import PricingPaymentPopup from '@organisms/pricing-payment-popup';
import { setDataAsync } from 'reducers/auth';
import { useSession } from 'next-auth/react';
import Typography from '@mui/material/Typography';

const ProductHeader: React.FC<any> = ({
	inputClass,
	handleActiveView,
	view,
	customize,
	name,
	onChangeName,
	// productData,
	productId,
	// projectId,
	// onReloadProduct,
	selfUser,
	nameEditDisabled,
	// networkTabHidden,
	// appTabHidden,
}) => {
	const history = useRouter();
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();

	// const userCurrentPlan = useAppSelector(state => state?.auth?.userData?.current_subscription)

	const [nameEditing, setNameEditing] = useState(false);
	const [openPopupPricing, setOpenPopupPricing] = useState(false);
	const [openPopupPayment, setOpenPopupPayment] = useState(false);

	// const updateProductStatus = async (visible: boolean) => {
	//   try {
	//     await useFetch.patch(`product/${productId}/`, {
	//       is_visible: visible,
	//     });

	//     if (typeof onReloadProduct === "function") {
	//       onReloadProduct();
	//     }

	//     toast.success(`Product is ${visible ? "public" : "private"} now`);
	//   } catch (error: any) {
	//     toast.error(error.message);
	//   }
	// };
	// const onClickApp = () => {
	//   if (!(userCurrentPlan?.pricing_plan && userCurrentPlan?.is_active)) {
	//     return setOpenPopupPricing(true)
	//   }
	//   return history.push(`/user/dashboard/project/app`);
	// };

	return (
		<>
			<div className="pt-[20px] mt-10 lg:mt-0">
				<div className="flex justify-between">
					<Button
						value="Go back"
						classes={{
							root: 'bg-primary text-[20px] font-proxima-nova font-semibold text-white transform-none font-medium tracking-tight font-sans px-5 py-2 rounded',
						}}
						iconStart={<FaArrowCircleLeft className="text-lg" />}
						onClick={() => {
							history.back();
						}}
						color="primary"
					/>

					{
						// customize && selfUser ? (
						// <Button
						//   // onClick={togglePublicPrivate.bind(this, {
						//   //   is_visible: state?.is_visible ? "false" : "true",
						//   //   id: state?.id,
						//   // })}
						//   onClick={() => {
						//     if (productData !== null) {
						//       updateProductStatus(!productData?.is_visible);
						//     }
						//   }}
						//   value={`Turn it to ${
						//     productData !== null && productData?.is_visible
						//       ? "private"
						//       : "public"
						//   }`}
						//   variant="outlined"
						//   classes={{
						//     root: "font-hel text-[20px] font-proxima-nova text-gray-600 bg-gray-100 font-normal py-2 px-6 tracking-tight transform-none",
						//     outlined: "border-gray-600",
						//   }}
						// />
						// ) : (
						// <div />
						// )
					}
				</div>
				<div className="pt-4">
					<div className="flex items-end justify-between flex-wrap mb-1">
						{/*<EditableInput
              mainClass={`flex items-center flex-row-reverse ${EditableInputClass}`}
              editContanerClass=" flex tems-center text-primary justify-center  fnt-s-mid  font-bold"
              edit={edit}
              setTitle={setTitle}
              editComponent={
                edit ? (
                  <IconButton
                    onClick={update.bind(this, {
                      title: title !== "" ? title : state?.title,
                      id: state?.id,
                    })}
                    className="text-primary outline-none"
                  >
                    <TiTick />
                  </IconButton>
                ) : (
                  <IconButton
                    // onClick={onEdit.bind(this, state)}
                    className="text-primary outline-none"
                  >
                    <RiPencilFill />
                  </IconButton>
                )
              }
              lableClass={{
                root: "text-gray-700 fnt-s-mid font-sans font-bold mr-2",
              }}
              inputClasses={{
                root: "mr-2 border border-current border-solid",
              }}
              // handleChange={() => {}}
              labelValue={ProjectName}
            />*/}
						<div className="flex items-center gap-[5px]">
							{!nameEditing ? (
								<>
									<Label
										value={
											<div
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													width: 400,
												}}
											>
												<Typography
													style={{ fontSize: 30, fontWeight: 'bold' }}
													noWrap
												>
													{name}
												</Typography>
											</div>
										}
										onChange={onChangeName}
										className="text-primary text-xl 2xl:text-[32px] font-proxima-nova font-semibold"
									/>
									{!nameEditDisabled && (
										<RiPencilFill
											className="text-3xl text-primary ml-2 cursor-pointer"
											onClick={() => setNameEditing(!nameEditing)}
										/>
									)}
								</>
							) : (
								<>
									<input
										className="focus:outline-none pl-2 rounded-md py-[10px] w-[400px] bg-transparent border border-primary"
										value={name}
										onChange={onChangeName}
									/>

									<ImCheckmark
										className="text-3xl text-primary ml-2 cursor-pointer"
										onClick={() => setNameEditing(!nameEditing)}
									/>
								</>
							)}
						</div>

						<div className="flex justify-center md:justify-start flex-wrap mt-[10px] md:mt-0 md:gap-3 gap-1 lg:-ml-2">
							<Input
								placeholder="Type project name here..."
								name="text"
								className={{
									root: `text-sm tracking-tight font-sans md:w-48 text-gray-700 px-0 rounded border border-solid border-gray-160 ${inputClass}`,
								}}
								position="start"
							/>
							<IconLabel
								mainClass="flex items-center mr-1 md:mr-3 bg-tranparent"
								labelContent="Electronic"
								onClick={() => handleActiveView('electronic')}
								labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
									view === 'electronic'
										? 'text-primary'
										: 'text-gray-700 hover:text-primary'
								}  cursor-pointer`}
								iconContent={
									<IoLogoElectron className="text-[25px]" />
									// <img
									//   src="/images/icon/logo-electron.svg"
									//   width="15px"
									//   alt="icon"
									// />
								}
								isLabelIconContaniner={true}
								tooltipProps={{ open: false }}
								iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
							/>
							<IconLabel
								mainClass="flex items-center md:mr-3 bg-tranparent"
								labelContent="Code"
								onClick={() => handleActiveView('code')}
								labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
									view === 'code'
										? 'text-primary'
										: 'text-gray-700 hover:text-primary'
								}  cursor-pointer`}
								iconContent={
									<BsCodeSlash className="text-[25px]" />
									// <img
									//   src="/images/icon/logo-electron.svg"
									//   width="15px"
									//   alt="icon"
									// />
								}
								isLabelIconContaniner={true}
								tooltipProps={{ open: false }}
								iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
							/>
							<IconLabel
								mainClass="flex items-center md:mr-3 bg-tranparent"
								labelContent="Cover"
								onClick={() => handleActiveView('cover')}
								labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
									view === 'cover'
										? 'text-primary w-[140px] h-8'
										: 'text-gray-700 hover:text-primary w-[140px] h-8'
								}  cursor-pointer`}
								iconContent={
									<IoCubeOutline className="text-[25px]" />
									// <img
									//   src="/images/icon/logo-electron.svg"
									//   width="15px"
									//   alt="icon"
									// />
								}
								isLabelIconContaniner={true}
								tooltipProps={{ open: false }}
								iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
							/>
							<IconLabel
								mainClass="flex items-center md:mr-3 bg-tranparent"
								labelContent="General"
								onClick={() => handleActiveView('general')}
								labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
									view === 'general'
										? 'text-primary'
										: 'text-gray-700 hover:text-primary'
								}  cursor-pointer`}
								iconContent={
									<FiSettings className="text-[25px]" />
									// <img
									//   src="/images/icon/logo-electron.svg"
									//   width="15px"
									//   alt="icon"
									// />
								}
								isLabelIconContaniner={true}
								tooltipProps={{ open: false }}
								iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
							/>

							{/* {!appTabHidden && (
                <IconLabel
                  mainClass="flex items-center md:mr-3 bg-tranparent"
                  labelContent="App"
                  onClick={onClickApp}
                  labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight w-[120px] h-8 items-center justify-center ${view === "App"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                    }  cursor-pointer`}
                  iconContent={
                    <IoLayers className="text-[25px]" />
                    // <img
                    //   src="/images/icon/logo-electron.svg"
                    //   width="15px"
                    //   alt="icon"
                    // />
                  }
                  isLabelIconContaniner={true}
                  tooltipProps={{ open: false }}
                  iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
                />
              )} */}

							{/* {!networkTabHidden && (
                <IconLabel
                  mainClass="flex items-center md:mr-3 bg-tranparent"
                  labelContent="Network"
                  onClick={() => {
                    if (!(userCurrentPlan?.pricing_plan && userCurrentPlan?.is_active)) {
                      return setOpenPopupPricing(true)
                    } else {
                      handleActiveView("network")
                    }
                  }}
                  labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight w-[120px] h-8 items-center justify-center ${view === "network"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                    }  cursor-pointer`}
                  iconContent={
                    <IoIosCellular className="text-[25px]" />
                    // <img
                    //   src="/images/icon/logo-electron.svg"
                    //   width="15px"
                    //   alt="icon"
                    // />
                  }
                  isLabelIconContaniner={true}
                  tooltipProps={{ open: false }}
                  iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
                />
              )} */}

							{customize && selfUser && (
								<IconLabel
									mainClass="flex items-center mr-3 bg-tranparent"
									labelValue="Customize"
									// onClick={pushToCustomize.bind(this, state?.id)}
									// onClick={pushToCustomize}
									onClick={() => {
										history.push({
											pathname: `/user/dashboard/product/${productId}/edit`,
										});
									}}
									lableClass={{
										root: `text-[20px] font-proxima-nova tracking-tight ${
											view === 'customize'
												? 'text-primary'
												: 'text-gray-700 hover:text-primary'
										}  cursor-pointer`,
									}}
									iconComponent={
										<img
											src="/images/icon/tall-hat.svg"
											alt="icon"
											width="15px"
										/>
									}
									tooltipProps={{ open: false }}
									iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
								/>
							)}

							{/* <IconLabel
                  labelValue="Customize"
                  // onClick={pushToCustomize.bind(this, state?.id)}
                  lableClass={{
                    root: `text-[20px] font-proxima-nova tracking-tight ${
                      view === "customize"
                        ? "text-primary"
                        : "text-gray-300 hover:text-primary"
                    }  cursor-pointer`,
                  }}
                  iconComponent={
                    <img src="/images/tall-hat.svg"  width="15px" />
                  }
                  tooltipProps={{ open: false }}
                  // TODO
                  onClick={() => {"goto"}}
                /> */}
						</div>
					</div>
					<hr className="md:w-full my-6 mb-8 border-gray-750" />
				</div>
			</div>

			<PricingPopup
				open={openPopupPricing}
				toggleOpen={() => setOpenPopupPricing(!openPopupPricing)}
				onSuccessAddToCart={() => {
					setOpenPopupPayment(true);
					setOpenPopupPricing(false);
				}}
			/>
			<PricingPaymentPopup
				open={openPopupPayment}
				toggleOpen={() => setOpenPopupPayment(!openPopupPayment)}
				onClickCancelPaymentCards={() => setOpenPopupPayment(false)}
				onClickCancelPaymentPaypal={() => setOpenPopupPayment(false)}
				onSuccesPaymentPaypal={async () => {
					if (status === 'authenticated') {
						await dispatch(setDataAsync(Number(session?.user.id)));
					}
					setOpenPopupPayment(false);
				}}
				// onSuccesPaymentCards={() => false} // TODO: uncomment and write logic when fix card payment
			/>
		</>
	);
};
ProductHeader.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default ProductHeader;
