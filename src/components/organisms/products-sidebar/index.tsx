import OnHoverPlayVideo from '@molecules/on-hover-play';
import React, { useEffect, useState } from 'react';

import { useThrottle } from 'utils/utils';
import { ApiDataType, apiService } from '../../../utils/request';

export default function ProductsSidebar() {
	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<any[]>([]);
	const [isInitPageRender, setIsInitPageRender] = useState<boolean>(true);

	const throttleSearch = useThrottle(search, 700);

	useEffect(() => {
		if (isInitPageRender) {
			getProducts();
			setIsInitPageRender(false);
		}
	}, []);

	useEffect(() => {
		if (!isInitPageRender) {
			getProducts();
		}
	}, [throttleSearch]);

	const getProducts = async () => {
		const params = `?count=10${search ? `&search=${search}` : ''}`;
		let result: any[] = [];
		setLoading(true);

		const apiData: ApiDataType = {
			method: 'get',
			url: `product/${params}`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) result = res?.data?.results;
		});
		setProducts(result);
		setLoading(false);
	};
	const getDefaultVideo = (product: any) => {
		let __video = null;

		if (product?.product_videos && product?.product_videos?.length > 0) {
			product?.product_videos.forEach((video: any) => {
				if (video?.is_default) {
					__video = video?.video;
				}
			});
		}

		return __video;
	};

	const getDefaultImage = (product: any) => {
		let __image = '/images/placeholder.jpg';

		if (product?.product_images && product?.product_images?.length > 0) {
			product?.product_images.forEach((image: any) => {
				if (image?.is_default) {
					__image = image?.image;
				}
			});
		}

		return __image;
	};

	return (
		<div>
			<div className="border-t pt-4 mb-6">
				<input
					className="form-input search bg-gray-100"
					placeholder="Search"
					onChange={(e: any) => setSearch(e.target.value)}
				/>
			</div>
			<div
				className="w-full custom-treeview"
				id="SideBar-Blockly"
			>
				{loading && <div>Loading</div>}
				{/* <Button
          value="Add new part"
          className="text-[14px] text-white bg-primary px-[19px] pt-[6px] pb-[7px]"
        /> */}

				{products.map((product, index) => {
					const defaultImage = getDefaultImage(product);
					const defaultVideo = getDefaultVideo(product);
					return (
						<div
							key={index}
							className="cursor-pointer mb-4"
							// onClick={() => {
							//   selectedBlock(item ?? {});
							//   toggleBlockMenu();
							// }}
						>
							<div className={'mb-7'}>
								<b>{product?.name}</b>
								{product?.product_videos ? (
									<div style={{ textAlign: 'center' }}>
										<OnHoverPlayVideo
											poster={
												defaultImage
													? defaultImage
													: '/images/placeholder.jpg'
											}
											src={
												defaultVideo
													? defaultVideo
													: '/images/placeholder.jpg'
											} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
										/>
									</div>
								) : (
									<div style={{ textAlign: 'center' }}>
										<img
											src={
												defaultImage
													? defaultImage
													: '/images/placeholder.jpg'
											}
											alt="Block Image"
											className="hover:scale-y-125 hover:scale-x-110 hover:shadow-xl transition-all ease-in delay-150 h-[120px] 2xl:h-[150px] object-cover scale-y-1 scale-x-1 w-full"
											style={{ display: 'inline-block' }}
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
