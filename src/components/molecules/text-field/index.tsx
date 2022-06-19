import Input from '@atoms/input';
import Label from '@atoms/label';
import { AiOutlineInfoCircle } from 'react-icons/ai';

function TextField(props: any) {
	const {
		labelvalue,
		mainClass,
		labelClasses,
		inputClasses,
		placeholder,
		multiline,
		rows,
		type,
		InputProps,
		icon,
		isIcon,
		position,
		register,
		error,
		name,
		defaultValue,
		containerClass,
		helperText,
		onChange,
		sendButtonHandler,
		isLabelIcon,
	} = props;
	return (
		<div className={`${mainClass}`}>
			{/* {labelvalue && (
        <Label value={labelvalue} classes={{ root: `${labelClasses}` }} />
      )} */}
			{isLabelIcon ? (
				<div className="flex items-center">
					<Label
						value={labelvalue}
						classes={{ root: `${labelClasses}` }}
					/>
					<AiOutlineInfoCircle className="text-xl ml-3 mb-[10px] text-gray-500" />
				</div>
			) : (
				<Label
					value={labelvalue}
					classes={{ root: `${labelClasses}` }}
				/>
			)}

			<Input
				isIcon={isIcon}
				position={position}
				placeholder={placeholder}
				multiline={multiline}
				rows={rows}
				type={type}
				register={register}
				error={error}
				InputProps={InputProps}
				containerClass={containerClass}
				className={{ root: `${inputClasses}` }}
				// className={inputClasses}
				name={name}
				defaultValue={defaultValue}
				helperText={helperText}
				onChange={onChange}
				{...props}
			></Input>
			{icon && <button onClick={() => sendButtonHandler()}>{icon}</button>}
		</div>
	);
}
TextField.defaultProps = {
	position: 'start',
	mainClass: 'flex items-center justify-between',
	labelClasses: 'font-medium text-gray-500 tracking-tight',
	type: 'text',
};
export default TextField;
