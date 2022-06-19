import React, { useState } from 'react';
import Button from '@atoms/button';
import { AiFillEye, AiFillLike } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import ShareNewsFeedPopup from '@organisms/Share-news-feed-popup';
import EditableInput from '@molecules/editable-input';
import { RiPencilFill } from 'react-icons/ri';
import IconLabel from '@molecules/icon-label';
import Dropdown from '@atoms/drop-down';
import { TiStarFullOutline } from 'react-icons/ti';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useFetch } from '../../../app/api';
import { getProductDetailAsync } from '@features/user/projects/reducer';
import { useRouter } from 'next/router';

const AboutProduct: React.FC<any> = ({
	iconClasses,
	state,
	share,
	productData,
	selfUser,
	onReloadProduct,
}) => {
	const [popup, SetPopup] = useState(false);
	// const [social, setSocial] = useState(false);
	const dispatch = useDispatch();
	const toggleOpen = () => {
		return SetPopup(!popup);
	};

	const [edit, setEdit] = useState(false);
	const [desc, setDesc] = useState('');

	const onClickLikeButton = (id: any) => {
		try {
			useFetch.post(`product/${id}/like/`).then(() => {
				if (onReloadProduct) {
					onReloadProduct();
				}
				toast.dismiss();
				toast.success('Like submitted!');
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const saveDescription = (id: any, description: any) => {
		try {
			useFetch
				.patch(`product/${id}/`, {
					id,
					description,
				})
				.then(() => {
					if (onReloadProduct) {
						onReloadProduct();
					}
					toast.dismiss();
					toast.success('Saved successfully!');
				});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	/*let component = null;
    const components = productData !== null ? productData?.components : null;
    const activeView = "code";

    if (components !== null && components?.length > 0) {
        for (let i = 0; i < components.length; i++) {
            if (components[i].component_type === "CODE") {
                component = components[i];
                break;
            }
        }
    }*/
	const router = useRouter();
	const HireFreelancer = () =>
		router.push(`/user/dashboard/projects/project-details/products/hire-freelancer`);

	return (
		<>
			<ShareNewsFeedPopup
				open={popup}
				// social={social}
				toggleOpen={toggleOpen}
			/>

			{/*{activeView === "code" && (
        <div
            className={`${
                activeView === "code" ? "opacity-100 z-10" : "opacity-0"
            } h-96`}
        >
            <div className="h-96 w-full">
                <CustomBlockly
                    initialBlock={
                        component !== null ? component.editor_script : undefined
                    }
                    xmlCode={(code: any) => console.warn(code)}
                    jsCode={(code: any) => console.warn(code)}
                    svgCode={(code: any) => console.warn(code)}
                />
            </div>
        </div>
      )}*/}
			<div className="">
				<div className="md:flex justify-between px-3 items-center">
					<div
						className={`flex justify-end  bg-gradient-to-r from-[#FA00C5] to-[#550F8A] text-white rounded-3xl md:space-x-4 space-x-3 px-2 py-1 order-last ${iconClasses}`}
					>
						<IconLabel
							// labelValue={state?.views}
							labelValue={productData !== null ? productData?.views : 0}
							mainClass="flex items-center"
							iconContanerClass="text-2xl text-white"
							lableClass={{ root: 'text-lg pl-1 font-light text-white' }}
							iconComponent={<AiFillEye className="text-white text-3xl" />}
							tooltipProps={{ open: false }}
							// TODO
							onClick={() => {
								'goto';
							}}
						/>
						<IconLabel
							// labelValue={state?.dislikes}
							labelValue={productData !== null ? productData?.dislikes : 0}
							mainClass="flex items-center"
							iconContanerClass="text-2xl text-white"
							lableClass={{ root: 'text-lg pl-1 font-light text-white' }}
							tooltipProps={{ open: false }}
							iconComponent={
								<img
									src="/images/icon/ideeza_icon_white.png"
									className="w-6"
									alt="icon"
								/>
							}
							// TODO
							onClick={() => {
								'goto';
							}}
						/>
						<IconLabel
							// labelValue={state?.likes}
							labelValue={productData !== null ? productData?.likes : 0}
							mainClass="flex items-center"
							iconContanerClass="text-2xl text-white"
							lableClass={{ root: 'text-lg pl-1 font-light text-white' }}
							tooltipProps={{ open: false }}
							iconComponent={
								// <img src="/images/like-gray.png"  className="w-6" />
								<AiFillLike className="text-white text-2xl mb-2" />
							}
							onClick={() => {
								if (productData !== null) {
									onClickLikeButton(productData.id);
									dispatch(
										getProductDetailAsync({
											id: productData.id,
										})
									);
								}
							}}
						/>
					</div>
					<div className="flex flex-col md:flex-row p-4 gap-2 md:gap-4 items-center">
						<div>
							<Dropdown
								className="p-0"
								icons={
									<Button
										value="Share Invention"
										classes={{
											root: 'bg-primary fnt-small font-semibold w-full text-white transform-none font-medium tracking-tight font-sans md:px-8 py-2 rounded ',
										}}
										iconEnd={
											<TiStarFullOutline className="xl:text-2xl text-lg ml-5" />
										}
									/>
								}
								itemsClasses={{
									root: 'font-sans text-sm px-4 py-3 hover:text-current text-gray-700',
								}}
								options={[
									{
										func: share.bind(this, state),
										name: 'Share in news feed',
										value: 'Share in news feed',
									},
									{
										func: share.bind(this, 'external_share'),
										// func: () => setSocial(true),
										name: 'Share external',
										value: 'Share external',
									},
								]}
							/>
						</div>

						<div>
							<Button
								value="join this project"
								classes={{
									root: 'bg-primary fnt-small font-semibold w-full text-white transform-none font-medium tracking-tight font-sans md:px-8 py-2 rounded',
								}}
								iconEnd={
									<BsFillPersonCheckFill className="xl:text-2xl text-lg ml-5" />
								}
							/>
						</div>
						<div>
							<Button
								value="Hire Freelancer"
								classes={{
									root: 'bg-primary fnt-small font-semibold w-full text-white transform-none font-medium tracking-tight font-sans md:px-8 py-2 rounded ',
								}}
								iconEnd={
									<BsFillPersonCheckFill className="xl:text-2xl text-lg ml-5" />
								}
								onClick={HireFreelancer}
							/>
						</div>

						{/* <Button
                onClick={toggleOpen}
                // onClick={clickHandler}
                value="Add To Cart"
                variant="outlined"
                color="primary"
                classes={{
                  root: "md:text-md text-sm transform-none font-medium tracking-tight font-sans md:px-2 py-2 rounded",
                }}
                iconEnd={<IoCartSharp className="md:text-lg text-md" />}
              /> */}
					</div>
				</div>
				<EditableInput
					mainClass="flex flex-col mt-10 px-4 pr-6 md:pr-4"
					editContanerClass="bg-gray-100 flex tems-center justify-center text-3xl rounded-full w-10 h-10 pt-1"
					edit={edit}
					headerClasses={{
						root: 'fnt-s-mid font-sans text-current font-bold',
					}}
					lableClass={{
						root: 'text-gray-700 fnt-small leading-7 tracking-tight font-sans font-lighter mr-2',
					}}
					inputClasses={
						'text-gray-700 bg-white border-primary border-solid border-2 text-sm leading-7 tracking-tight font-sans font-lighter mr-2'
					}
					headerLabel="Description"
					value={desc !== '' || productData === null ? desc : productData?.description}
					editComponent={
						selfUser ? (
							<Button
								classes={{
									root: 'fnt-small px-12 h-7 mr-12 transform-none rounded-sm text-primary custom-border-2',
								}}
								onClick={() => {
									if (edit && productData !== null) {
										saveDescription(productData.id, desc);
									}
									return setEdit(!edit);
								}}
								iconEnd={
									<RiPencilFill
										className="text-lg"
										style={{ marginLeft: 10, marginRight: 0 }}
									/>
								}
								variant="outlined"
								value={edit ? 'Done' : 'Edit'}
							/>
						) : undefined
					}
					setTitle={(desc) => setDesc(desc)}
					onChangeLabelValue={(desc) => setDesc(desc)}
					childrenClass="lg:pb-6"
					// handleChange={() => {}}
					headerMainClasses="flex justify-between mb-2 f ont-sans text-lg"
					labelValue={productData?.description}
					// labelValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna liqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur rumquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
					multiline={true}
				></EditableInput>
			</div>
		</>
	);
};
export default AboutProduct;
