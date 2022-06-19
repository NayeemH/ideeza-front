import Loader from '@atoms/loader';
import { MenuItem, Select } from '@mui/material';
import ImgCard from '@organisms/image-card';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/router';

function TabPublic(props: any) {
	const { data, loader } = props;
	const router = useRouter();

	const goToProjectDetails = (id: any) => {
		router.push(`/user/dashboard/project/${id}`);
	};

	const gotoProductDetails = (project: any) => {
		if (project.products.length > 0) {
			const product = project.products[0];

			router.push({
				pathname: `${router.pathname}/project-details/products/${product.id}`,
			});
		}
	};

	return (
		<>
			<Select
				// value={age}
				// onChange={handleChange}
				displayEmpty
				inputProps={{ 'aria-label': 'Without label' }}
			>
				<MenuItem value="owner">Owner</MenuItem>
				<MenuItem value="partOfTeam">Part of the team</MenuItem>
			</Select>
			<div className="grid md:grid-cols-3 gap-3 mt-12 relative">
				{loader ? (
					<Loader type="relative" />
				) : Array.isArray(data) && data.length > 0 ? (
					data.map((item) => (
						<ImgCard
							key={item.id}
							onClick={() => {
								if (item.products.length > 0) {
									goToProjectDetails(item.id);
								} else {
									gotoProductDetails(item);
								}
							}}
							carouselHeight="h-72"
							imgClasses="rounded-xl"
							iconComponent1={<AiFillEye className="text-white text-2xl" />}
							iconComponent2={
								<img
									src="/assets/images/ideeza_icon_white.png"
									alt=""
								/>
							}
							iconComponent3={
								<img
									src="/assets/images/like_white_icon.png"
									alt=""
								/>
							}
							iconContanerClass="bg-transparent mr-2"
							iconValue1={item.views}
							iconValue2={item.dislikes}
							iconValue3={item.likes}
							mainIconClass="flex items-center"
							lableClass={{ root: 'sm:text-md  text-xl text-white' }}
							iconsClass="flex sm:justify-end justify-center space-x-5 pr-2"
							imgSrc={item.image}
						/>
					))
				) : (
					<p>No data found!</p>
				)}
			</div>
		</>
	);
}

export default TabPublic;
