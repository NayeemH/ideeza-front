import { ISuccessStory } from '@models/success-story';

import Label from '@atoms/label';
import Image from 'next/image';

type SuccessStoryDetailsType = {
	story: ISuccessStory;
};

const SuccessStoryDetails = (props: SuccessStoryDetailsType) => {
	const { story } = props;

	return (
		<div className="rounded-[10px] w-full xl:w-[1076px] border-opacity-50 overflow-auto pt-[60px] pb-8 -mt-[6rem] md:-mt-[12rem] mx-auto bg-white border">
			<Label
				value={story?.title}
				className="text-center text-[#333333] md:w-6/12 lg:w-8/12 mx-auto text-[24px] md:text-[35px] 2xl:text-[48px] mb-[25px] font-semibold 2xl:leading-[72px] leading-[40px] font-poppins"
			/>
			<div className="overflow-auto max-h-[1024px]">
				{story?.description && (
					<>
						<div
							className="text-[#787878] text-[16px] font-poppins mb-8 leading-8 px-[40px] custom-header-story"
							dangerouslySetInnerHTML={{
								__html:
									story?.description.length > 400
										? story?.description.slice(0, 400) + '...'
										: story?.description,
							}}
						></div>
						<span></span>
					</>
				)}
				<div className="px-[90px]">
					{story?.cover_file && (
						<Image
							src={story.cover_file}
							className="mb-8 w-full"
							alt="read-blog"
							width={'876px'}
							height={'456px'}
							layout="responsive"
						/>
					)}
				</div>

				{story?.description && (
					<div
						className="text-[#787878] text-sm 2xl:text-base mt-8 mb-8 leading-8 md:px-[40px] custom-header-story"
						dangerouslySetInnerHTML={{
							__html:
								story?.description.length > 400
									? story?.description.slice(400)
									: '',
						}}
					></div>
				)}
			</div>
		</div>
	);
};

export default SuccessStoryDetails;
