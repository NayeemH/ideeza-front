import AvatarLabels from '@molecules/avatar-label';
import ImgCard from '@organisms/image-card';
import React from 'react';
import { useRouter } from 'next/router';
// import { AvatarLabels } from "molecules";
// import { ImgCard } from "..";
import { AiFillEye } from 'react-icons/ai';
// function ProductCard({ data }) {
const ProductCard: React.FC<any> = (props) => {
	const data = props.data;
	const router = useRouter();
	const gotoProductDetails = (id: any) => {
		const projectId =
			typeof props.projectData !== 'undefined' && props.projectData !== null
				? props.projectData.id
				: '';
		router.push(`/user/dashboard/project/${projectId}/product/${id}?project_id=${projectId}`);
	};

	return (
		<div className="flex flex-col">
			<ImgCard
				onClick={() => gotoProductDetails(data.id)}
				carouselHeight="md:h-42 h-64"
				// carouselHeight=""
				imgClasses="rounded-md"
				iconComponent1={<AiFillEye className="text-white text-2xl" />}
				iconComponent2={
					<img
						src="/images/icon/ideeza_icon_white.png"
						alt="image"
					/>
				}
				iconComponent3={
					<img
						src="/images/icon/like_white_icon.png"
						alt="image"
					/>
				}
				iconContanerClass="bg-transparent mr-2"
				// iconValue1={data?.views || "40"}
				// iconValue2={data?.likes || "30"}
				// iconValue3={data?.likes || "10"}
				iconValue1={data.views}
				iconValue2={data.likes}
				iconValue3={data.dislikes}
				lableClass={{ root: 'text-sm text-white' }}
				iconsClass="flex sm:justify-end justify-center"
				imgSrc={data.image}
			/>
			<AvatarLabels
				avaterClasses="hidden"
				mainClasses="pt-1"
				mainClassesLabel="pl-0"
				title={data.name}
				subtitle={data.description}
				titleClasses="text-gray-700 pt-2 leading-4 font-medium tracking-tight text-base"
				subtitleClasses="text-gray-810 font-medium tracking-tight text-base"
				src=""
			/>
		</div>
	);
};

export default ProductCard;
