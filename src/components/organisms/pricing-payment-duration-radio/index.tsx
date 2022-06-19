import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { formatAmount } from 'utils/utils';

const PricingPaymentDurationRadio = (props: any) => {
	const { value, handleChange, cartMeta, cartItem } = props;

	return (
		<FormControl
			sx={{
				width: '100%',
			}}
		>
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="YEARLY"
					control={
						<Radio
							sx={{
								paddingTop: '0',
							}}
						/>
					}
					className={`items-start justify-start my-0 mt-[20px] p-[20px] bg-white w-full border rounded-[10px] min-h-[215px] ${
						value == 'YEARLY' ? 'border-primary cursor-default' : 'cursor-pointer'
					}`}
					label={
						<div className="w-full">
							<p className="text-[20px] font-[600] font-proxima-nova leading-[30px] mb-[10px]">
								Pay Yearly
							</p>
							<p className="text-[20px] font-proxima-nova leading-[30px] mb-[10px]">
								{formatAmount(cartItem?.pricing_plan?.price_monthly)} / month
							</p>
							<p className="text-[20px] font-proxima-nova leading-[30px] mb-[10px]">
								Yearly payment of{' '}
								{formatAmount(
									cartItem?.plan_package == 'YEARLY'
										? cartMeta?.total_amount
										: cartItem?.pricing_plan?.price_yearly
								)}
							</p>
							{cartItem?.discount_amount && cartItem?.discount_percentage && (
								<div className="flex">
									{cartItem?.discount_percentage && (
										<div className="py-[14px] text-[18px] font-proxima-nova px-[30px] cursor-pointer bg-[#FFEBFB] text-primary">
											{cartItem?.discount_percentage}% OFF
										</div>
									)}
									{cartItem?.discount_amount && (
										<div className="py-[14px] px-[30px] text-[18px] font-proxima-nova  cursor-pointer text-primary">
											Save {formatAmount(cartItem?.discount_amount)}
										</div>
									)}
								</div>
							)}
						</div>
					}
				/>
				<FormControlLabel
					value="MONTHLY"
					control={
						<Radio
							sx={{
								paddingTop: '0',
							}}
						/>
					}
					className={`items-start justify-start my-0 mt-[30px] p-[20px] bg-white w-full border rounded-[10px] h-[210px] ${
						value == 'MONTHLY' ? 'border-primary cursor-default' : 'cursor-pointer'
					}`}
					label={
						<div className="w-full">
							<p className="text-[20px] font-[600] font-proxima-nova leading-[30px] mb-[10px]">
								Pay Monthly
							</p>
							<p className="text-[20px] font-proxima-nova leading-[30px] mb-[10px]">
								{formatAmount(
									cartItem?.plan_package == 'MONTHLY'
										? cartMeta?.total_amount
										: cartItem?.pricing_plan?.price_monthly
								)}{' '}
								/ month
							</p>
						</div>
					}
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default PricingPaymentDurationRadio;
