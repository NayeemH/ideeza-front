import React, { FC, useEffect, useRef, useState } from 'react';
import Button from '@atoms/button';
import Label from '@atoms/label';
import { ISuccessStory } from '@models/success-story';
import CustomPagination from '@molecules/custom-pagination';
import SuccessStoryCard from '@molecules/success-story-card';
import SuccessStoryDetails from '@molecules/success-story-details';
import SignUpPopup from '@organisms/signup-popup';
import { useAppDispatch } from 'app/hooks';
import { openSignUpOptions } from 'reducers/signup';
import { ApiDataType, apiService } from 'utils/request';
// import Loader from "@atoms/loader";

interface SuccessStoryProps {
	successStories: any;
	paginateMeta: any;
}

const SuccessStory: FC<SuccessStoryProps> = (props) => {
	const { successStories, paginateMeta } = props;
	const scrollRef: any = useRef();
	const readMoreViewRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const pageCount = paginateMeta?.pageCount;
	const perPage = paginateMeta?.perPage;

	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [stories, setStories] = useState<any>(successStories);
	const [currentPage, setCurrentPage] = useState<number>(paginateMeta?.currentPage);
	const [readMoreBlog, setReadMoreBlog] = useState<ISuccessStory | null>(null);
	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

	useEffect(() => {
		if (stories.length > 0) {
			const initStoryIndex = stories.length >= 2 ? 1 : 0;
			setActiveCardIndex(initStoryIndex);
			setReadMoreBlog(stories[initStoryIndex]);
		}
		setIsInitPageRender(false);
	}, [stories]);

	useEffect(() => {
		if (!isInitPageRender) getSuccessStories(currentPage, perPage);
	}, [currentPage]);

	const paginationOnChange = (e: any, value: number) => {
		setCurrentPage(value);
	};

	const getSuccessStories = async (page: number = 1, perPage: number = 3) => {
		// setLoading(true);
		let result: any = [];
		const apiData: ApiDataType = {
			method: 'get',
			url: `core/success-story/${page ? `?page=${page}` : ''}${
				perPage ? `&page_size=${perPage}` : ''
			}`,
		};

		await apiService(apiData, (res: any) => {
			if (res) {
				result = res?.data?.results || [];
				setStories(result);
			}
			// console.log('error---', err)
		});
		// setLoading(false);
		return result;
	};

	const handleReadMoreAction = (event: any, index: any) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		setActiveCardIndex(index);
		setReadMoreBlog(stories[index]);
	};

	return (
		<>
			<SignUpPopup />
			{/* -------------------- STARTs: Try it Yourself Section --------------------*/}
			<div className="bg-success success-story-banner">
				<div className="w-full h-full flex justify-center items-center">
					<Button
						value="Try it yourself"
						className="text-white bg-primary font-open rounded-sm text-base 2xl:text-[18px] px-4 md:px-4 py-2 md:py-4  hover:shadow-lg md:rounded-lg outline-none border-0 shadow-none"
						onClick={() => dispatch(openSignUpOptions())}
					/>
				</div>
			</div>
			{/* -------------------- ENDs: Try it Yourself Section --------------------*/}
			{stories.length > 0 ? (
				<>
					{/* -------------------- STARTs: Success Story Details Section --------------------*/}
					{readMoreBlog && (
						<div
							ref={readMoreViewRef}
							className="px-6 md:px-16 pb-8"
						>
							<SuccessStoryDetails story={readMoreBlog} />
						</div>
					)}
					{/* -------------------- ENDs: Success Story Details Section --------------------*/}

					{/* -------------------- STARTs: Similar Story List Section --------------------*/}
					{stories?.length > 0 && (
						<div className="w-full bg-white md:bg-[#F9F9F9] md:mt-8 md:p-6 md:py-10 xl:pt-[113px]">
							<h2 className="text-center text-[#333333] font-semibold text-xl md:text-2xl xl:text-4xl 2xl:text-[48px] mt-2 mb-[51px] ">
								Similar Stories
							</h2>
							{/* <div className="bg-primary w-8 h-1 mb-8 mx-auto"></div> */}
							<div className="flex justify-center ">
								<div className="gap-x-[25px] grid sm:grid-cols-[424px] xl:grid-cols-[350px_350px_350px] 2xl:grid-cols-[424px_424px_424px]  grid-cols-[300px] flex-wrap justify-between relative">
									{/* {loading && <Loader type="relative" isTransparentBg />} */}
									<>
										{stories?.map((story: ISuccessStory, index: number) => (
											<SuccessStoryCard
												key={index}
												story={story}
												onClickReadMore={(
													e: React.MouseEvent<HTMLElement>
												) => handleReadMoreAction(e, index)}
											/>
										))}
									</>
								</div>
							</div>
							{pageCount > 1 && (
								<div className="my-8">
									<CustomPagination
										pageCount={pageCount}
										currentPage={currentPage}
										handleChange={(e: any, value: number) =>
											paginationOnChange(e, value)
										}
									/>
								</div>
							)}
						</div>
					)}
					{/* -------------------- ENDs: Similar Story List Section --------------------*/}
				</>
			) : (
				<>
					<div className="w-full bg-white md:bg-[#F9F9F9] my-60 md:mt-8 p-6">
						<h2 className="text-center font-bold text-xl md:text-2xl xl:text-3xl 2xl:text-[48px] leading-[72px] font-meri my-52">
							No Story Found!
						</h2>
					</div>
				</>
			)}
			{/* -------------------- STARTs: Work With Us Section --------------------*/}
			<div className="w-full mt-5 md:mt-8  md:p-6">
				<div className="w-full text-center mt-3 lg:mt-8 lg:p-6 py-5 lg:py-10 lg:pt-20 lg:pb-16">
					<Label
						value="Want to work with us?"
						className="text-center font-bold text-xl md:text-3xl xl:text-4xl 2xl:text-6xl mb-12 font-meri"
					/>
					<Button
						value="Yes, Continue"
						className="text-white bg-primary mx-auto transform-none font-semibold rounded-md 2xl:text-lg text-base px-[30px] md:py-[15px] hover:shadow-none shadow-none outline-none border-0 font-sans tracking-tight min-h-0"
						onClick={() => dispatch(openSignUpOptions())}
					/>
				</div>
			</div>
			{/* -------------------- ENDs: Work With Us Section --------------------*/}
		</>
	);
};

export default SuccessStory;
