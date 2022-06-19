import Label from '@atoms/label';
import WorkingRequest from '@molecules/working-request';
import React from 'react';

import { IoIosLink } from 'react-icons/io';

function NewsConnect(props: any) {
	const { value, connect, clickHandlerid } = props;
	return (
		<div className="bg-white w-full p-5  rounded shadow-md">
			<Label
				value={value}
				classes={{
					root: `text-primary font-medium text-base font-sans tracking-tight border-b border-gray-750 pb-3 w-full text-base 2xl:text-lg`,
				}}
			/>
			<div className="pt-4 space-y-6 max-h-48 overflow-y-auto pr-3 mt-2">
				{connect?.map((v: any) => (
					<WorkingRequest
						key={connect.id}
						clickHandler={() => clickHandlerid(v?.id)}
						icon="hidden"
						avatarClass="w-9 h-9"
						namevalue={v?.first_name + ' ' + v?.last_name}
						Compvalue="Frizty Studio LTD"
						btnvalue="Connect"
						btnClass="text-gray-900 py-1 capitalize bg-white border border-gray-250 border-solid"
						iconEnd={<IoIosLink className="text-gray-900 text-sm mr-1" />}
					/>
				))}
			</div>

			{/* connect people part */}
			<div className="flex flex-wrap 2xl:flex-nowrap bg-white pb-3.5 items-center justify-center">
				<div className="flex items-center w-[65%] mb-4 lg:justify-center 2xl:justify-start 2xl:flex-row lg:flex-col">
					<div className="flex-shrink-0">
						<img
							src="/images/feeds/connect-img1.png"
							alt="image"
						/>
					</div>
					<div className=" sm:ml-3 sm:pt-0 xl:ml-3.5 pt-1">
						<h4 className="text-base 2xl:text-lg font-sans font-semibold custom-newsfeed-t-color">
							Jon Cochran
						</h4>
						<p className="text-base  font-sans custom-newsfeed-subt-color">
							Product Designer
						</p>
					</div>
				</div>

				<div className="flex items-center rounded bg-white border custom-border-color xl:pr-5 px-3.5 py-2 ">
					<button className=" custom-newsfeed-subt-color font-sans text-base 2xl:text-lg">
						{' '}
						Connect{' '}
					</button>

					<img
						className="ml-3 text-2xl "
						src="/images/feeds/connect-icon.png"
						alt="image"
					/>
				</div>
			</div>

			<div className="flex flex-wrap 2xl:flex-nowrap bg-white pb-3.5 items-center justify-center">
				<div className="flex items-center w-[65%] mb-4 lg:justify-center 2xl:justify-start 2xl:flex-row lg:flex-col">
					<div className="flex-shrink-0">
						<img
							src="/images/feeds/connect-img2.png"
							alt="image"
						/>
					</div>
					<div className="sm:ml-0 xl:ml-3.5 pt-1">
						<h4 className="text-base 2xl:text-lg font-sans font-semibold custom-newsfeed-t-color">
							Alex Pilania
						</h4>
						<p className="text-base  font-sans custom-newsfeed-subt-color">
							3D Designer
						</p>
					</div>
				</div>
				<div className="flex items-center rounded bg-white border custom-border-color xl:pr-5 px-3.5 py-2 ">
					<button className=" custom-newsfeed-subt-color font-sans text-base 2xl:text-lg">
						{' '}
						Connect{' '}
					</button>
					<img
						className="ml-3 text-2xl "
						src="/images/feeds/connect-icon.png"
						alt="image"
					/>
				</div>
			</div>

			<div className="flex flex-wrap 2xl:flex-nowrap bg-white pb-3.5 items-center justify-center">
				<div className="flex items-center w-[65%] mb-4 lg:justify-center 2xl:justify-start 2xl:flex-row lg:flex-col">
					<div className="flex-shrink-0">
						<img
							src="/images/feeds/connect-img3.png"
							alt="image"
						/>
					</div>
					<div className="sm:ml-0 xl:ml-3.5 pt-1">
						<h4 className="text-base 2xl:text-lg font-sans font-semibold custom-newsfeed-t-color">
							Hana Lalardo
						</h4>
						<p className="text-base  font-sans custom-newsfeed-subt-color">Architect</p>
					</div>
				</div>
				<div className="flex items-center rounded bg-white border custom-border-color xl:pr-5 px-3.5 py-2 ">
					<button className=" custom-newsfeed-subt-color font-sans text-base 2xl:text-lg">
						{' '}
						Connect{' '}
					</button>
					<img
						className="ml-3 text-2xl "
						src="/images/feeds/connect-icon.png "
						alt="image"
					/>
				</div>
			</div>
			<div className="flex flex-wrap 2xl:flex-nowrap bg-white pb-3.5 items-center justify-center">
				<div className="flex items-center w-[65%] mb-4 lg:justify-center 2xl:justify-start 2xl:flex-row lg:flex-col">
					<div className="flex-shrink-0">
						<img
							src="/images/feeds/connect-img4.png"
							alt="image"
						/>
					</div>
					<div className="sm:ml-0 xl:ml-3.5 pt-1">
						<h4 className="text-base 2xl:text-lg font-sans font-semibold custom-newsfeed-t-color">
							Omar Latori
						</h4>
						<p className="text-base  font-sans custom-newsfeed-subt-color">Manager</p>
					</div>
				</div>
				<div className="flex items-center rounded bg-white border custom-border-color xl:pr-5 px-3.5 py-2 ">
					<button className=" custom-newsfeed-subt-color font-sans text-base 2xl:text-lg">
						{' '}
						Connect{' '}
					</button>
					<img
						className="ml-3 text-2xl "
						src="/images/feeds/connect-icon.png"
						alt="image"
					/>
				</div>
			</div>
		</div>
	);
}

NewsConnect.defaultProps = {};

export default NewsConnect;
