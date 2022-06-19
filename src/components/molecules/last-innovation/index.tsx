import React from 'react';
import { ILast_Inovation } from '@models/user-dashboard';
import Link from 'next/link';
import { getTextExcerpt, numerify } from 'utils/utils';
import Button from '@atoms/button';
import SimpleToolTip from '@atoms/simple-tooltip';

function Last_Inovation(props: ILast_Inovation) {
	const {
		mainClass,
		aboutClass,
		bottomClass,
		imageClass,
		imageSrc,
		userName,
		userNameClass,
		postDate,
		postDateClass,
		postTitle,
		postDescription,
		postTitleClass,
		postDescriptionClass,
		comments,
		commentsClass,
		buttonValue,
		// buttonClass,
		id,
		selectedBlog,
		setSelectedBlog,
	} = props;

	return (
		<div className={`rounded-[15px] p-[15px] bg-white ${mainClass}`}>
			<img
				className={imageClass}
				src={imageSrc}
				alt="some"
			/>
			<div className="overflow-hidden">
				<div className={aboutClass}>
					{/* <Label value={userName} className={userNameClass} />
          <Label value={postDate} className={postDateClass} /> */}
					<SimpleToolTip
						title={userName}
						arrow
					>
						<span className={userNameClass}>
							{userName && userName?.length < 15
								? userName
								: userName?.slice(0, 15) + '...'}
						</span>
					</SimpleToolTip>

					<span className={postDateClass}>{postDate}</span>
				</div>

				<Link href={`/blog/${id}`}>
					<SimpleToolTip
						title={postTitle}
						arrow
					>
						<a className={postTitleClass}>{`${
							postTitle?.length < 22 ? postTitle : postTitle?.slice(0, 22) + '...'
						}`}</a>
					</SimpleToolTip>
				</Link>

				<div
					className={`${postDescriptionClass} xl:h-[50px] 2xl:h-16`}
					dangerouslySetInnerHTML={{
						__html: getTextExcerpt(postDescription, 50, true),
					}}
				></div>
				{/* <Label value={postDescription} classes={postDescriptionClass} /> */}
				<div className={bottomClass}>
					<span className={commentsClass}>
						{comments == 0
							? 'No Comments'
							: comments == 1
							? 'One Comment'
							: comments == 2
							? 'Two Comments'
							: `${numerify(Number(comments))} Comments`}
					</span>
					<Link href={`/blog/${id}`}>
						{/* <a className={buttonClass + " rounded-md"}>
              {buttonValue}
            </a> */}

						<Button
							value={buttonValue}
							className="bg-primary font-proxima-nova ml-1 h-[34px] w-[108px] p-2 xl:px-[16px] xl:py-2 text-white text-[16px] tracking-tight capitalize rounded-md "
							color={'primary'}
							loading={selectedBlog === id}
							onClick={() => setSelectedBlog(id)}
							size="large"
							variant="outlined"
							isloadingSmall={true}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
Last_Inovation.defaultProps = {
	postTitleClass:
		'text-base 2xl:text-xl font-bold truncate tracking-tight font-meri hover:cursor-pointer hover:underline mt-2 mb-3 text-ellipsis',
	postDescriptionClass:
		'text-base 2xl:text-lg font-medium my-3 text-[#7D7D7D] h-16 overflow-hidden font-muli',
	mainClass: 'pb-0',
	imageClass: 'w-full 2xl:h-[260px] lg:h-[200px] rounded-[10px]',
	aboutClass: 'flex justify-between items-center my-1',
	bottomClass: 'flex justify-between items-end xl:items-center my-2 mb-[20px]',
	postDateClass: 'text-gray-400  font-proxima-nova text-xs sm:text-base px-5 font-normal',
	userNameClass: 'text-primary text-base  font-muli font-semibold my-2 border-[#999999] pr-5',
	commentsClass:
		'text-[13px] xl:text-base text-primary truncate tracking-tight font-proxima-nova',
	buttonClass: 'bg-primary px-5 py-2 text-white font-muli text-xs tracking-tight capitalize',
};

export default Last_Inovation;
