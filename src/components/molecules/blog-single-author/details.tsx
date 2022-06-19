import Label from '@atoms/label';
import { AUTHOR_AVATAR_PLACEHOLDER } from 'enums/blog';
import Image from 'next/image';

const BlogSingleAuthorDetails = (props: any) => {
	const { author } = props;

	return (
		<div className="p-[40px] bg-[#F9F9F9] rounded-[16px] flex flex-col items-center md:items-start lg:flex-row 2xl:w-[870px] mx-auto mb-[45px]">
			<Image
				src={author?.profile_photo || AUTHOR_AVATAR_PLACEHOLDER}
				className="w-[80px] h-[80px] rounded-full"
				alt="image"
				height={80}
				width={80}
			/>
			<div className="pt-8 lg:pt-0 lg:pl-8 lg:flex-1 ">
				<Label
					value={'Written by'}
					className="text-[18px] leading-[32px] text-[#787878] font-poppins"
				/>
				<Label
					value={author?.first_name + ' ' + author?.last_name}
					className=" text-[20px] text-[#333333] leading-[34px] font-poppins font-[500] capitalize"
				/>
				{author?.about_me && (
					<Label
						value={author?.about_me}
						classes={{
							root: 'text-[#787878] text-[16px] font-normal leading-[29px] font-poppins',
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default BlogSingleAuthorDetails;
