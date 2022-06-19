import { IBlogPostList } from '@models/blog';
import TechArtical from '@organisms/tech-article';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { isDataInArray } from 'utils/utils';

const TabArticalTech: React.FC<any> = ({ data }: { data: IBlogPostList[] }) => {
	return (
		<div className="space-y-3 sm:mr-24 mr-2 p-8 pt-0 bg-white rounded-2xl">
			{isDataInArray(data) &&
				data.map((item, index) => (
					<div
						className="pr-5 pt-8"
						key={index}
					>
						<TechArtical
							link={`/blog/${item.id}`}
							title={item.title}
							articalDate={
								<>
									<span className="text-gray-700 underline">
										{format(
											new Date(item.updated_at || '22-2-2022'),
											'MMM d, yyyy'
										)}
									</span>
								</>
							}
							articalText={
								<>
									<span className="txt-c12-color text-base 2xl:text-xl font-sans ">
										{item?.description && item?.description.length > 300
											? item.description.substring(0, 300)
											: item.description}
									</span>
									{item?.description && item?.description.length > 300 && (
										<Link href={`/blog/${item?.id}`}>
											<a className="text-current pl-1 text-base 2xl:text-xl font-semibold font-sans cursor-pointer hover:underline">
												See more
											</a>
										</Link>
									)}
								</>
							}
							valueIcon={<FaThumbsUp className="text-lg text-gray-500 rotate-180" />}
							dislikes={item.dislikes}
							viewsIcon={
								<img
									src="/images/icon/ideeza-icon-gray.png"
									alt="Icon"
									className="text-lg text-gray-700 w-5"
								/>
							}
							views={item.views}
							likeIcon={<FaThumbsUp className="text-lg text-gray-500" />}
							like={item.likes}
							imgSrc={item.image ? item.image : '/images/feeds/sponsor.png'}
						/>
					</div>
				))}
		</div>
	);
};
export default TabArticalTech;
