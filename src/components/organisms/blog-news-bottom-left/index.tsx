import Button from '@atoms/button';
import Label from '@atoms/label';
import { format } from 'date-fns';
import { AUTHOR_AVATAR_PLACEHOLDER, BLOG_PLACEHOLDER_IMAGE } from 'enums/blog';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { getTextExcerpt, numerify } from 'utils/utils';

const BlogNewsBottomLeft: FC<any> = (props: any) => {
	const {
		post,
		title,
		commentCount,
		likeCount,
		userName,
		htmlValue,
		date,
		readTime,
		img,
		avatar,
	} = props;

	return (
		<>
			<div className="flex flex-wrap items-start w-full mb-6">
				<div className="md:w-2/5 w-full md:text-left text-center">
					<Link href={`/blog/${post?.id}`}>
						<a>
							<Image
								src={img ? img : BLOG_PLACEHOLDER_IMAGE}
								className=" rounded-md"
								alt="image"
								width={'100%'}
								height={'85%'}
								layout="responsive"
							/>
						</a>
					</Link>
				</div>
				<div className="md:w-3/5 md:pl-[30px] text-left w-full">
					<Link href={`/blog/${post?.id}`}>
						<a>
							<Label
								value={title}
								className=" text-xl xl:text-[32px] font-[500] capitalize text-[#333333] leading-[48px] cursor-pointer truncate ... overflow-hidden"
							/>
						</a>
					</Link>
					<div className="w-full mb-2 flex space-x-5 items-center">
						<Label
							value={
								commentCount == 0
									? 'No Comments'
									: commentCount == 1
									? 'One Comment'
									: commentCount == 2
									? 'Two Comments'
									: `Comments (${numerify(commentCount)})`
							}
							className="text-[#787878] text-[16px] leading-[29px]"
						/>
						<Label
							value={
								likeCount == 0
									? 'No Likes'
									: likeCount == 1
									? 'One Like'
									: likeCount == 2
									? 'Two Likes'
									: `Likes (${numerify(likeCount)})`
							}
							className="text-[#787878] text-[16px] leading-[29px]"
						/>
					</div>
					<div className=" my-[15px] w-full flex items-center justify-start text-center">
						<Image
							src={avatar ? avatar : AUTHOR_AVATAR_PLACEHOLDER}
							className="rounded-full"
							alt="image"
							width={48}
							height={48}
						/>
						<Label
							value={`${userName}`}
							className="text-base xl:text-[20px] ml-[15px] text-[#333333] leading-[34px]"
						/>
					</div>
					{htmlValue && (
						<div
							className="text-[#787878] capitalize text-[16px] leading-[29px] overflow-hidden"
							dangerouslySetInnerHTML={{
								__html: getTextExcerpt(htmlValue, 140, true),
							}}
						></div>
					)}
					<div className="flex flex-wrap items-center justify-between mt-[15px]">
						<Label
							value={
								<>
									<span className="text-[#999999] text-[16px] leading-[29px] ">
										{format(new Date(date), 'MMM d, yyyy')}
									</span>
									{readTime == 0 ? null : (
										<>
											<span className="bg-[#999999] rounded-full h-2 w-2 mx-3"></span>
											<span className="text-[#999999] text-[16px] leading-[29px] ">
												{readTime} mins read
											</span>
										</>
									)}
								</>
							}
							className="text-[#999999] flex items-center text-[16px] leading-[29px] "
						/>

						<Link href={`/blog/${post?.id}`}>
							<a>
								<Button
									value="Read more..."
									className="text-primary transform-none font-muli text-[16px] leading-[29px] bg-white font-poppins font-[400] shadow-none  outline-none border-0 hover:shadow-none"
									// color="primary"
								/>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogNewsBottomLeft;
