import Modal from '@atoms/modal';
import Label from '@atoms/label';
import Button from '@atoms/button';
import Steppers from '@molecules/steppers';
import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import UiFormHelperText from '@atoms/ui-form-helper-text';
import { Fade, FormControlLabel, FormHelperText, Switch } from '@mui/material';
// import { format, isValid } from 'date-fns';
// import { DatePicker, LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// Starts: NFT Imports ---------------------
// import { ethers } from 'ethers';
// // import AuctionArtifact from '@features/blockchain/artifacts/Auction.json'
// import AuctionManagerArtifact from '@features/blockchain/artifacts/AuctionManager.json';
// import NFTArtifact from '@features/blockchain/artifacts/NFT.json';
import {
	createProductFlow,
	createProjectFlow,
	IProjectCreateFlowData,
} from '@features/user/project/create/utils';
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BiLink } from 'react-icons/bi';
import { getTextExcerpt } from 'utils/utils';
import { IMAGE_PLACEHOLDER } from 'enums/common';
import OnHoverPlayVideo from '@molecules/on-hover-play';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { SwitchProps } from '@mui/material/Switch';

import { GiCycle } from 'react-icons/gi';
// Ends: NFT Imports ---------------------

// Starts: NFT Env ---------------------
// const NFT_ADDRESS: any = process.env.NFT_ADDRESS; // NFT contract address
// const AUCTIONMANAGER_ADDRESS: any = process.env.AUCTION_MANAGER; // AuctionManager contract address
// Ends: NFT Env ---------------------

