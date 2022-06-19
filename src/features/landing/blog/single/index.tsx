import Button from '@atoms/button';
import Label from '@atoms/label';
import {
	IBlogComment,
	IBlogCommentDeleteDataType,
	IBlogCommentGetDataType,
	IBlogCommentLikePostDataType,
	IBlogCommentSubmitDataType,
	IBlogPostList,
} from '@models/blog';
import { IUserConnection } from '@models/user-profile';
import BlogSingleAuthorDetails from '@molecules/blog-single-author/details';
import BlogSingleAuthorInfo from '@molecules/blog-single-author/info';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { BLOG_PLACEHOLDER_IMAGE } from 'enums/blog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { openLoginPopup } from 'reducers/login';
import {
	createBlogCommentAsync,
	createReplyAsync,
	deleteBlogCommentAsync,
	editBlogCommentAsync,
	getBlogCommentsAsync,
	getCommentRepliesAsync,
	likeBlogCommentAsync,
	setBlogSingleComments,
	setBlogSingleCommentsCount,
} from './reducer';
import UiComments from '@molecules/ui-comments';

interface BlogSinglePostType {
	post: IBlogPostList;
	postComments: IBlogComment[];
	commentsCount: number;
	paginateMeta: any;
	userConnection?: IUserConnection | null;
}

