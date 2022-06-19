import React from 'react';
import NewsFeedSingleItem from '@organisms/news-feed-single-item';
import Loader from '@atoms/loader';
import NewsFeedFilters from '@organisms/news-feed-filters';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';
// import Button from "@atoms/button";
function NewsFeedSection(props: any) {
	const {
		state,
		loading,
		search,
		sortBy,
		onChangeSearch,
		onChangeSortBy,
		onEnterSearch,
		sortByOptions,
	} = props;

	return (
		<div
			// className="relative"
			style={{ minHeight: '550px' }}
		>
			{loading ? (
				<div className="sm:grid sm:grid-cols-10 gap-2 my-6">
					<div className="hidden sm:block"></div>
					<div className="col-span-9 lg:col-span-9 sm:col-span-8">
						<div className="relative min-h-[450px]">
							<Loader
								type="relative"
								transparentBg="bg-white/80"
								isTransparentBg
							/>
						</div>
					</div>
				</div>
			) : (
				<div>
					{((Array.isArray(state) && state?.length > 0) || search || sortBy) && (
						<div className="sm:grid sm:grid-cols-10 gap-2 my-6">
							<div className="hidden sm:block"></div>
							<div className="col-span-9 lg:col-span-9 sm:col-span-8">
								<NewsFeedFilters
									search={search}
									sortBy={sortBy}
									onChangeSearch={onChangeSearch}
									onChangeSortBy={onChangeSortBy}
									onEnterSearch={onEnterSearch}
									sortByOptions={sortByOptions}
								/>
							</div>
						</div>
					)}
					{Array.isArray(state) && state?.length > 0 && (
						<>
							{state?.map((item: any, index: number) => {
								return (
									<div
										key={index}
										className={`sm:grid sm:grid-cols-10 gap-1 xl:gap-2 ${
											index !== 0 ? 'mt-10' : ''
										}`}
									>
										<NewsFeedSingleItem
											project={item?.object_details}
											type={'following'}
											user={item?.object_details?.user}
											text={item?.object_details?.description}
											objectType={item.object_type}
											vidoes={
												item?.object_type == 'PRODUCT'
													? item?.object_type?.product_videos
													: item?.object_type?.project_videos
											}
											images={
												item?.object_type == 'PRODUCT'
													? item?.object_type?.product_images
													: item?.object_type?.project_videos
											}
										/>
									</div>
								);
							})}
						</>
					)}

					{Array.isArray(state) && state?.length == 0 && !loading && (
						<div className="sm:grid sm:grid-cols-10 gap-2 my-6">
							<div className="hidden sm:block"></div>
							<div className="col-span-9">
								<UiEmptyPlaceholder
									title={'Follow list is empty!'}
									description={
										'Here will display the posts you and the people post you are following'
									}
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

NewsFeedSection.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default NewsFeedSection;
