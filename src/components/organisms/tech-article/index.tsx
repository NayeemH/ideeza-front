import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import Link from 'next/link';
import React from 'react';

function TechArtical(props: any) {
	const {
		link,
		title,
		articalDate,
		articalText,
		dislikes,
		valueIcon,
		views,
		viewsIcon,
		like,
		likeIcon,
		imgSrc,
	} = props;
	return (
		<>
			<div className="md:w-2/5 w-full rounded-lg overflow-hidden my-2">
				<Link href={link}>
					<a>
						<img
							src={imgSrc ?? '/assets/images/bg.png'}
							className="w-full h-full"
							alt="Banner"
						/>
					</a>
				</Link>
			</div>
			<Link href={link}>
				<a className="text-md text-primary text-base 2xl:text-xl font-sans font-semibold">
					{title}
				</a>
			</Link>

			<Label
				value={articalDate}
				classes={{
					root: `text-gray-700 text-base 2xl:text-xl1 font-sans pt-2 underline text-gray-325`,
				}}
			/>
			<Label
				value={articalText}
				classes={{
					root: `text-base 2xl:text-xl font-sans text-gray-925 py-7 w-5/6`,
				}}
			/>
			<div className="flex pb-7">
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={views}
					iconContanerClass="text-lg"
					lableClass={{
						root: 'text-md text-gray-700 font-sans px-2',
					}}
					iconComponent={viewsIcon}
				/>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={like}
					iconContanerClass="text-lg"
					lableClass={{
						root: 'text-md text-gray-700 font-sans px-2',
					}}
					iconComponent={likeIcon}
				/>
				<IconLabel
					tooltipProps={{ open: false }}
					labelValue={dislikes}
					iconContanerClass="text-xl"
					lableClass={{
						root: 'text-md text-gray-700 font-sans px-2',
					}}
					iconComponent={valueIcon}
				/>
			</div>
			<hr />
		</>
	);
}
export default TechArtical;
