import Button from '@atoms/button';
import Loader from '@atoms/loader';
import TopRatedSingleProduct from '@molecules/top-rated-product';
import NftBidPopup from '@organisms/nft-bid-product-popup';
// import { useRouter } from "next/router";
import React, { useState } from 'react';

const ItemsTabContent = (props: any) => {
	// const [loadMoreloading, setLoadMoreLoading] = useState(false);
	const { projects, loading, hasLoadMore, handleLoadMore } = props;
	const [popup, SetPopup] = useState(false);
	// const router = useRouter();
	const toggleBidPopup = () => SetPopup(!popup);
	// const goToProductDetailPage = (id: any) => {
	//   router.push(`/project/details/${id}`);
	// };

	return (
		<div className="sm:ml-[60px] md:ml-[40px] xl:ml-[20px] 2xl:ml-0 relative pt-[30px]">
			{loading && !projects ? (
				<Loader
					type={'relative'}
					isTransparentBg
				/>
			) : projects?.length > 0 ? (
				<>
					<div className="grid grid-cols-12 gap-8 pr-5">
						{projects.map((project: any, index: any) => (
							<div
								key={index}
								className=" col-span-12 md:col-span-6 xl:col-span-4"
								// onClick={() => goToProductDetailPage(project?.id)}
							>
								<TopRatedSingleProduct
									product={project}
									onClickPlaceBid={toggleBidPopup}
								/>
							</div>
						))}
					</div>
					{hasLoadMore && (
						<div className="my-8 text-center flex justify-center">
							<Button
								loading={loading}
								value="Load More"
								className="text-white h-12 rounded-[6px] bg-primary uppercase font-semibold px-[30px] py-[10px] min-h-0 hover:shadow-lg outline-none border-0 text-base shadow-none"
								variant="contained"
								color="primary"
								onClick={handleLoadMore}
								// onClick={() => {
								// 	handleLoadMore();
								// 	setLoadMoreLoading(true);
								// }}
							/>
						</div>
					)}
				</>
			) : (
				!loading && (
					<>
						<div
							className="flex items-center justify-center text-3xl font-semibold py-20"
							style={{ minHeight: '650px' }}
						>
							No project found!
						</div>
					</>
				)
			)}
			<NftBidPopup
				open={popup}
				toggleOpen={toggleBidPopup}
			/>
		</div>
	);
};

export default ItemsTabContent;
