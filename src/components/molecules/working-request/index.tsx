import AvatarAtom from '@atoms/avatar';
import Button from '@atoms/button';
import Label from '@atoms/label';
import React from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';

function WorkingRequest(props: any) {
	// const history = useHistory();
	// const dispatch = useDispatch();
	const {
		mainClass,
		namevalue,
		avatarClass,
		label1Class,
		label2Class,
		btnClass,
		icon,
		iconEnd,
		iconStart,
		Compvalue,
		statusValue,
		btnvalue,
		statusClass,
		clickHandler,
		size,
		services,
		// click,
		deleteFreelancer,
		// manufDetails,
	} = props;
	return (
		<div
			className={`flex items-center mt-3 justify-between sm:flex-col 2xl:flex-row ${mainClass}`}
		>
			<div>
				<div
					className="flex items-center"
					// onClick={() => {
					//   dispatch(getProfile(manufDetails.id));
					//   history.push("/user/dashboard/profile");
					// }}
				>
					{/* <AvatarAtom className={`${avatarClass}`} /> */}
					<AvatarAtom
						variant="circular"
						src="/images/choose-your-avatar/avatar1.png"
						className={avatarClass}
					/>
					<div className="flex-col pl-2">
						<Label
							value={namevalue}
							className={`${label1Class}`}
						/>
						<Label
							value={Compvalue}
							className={`${label2Class}`}
						/>
					</div>
				</div>
			</div>
			<Label
				value={statusValue}
				className={`${statusClass}`}
			/>
			{services}
			<div className="flex items-center justify-between">
				<Button
					onClick={clickHandler}
					value={btnvalue}
					iconEnd={iconEnd}
					iconStart={iconStart}
					// onClick={click}
					classes={{ root: `${btnClass}` }}
					color="success"
				/>
				<AiFillCloseCircle
					className={`text-red-600 cursor-pointer ${icon}`}
					size={size}
					onClick={deleteFreelancer}
				/>
			</div>
		</div>
	);
}
WorkingRequest.defaultProps = {
	statusClass: '`text-primary font-medium text-xl',
	avatarClass: 'w-8 h-8',
	label1Class: 'text-gray-700 text-base 2xl:text-xl font-sans font-semibold leading-tight',
	label2Class: 'text-gray-900 font-normal text-xs',
	btnClass: 'bg-success text-white py-1  capitalize w-32',
	size: '20',
};
export default WorkingRequest;
