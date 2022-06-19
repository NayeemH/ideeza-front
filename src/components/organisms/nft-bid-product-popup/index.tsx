import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import CustomSelect from '@molecules/custom-select';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { connectToWallet } from 'utils/utils';

function NftBidPopup(props: any) {
	const { open, toggleOpen } = props;
	// const [isWalletConnection, SetIsWalletConnection] = useState(false);
	const [placeBidStep, setPlaceBidStep] = useState(1);
	const router = useRouter();
	return (
		<div>
			<Modal
				width="md"
				close={toggleOpen}
				className={{ paper: ' rounded-xl p-[40px] w-[645px]' }}
				header={
					<>
						{placeBidStep == 1 && (
							<Label
								value="Wallet connection"
								classes={{
									root: `text-primary font-[500] leading-[52px] pb-[10px] text-center text-[35px]`,
								}}
							/>
						)}
						{placeBidStep == 2 && (
							<Label
								value="Place a Bid"
								classes={{
									root: `text-primary font-[500] leading-[52px] pb-[10px] text-center text-[35px]`,
								}}
							/>
						)}
						{placeBidStep == 3 && (
							<Label
								value="Success Bid"
								classes={{
									root: `text-primary font-[500] leading-[52px] pb-[10px] text-center text-[35px]`,
								}}
							/>
						)}
					</>
					// <Label
					//   value="Place a Bid"
					//   classes={{
					//     root: `text-primary font-[500] leading-[52px] pb-[6px] text-center text-[35px]`,
					//   }}
					// />
				}
				content={
					<>
						{placeBidStep == 1 && (
							<div className="flex flex-col justify-center items-center">
								<p className="text-[20px]">
									In order to place a bid, please connect your wallet
								</p>
								<img
									src="/images/logo/wallet-img.png"
									className="my-[35px] mb-[10px] w-[128px] h-[128px]"
									alt="wallet"
								/>
							</div>
						)}
						{placeBidStep == 2 && (
							<div className="pl-1 flex flex-col items-center justify-center">
								<p className="text-[18px] text-[#999999] leading-[32px] mb-[30px]">
									Current Bid <span className="text-primary">1.05 ETH</span>
								</p>
								<div className="flex items-center mb-[40px]">
									<h1 className="text-[68px] text-primary font-[600] leading-[88px] text-center">
										7.05
									</h1>
									<div className="flex justify-center">
										<CustomSelect
											options={[
												{ name: 'ETH', value: 'ETH' },
												{ name: 'WETH', value: 'WETH' },
												{ name: 'DAI', value: 'DAI' },
												{ name: 'USDC', value: 'USDC' },
											]}
											inputClassName="focus:outline-none w-[120px] rounded pl-[20px] text-[#561F80] text-[32px] font-semibold placeholder-[#561F80]"
											placeholder="ETH"
											unorderedList="absolute overflow-y-auto max-h-[115px] w-full bg-white shadow-lg flex flex-wrap gap-[6px] z-10 mt-5 top-10 text-xl border border-solid"
											arrowColor=" text-[#561F80] text-[25px]"
											arrowColorTop=" text-[#561F80] text-[25px]"
										/>
									</div>
								</div>
								<div className="flex items-center mb-[15px]">
									<AiOutlineExclamationCircle className="text-[#FF5353] text-[18px]" />
									<p className="leading-[27px] text-[#999999] text-[18px] ml-2">
										Minimum markup{' '}
										<span className="text-primary">0.05 ETH</span>
									</p>
								</div>
								<div className="flex items-center">
									<AiOutlineExclamationCircle className="text-[#FF5353] text-[18px]" />
									<p className="leading-[27px] text-[18px] text-[#999999] ml-2">
										Don't have enough crypto?
									</p>
									<p className="leading-[27px] text-[18px] ml-2 text-[#561F80] cursor-pointer">
										{' '}
										buy Crypto/Deposit
									</p>
								</div>
							</div>
						)}
						{placeBidStep == 3 && (
							<div className="pl-1 flex flex-col items-center justify-center">
								<p className="text-[18px] text-[#999999] leading-[32px] mb-[30px]">
									Frozen
								</p>
								<div className="flex items-center mb-[40px]">
									<h1 className="text-[68px] text-primary font-[600] leading-[88px] text-center">
										7.05
									</h1>
									<div className="flex justify-center">
										<CustomSelect
											options={[
												{ name: 'ETH', value: 'ETH' },
												{ name: 'WETH', value: 'WETH' },
												{ name: 'DAI', value: 'DAI' },
												{ name: 'USDC', value: 'USDC' },
											]}
											inputClassName="focus:outline-none w-[120px] rounded pl-[20px] text-[#561F80] text-[32px] font-semibold placeholder-[#561F80]"
											placeholder="ETH"
											unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-10 text-xl border border-solid"
											arrowColor=" text-[#561F80] text-[25px]"
											arrowColorTop=" text-[#561F80] text-[25px]"
										/>
									</div>
								</div>

								<div className="flex items-center">
									<p className="leading-[27px] text-[#999999] text-[18px]">
										{' '}
										Until the end of the auction
									</p>
								</div>
							</div>
						)}
					</>
				}
				actions={
					<>
						{placeBidStep == 1 && (
							<div className="flex justify-center items-center w-full">
								<Button
									className="bg-primary font-normal shadow-none text-white px-[30px] text-[18px] transform-none py-[15px] rounded-[6px] mt-[25px]"
									value="Connect"
									// onClick={toggleOpen}
									color="primary"
									onClick={() => {
										connectToWallet();
										setPlaceBidStep(2);
										// router.push("/nft-project-bid/1");
									}}
								/>
							</div>
						)}
						{placeBidStep == 2 && (
							<div className="flex justify-center items-center w-full">
								<Button
									className="bg-primary font-normal shadow-none text-white px-[30px] text-[18px] transform-none py-[15px] rounded-[6px] mt-[25px]"
									value="Place A Bid"
									// onClick={toggleOpen}
									color="primary"
									onClick={() => {
										connectToWallet();
										setPlaceBidStep(3);
										// router.push("/nft-project-bid/1");
									}}
								/>
							</div>
						)}
						{placeBidStep == 3 && (
							<div className="flex justify-center items-center w-full">
								<Button
									className="bg-primary font-normal shadow-none text-white px-[30px] text-[18px] transform-none py-[15px] rounded-[6px] mt-[25px]"
									value="Biding Orders"
									// onClick={toggleOpen}
									color="primary"
									onClick={() => {
										// setPlaceBidStep(3);
										router.push('/nft-project-bid/1');
									}}
								/>
							</div>
						)}
					</>
					// <div className="flex justify-center items-center w-full">
					//   <Button
					//     className="bg-primary font-normal shadow-none text-white px-[30px] text-[18px] transform-none py-[15px] rounded-[6px] mt-[25px]"
					//     value={isWalletConnection ? "Connect" : "Place a Bid"}
					//     // onClick={toggleOpen}
					//     color="primary"
					//     onClick={() => {
					//       SetIsWalletConnection(true);
					//       router.push("/nft-project-bid/1");
					//     }}
					//   />
					// </div>
				}
				open={open}
			/>
		</div>
	);
}
export default NftBidPopup;
