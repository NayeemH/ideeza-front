import Button from '@atoms/button';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import Upload from '@molecules/upload';
import React, { useState } from 'react';

function UploadField(props: any) {
	const [selected, setSelected] = useState<any>();
	const {
		value,
		placeholder,
		// labelValue,
		mainClass,
		lableClass,
		iconMainClass,
		inputMainClass,
		iconComponent,
		titleClass,
		inputClass,
		btnClass,
		iconContanerClass,
		btnValue,
		uploadClass,
		// error,
		// ref,
		add,
		attachment,
		// deleted,
	} = props;
	const handleSelect = (e: any) => {
		if (e?.target?.files) {
			setSelected(e.target.files[0]);
		}
	};
	const addImage = () => {
		if (add) {
			add(selected);
		}

		return setSelected(null);
	};
	return (
		<>
			<div className={mainClass}>
				<Label
					value={value}
					classes={{ root: `${titleClass}` }}
				/>
				<div className={`${inputMainClass}`}>
					<Upload
						value={selected ? selected : placeholder}
						icon=""
						// selected={selected}
						className={`${uploadClass}`}
						labelClass={`${inputClass} `}
						// register={ref}
						// error={error}
						mainClass="flex items-center justify-center w-full p-0 rounded-sm"
						change={handleSelect}
					/>
					<Button
						onClick={addImage}
						className={btnClass}
						value={btnValue}
						variant="contained"
						color="secondary"
					/>
				</div>
				{attachment?.map((v: any, k: number) => (
					<IconLabel
						key={k}
						mainClass={`${iconMainClass}`}
						labelValue={v?.name}
						tooltipProps={{ open: false }}
						lableClass={{ root: `${lableClass}` }}
						iconComponent={iconComponent}
						iconContanerClass={iconContanerClass}
						// onClick={deleted.bind(this, k)}
					/>
				))}
			</div>
		</>
	);
}
UploadField.defaultProps = {
	mainClass: '',
	titleClass: 'pb-2 tracking-tight font-sans text-base 2xl:text-xl text-gray-300',
	inputMainClass: 'flex w-full space-x-2',
	inputClass: 'text-gray-900 p-1 w-full text-base 2xl:text-xl1 font-normal',
	btnClass:
		'bg-gray-900 text-base 2xl:text-xl1 font-sans capitalize px-6 tracking-tight text-white',
	iconMainClass: 'flex rounded-none pt-3 items-center',
	lableClass: 'text-gray-300 text-sm underline tracking-tight',
	iconContanerClass: 'text-primary',
	uploadClass: 'border border-gray-160 py-1 w-full rounded px-2',
};
export default UploadField;
