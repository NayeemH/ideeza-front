import Button from '@atoms/button';
import EditableInput from '@molecules/editable-input';
import CommentLikeShare from '@organisms/like-share-comment';
import React, { FC } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import SinglePartComments from '../singlePartComments';

const PartDescription: FC<any> = ({
	partData,
	onClickLikeButton,
	setTitle,
	description,
	selfUser,
	edit,
	onClickEdit,
	onSubmit,
	counts,
	partType,
	partId,
	// TODO:: Uncomment share code when share parts/components APIs are available
	// onClickShareIdeeza,
	// onClickShareSocial,
}) => {
	return (
		<div className="">
			<EditableInput
				mainClass="flex flex-col "
				editContanerClass="" // TODO: fix editable input default style
				edit={edit}
				// headerClasses={{
				//   root: "texl-lg 2xl:text-2xl border-b-2 font-sans font-semibold border-gray-870 pr-4",
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
					likes={counts?.likes}
					comments={Number(counts?.comments) || 0}
					onClickLikeButton={() => onClickLikeButton(partData?.id)}
					shares={Number(counts?.shares) || 0}
					hideShareAndButton
					selfUser
					// TODO:: Uncomment share code when share parts/components APIs are available
					// onClickShareIdeeza={() => onClickShareIdeeza(partData?.id)}
					// onClickShareSocial={() => onClickShareSocial(partData?.id)}
				/>

				<div className="border-t">
					{/* STARTs: Part Comment section ------------------------ */}
					<SinglePartComments
						partId={partId}
						partType={partType}
						partCreator={partData?.user}
					/>
					{/* ENDs: Part Comment section ------------------------ */}
				</div>
			</EditableInput>
		</div>
	);
};
export default PartDescription;
