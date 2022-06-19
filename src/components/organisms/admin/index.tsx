import React from 'react';
import Label from '@atoms/label';
import Contributor from '@organisms/contributors';

interface AdminProps {
	heading?: string;
	bodyValue?: string;
	headingClass?: string;
	bodyClass?: string;
	// contName;
	// contAbout;
	// iconsideValue;
	data?: any;
	handle_change: (e?: any) => void;
}

function Admin(props: AdminProps) {
	const {
		heading,
		bodyValue,
		headingClass,
		bodyClass,
		// contName,
		// contAbout,
		// iconsideValue,
		// data,
		handle_change,
	} = props;
	return (
		<div>
			<Label
				value={heading}
				classes={{ root: `${headingClass}` }}
			/>
			<Label
				value={bodyValue}
				classes={{ root: `${bodyClass}` }}
			/>
			<Contributor
				handleClick={() => {
					handle_change('Clicked');
				}}
				nameValue={`user`}
				aboutValue={'Ideeza'}
				iconValue={'car'}
			/>

			{/* {data?.map((val: any) =>
        val?.role === "admin" || val?.role === "Admin" ? (
          <Contributor
            handleClick={() => {
              handle_change(val);
            }}
            nameValue={`${val?.user?.first_name} ${val?.user?.first_name}`}
            aboutValue={val?.user?.company_info}
            iconValue={val?.user_project?.title}
          />
        ) : null
      )} */}
		</div>
	);
}
Admin.defaultProps = {
	headingClass: 'text-[#333333] text-base 2xl:text-xl tracking-tight font-semibold  pb-4',
	bodyClass: 'text-[#333333] text-base  mt-[16px] leading-5 pb-3',
};
export default Admin;
