import AvatarAtom from '@atoms/avatar';
import Modal from '@atoms/modal';
import IconLabel from '@molecules/icon-label';
import PaymentMethod from '@molecules/payment-method';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function PaymentMethodPopup(props: any) {
	const { open, toggleOpen } = props;
	const [secondOpen, setSecondOpen] = useState(false);

	return (
		<div>
			<Modal
				width="md"
				close={toggleOpen}
				className={{ paper: 'rounded-xl md:px-6 md:py-5 p-4' }}
				header={
					<>
						<IconLabel
							mainClass="flex w-full items-center justify-between flex-row-reverse pl-0 p-5 pb-7"
							lableClass={{
								root: `text-xl xl:text-2xl 2xl:text-3xl text-gray-700 flex flex-col tracking-normal font-sans`,
							}}
							labelValue={
								<>
									Payment methods
									<hr className="border-t w-10 border-primary mt-2" />
								</>
							}
							iconContanerClass=""
							iconComponent={
								<IoClose
									className="text-gray-700 text-2xl cursor-pointer"
									onClick={toggleOpen}
								/>
							}
							tooltipProps={{ open: false }}
						/>
					</>
				}
				content={
					<>
						<div className="space-y-5">
							<PaymentMethod />
							<PaymentMethod />
							<PaymentMethod
								isWallet={true}
								toggleOpen={toggleOpen}
								setSecondOpen={setSecondOpen}
							/>
						</div>
					</>
				}
				actions={<></>}
				open={open}
			/>
			<Modal
				width="md"
				close={() => setSecondOpen(false)}
				// className={{ paper: "rounded-xl md:px-6 md:py-5 p-4" }}
				header={
					<>
						<IconLabel
							mainClass="flex w-full items-center justify-between flex-row-reverse pl-0 p-5 pb-7"
							lableClass={{
								root: `text-xl xl:text-2xl 2xl:text-[45px] text-center w-full text-primary flex flex-col tracking-normal font-sans`,
							}}
							labelValue={
								<>
									Wallet connection
									<p className="text-base xl:text-xl text-gray-500 mt-[30px]">
										connect with one of our available wallet providers
									</p>
								</>
							}
							iconContanerClass=""
							iconComponent={
								<IoClose
									className="text-gray-700 text-2xl cursor-pointer"
									onClick={() => setSecondOpen(false)}
								/>
							}
							tooltipProps={{ open: false }}
						/>
					</>
				}
				content={
					<>
						<div className="bg-[#F6F6F6] py-[20px] px-[35px]">
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base">Popular</div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base">Popular</div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base">Popular</div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
							<div className="flex justify-between items-center mb-[25px]">
								<div className="flex items-center gap-2">
									<AvatarAtom
										variant="circular"
										src="/images/choose-your-avatar/developer_avatar.png"
									/>
									<h2 className="text-[30px]">Metamask</h2>
								</div>
								<div className="text-base"></div>
							</div>
						</div>
					</>
				}
				actions={<></>}
				open={secondOpen}
			/>
		</div>
	);
}
export default PaymentMethodPopup;
