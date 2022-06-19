import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import React from 'react';

function AddAvatar(props: any) {
	const { avatarClass, value, labelClass, mainClass } = props;
	return (
		<div className="">
			<Label
				value={value}
				classes={{ root: `${labelClass}` }}
			/>
			<div className={`flex ${mainClass}`}>
				{/* {assign?.map((v, k) => (
          <Avatar
            key={k}
            src={v?.profile_photo}
            alt={`${v?.first_name} ${v?.last_name}`}
            classes={{ root: `${avatarClass}` }}
          >
            {`${v?.first_name} ${v?.last_name}`}
          </Avatar>
        ))} */}
				<AvatarAtom
					variant="circular"
					src="/images/choose-your-avatar/avatar1.png"
					className={avatarClass}
				/>
				{/* TODO */}
				{/* <IconButton
          onClick={click}
          className={`bg-primary outline-none rounded-full text-lg items-center justify-center flex text-white ${avatarClass}`}
        >
          +
        </IconButton> */}
				{/* <IconButton
          // onClick={removeAttachment.bind(this, k)}
          // className="outline-none"
          page={10}
          handlePage={() => {
            "page";
          }}
        >+</IconButton> */}
			</div>
		</div>
	);
}
AddAvatar.defaultProps = {
	mainClass: 'space-x-1',
};
export default AddAvatar;
