import AvatarAtom from '@atoms/avatar';
import Label from '@atoms/label';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
function Contributor(props: any) {
	const {
		nameValue,
		aboutValue,
		iconValue,
		nameClass,
		aboutClass,
		iconValueClass,
		avatarClass,
		handleClick,
		src,
	} = props;
	return (
		<div className="flex items-center justify-between py-3 border-t border-b border-gray-750 md:w-5/6">
			<div className="flex items-center">
				<AvatarAtom
					variant="circular"
					src={src}
					className={`${avatarClass}`}
				/>
				<div className="flex-col pl-4">
					<Label
						value={nameValue}
						classes={{
							root: `text-[#333333] leading-4 font-semibold text-base 2xl:text-xl mb-1 ${nameClass}`,
						}}
					/>
					<Label
						value={aboutValue}
						classes={{
							root: `text-[#999999]  text-base  ${aboutClass}`,
						}}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<Label
					value={iconValue}
					classes={{
						root: ` text-base 2xl:text-xl eina-font-r03 ${iconValueClass}`,
					}}
				/>
				<RiCloseLine
					onClick={() => handleClick()}
					className="text-red-500 font-semibold ml-1 cursor-pointer"
					size="30"
				/>
			</div>
		</div>
	);
}
Contributor.defaultProps = {
	nameClass: '  text-base',
	aboutClass: ' font-normal text-sm',
	iconValueClass: 'text-primary text-base',
	avatarClass: 'w-11 h-11',
};
export default Contributor;
