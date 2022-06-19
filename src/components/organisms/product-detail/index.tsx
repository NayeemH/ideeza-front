import React, { useState } from 'react';
// import { AboutProduct, PricingPopup } from "..";
import PricingPopup from '@organisms/pricing-popup';
import Button from '@atoms/button';
import AboutProduct from '@organisms/about-product';

const ProductDetail: React.FC<any> = ({
	iconClasses,
	saveBtn,
	state,
	clickHandler,
	onEdit,
	share,
	setLike,
	likeHandler,
	productData,
	selfUser,
	onReload,
}) => {
	const [popup, SetPopup] = useState(false);
	// TODO:: Product detail bottom part
	const toggleOpen = () => SetPopup(!popup);

	return (
		<>
			<AboutProduct
				selfUser={selfUser}
				state={state}
				iconClasses={iconClasses}
				clickHandler={clickHandler}
				onEdit={onEdit}
				share={share}
				setLike={setLike}
				likeHandler={likeHandler}
				productData={productData}
				onReloadProduct={onReload}
			/>
			<div
				className={`flex justify-end xl:w-2/3 lg:w-11/12 w-full mx-auto p-4 pb-0 ${saveBtn}`}
			>
				<Button
					value="Save"
					classes={{
						root: `bg-primary text-md text-white transform-none font-medium tracking-tight font-sans px-8 py-2 rounded`,
					}}
				/>
			</div>
			<PricingPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</>
	);
};
export default React.memo(ProductDetail);