const BlogSingle = (props: BlogSinglePostType) => {
	const { post, postComments, commentsCount, paginateMeta, userConnection } = props;

	const dispatch = useAppDispatch();
	const { status } = useSession();
	const router = useRouter();

	const pageCount = paginateMeta?.pageCount;
	const perPage = paginateMeta?.perPage;
	const replyPerPage = 3;

	const [currentPage, setCurrentPage] = useState<number>(paginateMeta?.currentPage);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);
	const [commentBoxText, setCommentBoxText] = useState<string>('');
	const [commentError, setCommentError] = useState<string>('');
	const [commentLoader, setCommentLoader] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const [isScrollTop, setIsScrollTop] = useState<boolean>(false);
	const [parentCommentAnimateId, setParentCommentAnimateId] = useState<number | undefined>();

	const comments: IBlogComment[] = useAppSelector((state) => state?.blogSingle?.comments);
	const numberOfComments: number = useAppSelector((state) => state?.blogSingle?.count || 0);
	const { commentId: newCommentId, replyId: replyAnimateId } = useAppSelector(
		(state) => state?.blogSingle?.newComment || null
	);
	const {
		loading: commentListLoading,
		success: commentListSuccess,
		failed: commentListFailed,
	} = useAppSelector((state) => state?.blogSingle?.commentList);
	const {
		loading: createLoading,
		success: createSuccess,
		failed: createFailed,
	} = useAppSelector((state) => state?.blogSingle?.commentCreate);
	const commentEditState = useAppSelector((state) => state?.blogSingle?.commentEdit);
	const commentDeleteState = useAppSelector((state) => state?.blogSingle?.commentDelete);
	const replyCreateState = useAppSelector((state) => state?.blogSingle?.replyCreate);
	const replyListState = useAppSelector((state) => state?.blogSingle?.replyList);

	useEffect(() => {
		if (isInitPageRender) {
			dispatch(setBlogSingleComments(postComments));
			dispatch(setBlogSingleCommentsCount(commentsCount));
			setIsFollowing(userConnection?.is_follower || false);
		}
		setIsInitPageRender(false);
	}, [postComments, commentsCount, userConnection]);

	useEffect(() => {
		if (isScrollTop) {
			setTimeout(() => setIsScrollTop(false), 1500);
		}
	}, [isScrollTop]);

	useEffect(() => {
		setCommentLoader(createLoading);
	}, [createLoading]);

	useEffect(() => {
		if (createSuccess) {
			setCommentError('');
			setCommentBoxText('');
			setIsScrollTop(true);
			setParentCommentAnimateId(Number(newCommentId));
		}
	}, [createSuccess]);

	useEffect(() => {
		if (createFailed) {
			toast.error('Error submitting comment');
			setCommentError('Comment is failed to send, please try again.');
		}
	}, [createFailed]);

	useEffect(() => setLoadingMore(commentListLoading), [commentListLoading]);

	useEffect(() => {
		if (commentListSuccess) {
			setCurrentPage(currentPage + 1);
		}
	}, [commentListSuccess]);

	useEffect(() => {
		if (commentListFailed) toast.error('Error fetching comments');
	}, [commentListFailed]);

	// Check user Authentication ---------------
	const checkAuth = () => {
		router.query.redirect = 'false';
		router.push(router, undefined, { scroll: false });
		dispatch(openLoginPopup({ ref: '' }));
	};

	// On Click Load More Comment Button ---------------
	const onClickLoadMore = () => {
		getBlogPostComments(currentPage + 1, perPage);
	};

	// 1.1. Get Comments ---------------
	const getBlogPostComments = async (page: number, perPage: number) => {
		const data = { id: Number(post.id), page, perPage };
		dispatch(getBlogCommentsAsync(data));
	};

	// 1.2. Get Replies ---------------
	const handleGetCommentReplies = (data: IBlogCommentGetDataType) => {
		dispatch(getCommentRepliesAsync(data));
	};

	// 2.1. Create New Comment ---------------
	const onClickPublishComment = async () => {
		if (commentBoxText?.trim().length == 0) {
			return setCommentError('Please write your comment');
		} else setCommentError('');

		if (status === 'unauthenticated') return checkAuth();

		const formData = { blog: post.id, content: commentBoxText };
		dispatch(createBlogCommentAsync(formData));
	};

	// 2.2. Create New Reply ---------------
	const onSubmitReplyNew = (data: any) => {
		const formData = {
			blog: data.postId,
			parent: data.parent,
			content: data.content,
		};
		dispatch(createReplyAsync(formData));
	};

	// 3.1. Edit Comment ---------------
	const onSubmitCommentEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editBlogCommentAsync(data));
	};

	// 3.2. Edit Reply ---------------
	const onSubmitReplyEdit = (data: IBlogCommentSubmitDataType) => {
		dispatch(editBlogCommentAsync(data));
	};

	// 4.1. Delete Comment ---------------
	const handleCommentDelete = async (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteBlogCommentAsync(data));
	};

	// 4.2. Delete Reply ---------------
	const handleReplyDelete = (data: IBlogCommentDeleteDataType) => {
		dispatch(deleteBlogCommentAsync(data));
	};

	// 5.1. & 5.2. Like Comment and Reply ---------------
	const onSubmitLike = (data: IBlogCommentLikePostDataType) => {
		dispatch(likeBlogCommentAsync(data));
	};

	return (
		<div className="bg-white pt-[170px]">
			<div className="flex flex-col justify-center items-center">
				<Label
					value="How Ideeza can make the world a better place"
					className="text-[#333333] text-[24px] xl:text-[35px] 2xl:text-[48px] leading-[40px] 2xl:leading-[72px] font-poppins font-[600] text-center xl:w-[45%] 2xl:w-[35%] mx-auto"
				/>
				<BlogSingleAuthorInfo
					author={post?.user}
					postId={post?.id}
					likes={post?.likes}
					views={post?.views}
					isFollowing={isFollowing}
				/>
			</div>
			<div className=" px-[30px] sm:px-[100px] xl:px-[200px] 2xl:px-[300px]">
				<img
					src={post?.image || BLOG_PLACEHOLDER_IMAGE}
					width="100%"
					className="thumb h-full"
					object-fit="cover"
					alt="image"
				/>

				<Label
					value="Lorem ipsum dolor sit amet, consectetur"
					className="text-[#333333] text-[32px] leading-[48px] font-poppins font-[500] text-center mt-[50px] mb-[20px]"
				/>
				<Label
					value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor elementum fames et sagittis placerat sollicitudin nulla laoreet integer. Id sollicitudin sagittis lobortis venenatis sit. Egestas tincidunt laoreet eros, orci molestie praesent. Ac laoreet adipiscing id purus, adipiscing urna imperdiet. Leo elementum, quisque tellus est, integer eget in vitae molestie. Hendrerit tellus sed in diam quis ipsum eget nibh. Accumsan, leo tincidunt risus, placerat mauris non. Non ut diam augue condimentum at condimentum. Eget penatibus odio gravida nunc risus sed ut volutpat. Purus suspendisse aliquam amet, purus. Tristique nisl, nisl, vitae vitae amet. Tortor adipiscing habitant nisl vitae integer vitae proin. Consequat, eleifend nunc, sed velit sit maecenas nulla. Fames nec ornare ullamcorper mollis rhoncus consectetur cras consectetur. Donec aliquam quisque metus, duis iaculis varius nulla elementum, aliquam. Viverra justo, velit fermentum scelerisque imperdiet. Fames egestas tortor aliquet mauris, risus ut habitasse feugiat. Netus neque, ut volutpat sed luctus sed tristique. Tortor, accumsan neque, congue sapien, netus "
					className="text-[#787878] text-[16px] leading-[29px] font-poppins font-[400] text-center mb-[80px]"
				/>
				<div className="bg-primary h-[5px] w-full xl:w-[642px] mx-auto mb-[70px]"></div>
				{post?.title && (
					<Label
						value={post?.title}
						classes={{
							root: 'text-center mx-auto text-2xl md:text-3xl xl:text-4xl xl:w-1/2 md:w-3/4 font-medium pb-6 text-gray-700 font-meri',
						}}
					/>
				)}
				{post?.description && (
					<div
						dangerouslySetInnerHTML={{ __html: post?.description }}
						className="text-center font-poppins mx-auto w-full font-normal text-[#787878] text-[16px] leading-[29px] mb-[32px]"
					></div>
				)}
				<BlogSingleAuthorDetails author={post?.user} />
				<Button
					onClick={() => router.push('/blog')}
					value={
						<>
							<span>
								<MdKeyboardArrowLeft className="text-4xl" />
							</span>
							<span className="text-[20px]">Go Back</span>
						</>
					}
					className="bg-white m-auto flex leading-none text-primary transform-none font-poppins text-base rounded font-normal px-10 py-5 shadow-none hover:shadow-none outline-0 mb-2"
					color="inherit"
				/>
				<div className="border border-[#E6E6E6] rounded-[16px] mb-[130px]">
					<UiComments
						comments={comments}
						post={post}
						numberOfComments={numberOfComments}
						parentCommentAnimateId={parentCommentAnimateId}
						replyAnimateId={replyAnimateId}
						handleCommentDelete={handleCommentDelete}
						handleReplyDelete={handleReplyDelete}
						replyPerPage={replyPerPage}
						onSubmitCommentEdit={onSubmitCommentEdit}
						onSubmitReplyNew={onSubmitReplyNew}
						onSubmitReplyEdit={onSubmitReplyEdit}
						onSubmitLike={onSubmitLike}
						handleGetCommentReplies={handleGetCommentReplies}
						onClickLoadMore={onClickLoadMore}
						currentPage={currentPage}
						pageCount={pageCount}
						loadingMore={loadingMore}
						commentBoxText={commentBoxText}
						handleChangeCommentBoxText={(e: any) => setCommentBoxText(e.target.value)}
						onClickPublishComment={onClickPublishComment}
						commentError={commentError}
						commentLoader={commentLoader}
						isScrollTop={isScrollTop}
						commentEditState={commentEditState}
						commentDeleteState={commentDeleteState}
						replyCreateState={replyCreateState}
						replyListState={replyListState}
						className=" px-[10px] md:px-[40px] pt-[34px] mb-[40px]"
						commentSingleBodyBg="bg-[#F4F5FC] xl:px-[20px] w-full xl:py-[20px] xl:ml-[15px] xl:rounded-[6px]"
						buttonPublishContainer="flex justify-start"
						commentEditorSubmitBtnClassName="mr-auto text-white flex bg-primary transform-none font-muli text-base 2xl:text-xl rounded font-semibold px-16 py-3 hover:shadow-lg outline-none border-0 mt-8"
					/>
				</div>
			</div>
		</div>
	);
};
export default BlogSingle;
