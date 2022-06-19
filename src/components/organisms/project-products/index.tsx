import Label from '@atoms/label';
// import ProductCard from "@organisms/product-card"; this component may be unused and should be removed from organisms
import ProjectCarouselContent from '@organisms/project-small-carousel';
import { useRouter } from 'next/router';
import React from 'react';
import LoginPopup from '@organisms/login-popup';
import SignUpPopup from '@organisms/signup-popup';

interface ProjectProductsProps {
	products: any;
	projectData?: any;
	gotoProductDetails?: any;
	hideLabel?: boolean;
	productThreeDView?: boolean;
	initialVideoFor?: 'project' | 'product';
	hideNetwork?: boolean;
	video?: any;
	type?: 'project' | 'product';
}
const ProjectProducts: React.FC<ProjectProductsProps> = (props) => {
	const { products, gotoProductDetails, projectData, video, type } = props;
	// console.log(products);

	const router = useRouter();

	return (
		<div>
			<div className="flex">
				{props.hideLabel && (
					<Label
						value="Products"
						classes={{
							root: 'texl-lg 2xl:text-2xl border-b-2 font-sans font-semibold border-gray-800 pr-8 pb-1',
						}}
					/>
				)}
			</div>

			{products.length > 1 ? (
				<div
					// className={
					//   product.length > 1
					//     ? "grid grid-cols-2 gap-5 mt-6 h-80 overflow-y-auto pr-4"
					//     : "grid grid-cols-1 gap-5 mt-6 h-80 overflow-y-auto pr-4"
					// }
					className={
						'grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 max-h-[671px] overflow-y-auto pr-4 '
					}
				>
					{products.map((product: any, index: number) => (
						<ProjectCarouselContent
							key={index}
							productThreeDView={true}
							threeDScript={product?.three_d_script}
							iconContanerClass="border-none flex items-center justify-center text-lg rounded-full w-6 h-6"
							numbering="hidden"
							imageSettingIcon="2xl:w-6 2xl:h-6 w-5 h-5"
							imagesIdeezaIcon="2xl:w-7 2xl:h-7 w-5 h-5"
							imagesIdeezaEye="2xl:w-8 2xl:h-8 w-5 h-5"
							mainIconClass="flex items-center"
							lableIconClass={{
								root: 'font-extrabold mr-1 text-xl pl-2 text-gray-300',
							}}
							video={product?.product_videos[0]?.video}
							data={product}
							carouselHeight=" relative"
							titleClass="text-lg"
							nameClass="text-md "
							avatarClass="w-8 h-8"
							gotoProductDetails={gotoProductDetails} //{gotoProductDetails} w-[75%]
							topIconContainer="flex absolute hover:z-[100] top-[30px] right-[10px] w-[90%] 2.5xl:w-[75%] 3xl:w-[200px] max-w-[220px]  py-[3px] px-[13px] rounded-full project-icon-bg-custom justify-between "
							bottomIconContainer="flex absolute bottom-0  2xl:bottom-[10px] 2.5xl:bottom-[20px] right-0 2xl:right-0 3xl:right-[10px]  2xl:max-w-full max-w-[210px] 3xl:min-w-[204px]  rounded-full project-icon-bg-custom justify-between 2xl:px-[11px] 2xl:py-[6px]"
							handleProjectClick={() => {
								if (type && type === 'project') {
									if (projectData) {
										router.push(`/user/dashboard/product/${product?.id}`);
									}
								}
							}}
							showWorkSpaceInsteadOfImageOrVideo={true}
							initialVideoFor={'project'}
							projectData={props.projectData}
							showContentCreator={false}
							threeDHeight={250}
							hideNetwork={true}
							showTopIcons={false}
						/>
					))}
				</div>
			) : products.length === 1 ? (
				<div className={''}>
					<ProjectCarouselContent
						productThreeDView={true}
						threeDScript={products[0]?.three_d_script}
						iconContanerClass="border-none flex items-center justify-center text-lg rounded-full w-7 h-7"
						numbering="hidden"
						imageSettingIcon="2xl:w-6 2xl:h-6 w-5 h-5"
						imagesIdeezaIcon="2xl:w-7 2xl:h-7 w-5 h-5 "
						imagesIdeezaEye="2xl:w-8 2xl:h-8 w-5 h-5"
						mainIconClass="flex items-center"
						lableIconClass={{
							root: 'font-extrabold mr-1 text-xl pl-2 text-gray-300',
						}}
						data={products[0]}
						video={video}
						projectData={products[0]}
						carouselHeight=" relative"
						titleClass="text-lg"
						nameClass="text-md "
						avatarClass="w-8 h-8"
						gotoProductDetails={gotoProductDetails} //{gotoProductDetails}
						topIconContainer="flex hover:z-[10000] absolute top-[30px] right-0 sm:right-[10px] pl-1   3xl:max-w-[300px] w-full sm:w-[320px] px-3 p-2 md:p-2 2xl:py-3 xl:px-5 rounded-full project-icon-bg-custom justify-around "
						bottomIconContainer="flex absolute bottom-4 2xl:bottom-[20px] 2.5xl:bottom-[20px] right-0 lg:right-[20px]   2xl:w-[80%] 3xl:max-w-[260px] sm:max-w-[270px] max-w-full rounded-full project-icon-bg-custom justify-between px-[11px] py-[6px]"
						// bottomIconContainer="flex absolute bottom-[25px] xl:bottom-[50px] 2xl:bottom-[40px] right-7 lg:right-[15%] pl-1 w-[80%] lg:w-[50%] rounded-full project-icon-bg-custom justify-around py-[5px] 2xl:py-0"
						handleProjectClick={() => {
							if (type && type === 'project') {
								if (projectData) {
									router.push(`/user/dashboard/product/${products[0]?.id}`);
								}
							}
						}}
						showWorkSpaceInsteadOfImageOrVideo={true}
						initialVideoFor={'project'}
						showContentCreator={false}
						hideNetwork={true}
					/>

					{/* <ProjectCarouselContent
						productThreeDView={props.productThreeDView}
						threeDScript={products[0]?.three_d_script}
						iconContanerClass="border-none flex items-center justify-center text-lg rounded-full w-7 h-7"
						numbering="hidden"
						imageSettingIcon="2xl:w-6 2xl:h-6 w-5 h-5"
						imagesIdeezaIcon="2xl:w-7 2xl:h-7 w-5 h-5"
						imagesIdeezaEye="2xl:w-8 2xl:h-8 w-5 h-5"
						mainIconClass="flex items-center"
						lableIconClass={{
							root: 'font-extrabold mr-1 text-xl pl-2 text-gray-300',
						}}
						video={video}
						data={products[0]}
						carouselHeight="h-42 pb-3 relative"
						titleClass="text-lg"
						nameClass="text-md "
						avatarClass="w-8 h-8"
						gotoProductDetails={gotoProductDetails}
						hideBottomIcons={false}
						showTopIcons={true}
						topIconContainer="flex absolute top-[30px] right-[30px] pl-1 w-[45%] px-3 p-2 md:p-2 2xl:py-3 xl:px-5 rounded-full project-icon-bg-custom justify-between "
						handleProjectClick={() => {
							if (type && type === 'project') {
								if (projectData) {
									router.push(`/user/dashboard/product/${products[0]?.id}`);
								}
							}
						}}
						showWorkSpaceInsteadOfImageOrVideo={true}
						initialVideoFor={props.initialVideoFor}
						projectData={props.projectData}
						showContentCreator={true}
						showUserDetails={false}
						hideNetwork={props.hideNetwork}
						type={type}
					/> */}
				</div>
			) : (
				<div>
					<h1>No products!</h1>
				</div>
			)}

			{/* <div className="grid grid-cols-2 gap-5 mt-6 h-80 overflow-y-auto pr-4"> */}

			<LoginPopup />
			<SignUpPopup />
		</div>
	);
};
export default ProjectProducts;
