import Button from '@atoms/button';
import { useRouter } from 'next/router';
import React from 'react';
import SingleCollection from '../single-collection';

const Collections = () => {
	const router = useRouter();
	return (
		<>
			<div className="hidden xl:block">
				<div className="grid grid-cols-12 xl:divide-x lg:my-[30px] ">
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={1} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={2} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={3} />
					</div>
				</div>
				<div className="grid grid-cols-12 xl:divide-x lg:my-[30px]">
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={4} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={5} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={6} />
					</div>
				</div>
				<div className="grid grid-cols-12 xl:divide-x lg:my-[30px]">
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={7} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={8} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={9} />
					</div>
				</div>
				<div className="grid grid-cols-12 xl:divide-x lg:my-[30px]">
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px]">
						<SingleCollection id={10} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={11} />
					</div>
					<div className="col-span-4 2xl:px-[70px] lg:px-[30px] ">
						<SingleCollection id={12} />
					</div>
				</div>
			</div>
			<div className="xl:hidden">
				<div className="grid grid-cols-12 lg:my-[30px] ">
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={1} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={2} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={3} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={4} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={5} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={6} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={7} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={8} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={9} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={10} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={11} />
					</div>
					<div className="lg:col-span-6 col-span-12 md:px-[30px] ">
						<SingleCollection id={12} />
					</div>
				</div>
			</div>

			<div className="w-full flex justify-center pt-[30px] mb-10 lg:mb-[0px]">
				<Button
					onClick={() => router.push('/nft-market-ranking')}
					value="Go To Rankings"
					className="text-white text-base 2xl:text-[18px] shadow-none rounded-[5px] bg-primary capitalize px-[10px] py-[10px] lg:px-[30px] lg:py-[15px]"
					color="primary"
				/>
			</div>
		</>
	);
};

export default Collections;
