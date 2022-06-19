import React from 'react';
import Label from '@atoms/label';
import ReactSelect from '@atoms/select';
import CheckboxFields from '@molecules/checkbox-fields';

const NotificationCard: React.FC<any> = ({
	heading,
	label,
	value,
	value2,
	value3,
	mainClass,
	// value1Class,
	placeholder,
	textClass,
	mainLabel,
	checkboxClass,
	contactClass,
	contactLabel1,
	contactLabel2,
	// contactLabel2Classes,
	contactLabel3,
	contactLabel4,
	control,
	// errors,
	name,
	ops,
}) => {
	return (
		<div className={`w-full`}>
			<Label
				value={heading}
				classes={{
					root: 'text-primary texl-lg 2xl:text-2xl font-sans font-semibold border-b pb-2 border-gray-750 mb-4',
				}}
			/>
			<div className={`bg-white shadow-md p-3 rounded-md ${mainClass}`}>
				<Label
					value={label}
					classes={{
						root: ` leading-6 text-base 2xl:text-xl tracking-normal font-sans border-b pb-2 border-gray-750 mb-2 ${mainLabel}`,
					}}
				/>
				<div className={`${contactClass}`}>
					<div className="flex justify-between mt-12 pb-1">
						<Label
							value={contactLabel1}
							classes={{
								root: 'text-gray-700 font-sans text-base 2xl:text-xl tracking-tight',
							}}
						/>
						<Label
							value={contactLabel2}
							classes={{
								root: 'text-gray-700 font-sans text-base  tracking-tight ',
							}}
						/>
					</div>
					<div className="flex justify-between">
						<Label
							value={contactLabel3}
							classes={{
								root: 'text-gray-700 text-right font-sans text-base 2xl:text-xl tracking-tight',
							}}
						/>
						<Label
							value={contactLabel4}
							classes={{
								root: 'text-gray-700 text-right font-sans text-base  tracking-tight',
							}}
						/>
					</div>
				</div>
				<div className={`${textClass}`}>
					<div className="flex items-start justify-between">
						<Label
							value={contactLabel1}
							classes={{
								root: 'text-gray-900 text-base 2xl:text-xl font-sans tracking-tight',
							}}
						/>
						<ReactSelect
							options={ops}
							placeholder={placeholder}
							className={
								'text-gray-700 tracking-tight border border-solid border-gray-160 bg-white rounded-none'
							}
						/>
					</div>
				</div>
				<div className={`${checkboxClass}`}>
					<CheckboxFields
						control={control}
						// error={errors}
						name={`${name}-email`}
						size="small"
						color="primary"
						isControl={true}
						mainClass="items-center"
						// containerClass={` ${value1Class}`}
						labelClass={`text-base 2xl:text-xl tracking-tight font-sans text-gray-700`}
						value={value}
						checked={false}
						rules={''}
					/>
					<CheckboxFields
						control={control}
						// error={errors}
						name={`${name}-notifications`}
						size="small"
						color="primary"
						mainClass=" items-center"
						// containerClass=""
						labelClass="text-base 2xl:text-xl tracking-tight font-sans text-gray-700"
						value={value2}
						isControl={true}
						checked={false}
						rules={''}
					/>
					<CheckboxFields
						control={control}
						// error={errors}
						size="small"
						name={`${name}-phone`}
						color="primary"
						mainClass="items-center"
						// containerClass=""
						labelClass="text-base 2xl:text-xl tracking-tight font-sans text-gray-700"
						value={value3}
						isControl={true}
						checked={false}
						rules={''}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