export const IOSSwitch = styled((props: SwitchProps) => (
	<Switch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,

	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			background: '#ff09d0',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#ff09d0',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color:
				theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

const CreateProjectPopupSell = (props: any) => {
	const {
		open,
		close,
		name,
		is_visible,
		onChangeName,
		nameEdited,
		editor_script,
		onChangeNameEdited,
		video,
		snapshot,
		file,
		electronic,
		cover,
		onCreateSuccess,
		onCreateFailed,
		gEditorRef,
		// eEditorRef,
		// cEditorRef,
	} = props;

	const [step, setStep] = useState<number>(0);
	const router = useRouter();
	const {
		handleSubmit,
		watch,
		control,
		register,
		setValue,
		getValues,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);

	const chainOptions = [
		{ value: 'ethereum', name: 'Ethereum' },
		{ value: 'polygon', name: 'Polygon' },
	];
	const collectionOptions = [
		{ value: '', name: 'None' },
		{ value: 'coll1', name: 'My Collection 1' },
		{ value: 'coll2', name: 'My Collection 2' },
	];

	const [chain, setChain] = useState<any>('polygon');
	const [collection, setCollection] = useState<any>('');
	const [chainError, setChainError] = useState(false);
	const [collectionError, setCollectionError] = useState(false);
	const [initRender, setInitRender] = useState(true);
	const [video64, setVideo64] = useState<string>('');

	const project_id = router?.query?.project_id;
	const project_is_visible = router?.query?.is_visible;
	const [productCreateMode, setProductCreateMode] = useState(false);

	// Starts: NFT States ---------------------
	// const [myItems, setMyItems] = useState<any>([]); // Items owned by the user

	// const [provider, setProvider] = useState<any>({});
	// const [_nft, setNft] = useState<any>({});
	// const [_auctionManager, setAuctionManager] = useState<any>({});
	// const [signer, setSigner] = useState<any>({});
	// const [currentAddress, setCurrentAddress] = useState<any>({});
	// Ends: NFT States ---------------------

	const watchName = watch('name');
	const watchPrice = watch('price');
	const watchRoyalties = watch('royalties');

	const handleCreateProduct = async (data: any) => {
		if (data?.name.toString().length > 235) {
			toast.error('The project name you entered is too long!');
			return;
		}

		setLoading(true);
		// Starts Creating 3D script file -------------
		const gEditorScene: any = { ...gEditorRef?.current };
		let threeDScript;
		if (gEditorScene?.scene) {
			gEditorScene.scene.children = [...gEditorScene.scene.children]; // to fix array bug
			threeDScript = { ...gEditorScene.scene.toJSON(), file };
		}
		// Ends Creating 3D script file -------------

		const createData: any = {
			project_id,
			is_visible: project_is_visible,
			name: data.name,
			three_d_script: threeDScript,
			video,
			image: snapshot,
			editor_script,
			electronicThreeDData: electronic,
			coverThreeDData: cover,
		};
		// console.log('createData-------', createData)
		await createProductFlow(
			createData,
			false,
			async () => {
				toast.success('Product created successfully!');
				if (typeof onCreateSuccess === 'function') onCreateSuccess();
				setLoading(false);
				router.back();
				if (typeof close === 'function') close();
			},
			async (error?: any) => {
				toast.error('Error while creating project!');
				if (typeof onCreateFailed === 'function') onCreateFailed(error);
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		if (nameEdited) {
			setValue('name', name);
			if (onChangeNameEdited) {
				onChangeNameEdited(false);
			}
		}
		setInitRender(false);
	}, [nameEdited]);

	useEffect(() => {
		if (onChangeName) {
			onChangeName(watchName);
		}
		setError('name', {
			type: 'manual',
			message: !getValues('name')?.trim() ? 'Enter project name' : '',
		});
	}, [watchName]);

	useEffect(() => {
		if (!initRender) {
			setError('price', {
				type: 'manual',
				message: !getValues('price')?.trim() ? 'Enter project price' : '',
			});
		}
	}, [watchPrice]);

	useEffect(() => {
		if (!initRender) {
			setError('royalties', {
				type: 'manual',
				message: !getValues('royalties')?.trim() ? 'Enter project royalties' : '',
			});
		}
	}, [watchRoyalties]);

	useEffect(() => {
		if (!initRender) {
			setChainError(!chain ? true : false);
		}
	}, [chain]);

	useEffect(() => {
		if (!initRender) {
			setCollectionError(!collection ? true : false);
		}
	}, [collection]);

	useEffect(() => {
		if (video) getBase64Video(video);
	}, [video]);

	const getBase64Video = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const videoUrl: any = reader?.result;
			setVideo64(videoUrl);
		};
		reader.onerror = () => {
			// console.log('Error: ', error);
			setVideo64('');
		};
		return;
	};

	const onClickNext = () => {
		setError('name', {
			type: 'manual',
			message: !getValues('name')?.trim() ? 'Enter project name' : '',
		});
		if (!getValues('name')?.trim()) return;
		setStep((prev) => prev + 1);
	};

	const onClickNext2 = () => {
		setError('price', {
			type: 'manual',
			message: !getValues('price')?.trim() ? 'Enter project price' : '',
		});
		setError('royalties', {
			type: 'manual',
			message: !getValues('royalties')?.trim() ? 'Enter project royalties' : '',
		});
		if (!chain) setChainError(true);
		if (!collection) setCollectionError(true);

		if (!getValues('price')?.trim() || !getValues('royalties')?.trim() || !chain || !collection)
			return;
		setStep((prev) => prev + 1);
	};

	// Starts: NFT Functions ---------------------
	// const uploadToIPFS = async (formData: any) => {
	//   const { name, description, price } = formData
	//   if (!name || !description || !price) return
	//   /* first, upload to IPFS */
	//   const data = JSON.stringify({
	//       name, description, price
	//   })
	//   try {
	//       const added = await client.add(data)
	//       const url = `https://ipfs.infura.io/ipfs/${added.path}`
	//       /* after file is uploaded to IPFS, return the URL to use it in the transaction */
	//       return url
	//   } catch (error: any) {
	//       // console.log('Error uploading file: ', error)
	//       toast.error(error || 'Error on uploadToIPFS')
	//   }
	// }

	// async function createNft(data: any){
	//   const url = await uploadToIPFS(data)
	//   // console.log('1. uploadToIPFS Success------', url)
	//   const web3Modal = new Web3Modal()
	//   // console.log('2. Web3Modal------', web3Modal)
	//   let connection = null
	//   try {
	//       connection = await web3Modal.connect()
	//       // console.log('3.1. connection------success', connection)
	//   } catch (error: any) {
	//       // console.log('3.2. connection------failed', error)
	//       toast.error(error || 'Error on web3Modal Connect')
	//   }

	//   if(! connection) return
	//   const provider = new ethers.providers.Web3Provider(connection)
	//   // console.log('4. Provider ------success', provider)
	//   const signer = provider.getSigner()
	//   // console.log('5. signer ------success', signer)

	//   /* next, create the item */
	//   if(! formInput.price)  return toast.error('Please enter price')
	//   /* @ts-ignore */
	//   const price = ethers.utils.parseEther(formInput.price, 'ether');
	//   //  console.log('6. price ------success', price.toString())
	//   // console.log('00.7. marketplaceAddress ------NFTMarketplace.abi, ---signer', marketplaceAddress, NFTMarketplace.abi, signer)

	//   const contract = new ethers.Contract(
	//       marketplaceAddress,
	//       NFTMarketplace.abi,
	//       signer
	//   )
	//   // console.log('7. contract ------success', contract)

	//   // let listingPrice = null
	//   // try {
	//   //     listingPrice = await contract.getListingPrice()
	//   //     listingPrice = listingPrice.toString()
	//   //     // console.log('8.1. listingPrice------success', listingPrice)
	//   // } catch (error: any) {
	//   //     // console.log('8.2. listingPrice------error', error)
	//   //     toast.error(error || 'Error on getListingPrice')
	//   // }
	//   // if(!listingPrice) return

	//   let transaction = null
	//   try{
	//       // https://localhost:3000/tokens/1
	//       transaction = await contract.createToken("", url, price.toString(), 2); // tokenURI/product Uri, IPFS URI, price, royalties
	//       // console.log('9.1. contract.createToken------success', transaction)
	//   } catch (error: any) {
	//       // console.log('9.2. contract.createToken------error', error?.response)
	//       toast.error(error?.data?.message || 'Error while creating token')
	//   }

	//   if(! transaction) return
	//   try {
	//       await transaction.wait()
	//       // console.log('10.1 transaction.wait------success')
	//   } catch (error: any) {
	//       // console.log('10.2 transaction.wait------error', error)
	//       toast.error(error || 'Error while transaction.wait')
	//   }

	//   // console.log(transaction);
	//   // location.reload();
	// }
	// Ends: NFT Functions ---------------------

	const handleCreateProject = async (data: any) => {
		setLoading(true);

		const gEditorScene: any = { ...gEditorRef?.current };
		let threeDScript;
		if (gEditorScene?.scene) {
			gEditorScene.scene.children = [...gEditorScene.scene.children]; // to fix array bug
			threeDScript = { ...gEditorScene.scene.toJSON(), file };
		}

		const createData: IProjectCreateFlowData = {
			is_visible,
			name: data.name,
			description: data.description,
			three_d_script: threeDScript, //JSON.stringify(threeDScript),
			video,
			image: snapshot,
			editor_script,
			electronicThreeDData: electronic,
			coverThreeDData: cover,
			// nft data ---------
			chain,
			collection,
			price: data.price,
			royalties: data.royalties,
			tokenId: 5456,
		};
		// console.log('createData-------', createData)
		await createProjectFlow(createData, true, createSuccessCallback, createFailedCallback);
	};

	const createSuccessCallback = async () => {
		toast.success('Project created successfully!');
		if (typeof onCreateSuccess === 'function') onCreateSuccess();
		await router.push('/user/dashboard/projects');
		setLoading(false);
		if (typeof close === 'function') close();
	};

	const createFailedCallback = async (error?: any) => {
		toast.error('Error while creating project!');
		if (typeof onCreateFailed === 'function') onCreateFailed(error);
		setLoading(false);
	};

	useEffect(() => {
		if (project_id && Number(project_id) > 0) {
			setProductCreateMode(true);
		}
	}, [project_id]);

	return (
		<>
			<Modal
				width="sm"
				open={open}
				close={() => {
					if (typeof close === 'function') {
						close();
					}
					clearErrors();
					setStep(0);
				}}
				className={{ paper: 'rounded-lg md:px-4 p-4 py-0 md:py-4' }}
				header={
					<div className="flex justify-end mt-3 -mr-3">
						<Steppers
							currentStep={step}
							className="w-full md:w-3/4 mx-auto"
							options={['Step 1', 'Step 2', 'Step 3']}
							icons={{
								1: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										<AiOutlineUser />
									</span>
								),
								2: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										<BiLink />
									</span>
								),
								3: (
									<span className="p-1 w-12 flex items-center justify-center h-12 rounded-full border-current">
										<AiOutlineEye />
									</span>
								),
							}}
						/>
						<IoClose
							className="text-primary text-3xl cursor-pointer mr-4 -mt-2.5"
							// onClick={toggleOpen}
							onClick={() => close()}
						/>
					</div>
				}
				content={
					<div className="w-full flex flex-col mt-[12px] 2xl:mt-[27px]">
						<div className=" px-4">
							{step === 0 && (
								<>
									<div className="relative mb-[18px]">
										<Label
											value="Project Name"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<input
											{...register('name', {
												required: 'Write you project name',
											})}
											type="text"
											className={`w-full h-14 rounded-lg pt-[13px] pb-[16px] pl-5 outline-none text-base text-[#101010] placeholder-[#CBCBCB] bg-[#FBFBFB] tracking-tight font-proxima-nova border border-solid ${
												errors?.name?.message
													? ' border-red-300'
													: 'border-[#CCCCCC]'
											}`}
											placeholder="Project Name"
										/>
										{errors?.name?.message && (
											<UiFormHelperText message={errors?.name?.message} />
										)}
									</div>
									<div className="relative mb-4">
										<Label
											value="Project Description"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<textarea
											{...register('description')}
											className="border border-[#CCCCCC] outline-none rounded-lg bg-[#FBFBFB] w-full pt-[13px] pb-[16px] pl-5 text-base resize-none text-[#101010] placeholder-[#CBCBCB]"
											placeholder="Type Your Description here... "
											rows={10}
										/>
									</div>
								</>
							)}
							{step === 1 && (
								<>
									<div className="relative mb-4">
										<Label
											value="Blockchain Mint"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<select
											// {...register('blockchain', {
											//   required: 'Enter project name',
											// })}
											value={chain}
											onChange={(e: any) => setChain(e.target.value)}
											className="h-14 w-full pt-[13px] pb-[16px] pl-5 outline-0 font-proxima-nova tracking-wider text-lg text-[#101010] placeholder-[#CBCBCB] cursor-pointer bg-[#FBFBFB] border border-solid rounded-lg"
										>
											{chainOptions.map((item: any, index: number) => (
												<option
													className="text-[#101010] placeholder-[#CBCBCB]"
													key={index}
													value={item.value}
												>
													{item.name}
												</option>
											))}
										</select>
										{chainError && (
											<UiFormHelperText
												message={chainError ? 'Select a blockchain' : ''}
											/>
										)}
									</div>
									<div className="relative mb-4">
										<Label
											value="Collection"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<select
											// {...register('blockchain', {
											//   required: 'Enter project name',
											// })}
											value={collection}
											onChange={(e: any) => setCollection(e.target.value)}
											className="h-14 w-full pt-[13px] pb-[16px] pl-5 outline-0 font-proxima-nova tracking-wider text-lg text-[#101010] placeholder-[#CBCBCB] cursor-pointer bg-[#FBFBFB] border border-solid rounded-lg"
										>
											{collectionOptions.map((item: any, index: number) => (
												<option
													className="text-gray-600"
													key={index}
													value={item.value}
												>
													{item.name}
												</option>
											))}
										</select>
										{collectionError && (
											<UiFormHelperText
												message={
													collectionError ? 'Select your collection' : ''
												}
											/>
										)}
									</div>
									<div className="relative mb-4">
										<Label
											value="Price"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<input
											{...register('price', {
												required: 'Enter your project price',
											})}
											type="text"
											className={`w-full h-14 rounded-lg pt-[13px] pb-[16px] pl-5 outline-none text-base  text-[#101010] placeholder-[#CBCBCB] bg-[#FBFBFB] tracking-tight font-proxima-nova border border-solid ${
												errors?.price?.message
													? ' border-red-300'
													: 'border-[#CCCCCC]'
											}`}
											placeholder="0.01 ETH for example"
										/>
										{errors?.price?.message && (
											<UiFormHelperText message={errors?.price?.message} />
										)}
									</div>

									<div className="relative mb-4">
										<Label
											value="Royalties"
											className="text-[#101010] font-medium text-base  font-proxima-nova tracking-tight w-2/4 mb-2 2xl:mb-[11px]"
										/>
										<input
											{...register('royalties', {
												required: 'Enter your project royalties',
											})}
											type="text"
											className={`w-full h-14 rounded-lg pt-[13px] pb-[16px] pl-5 outline-none text-base  text-[#101010] placeholder-[#CBCBCB] bg-[#FBFBFB] tracking-tight font-proxima-nova border border-solid ${
												errors?.royalties?.message
													? ' border-red-300'
													: 'border-[#CCCCCC]'
											}`}
											placeholder="Suggested: 10%, 20%, 30%, Maximum is 70%"
										/>
										{errors?.royalties?.message && (
											<UiFormHelperText
												message={errors?.royalties?.message}
											/>
										)}
									</div>

									{/* <div className="">
                    <Label
                      value="duration"
                      className="text-[#333333] font-medium text-base 2xl:text-xl font-proxima-nova tracking-tight w-2/4 mb-2"
                    />
                    <Controller
                      name="duration"
                      control={control}
                      rules={{
                        required: 'Enter Auction Duration',
                        validate: (value) =>
                          isValid(value) == true || 'Enter a valid date',
                      }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            {...field}
                            inputFormat="dd-MM-yyyy"
                            mask="__-__-____"
                            className="text-gray-700"
                            renderInput={(params) => (
                              <TextField
                                className={`w-full border border-solid ${
                                  errors?.duration?.message
                                    ? ' border-red-300'
                                    : 'border-gray-300'
                                } text-gray-700 text-lg font-proxima-nova font-lato rounded focus:outline-none`}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </div> */}
									{/* <div className="flex items-center">
                    <Controller
                      name="confirm_additional_fee"
                      control={control}
                      rules={{
                        required: 'Please agree about additional gas fee',
                      }}
                      render={({ field }) => (
                        <FormControlLabel
                          className="items-start mt-2"
                          control={<CheckboxAtom {...field} />}
                          label={
                            <div className="text-[#999999] mt-2">
                              I confirm that additional gas fee's will be added
                            </div>
                          }
                        />
                      )}
                    />
                  </div> */}
								</>
							)}
							{step === 2 && (
								<>
									<div className="text-center text-xl font-proxima-nova mt-[7px] lg:mt-[13px] pb-5 border-b-2 border-[#E9E9E9]">
										Project Preview
									</div>
									<div className="mt-[10px] lg:mt-[19px] w-full flex justify-between">
										<div className=" text-base lg:text-lg ">
											{getValues('name')}
										</div>
										<div className=" text-base ">
											Collection:{' '}
											<span className="text-primary">{collection}</span>
										</div>
									</div>
									<div className="mt-[14px] mb-[18px] overflow-hidden">
										{getTextExcerpt(getValues('description'), 350)}
									</div>
									<div className="mb-[20px] relative">
										<Box
											sx={{
												'& video': {
													width: `100% !important`,
													height: `auto !important`,
												},
											}}
										>
											<OnHoverPlayVideo
												poster={snapshot || IMAGE_PLACEHOLDER}
												src={video64} //{'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'} // TODO: Remove comment after testing //src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
												hideScaleView={true}
											/>
										</Box>
										<Button
											value={
												<>
													<span>Re-Generate Video</span>
													<GiCycle className="text-lg text-white ml-1" />
												</>
											}
											className="text-xs lg:text-lg p-1 lg:px-[18px] lg:py-[11px] bg-primary text-white absolute bottom-4 md:right-2"
											variant="contained"
										/>
									</div>
									{errors?.agree_confirm?.message && (
										<div className="mt-3">
											<Fade
												in={
													(errors?.agree_confirm?.message && true) ||
													false
												}
											>
												<FormHelperText
													className={
														'text-base italic eina-font-r03 mt-1 text-red-500'
													}
												>
													*{errors?.agree_confirm?.message}
												</FormHelperText>
											</Fade>
										</div>
									)}
									<div className="w-full flex flex-wrap justify-between">
										<div className="text-base text-[#101010]">
											Price:{' '}
											<span className="text-primary ml-[13px]">
												{getValues('price')}
											</span>
										</div>
										<div className="text-base text-[#101010]">
											Blockchain:{' '}
											<span className="text-primary  ml-[13px]">{chain}</span>
										</div>
										<div className="text-base text-[#101010]">
											Royalities:{' '}
											<span className="text-primary  ml-[13px]">
												{getValues('royalties')}
											</span>
										</div>
									</div>
									<div className="mt-[23px] text-[#101010]">
										<FormControlLabel
											control={
												<IOSSwitch
													sx={{ m: 1 }}
													defaultChecked
												/>
											}
											label="Shared in newsfeed"
										/>
									</div>
									<div className="mb-6 mt-[20px] border-t border-[#E9E9E9]">
										<Controller
											name="inform_additional_gas"
											control={control}
											rules={{
												required: 'Please confirm by clicking checkbox',
											}}
											render={({ field }) => (
												<FormControlLabel
													className="items-start mt-2"
													control={<CheckboxAtom {...field} />}
													label={
														<div className="text-[#999999] mt-2 text-[13px]">
															I confirm that additional gas fee's will
															be added{' '}
														</div>
													}
												/>
											)}
										/>
										<Controller
											name="agree_confirm"
											control={control}
											rules={{
												required: 'Please confirm by clicking checkbox',
											}}
											render={({ field }) => (
												<FormControlLabel
													className="items-start"
													control={<CheckboxAtom {...field} />}
													label={
														<div className="text-[#999999] text-[13px]">
															I confirm that I'm the rightful owner of
															this virtually or physically and any
															part of it. I know I have all
															responsibility in all legal and/or
															intellectual property issues that will
															occur because my product.
														</div>
													}
												/>
											)}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				}
				actions={
					<div className="grid grid-cols-2 md:flex space-x-2 w-full px-2 pb-4 2xl:pb-1">
						{step === 0 && (
							// <Button
							//   value="Next"
							//   onClick={() => {
							//     setStep((prev) => prev + 1);
							//   }}
							//   classes={{
							//     root: `text-white bg-primary p-2 px-16 font-proxima-nova capitalize text-xl md:text-3xl font-medium mt-5 w-full  `,
							//   }}
							//   color="primary"
							// />
							<Button
								value="Next"
								onClick={onClickNext}
								className="text-white xl:h-14 text-base lg:text-lg bg-primary p-1 lg:p-2 tracking-tight font-proxima-nova capitalize w-full"
								color="primary"
							/>
						)}
						{step === 1 && (
							<>
								<Button
									value="Back"
									onClick={() => {
										setStep((prev) => prev - 1);
									}}
									classes={{
										root: `xl:h-14 border border-solid bg-primary text-white text-lg border-gray-550 text-gray-550 p-1 lg:p-2 capitalize font-medium md:w-1/2 mr-5`,
									}}
									variant="outlined"
								/>
								<Button
									value="Next"
									onClick={onClickNext2}
									className="text-white xl:h-14 bg-primary text-lg p-1 lg:p-2 tracking-tight font-proxima-nova capitalize md:w-1/2"
									color="primary"
									variant="outlined"
								/>
							</>
						)}
						{step === 2 && (
							<>
								<Button
									value="Back"
									onClick={() => {
										setStep((prev) => prev - 1);
									}}
									classes={{
										root: `xl:h-14 border border-solid text-base lg:text-lg border-gray-550 text-gray-550 p-1 lg:p-2 capitalize font-medium md:w-1/2 mr-5`,
									}}
								/>
								<Button
									value="Create"
									loading={loading}
									disabled={loading}
									type="submit"
									onClick={handleSubmit(
										!productCreateMode
											? handleCreateProject
											: handleCreateProduct
									)}
									className="xl:h-14 text-white bg-primary lg:text-lg lg:p-2 tracking-tight font-proxima-nova p-1  capitalize md:w-1/2"
									color="primary"
								/>
							</>
						)}
					</div>
				}
			/>
		</>
	);
};

export default CreateProjectPopupSell;
