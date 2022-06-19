import Button from '@atoms/button';
import { FC } from 'react';

interface AboutCareerJobDescProps {
	description?: any;
	onClickApply?: (e: React.MouseEvent<HTMLElement>) => void;
}

const AboutCareerJobDesc: FC<AboutCareerJobDescProps> = (props) => {
	const { description, onClickApply } = props;
	return (
		<div className="">
			{description && (
				<div
					className="text-left job-description"
					dangerouslySetInnerHTML={{ __html: description }}
				></div>
			)}
			<Button
				onClick={onClickApply}
				value="Apply Now"
				className="text-white text-[16px] mt-4 bg-primary capitalize px-[30px] py-[15px] shadow-none"
				color="primary"
			/>
		</div>
	);
};

export default AboutCareerJobDesc;
