import Label from '@atoms/label';
import CheckboxFields from '@molecules/checkbox-fields';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import IconLabel from '@molecules/icon-label';
// import RadioLabel from "@molecules/radio-label";
import React from 'react';
function OfferPopupBody(props: any) {
	const {
		mainClass,
		des,
		desClass,
		detail,
		detailClass,
		term,
		value1,
		value1Class,
		labels,
		amount,
		amountValue,
		amountClass,
		icon,
		// deposit,
		icon2,
		// radio1,
		// radio2,
		// radioClass,
		// radioC,
		value3,
		date,
		advance,
		SDate,
		payment,
		// radio3,
		// radio4,
		weekly,
		hrs,
		classessort,
	} = props;
	return (
		<div className={mainClass}>
			<Label
				value={des}
				classes={{ root: `${desClass}` }}
			/>
			<Label
				value={detail}
				classes={{ root: `${detailClass}` }}
			/>
			<Label
				value={term}
				classes={{ root: `mt-5 ${desClass}` }}
			/>
			<div className={labels}>
				<Label
					value={value1}
					classes={{ root: `${value1Class}` }}
				/>
				{/* <SelectField
          mainClasses="flex items-center w-44"
          value="Switch to :"
          options={[
            {
              name: "Fixed-price",
              value: "Fixed-price",
            },
            {
              name: "Hourly",
              value: "Hourly",
            },
          ]}
          labelClasses={`pr-1 whitespace-nowrap ${value1Class}`}
          className="text-current text-right tracking-tight text-sm px-0 py-0 pr-7"
          placeholder="Fixed-price"
        /> */}

				<Label
					value="Switch to :"
					className="text-gray-600 font-extrabold font-sans pt-4 pl-8 text-sm"
				/>
				<CustomDropDownMenu
					className={classessort}
					selectOptions={[
						{
							name: 'Fixed price',
							value: 'Fixed price',
						},
						{
							name: 'Cover',
							value: 'Cover',
						},
						{
							name: 'Electronics',
							value: 'Electronics',
						},
						{
							name: 'Parts',
							value: 'Parts',
						},
					]}
					inputClasses="h-12 rounded-sm w-28 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
					labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
					labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
					labelWrapperClass="flex cursor-pointer md:relative"
					dropDownClasses="origin-top-right z-20 mt-0 w-28  absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
					//   placeholder="Search..."
				/>
			</div>
			<IconLabel
				tooltipProps={{ open: false }}
				mainClass={amount}
				labelValue={amountValue}
				lableClass={{ root: `${amountClass}` }}
				iconComponent={icon}
			/>
			<div className="pb-4">
				{' '}
				{/* Hourly */}
				<Label
					value="Artem liov profile rate is $22.00/hr"
					classes={{
						root: `text-gray-600 font-normal text-sm tracking-tight pb-3 -mt-1`,
					}}
				/>
				<Label
					value="Weekly Limit"
					classes={{ root: `${value1Class}` }}
				/>
				<div className="flex items-center space-x-4 pb-1">
					<IconLabel
						tooltipProps={{ open: false }}
						mainClass={amount}
						labelValue={hrs}
						lableClass={{ root: `${amountClass}` }}
						iconComponent={icon}
					/>
					<Label
						value="=  $12200. max/week"
						classes={{
							root: `text-gray-600 font-normal text-sm tracking-tight`,
						}}
					/>
				</div>
				{/* <CheckboxLabel
          value="Allow freelancer to log time manually."
          labelClass="text-gray-880 text-sm font-sans pl-2"
          checkboxClass="w-6 h-6 rounded-sm"
        /> */}
				<CheckboxFields
					value="Allow freelancer to log time manually."
					labelClass="text-gray-880 text-sm font-sans pl-2"
					name="Allow freelancer to log time manually."
					checked={false}
					rules={''}
				/>
			</div>
			{/* <IconLabel
        tooltipProps={{ open: false }}
        mainClass={`-mt-2 ${amount}`}
        labelValue={deposit}
        lableClass={{ root: `${value1Class}` }}
        iconComponent={icon2}
      /> */}
			{/* <RadioLabel
        value={radio1}
        size="sm"
        mainClass="flex items-center -ml-3 -mt-3"
        lableClass={radioClass}
        color="current"
      />
      <RadioLabel
        value={radio2}
        size="sm"
        mainClass={`flex items-center -ml-3 md:-mt-4`}
        lableClass={radioClass}
        color="current"
      /> */}
			<Label
				value={value3}
				classes={{ root: `${value1Class}` }}
			/>
			<IconLabel
				tooltipProps={{ open: false }}
				mainClass={amount}
				labelValue={date}
				lableClass={{ root: `${amountClass}` }}
				iconComponent={icon}
			/>
			<Label
				value={advance}
				classes={{ root: `mt-5 ${desClass}` }}
			/>
			<div className={labels}>
				<div>
					<Label
						value={SDate}
						classes={{ root: `${value1Class}` }}
					/>
					<IconLabel
						tooltipProps={{ open: false }}
						mainClass={amount}
						labelValue={date}
						lableClass={{ root: `${amountClass}` }}
						iconComponent={icon}
					/>
				</div>
				<div>
					<IconLabel
						tooltipProps={{ open: false }}
						mainClass={amount}
						labelValue={payment}
						lableClass={{ root: `${value1Class}` }}
						iconComponent={icon2}
						iconContanerClass="-mt-1 text-xl"
					/>
					<IconLabel
						tooltipProps={{ open: false }}
						mainClass={amount}
						labelValue={weekly}
						lableClass={{ root: `${amountClass}` }}
						iconComponent={icon}
					/>
					<div className="flex space-x-3 mt-3 -ml-2">
						{/* <RadioLabel
              value={radio3}
              size="md"
              lableClass={radioClass}
              radioClass={radioC}
              color="current"
            />
            <RadioLabel
              value={radio4}
              size="md"
              lableClass={radioClass}
              color="current"
            /> */}
					</div>
				</div>
			</div>
		</div>
	);
}
OfferPopupBody.defaultProps = {
	mainClass: 'px-2',
	desClass: 'text-primary font-black font-sans text-lg',
	detailClass: 'bg-gray-150 mt-2 font-sans text-sm py-2 px-3 rounded text-gray-925 -ml-2 -mr-2',
	labels: 'flex justify-between items-start mt-1',
	value1Class: 'font-black text-black-100 font-sans text-sm',
	btnclass: 'text-primary py-0 transform-none font-thin font-sans',
	amount: 'flex flex-row-reverse justify-end items-center',
	amountClass: 'text-gray-900 text-sm font-sans flex items-center',
	radioClass: 'text-gray-900 text-sm -ml-1',
	radioC: 'checked:ideeza',
	weekly: 'Yes',
	hrs: '40 hrs/week',
};
export default OfferPopupBody;
