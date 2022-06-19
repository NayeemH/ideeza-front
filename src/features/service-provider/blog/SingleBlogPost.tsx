import Button from '@atoms/button';
import Label from '@atoms/label';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const SingleBlogPost = () => {
	return (
		<>
			<div className="flex justify-between">
				<Label
					value="Blog Post"
					className="text-2xl text-primary font-bold"
				/>
				<Button
					value={
						<>
							<AiOutlineArrowLeft className="bg-white text-sm md:text-lg rounded-full text-gray-600 md:mr-1 " />
							<span className="text-sm md:text-lg">Back</span>
						</>
					}
					onClick={() => Router.back()}
					className="bg-gray-400 text-sm md:text-lg text-white md:px-6"
				/>
			</div>
			<div className="bg-white rounded-md mt-3">
				<Image
					// src={blog?.image?.replace("devapi", "api")}
					src="/images/landing/blog-preview.png"
					width="100%"
					height="40%"
					className="thumb h-full"
					object-fit="cover"
					// srcSet=""
					alt="image"
					layout="responsive"
				/>
				<div className="md:p-10 p-4 pt-10">
					<div className="h-50vh overflow-y-auto 2xl:px-32 lg:px-10 px-3">
						<Label
							value="How Ideeza can make the world a better place"
							classes={{
								root: 'text-center mx-auto text-2xl md:text-5xl font-bold xl:w-1/2 md:w-3/4 font-normal pb-6 text-black-100 font-meri',
							}}
						/>
						<div
							className="text-start line-c1-height mx-auto fnt-s1-mid w-full font-semibold pb-6 txt-c9-color font-muli"
							dangerouslySetInnerHTML={{
								__html: 'Quisque ut tellus ac orci varius dignissim nec non orci. Fusce tincidunt molestie facilisis.',
							}}
							// dangerouslySetInnerHTML={{ __html: blog.description }}
						></div>
						<Label
							// value={blog?.title}
							value=" Quisque ut tellus ac orci varius dignissim nec non orci. Fusce tincidunt molestie facilisis. Donec 
              nec euismod dui, ac blandit justo. Sed arcu orci, porttitor sit amet metus et, fringilla aliquet elit. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu justo vitae est vestibulum 
              pulvinar. Phasellus tempor vestibulum dui. Proin tincidunt arcu quis quam suscipit iaculis. Nam 
              odio nunc, pharetra ac malesuada sed, sagittis id elit. Integer convallis leo id auctor faucibus."
							classes={{
								root: 'text-start line-c1-height mx-auto fnt-s1-mid w-full font-semibold pb-6 txt-c9-color font-muli',
							}}
						/>
					</div>
					<div className="text-center mt-2">
						<Button
							className=" shadow-none fnt-small1 py-2 font-sans font-semibold capitalize px-6 bg-primary"
							value="Publish"
							type="submit"
							color="primary"
							variant="contained"
							// onClick={() => dispatch(createBlogPostAsync(blog))}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleBlogPost;
