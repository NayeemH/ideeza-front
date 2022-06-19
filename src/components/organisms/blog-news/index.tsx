import Label from '@atoms/label';
import { BLOG_PLACEHOLDER_IMAGE } from 'enums/blog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getTextExcerpt } from 'utils/utils';
// import "./style.css";
const BlogNews: React.FC<any> = (props: any) => {
	// there should be blog props
	const { details } = props;
	const { id, title, description, image } = details;

	return (
		<>
			<div className="">
				<div className=" pt-[30px] flex items-start">
					<div>
						<Link href={`/blog/${id}`}>
							<a className="w-full h-full">
								<Image
									src={image ? image : BLOG_PLACEHOLDER_IMAGE}
									className="rounded"
									alt="image"
									width={92}
									height={94}
								/>
								{/* <img src={image ? image : BLOG_PLACEHOLDER_IMAGE} className="w-[92px] h-[94px] rounded-md" alt="" /> */}
							</a>
						</Link>
					</div>

					<div className="w-auto flex flex-col pl-6 px-3 flex-1">
						<Link href={`/blog/${id}`}>
							<a>
								<Label
									value={getTextExcerpt(title, 20)}
									className="text-[#333333] xl:text-[20px] font-[500] text-base capitalize leading-[34px] cursor-pointer truncate ... "
								/>
							</a>
						</Link>
						<div
							className="text-[14px] leading-[21px] text-[#9B9B9B] font-poppins"
							dangerouslySetInnerHTML={{
								__html: getTextExcerpt(description, 100, true),
							}}
						></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogNews;
