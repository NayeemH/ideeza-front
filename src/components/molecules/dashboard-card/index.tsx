import React from 'react';
import Label from '@atoms/label';
import Proptype from 'prop-types';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
function DashboardCard(props: any) {
	const { className, value, text, iconSet, badge, isBadge, handleClick } = props;
	const router = useRouter();
	const handleWebCollaboration = () => {
		//   dispatch(previewData({ ...preview, attachment, category }));
		router.push('/web-collaboration');
	};
	return (
		<>
			<div
				className={`pt-1 pb-2 sm:pl-[10px] md:px-4 md:py-6 border rounded-lg border-transparent justify-center lg:justify-start flex flex-col transition-all duration-500 ease-in-out hover:shadow-md hover:border-primary bg-white hover:bg-white ${className}`}
				onClick={handleClick}
			>
				<div className="flex justify-center sm:justify-start md:flex-wrap lg:flex-nowrap items-center gap-3">
					{iconSet}
					<div>
						<Label
							className="font-proxima-nova text-base ml-3 font-semibold md:ml-0 md:text-2xl xl:text-3xl 2xl:text-[26px] mb-0"
							value={value}
						/>

						<Label
							className="text-base whitespace-nowrap md:tracking-tight max-w-md text-[#8399A4] md:font-medium pt-1 mb-0"
							value={text}
						/>
					</div>
					{isBadge && (
						<Button
							value={badge}
							size="large"
							className="capitalize shadow-none text-white bg-primary font-medium py-1 md:py-2 md:px-7 tracking-tighter text-sm"
							onClick={handleWebCollaboration}
						/>
					)}
				</div>
			</div>
		</>
	);
}

DashboardCard.defaultProps = {
	color: '#FB00C7',
	size: '25',
};
DashboardCard.prototype = {
	color: Proptype.string,
	size: Proptype.string,
};

export default DashboardCard;
