import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import { ProjectHeaderProps } from 'models/user-project';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
// import { useRouter } from "next/router";

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
	value,
	isSeeAll,
	goto,
	onclickSeeAll,
	showBackButton,
}) => {
	const router = useRouter();

	return (
		<div className="flex items-center justify-between font-proxima-nova">
			<Label
				value={value}
				classes={{
					root: 'text-[#333333] text-xl xl:text-2xl 2xl:text-[32px] tracking-tight  font-bold',
				}}
			/>
			{showBackButton && (
				<Button
					value="Go back"
					onClick={() => {
						router.back();
					}}
					classes={{
						root: 'bg-primary text-base 2xl:text-lg font-proxima-nova text-white transform-none  tracking-tight px-[14px] py-[7] 2xl:px-[30px] 2xl:py-[13px] rounded ',
					}}
					iconStart={<FaArrowCircleLeft className="text-xl" />}
					color="primary"
				/>
			)}
			{isSeeAll && (
				<IconLabel
					onClick={onclickSeeAll}
					tooltipProps={{ open: false }}
					labelValue="See all"
					iconContanerClass="text-lg"
					mainClass="flex items-center flex-row-reverse cursor-pointer hover:underline"
					lableClass={{
						root: `text-[#333333] tracking-tight text-base 2xl:text-xl font-semibold mr-1 `,
					}}
					//   style={{ cursor: "pointer" }}
					iconComponent={
						<AiOutlineArrowRight className="text-[#333333] text-base 2xl:text-xl" />
					}
					goto={goto}
				/>
			)}
		</div>
	);
};

export default ProjectHeader;
