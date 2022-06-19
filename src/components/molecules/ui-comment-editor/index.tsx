import Button from '@atoms/button';
import TextField from '@molecules/text-field';
import { Fade } from '@mui/material';

interface IBlogSingleCommentInput {
	name?: string;
	value: any;
	handleChange?: any;
	handleKeyDown?: any;
	rootClasses?: string;
	mainClass?: string;
	inputClasses?: string;
	placeholder?: string;
	multiline?: boolean;
	rows?: number;
	hideSubmitBtn?: boolean;
	submitBtnText?: any;
	onSubmit?: any;
	submitBtnClass?: string;
	errorText?: string;
	loading?: boolean;
	hideCancelBtn?: boolean;
	onCancel?: any;
	cancelBtnText?: string;
	cancelBtnClass?: string;
	buttonPublishContainer?: string;
	disableInput?: boolean;
}

const UiCommentEditor = (props: IBlogSingleCommentInput) => {
	const {
		name,
		value,
		handleChange,
		handleKeyDown,
		rootClasses,
		mainClass,
		inputClasses,
		placeholder,
		multiline,
		rows,
		hideSubmitBtn,
		submitBtnText,
		onSubmit,
		submitBtnClass,
		hideCancelBtn,
		onCancel,
		cancelBtnText,
		cancelBtnClass,
		errorText,
		loading,
		disableInput,
		buttonPublishContainer,
	} = props;

	return (
		<div className={rootClasses}>
			<div className="w-full">
				<TextField
					name={name}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					value={value}
					mainClass={mainClass}
					inputClasses={`${inputClasses} ${
						errorText ? 'border-red-400' : 'border-gray-400'
					}`}
					placeholder={placeholder}
					multiline={multiline}
					rows={rows}
					disable={disableInput}
				/>
				{errorText && (
					<Fade in={errorText ? true : false}>
						<div className="text-right mt-1">
							<span className="text-[16px] text-red-400">{errorText}</span>
						</div>
					</Fade>
				)}
			</div>
			<div className={buttonPublishContainer}>
				{!hideCancelBtn && (
					<Button
						onClick={onCancel}
						type="button"
						value={cancelBtnText}
						className={cancelBtnClass}
						color="primary"
					/>
				)}
				{!hideSubmitBtn && (
					<Button
						onClick={onSubmit}
						type="button"
						value={submitBtnText}
						className={`${submitBtnClass}${
							loading ? ' pointer-events-none cursor-not-allowed' : ''
						}`}
						color="primary"
						loading={loading}
					/>
				)}
			</div>
		</div>
	);
};

UiCommentEditor.defaultProps = {
	type: 'textarea',
	name: 'comment-description',
	mainClass: 'flex items-start',
	rootClasses: '',
	inputClasses:
		'w-full rounded-[10px] bg-white text-[16px] tracking-tight font-proxima-nova border mt-[5px] border-opacity-40 p-0',
	placeholder: 'Write your comment...',
	multiline: true,
	rows: 5,
	cancelBtnText: 'Cancel',
	hideCancelBtn: true,
	hideSubmitBtn: false,
	disableInput: false,
	submitBtnText: 'Publish',
	submitBtnClass:
		'text-white flex bg-primary transform-none font-muli text-base 2xl:text-xl rounded font-semibold px-16 py-3 hover:shadow-lg outline-none border-0 ml-auto mt-8',
	cancelBtnClass:
		'text-black flex bg-white transform-none font-poppins text-[16px] rounded-[6px] font-semibold px-4 py-2 hover:shadow-none shadow-none outline-none mt-4 mr-4 border border-solid border-gray-300',
	buttonPublishContainer: 'flex justify-end',
};

export default UiCommentEditor;
