import Button from '@atoms/button';
import Label from '@atoms/label';
import { ISuccessStory } from '@models/success-story';
import { format } from 'date-fns';
import { BLOG_PLACEHOLDER_IMAGE } from 'enums/blog';
import Image from 'next/image';

type SuccessStoryType = {
	story: ISuccessStory;
	onClickReadMore?: any;
};
const SuccessStoryCard = (props: SuccessStoryType) => {
	const { story, onClickReadMore } = props;

	return (
		<div
			className={`stories_card `}
			onClick={onClickReadMore}
		>
			<Image
				src={story?.cover_file || BLOG_PLACEHOLDER_IMAGE}
				className="w-full rounded-t-xl"
				alt="story-card"
				width={'424'}
				height={'268'}
				layout="responsive"
			/>
			<div className="rounded-b-xl py-2.5 px-7 bg-white text-left border border-solid border-[#E6E6E6]">
				<Label
					className="text-primary my-1 md:text-[14px]  font-normal "
					value={
						<div className="w-full flex justify-between">
							{story?.user?.first_name + ' ' + story?.user?.last_name + ' '}
							{story?.updated_at && (
								<>
									<span className="text-[#787878]  md:text-[14px]">
										{format(new Date(story?.updated_at), 'd MMMM, yyyy')}
									</span>
								</>
							)}
						</div>
					}
				/>
				{story?.title && (
					<Label
						value={
							story?.title?.length > 29
								? story?.title?.slice(0, 28) + '..'
								: story?.title
						}
						className="text-[#101010] text-lg lg:text-[20px] my:1 md:my-2 "
					/>
				)}
				{story?.description && (
					<div
						className="text-[#787878] text-sm  lg:text-base leading-[28.8px] md:h-16 overflow-hidden"
						dangerouslySetInnerHTML={{
							__html: story?.description.substring(0, 60) + '...',
						}}
					></div>
				)}
				<div className="flex flex-row items-center justify-between pt-1 lg:pt-2 ">
					<Label
						value="14 comments"
						className="text-[14px] text-[#F301C3] text-sm md:text-[14px]"
					/>
					<Button
						value="Read more....."
						className="text-[#F301C3] transform-none text-xs lg:text-[14px] leading-[25.2px] py-1 lg:py-2 font-semibold hover:shadow-none shadow-none outline-none"
						// type="button"
						onClick={onClickReadMore}
						color="primary"
						variant="text"
					/>
				</div>
			</div>
		</div>
	);
};

export default SuccessStoryCard;
