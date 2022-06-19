import React, { useEffect, useState } from 'react';
//import ShareNewsFeedPopup from "@organisms/Share-news-feed-popup";
import { useRouter } from 'next/router';
import ProductHeader from '@organisms/product-header';
import Loader from '@atoms/loader';
import { apiService } from '../../../../../utils/request';
//import CustomBlockly from "@organisms/blockly/index";
import ThreeJs from '@organisms/threejs';
import { FaChevronLeft } from 'react-icons/fa';
import ProjectGeneralSideBar from '@organisms/project-general-sidebar';
import Contributors from '@organisms/contributor-project-general';
import { setBlock, setCustomizeMenu } from '@layouts/private/sidebar/reducer';
import { useDetectSelfUser, useAppDispatch } from 'app/hooks';
import { getQueryParam } from 'utils/utils';
import NetworkProperties from '@molecules/network-properties';
import Button from '@atoms/button';
import { toast } from 'react-toastify';
import CreateComponentWorkspace from '@features/blockly/Shared/createComponentWorkspace';

const Product: React.FC<any> = (props) => {
	const dispatch = useAppDispatch();
	const history = useRouter();
	const [activeView, setActiveView] = useState<
		'cover' | 'general' | 'app' | 'network' | 'code' | 'electronic'
	>('electronic');
	// const [externalSharePopupOpen, setExternalSharePopupOpen] = useState(false);
	const [blocklyCodeString, setBlocklyCodeString] = useState('');
	const [editorScript, setEditorScript] = useState('');
	// const user_id: number = Number(history.query.id);
	// const [threeDData, setThreeDData] = useState({});
	const [showProjectSideBar, setShowProjectSideBar] = useState(false);
	const [electronicThreeDData, setElectronicThreeDData] = useState({});
	const [coverThreeDData, setCoverThreeDData] = useState({});
	const [blocklyComponentId, setBlocklyComponentId] = useState('');
	const [coverComponentId, setCoverComponentId] = useState<any>('');
	const [electronicComponentId, setElectronicComponentId] = useState<any>('');
	const [name, setName] = useState('');

	// const project_id = history.query.project_id;

	const handleProjectSidebar = () => setShowProjectSideBar(!showProjectSideBar);
	const handleActiveView = (e: any) => setActiveView(e);

	// const toggleShare = (e: any) => {
	//   if (e === "external_share") {
	//     setExternalSharePopupOpen(!externalSharePopupOpen);
	//     return false;
	//   }

	//   setData(e);
	//   return setShare(!share);
	// };
	const [productData, setProductData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const isSelfUser = useDetectSelfUser(productData?.user?.id);

	const getProductData = async () => {
		if (typeof props.productId !== 'undefined') {
			await apiService(
				{
					method: 'get',
					url: `product/${props.productId}/`,
					token: true,
				},
				(res: any, error: any) => {
					if (res) {
						const { data } = res;
						setProductData(data);
						setName(data?.name);

						/*const component =
				data.components && data.components.length > 0
					? data.components[0]
					: null;
			if (component) {
				setActiveView(component?.component_type.toLowerCase());

				if (
					component?.component_type === "COVER" ||
					component?.component_type === "ELECTRONIC"
				) {
					setThreeDData(component?.three_d_script);
				}

				if (component?.component_type === "CODE") {
					setBlocklyCodeString(component?.editor_script);
				}
			}*/
						console.log('get Product Data: ', data);
						if (data.components && data.components.length > 0) {
							const components = data.components;
							for (let i = 0; i < data.components.length; i++) {
								if (components[i].component_type === 'CODE') {
									setBlocklyCodeString(components[i].editor_script);
									setBlocklyComponentId(components[i].id);
									setActiveView('code');
									console.log('blocklycodestring', components[i].editor_script);
								}

								if (components[i].component_type === 'COVER') {
									setCoverThreeDData(components[i].three_d_file);
									setCoverComponentId(components[i].id);
									setActiveView('cover');
								}

								if (components[i].component_type === 'ELECTRONIC') {
									setElectronicThreeDData(
										JSON.parse(components[i].three_d_script)
									);
									setElectronicComponentId(components[i].id);
									setActiveView('electronic');
								}
							}
						}

						setLoading(false);
						setLoaded(true);

						setActiveView(getQueryParam('view_tab'));
						return;
					}

					if (error.response) {
						if (error.response.status === 404) {
							setNotFound(true);
						}
					}

					setLoading(false);
					setLoaded(true);
				}
			);
		}
	};

	//const current_url = process.env.NEXT_PUBLIC_APP_URL + history.asPath;

	//const [shareContentText, setShareContentText] = useState("");

	/* const shareToNewsFeed = async (content: any) => {
	await apiService(
	  {
		method: "post",
		url: `/project/${project_id}/share/`,
		data: {
		  text: content,
		  project: project_id,
		},
		token: true,
	  },
	  (res: any, error: any) => {
		if (res) {
		  toast.success("Shared successfully!");
		  setShareContentText("");
		  setShare(false);
		  return;
		}

		if (error.response && error.response.status === 400) {
		  toast.error("You have already shared this feed!");
		  setShareContentText("");
		  setShare(false);
		}
	  }
	);
  }; */

	const ContributorsPopup = () => {
		const [open, setOpen] = useState(false);

		return (
			<div className="cursor-pointer absolute md:top-2 md:right-5 ">
				<img
					src="/images/user_account_profile_avatar.svg"
					onClick={() => setOpen(!open)}
					alt=""
					srcSet=""
					className={(open ? 'animate-pulse' : '') + ' w-24 relative '}
				/>
				<div className=" absolute right-20">
					{open && (
						<Contributors
						// project_id={project_id}
						/>
					)}
				</div>
			</div>
		);
	};

	const saveProduct = async () => {
		if (name.toString().length > 235) {
			toast.error('The product name you entered is too long!');
			return;
		}

		await apiService(
			{
				method: 'patch',
				url: `/product/${productData?.id}/`,
				token: true,
				data: {
					name,
				},
			},
			async () => {
				if (blocklyComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${blocklyComponentId}/`,
							token: true,
							data: {
								editor_script: editorScript,
								component_type: 'CODE',
							},
						},
						() => {
							// nothing
						}
					);
				}

				if (electronicComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${electronicComponentId}/`,
							token: true,
							data: {
								three_d_script: JSON.stringify(electronicThreeDData),
								component_type: 'ELECTRONIC',
							},
						},
						() => {
							// nothing
						}
					);
				}

				if (coverComponentId !== '') {
					await apiService(
						{
							method: 'patch',
							url: `/component/${coverComponentId}/`,
							token: true,
							data: {
								three_d_script: JSON.stringify(coverThreeDData),
								component_type: 'COVER',
							},
						},
						() => {
							// nothing
						}
					);
				}

				toast.dismiss();
				toast.success('Product Saved Successfully!');
			}
		);
	};

	useEffect(() => {
		//alert(getQueryParam("view_tab"));
		getProductData();
	}, [props.productId]);

	useEffect(() => {
		if (activeView === 'network') {
			dispatch(setCustomizeMenu('product'));
			return;
		}

		if (activeView === 'cover') {
			dispatch(setCustomizeMenu('cover'));
			return;
		}
		if (activeView === 'electronic') {
			dispatch(setCustomizeMenu('electronics'));
			return;
		}
		if (activeView === 'code') {
			dispatch(setCustomizeMenu('blockly'));
			return;
		}

		dispatch(setCustomizeMenu('none'));
	}, [activeView]);

	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(setCustomizeMenu('none'));
			dispatch(setBlock([]));
		};
		history.events.on('routeChangeStart', handleRouteChange);
	}, []);

	useEffect(() => {
		// console.log("ELECTRONIC", electronicThreeDData);
		// console.log("COVER", electronicThreeDData);
		// console.log("CODE", blocklyCodeString);
	}, [electronicThreeDData, electronicThreeDData, blocklyCodeString]);

	if (notFound) {
		return <div>Product Not Found</div>;
	}

	return (
		<div className="relative pb-5 mt-16">
			{loading && !loaded ? (
				<div className="mt-56">
					<Loader isTransparentBg />
				</div>
			) : (
				<div
					className={`${
						loading ? 'bg-none ' : 'bg-white '
					}  shadow-lg py-4 rounded-md px-4`}
				>
					{!loading && loaded && (
						<>
							{/* <ShareNewsFeedPopup
              // toggleOpen={toggleShare}
              // shareToNewsFeed={shareToNewsFeed}
              // open={share}
              // social={invention}
              toggleOpen={toggleShare}
              shareToNewsFeed={(content: any) => shareToNewsFeed(content)}
              open={share}
              social={"invention"}
            /> */}
							<ProductHeader
								selfUser={isSelfUser}
								inputClass="hidden"
								state={'ss'}
								handleActiveView={handleActiveView}
								view={activeView}
								update={'ee'}
								customize={isSelfUser}
								productData={productData}
								productId={props.productId}
								// projectId={project_id}
								onReloadProduct={getProductData}
								nameEditDisabled={!isSelfUser}
								name={name}
								onChangeName={(e: any) => {
									setName(e.target.value);
								}}
							/>

							{activeView === 'electronic' && (
								<div
									className="mb-6"
									style={{ position: 'relative', height: 470 }}
								>
									<ThreeJs
										{...{
											editorFile: 21,
											toolbar: isSelfUser ? 'default' : 'none',
											viewFile: {
												electronic: electronicThreeDData,
											},
										}}
									/>
									<ContributorsPopup />
								</div>
							)}

							{activeView === 'code' && (
								<div
									className={`${
										activeView === 'code' ? 'opacity-100 z-10' : 'opacity-0'
									}`}
								>
									<div
										className="w-full"
										style={{ position: 'relative', height: 470 }}
									>
										{/* <CustomBlockly
                    xmlCode={(code: any) => setBlocklyCodeString(code)}
                    jsCode={(code: any) => console.warn(code)}
                    svgCode={(code: any) => console.warn(code)}
                    initialBlock={blocklyCodeString}
                    type={"component"}
                  /> */}

										<CreateComponentWorkspace
											editorScript={blocklyCodeString}
											onChangeXml={(code: any, partBlocks: any[]) => {
												setEditorScript(
													JSON.stringify({
														partBlocks,
														xmlData: code,
													})
												);
											}}
										/>
										<ContributorsPopup />
									</div>
								</div>
							)}

							{activeView === 'cover' && (
								<div
									className="mb-6"
									style={{ position: 'relative', height: 470 }}
								>
									<ThreeJs
										{...{
											editorFile: 22,
											toolbar: 'default',
											viewFile: {
												cover: coverThreeDData,
											},
										}}
									/>
									<ContributorsPopup />
								</div>
							)}

							{activeView === 'general' && (
								<div className="w-full border border-gray-225 mx-auto overflow-hidden relative">
									<div className="pr-[50px]">
										<div className="flex items-center h-full absolute top-0 right-0">
											<div
												className="bg-gray-600 px-2 py-4 rounded-l-2xl shadow cursor-pointer"
												onClick={handleProjectSidebar}
											>
												<FaChevronLeft
													color="white"
													fontSize="17"
												/>
											</div>
										</div>
										<div
											className={`projectRightSide  ${
												showProjectSideBar ? 'active-projectRightSide' : ''
											}`}
										>
											<ProjectGeneralSideBar
												handleLeftClose={handleProjectSidebar}
											/>
										</div>
										<div
											className="mb-6"
											style={{ position: 'relative', height: 470 }}
										>
											<ThreeJs
												{...{
													editorFile: 23,
													toolbar: 'default',
													viewFile: {
														electronic: electronicThreeDData,
														cover: coverThreeDData,
													},
												}}
											/>
											<ContributorsPopup />
										</div>
									</div>
								</div>
							)}

							{activeView === 'app' && (
								<div className="w-full border border-gray-225 mx-auto max-h-80vh overflow-hidden">
									<div className="h-96 w-full">
										<h2>app</h2>
									</div>
								</div>
							)}
							{activeView === 'network' && (
								<div className="w-full border border-gray-225 mx-auto max-h-80vh overflow-hidden">
									<div className="h-96 w-full">
										<h2>network</h2>
										<div className="grid grid-cols-5">
											<div
												className="h-96 mb-6 col-span-4"
												style={{ position: 'relative', height: '600px' }}
											>
												<ThreeJs
													{...{
														editorFile: 24,
														toolbar: 'default',
														viewFile: {
															electronic: electronicThreeDData,
															cover: coverThreeDData,
														},
													}}
												/>
												<ContributorsPopup />
											</div>
											<div className="h-full overflow-y-auto relative w-full -mt-10 ">
												<NetworkProperties />
											</div>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			)}

			{isSelfUser && (
				<div className="text-right">
					<Button
						value="Save"
						type="submit"
						//   TODO
						onClick={saveProduct}
						//   onClick={() => "goto"}
						classes={{
							root: `text-white bg-primary p-2 px-10 font-sans capitalize text-lg font-bld mt-5`,
						}}
						color="primary"
					/>
				</div>
			)}
		</div>
	);
};
export default Product;
