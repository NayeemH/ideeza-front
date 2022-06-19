import React, { FC, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from '@atoms/modal';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	closeProgressPopup,
	closeAskingToLoginPopup,
	closeLoginSignUpPopup,
} from 'reducers/loginSignUpPromptPopup';
import { openLoginPopup } from 'reducers/login';
import Button from '@atoms/button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { openSignUpPopup } from 'reducers/signup';
import { apiService } from 'utils/request';
import ProjectProducts from '@organisms/project-products';

// import Button from "@mui/material/Button";

const ProgressPopup: FC = () => {
	const dispatch = useAppDispatch();
	const { progressPopup } = useAppSelector((state) => state.loginSignUpPromptPopup);
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0;
				}
				const diff = Math.random() * 10;
				return Math.min(oldProgress + diff, 100);
			});
		}, 200);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div>
			<Modal
				width="md"
				close={() => dispatch(closeProgressPopup())}
				header={
					<div className="flex justify-end md:-mt-3 md:-mr-3 pb-2">
						<IoClose
							className="text-red-250 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={() => dispatch(closeProgressPopup())}
						/>
					</div>
				}
				content={
					<div className="space-y-2 pt-2 ">
						<div className="text-center text-[#000000] mb-8 text-base 2xl:text-xl">
							You are not logged in but you can see your idea in a while
						</div>
						<Box sx={{ width: '100%' }}>
							<LinearProgress
								variant="determinate"
								value={progress}
								sx={{
									borderRadius: '23px',
									height: '30px',
									backgroundColor: '#D4D1E2',
								}}
							/>
						</Box>

						<div style={{ textAlign: 'center' }}>
							<Button
								type="submit"
								value="Log in"
								className="bg-primary text-white transform-none text-base 2xl:text-xl py-2 mt-8"
								color={'primary'}
								size="medium"
								// variant={"outlined"}
							/>
						</div>
					</div>
				}
				actions={<></>}
				open={progressPopup}
			/>
		</div>
	);
};

const AskingToLoginPopup: any = ({ searchText }: any) => {
	const dispatch = useAppDispatch();
	const { askingToLoginPopup } = useAppSelector((state) => state.loginSignUpPromptPopup);
	const [searchResult, setSearchResult] = React.useState<{
		project: any;
		products: any[];
	}>({
		project: null,
		products: [],
	});
	const [videoData, setVideoData] = useState<any>([]);

	const openLoginModal = () => {
		dispatch(closeAskingToLoginPopup());
		dispatch(openLoginPopup({ ref: '' }));
	};

	useEffect(() => {
		getProject();
	}, [searchText]);

	const getProject = async () => {
		apiService(
			{
				method: 'get',
				url: `/project/search/?q=${searchText}`,
				token: true,
			},
			(res: any) => {
				if (res) {
					setSearchResult({
						project: res.data.project,
						products: res.data.products,
					});
					apiService(
						{
							method: 'get',
							url: `/project/video/?project__id=${res.data.project.id}`,
							token: true,
						},
						(res: any) => {
							if (res) {
								setVideoData(res?.data?.results);
							}
						}
					);
				}
			}
		);
	};

	return (
		<div>
			<Modal
				width="md"
				close={() => dispatch(closeAskingToLoginPopup())}
				dialogContentContainerClass="overflow-hidden"
				header={
					<div className="flex justify-end md:-mt-3 md:-mr-3 pb-2">
						<IoClose
							className="text-red-500 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={() => dispatch(closeAskingToLoginPopup())}
						/>
					</div>
				}
				content={
					<div className="space-y-2 pt-2">
						{searchResult?.project ? (
							<div>
								{/* <img
                src={"/images/car.png"}
                style={{ width: "100%" }}
                alt="car image"
              /> */}
								<ProjectProducts
									hideLabel={false}
									products={
										searchResult &&
										searchResult?.products &&
										searchResult?.products?.length > 0
											? new Array(1).fill(searchResult?.products[0])
											: []
									}
									video={videoData[0]?.video}
									projectData={searchResult}
									initialVideoFor="project"
									hideNetwork={true}
								/>
							</div>
						) : (
							<h2 className="text-center text-[20px] text-[#000000] leading-[36px] font-semibold">
								Your search doesnot matches your results
							</h2>
						)}
						<p className=" text-base lg:text-[28px] text-[#000000] leading-[36px] text-center font-semibold">
							<b
								className="pl-2 text-primary cursor-pointer pr-2"
								style={{ cursor: 'pointer', textDecoration: 'underline' }}
								onClick={() => openLoginModal()}
							>
								Log in
							</b>
							{'  '}
							if you want to share, modify or produce your brilliant idea.
						</p>
					</div>
				}
				actions={<></>}
				open={askingToLoginPopup}
			/>
		</div>
	);
};

const LoginSignUpPopup: FC = () => {
	const dispatch = useAppDispatch();
	const { loginSignUpPopup } = useAppSelector((state) => state.loginSignUpPromptPopup);

	const openLoginModal = () => {
		dispatch(closeAskingToLoginPopup());
		dispatch(openLoginPopup({ ref: '' }));
	};

	const openRegistrationModal = () => {
		dispatch(closeAskingToLoginPopup());
		dispatch(openSignUpPopup());
	};

	return (
		<div>
			<Modal
				width="md"
				close={() => dispatch(closeLoginSignUpPopup())}
				header={
					<div className="flex justify-end md:-mt-3 md:-mr-3 pb-2">
						<IoClose
							className="text-red-500 text-3xl cursor-pointer"
							// onClick={toggleOpen}
							onClick={() => dispatch(closeLoginSignUpPopup())}
						/>
					</div>
				}
				content={
					<div className="space-y-2 pt-2">
						<div className="text-center text-base lg:leading-[50px] lg:text-[30px] text-[#000000] font-semibold ">
							You can realise another innovative idea in 45 minutes.{' '}
							<span className="inline-block md:inline font-normal md:font-semibold">
								Or you can log in to keep innovate!
							</span>
						</div>

						<div className=" flex justify-center">
							<Button
								type="submit"
								value="Log in"
								className="bg-primary text-white transform-none shadow-none text-base 2xl:text-xl md:py-2 py-1 mt-8 md:w-2/6 w-6/12 rounded-[28px] "
								color={'primary'}
								size="medium"
								onClick={() => openLoginModal()}
								// variant={"outlined"}
							/>
						</div>

						<div className=" flex justify-center">
							<Button
								type="submit"
								value="Sign Up"
								className="bg-white text-primary transform-none text-base 2xl:text-xl md:py-2 py-1 mt-0 md:w-2/6 w-6/12 rounded-[28px]"
								color={'primary'}
								size="medium"
								variant={'outlined'}
								onClick={() => openRegistrationModal()}
							/>
						</div>
					</div>
				}
				actions={<></>}
				open={loginSignUpPopup}
			/>
		</div>
	);
};

export { ProgressPopup, AskingToLoginPopup, LoginSignUpPopup };
