import React from 'react';
import Proptype from 'prop-types';
// import { useForm } from "react-hook-form";

// import { useDispatch } from "react-redux";
import CustomDropDownMenu from '@molecules/custom-dropdown';
import TwoLabels from '@molecules/two-levels';
import CheckboxFields from '@molecules/checkbox-fields';
import TextField from '@molecules/text-field';
import Label from '@atoms/label';

const DeliveryDetail = (props: any) => {
	const {
		mainClass,
		value1,
		value2,
		value3,
		value4,
		value5,
		value6,
		value7,
		value8,
		value9,
		value10,
		value11,
		// options,
		// placeholder,
		main,
		row,
		checkValue,
		checkClass,
		cost,
		inner,
		innerClass,
		// nextClicked,
		classessort,
	} = props;

	// const { register, handleSubmit, control, setValue, watch } = useForm();
	// const { register } = useForm();
	// const refSubmitButtom = useRef(null);
	// const dispatch = useDispatch();
	// const countryOptions = [
	//   { value: "Israel", text: "Israel" },
	//   { value: "USA", text: "USA" },
	//   { value: "Japan", text: "Japan" },
	// ];
	// const cityOptions = [
	//   { value: "Rio", text: "Rio" },
	//   { value: "Berlin", text: "Berlin" },
	//   { value: "Helsinki", text: "Helsinki" },
	// ];

	// useEffect(() => {
	//   refSubmitButtom?.current?.click();
	// }, [nextClicked]);

	// const onSubmit = (data) => {
	//   console.log("onSubmit", data);
	//   dispatch(addDeliveryDetails(data));
	// };

	return (
		<div className={mainClass}>
			<div className="md:w-4/5 lg:w-1/2">
				<div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-3 gap-y-3 md:gap-y-0 items-center mb-5">
					<Label
						value={value1}
						className="text-base 2xl:text-xl py-4 txt-c-color font-muli font-normal"
					/>
					<CustomDropDownMenu
						className={classessort}
						selectOptions={[
							{
								name: 'Shipping',
								value: 'Shipping',
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
						inputClasses="h-12 rounded-sm  pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
						labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
						labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
						labelWrapperClass="flex cursor-pointer md:relative"
						dropDownClasses="origin-top-right z-20 mt-0 w-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
						isCartDropDown={false}
						// placeholder="Search..."
					/>
					{/* <SelectField
            value={value1}
            labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1 w-full"
            options={options}
            placeholder={placeholder}
            // mainClasses="grid grid-cols-2 items-center"
            className="bg-white text-base 2xl:text-xl py-0 h-3 px-2 pr-4 rounded-sm border border-gray-125 border-solid"
          /> */}
					<TwoLabels
						mainClass="flex items-center space-x-2"
						value={value2}
						value2={value3}
						labelClass="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight"
						labelClass2="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight underline"
					/>
				</div>
				{/* <form onSubmit={handleSubmit(onSubmit)}> */}
				<form>
					<div className={main}>
						<CheckboxFields
							size="medium"
							color="secondary"
							value={checkValue}
							labelClass={checkClass}
							checked={false}
							name={checkValue}
						/>
						<div className={row}>
							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value4}
								type="text"
								name="firstName"
								// register={register}
							/>

							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value5}
								type="text"
								name="lastName"
								// register={register}
							/>

							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value6}
								type="number"
								name="phoneNumber"
								// register={register}
							/>

							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value7}
								type="email"
								name="email"
								// register={register}
							/>

							{/* <ReactHookFormSelect
                name="country"
                label="Country"
                options={countryOptions}
                register={register}
              />

              <ReactHookFormSelect
                name="city"
                label="City"
                options={cityOptions}
                register={register}
              /> */}

							<Label
								value={value8}
								className="text-base 2xl:text-xl py-4 font-muli font-normal text-gray-600"
							/>

							<CustomDropDownMenu
								className={classessort}
								selectOptions={[
									{
										name: 'Israel',
										value: 'Israel',
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
								inputClasses="h-12 rounded-sm pl-2 w-full font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
								labelBtnClasses=" w-full rounded-md shadow-none px-4 pr-0 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
								labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
								labelWrapperClass="flex cursor-pointer md:relative"
								dropDownClasses="origin-top-right z-20 mt-0 w-96 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
								isCartDropDown={true}
								// placeholder="Search..."
							/>
							{/* <SelectField
                value={value8}
                labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
                options={countryOptions}
                mainClasses="flex flex-col"
                control={control}
                name="country"
                className="bg-white text-xs h-9 py-2 px-2 pr-4 rounded-md border-none border-gray-125 border-solid"
              /> */}
							<Label
								value={value9}
								className="text-base 2xl:text-xl py-4 font-muli font-normal text-gray-600"
							/>
							<CustomDropDownMenu
								className={classessort}
								selectOptions={[
									{
										name: 'Rio',
										value: 'Rio',
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
								inputClasses="h-12 rounded-sm pl-2 w-full font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
								labelBtnClasses=" w-full rounded-md shadow-none px-4 pr-0 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
								labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
								labelWrapperClass="flex cursor-pointer md:relative"
								dropDownClasses="origin-top-right z-20 mt-0 w-96 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
								// placeholder="Search..."
							/>

							{/* <SelectField
                value={value9}
                labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
                options={cityOptions}
                mainClasses="flex flex-col"
                control={control}
                name="city"
                className="bg-white text-xs h-9 py-2 px-2 pr-4 rounded-md border-none border-gray-125 border-solid"
              /> */}

							{/* <ReactHookFormSelect
                id="Country"
                name="country"
                label="Country"
                control={control}
              >
                {countryOptions.map((person) => (
                  <MenuItem key={person.value} value={person.value}>
                    {person.text}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>

              <ReactHookFormSelect
                id="City"
                name="city"
                label="City"
                control={control}
              >
                {cityOptions.map((person) => (
                  <MenuItem key={person.value} value={person.value}>
                    {person.text}
                  </MenuItem>
                ))}
              </ReactHookFormSelect> */}

							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value10}
								type="address"
								name="address"
								// register={register}
							/>

							<TextField
								mainClass="flex flex-col"
								inputClasses="w-full bg-white p-0 text-base 2xl:text-xl tracking-tight font-sans border-none border-gray-125"
								labelClasses="text-gray-600 text-base 2xl:text-xl font-sans tracking-tight pb-1"
								labelvalue={value11}
								type="number"
								name="zipCode"
								// register={register}
							/>
							{/* <button hidden={true} ref={refSubmitButtom} type="submit" /> */}
							<button
								hidden={true}
								type="submit"
							/>
						</div>
					</div>
				</form>
				<Label
					value={
						<div className="flex space-x-2">
							{cost}
							<span className={innerClass}>{inner}</span>
						</div>
					}
					classes={{
						root: `flex justify-end text-base 2xl:text-xl tracking-tight text-gray-600 py-3 font-sans`,
					}}
				/>
			</div>
		</div>
	);
};
DeliveryDetail.defaultProps = {
	mainClass:
		'bg-gray-100 flex items-center md:justify-center rounded-lg flex-col pt-16 pb-4 px-5 mb-5',
	checkClass: 'text-gray-890 text-base 2xl:text-xl tracking-tight font-sans',
	row: 'grid md:grid-cols-2 items-center md:gap-x-4 gap-y-4',
	main: 'space-y-4 pb-6 pt-4 border-t border-solid border-gray-280 border-b',
	innerClass: 'text-primary pl-2 font-semibold',
};
DeliveryDetail.prototype = {
	options: Proptype.array,
};
export default DeliveryDetail;
