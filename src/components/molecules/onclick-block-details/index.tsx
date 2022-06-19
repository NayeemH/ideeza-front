import React, { useRef } from 'react';
import Label from '@atoms/label';
import AvatarAtom from '@atoms/avatar';
import OnHoverPlayVideo from '@molecules/on-hover-play';
// import { AiFillStar } from 'react-icons/ai';
import Button from '@atoms/button';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
import { useOutsideClickHandler } from '../../../utils/utils';
import { setOpenBlockMenu, setPackage } from '@layouts/private/sidebar/reducer';
import { useDispatch } from 'react-redux';
// import { useDetectSelfUser } from 'app/hooks';
// import { apiService } from 'utils/request';
//import { GiConsoleController } from 'react-icons/gi';
// import { toast } from 'react-toastify';

const BlockDetails = ({
	clickedBlock,
	selectedBlock,
	blockType,
	blockData,
	onClose,
	onClickUse,
	onCloseParentSidebar,
}: any) => {
	const ref = useRef(null);
	const dispatch = useDispatch();
	// const router = useRouter();
	// const { data: session } = useSession();

	// const userRole = session?.user?.role;
	// const basePath = userRole === 'User' ? 'user' : userRole === 'Technician' ? 'technician' : '';
	// const block_type = blockData?.block_type === 'Component' ? 'add-component' : 'add-part';
	// const isSelfUser = useDetectSelfUser(projectData?.user?.id);
	useOutsideClickHandler(ref, () => onClose());

	// console.log(clickedBlock);

	const componentDownloadIncrement = async () => {
		// await apiService(
		// 	{
		// 		method: 'post',
		// 		url: `/component/${clickedBlock?.id}/increment-download/`,
		// 		data: {},
		// 		token: true,
		// 	},
		// 	(res: any, error: any) => {
		// 		if (res) {
		// 			toast.error(error);
		// 		}
		// 	}
		// );
	};

	const setPackageEdit = () => {
		dispatch(
			setPackage({
				edit: {
					id: blockData?.id ?? 0,
					name: blockData?.name ?? '',
				},
				addPackageOpen: true,
				selected_module_type: blockData?.module_type,
				selected_module_is_visible: blockData?.is_visible,
				three_d_script: JSON.parse(blockData?.three_d_script),
			})
		);

		if (onClose) {
			onClose();
		}

		if (onCloseParentSidebar) {
			onCloseParentSidebar();
		}
	};

	return (
		<div
			className="fixed top-[132px] left-[684px]  bg-[#E5E5E5] rounded w-[637px] min-h-[565px] font-proxima-nova pt-[45px] pb-[30px] px-[25px]"
			style={{ left: '300px', zIndex: 1200, height: 'calc(50vh - 150px)' }}
			ref={ref}
		>
			<div className="">
				<Label
					value={clickedBlock?.name}
					className="text-[25px] font-bold text-primary"
				/>
				<div className="mt-[18px] flex">
					<AvatarAtom
						variant="circular"
						src={[
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5CspT5XGkLbU8KQbXohzQ5xqY5obqHfnxYQ&usqp=CAU',
						]}
					/>
					<Label
						value="@ayoub_fennouni / Public Part"
						className="ml-[12px] font-semibold text-[20px]"
					/>
				</div>
				<div className="pt-[25px]">
					{blockType !== 'package' && (
						<div className="flex gap-[107px] justify-between pr-3 pb-[15px]">
							{/* <div className="flex items-center">
							<AiFillStar className="text-yellow-500 text-lg " />{' '}
							<span className="ml-[10px]">4.8(128 Reviews)</span>
							</div> */}
							<div className="">{Number(clickedBlock?.downloads)} Downloads</div>
							<div className="">
								Prices:{' '}
								<span className="text-primary">${Number(clickedBlock?.price)}</span>
							</div>
						</div>
					)}
					{clickedBlock?.simulation_video ? (
						<div style={{ textAlign: 'center' }}>
							<OnHoverPlayVideo
								poster={
									clickedBlock?.image_svg && clickedBlock?.image_svg !== ''
										? clickedBlock?.image_svg
										: '/images/placeholder.jpg'
								}
								src={clickedBlock?.simulation_video}
								videoSize="h-full w-full 2xl:w-[575px] 2xl:h-[280px] object-cover"
							/>
						</div>
					) : (
						<div style={{ textAlign: 'center' }}>
							<img
								src={
									clickedBlock?.three_d_file && clickedBlock?.three_d_file !== ''
										? clickedBlock?.three_d_file
										: '/images/placeholder.jpg'
								}
								alt="Block Image"
								className="h-56 w-80  object-cover"
								style={{ display: 'inline-block' }}
							/>
						</div>
					)}
				</div>
				<div className="pt-[22px] flex justify-around">
					<Button
						value="Edit"
						className="text-white bg-primary pt-[8px] pb-[9px] px-[32px]"
						variant="outlined"
						onClick={() => {
							if (blockType === 'package') {
								setPackageEdit();
							}
							//console.log(`/${basePath}/dashboard/${blockType}/${block_type}?id=${blockData?.id}`);
						}}
					/>
					{blockType !== 'package' && (
						<>
							{selectedBlock?.is_visible ? (
								<Button
									value="Make it Private"
									className="text-white bg-primary pt-[8px] pb-[9px] pl-[5px] pr-[7.5px]"
									variant="outlined"
								/>
							) : (
								<Button
									value="Make it public"
									className="text-white bg-primary pt-[8px] pb-[9px] pl-[5px] pr-[7.5px]"
									variant="outlined"
								/>
							)}
						</>
					)}
					<Button
						value="use"
						className="text-white bg-primary pt-[8px] pb-[9px] pl-[32px] pr-[34px]"
						variant="outlined"
						onClick={() => {
							if (clickedBlock.module_type === 'BODY') {
								dispatch(
									setPackage({
										selected_modules: { body: clickedBlock, leg: null },
									})
								);
							} else if (clickedBlock.module_type === 'LEG') {
								dispatch(
									setPackage({
										selected_modules: { body: null, leg: clickedBlock },
									})
								);
							}
							selectedBlock(clickedBlock);
							dispatch(setOpenBlockMenu(''));

							if (blockType !== 'package') {
								componentDownloadIncrement();
							}
							if (onClickUse) {
								onClickUse(clickedBlock);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default BlockDetails;
