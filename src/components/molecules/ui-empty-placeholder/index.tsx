import Button from '@atoms/button';
import Label from '@atoms/label';
import { PLACEHOLDER_EMPTY } from 'enums/common';
import { useRouter } from 'next/router';
import { FaArrowCircleLeft } from 'react-icons/fa';

const UiEmptyPlaceholder = (props: any) => {
	const {
		image,
		title,
		description,
		descClasses,
		imageClasses,
		titleClasses,
		className,
		hideImage,
		children,
		showBackButton,
		backButtonText,
		backButtonIcon,
		backButtonColor,
		onClickBackButton,
	} = props;

	const router = useRouter();

	return (
		<div className={className || ''}>
			{!hideImage && (
				<img
					src={image || PLACEHOLDER_EMPTY}
					className={imageClasses || 'my-16 mx-auto px-7 sm:px-16'}
				/>
			)}
			<Label
				value={title || 'No data found!'}
				classes={{
					root:
						titleClasses ||
						'text-center texl-lg 2xl:text-2xl pb-1 mt-10 font-bold font-sans tracking-tight text-primary',
				}}
			/>
			{description && (
				<p className={descClasses || 'text-lg text-[#535353] font-normal mt-3 text-center'}>
					{description}
				</p>
			)}
			{children}
			{showBackButton && (
				<div className="w-full flex justify-center items-center mt-6">
					<Button
						value={backButtonText}
						onClick={() => {
							if (onClickBackButton) onClickBackButton();
							else router.back();
						}}
						classes={{
							root: 'bg-primary text-base 2xl:text-lg font-proxima-nova text-white transform-none  tracking-tight px-[14px] py-[7] 2xl:px-[30px] 2xl:py-[13px] rounded',
						}}
						iconStart={backButtonIcon}
						color={backButtonColor}
					/>
				</div>
			)}
		</div>
	);
};

UiEmptyPlaceholder.defaultProps = {
	showBackButton: false,
	backButtonText: 'Go back',
	backButtonIcon: <FaArrowCircleLeft className="text-xl" />,
	backButtonColor: 'primary',
};

export default UiEmptyPlaceholder;
