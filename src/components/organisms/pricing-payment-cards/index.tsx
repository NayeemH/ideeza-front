import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import CustomSelect from '@molecules/custom-select';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface IPricingPaymentByCardsProps {
	onSuccessPayment?: () => void;
	onFailedPayment?: () => void;
	onClickSubmit?: () => void;
	onClickCancel?: () => void;
}

const PricingPaymentByCards = (props: IPricingPaymentByCardsProps) => {
	const { onSuccessPayment, onFailedPayment, onClickCancel, onClickSubmit } = props;

	const onClickSubcribeBtn = () => {
		if (typeof onClickSubmit == 'function') onClickSubmit();
		if (typeof onSuccessPayment == 'function') onSuccessPayment();
		if (typeof onFailedPayment == 'function') onFailedPayment();
	};
	const onClickCancelBtn = () => {
		if (typeof onClickCancel == 'function') onClickCancel();
	};

	return (
		<div className="bg-white p-[20px] rounded-[10px] border border-[#E6E6E6] relative min-h-[405px]">
			<div className="pb-[30px] border-b">
				<div className="flex items-center gap-[30px] mb-[25px]">
					<img
						src="/images/logo/mastercard.svg"
						alt=""
					/>
					<img
						src="/images/logo/visa.svg"
						alt=""
					/>
				</div>
				<div className="grid grid-cols-2 gap-[40px] mb-[24px]">
					{/* STARTs: FirstName Input ---------------*/}
					<div>
						<div className="text-[#333333] text-[18px] leading-[29px] font-proxima-nova mb-[4px]">
							Cardholder Name
						</div>
						<input
							type="text"
							className={`w-full border bg-[#FBFBFB] rounded-[6px] font-proxima-nova border-[#E6E6E6]
                        text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
						/>
					</div>

					<div>
						<div className="text-[#333333] text-[18px] leading-[29px] font-proxima-nova mb-[4px]">
							Card Number
						</div>
						<input
							type="text"
							className={`w-full border bg-[#FBFBFB] rounded-[6px] font-proxima-nova border-[#E6E6E6]
                            text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-[40px]">
					{/* STARTs: FirstName Input ---------------*/}
					<div>
						<div className="text-[#333333] text-[18px] leading-[29px] font-proxima-nova mb-[4px]">
							End Date
						</div>
						<div className="flex gap-[20px]">
							<CustomSelect
								options={[
									{ name: 'last month', value: 'last month' },
									{ name: 'last 7 days', value: 'last 7 days' },
									{ name: 'last year', value: 'last year' },
								]}
								inputClassName=" w-full border bg-[#FBFBFB] rounded-[6px] font-proxima-nova border-[#E6E6E6] text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none"
								placeholder="mm"
								unorderedList="absolute overflow-y-auto bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-[55px] text-xl lg:text-[20px]"
								arrowColor="text-[#424242]"
								arrowColorTop="text-[#424242]"
								// arrowToggle={false}
							/>
							<CustomSelect
								options={[
									{ name: 'last month', value: 'last month' },
									{ name: 'last 7 days', value: 'last 7 days' },
									{ name: 'last year', value: 'last year' },
								]}
								inputClassName=" w-full border bg-[#FBFBFB] rounded-[6px] font-proxima-nova border-[#E6E6E6] text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none"
								placeholder="yyyy"
								unorderedList="absolute overflow-y-auto bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-5 top-[55px] text-xl lg:text-[20px]"
								arrowColor="text-[#424242]"
								arrowColorTop="text-[#424242]"
								// arrowToggle={false}
							/>
						</div>
					</div>

					<div>
						<div className=" mb-[4px]">
							<div className="flex items-center gap-[5px]">
								<h1 className="text-[#333333] text-[18px] leading-[29px] font-proxima-nova">
									CVV
								</h1>
								<div>
									<AiOutlineInfoCircle className="text-[#D8D8D8] text-[20px]" />
								</div>
							</div>
						</div>
						<input
							type="text"
							className={`w-[145px] border bg-[#FBFBFB] rounded-[6px] font-proxima-nova border-[#E6E6E6] text-gray-700 text-lg  pl-2 py-1 md:py-3 md:pl-3 md:p-3 focus:outline-none`}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-between mt-[20px]">
				<div className="flex gap-2 items-start w-[50%]">
					<CheckboxAtom
						color="primary"
						className="p-0"
					/>
					<p>I confirm to save and use my credit card for future payments</p>
				</div>
				<div className="flex gap-[15px] h-[57px]">
					<Button
						onClick={onClickCancelBtn}
						value="Cancel"
						className="text-[18px] bg-[#FBFBFB] capitalize px-[40px] py-[5px] shadow-none border rounded-[6px] border-[#E6E6E6] border-solid leading-none h-[50px]"
						color="inherit"
					/>
					<Button
						onClick={onClickSubcribeBtn}
						value="Upgrade"
						className="text-white text-[18px] bg-primary capitalize px-[40px] py-[15px] shadow-none border rounded-[6px] h-[50px] w-[208px]"
						color="primary"
					/>
				</div>
			</div>
		</div>
	);
};

export default PricingPaymentByCards;
