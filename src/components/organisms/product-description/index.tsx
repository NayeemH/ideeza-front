import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import CommentLikeShare from '@organisms/like-share-comment';
import React from 'react';
import { RiPencilFill } from 'react-icons/ri';
import SingleProductComments from '@organisms/single-product-comments';

const ProductDescription: React.FC<any> = ({
	productData,
	onClickLikeButton,
	onClickShareIdeeza,
	onClickShareSocial,
	setTitle,
	description,
	selfUser,
	edit,
	onClickEdit,
	onSubmit,
	onReload,
	hideShareButton,
}) => {
	return (
		<div className="">
			<EditableInput
				mainClass="flex flex-col"
				editContanerClass="" // TODO: fix editable input default style
				edit={edit}
				// headerClasses={{
				// 	root: 'texl-lg 2xl:text-2xl border-b-2 font-sans font-semibold border-gray-870 pr-4',
				// }}
				lableClass={{
					root: 'text-[#333333] text-sm md:text-base leading-6 tracking-tight  font-light pr-2 max-h-36 overflow-y-auto',
				}}
				inputClasses="max-h-36 overflow-y-auto"
				isEditIcon={true}
				editComponent={
					selfUser ? (
						<Button
							classes={{
								root: 'text-lg font-bold px-5 py-1 transform-none rounded-sm flex ml-auto border-none text-primary',
							}}
							iconEnd={<RiPencilFill className="text-md cursor-pointer" />}
							variant="outlined"
							value=""
							onClick={onClickEdit}
						/>
					) : undefined
				}
				childrenClass="h-60vh overflow-auto"
				setTitle={setTitle}
				headerMainClasses="flex justify-between mb-5 text-sm"
				labelValue={description}
				onSubmit={onSubmit}
				placeholder={'Description'}
				multiline={true}
				onCancel={onClickEdit}
			>
				<CommentLikeShare
					likes={productData?.likes}
					comments={productData?.comments_count || 0}
					shares={productData?.shared || 0} // TODO: api response for share count value
					onClickLikeButton={() => onClickLikeButton(productData?.id)}
					onClickShareIdeeza={() => onClickShareIdeeza(productData?.id)}
					onClickShareSocial={() => onClickShareSocial(productData?.id)}
					hideShareButton={hideShareButton}
					selfUser={selfUser}
				/>

				<div className="">
					{/* STARTs: Product Comment section ------------------------ */}
					<SingleProductComments
						productId={productData?.id}
						productCreator={productData?.user}
						onReload={onReload}
					/>
					{/* ENDs: Product Comment section ------------------------ */}
				</div>
			</EditableInput>
		</div>
	);
};
export default ProductDescription;
