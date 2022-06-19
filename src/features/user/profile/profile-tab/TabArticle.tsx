import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaThumbsUp } from 'react-icons/fa';
import { format } from 'date-fns';
import TabArticleUpper from '@organisms/tab-article-upper';
import { useAppSelector } from 'app/hooks';
import { IBlogPostList } from '@models/blog';
import Loader from '@atoms/loader';
import { useRouter } from 'next/router';
import { checkSelfUser } from '../../../../utils/utils';
import { apiService } from '../../../../utils/request';

function TabArticle() {
	const router = useRouter();
	const authUserData = useAppSelector((state) => state.auth?.userData);
	const user_id: number = Number(router.query.id);
	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState<any[]>([]);

	const getBlogList = async () => {
		let url = '';

		if (checkSelfUser(authUserData?.id, user_id)) {
			url = `/blog/?user__id=${user_id}`;
			//   console.log("MY BLOGS");
		} else {
			url = `/blog/?user__id=${user_id}`; // TODO:: Change endpoint according to the variable {user_id}
			//   console.log("OPPONENT BLOGS");
			//   console.log(`/blog/?user__id=${user_id}`);
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;

					setArticles(data.results);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getBlogList();
	}, []);
	// console.log(articles);

	return (
		<div className="max-h-96 space-y-3 overflow-y-auto relative mt-[23px]">
			{loading ? (
				<Loader type="relative" />
			) : Array.isArray(articles) && articles.length > 0 ? (
				articles?.map((article: IBlogPostList, k: any) => {
					//TODO:: FORMAT Blog description view component for rich text
					let descriptionText = '';
					if (article?.description) {
						try {
							const descriptionData = JSON.parse(article?.description);
							descriptionText = descriptionData?.blocks[0]?.text;
						} catch (e) {
							descriptionText = article?.description;
						}
					}

					return (
						<div
							className="pr-5 font-proxima-nova"
							key={k}
						>
							<TabArticleUpper
								articalValue1={article?.title}
								articalDate={
									<>
										{/* {v?.created_at} */}
										{format(
											new Date(article?.created_at ?? '12.02.2021'),
											'MM.dd.yyyy'
										) ?? '12.02.2021'}
										{/* <span className="text-blue-175 pl-2 underline">Approved</span> */}
										<span className="text-[#52CE00] pl-4 2xl:text-base text-sm no-underline	">
											{article?.status}
										</span>
									</>
								}
								articalText={
									<>
										<div
											dangerouslySetInnerHTML={{
												__html:
													descriptionText.length < 20
														? descriptionText
														: descriptionText?.slice(0, 20) + '...',
											}}
											className="text-sm md:text-base text-[#9B9B9B]"
										></div>
										{/* {descriptionText} */}
										<span
											className="text-primary pl-1 text-sm 2xl:text-base  cursor-pointer hover:underline"
											onClick={() =>
												router.push(
													`/user/dashboard/blog/details/${article?.id}`
												)
											}
										>
											See more
										</span>{' '}
									</>
								}
								valueIcon={<AiFillEye className="text-xl text-gray-700" />}
								valueLabel={article?.views ?? 0}
								valueIcon2={
									<img
										src="/images/icon/ideeza-icon-gray.png"
										alt="Icon"
										className="text-lg text-gray-700 w-5"
									/>
								}
								// TODO:: no related data found
								valueLabel2={article?.dislikes ?? 0}
								valueIcon3={<FaThumbsUp className="text-lg text-gray-700" />}
								valueLabel3={article?.likes ?? 0}
								// imgSrc={  v?.image ? v?.image : "https://www.lumosmarketing.io/wp-content/uploads/2019/04/placeholder-image.jpg"}
								imgSrc={article?.image}
							/>
						</div>
					);
				})
			) : (
				<p>No artical was found.</p>
			)}
		</div>
	);
}

export default TabArticle;
