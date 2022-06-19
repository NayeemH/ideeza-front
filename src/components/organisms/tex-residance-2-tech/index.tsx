import Label from '@atoms/label';
import CheckboxFields from '@molecules/checkbox-fields';
import TextField from '@molecules/text-field';
import React from 'react';

function TaxResidence2Tech(props: any) {
	const { mainClass } = props;
	return (
		<div className={`${mainClass} pt-1`}>
			<Label
				classes={{
					root: `text-base 2xl:text-xl text-gray-700 font-sans tracking-tight`,
				}}
				value={
					<>
						To collect the right information, indicate if you are a
						<span className="text-primary"> U.S. person</span>:
					</>
				}
			/>
			<div className="flex items-center">
				<input
					type="radio"
					className="m-1"
					id="html"
					name="fav_language"
					value="HTML"
				/>
				<label
					className="text-gray-640 tracking-tight pl-2 text-base 2xl:text-xl font-sans"
					htmlFor="html"
				>
					I am US person
				</label>
			</div>

			<br />
			<div className="flex items-center">
				<input
					className="m-1"
					type="radio"
					id="html"
					name="fav_language"
					value="HTML"
				/>
				<label
					className="text-gray-640 tracking-tight pl-2 text-base 2xl:text-xl font-sans"
					htmlFor="html"
				>
					I am not a US person
				</label>
			</div>

			<br />
			{/* <Radio
        // checked={"selectedValue" === "a"}
        onChange={() => {
          ("");
        }}
        value="a"
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      /> */}
			{/* <Radio
        // checked={"selectedValue" === "a"}
        onChange={() => {
          ("");
        }}
        value="a"
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      /> */}
			{/* <RadioLabel
        onClick={() => {
          ("");
        }}
        mainClass="flex items-center mt-2"
        radioClass={{ root: "h-4 w-4" }}
        value="I'm not a U.S. person"
        lableClass={``}
      />
      <RadioLabel
        onClick={() => {
          ("");
        }}
        mainClass="flex items-center mt-1"
        radioClass={{ root: "h-4 w-4" }}
        value="I'm a U.S. person"
        lableClass={`text-gray-640 tracking-tight pl-2 text-base 2xl:text-xl font-sans`}
      /> */}
			<Label
				value="Before withdrawing funds, all non-U.S. persons must provide W-8BEN tax information."
				classes={{
					root: `text-base 2xl:text-xl text-gray-700 font-sans tracking-tight pb-7 pt-4`,
				}}
			/>
			<TextField
				mainClass="mb-1"
				type="password"
				labelvalue="Legal name of business"
				labelClasses="pb-2 text-base 2xl:text-xl tracking-tight font-sans text-gray-700"
				inputClasses="bg-gray-100 p-1 text-base 2xl:text-xl hover:bg-white border border-gray-100 hover:border-current hover:shadow transition-all duration-500 ease-in-out"
			/>
			<Label
				value="Provide the same name as shown on your tax return."
				classes={{
					root: `text-base 2xl:text-xl text-gray-640 font-sans tracking-tight`,
				}}
			/>
			<div className="flex space-x-3 pt-5 pb-2">
				<Label
					value="Address"
					classes={{
						root: `text-base 2xl:text-xl font-sans font-semibold tracking-tight text-gray-700`,
					}}
				/>
				<Label
					value="Change"
					classes={{
						root: `text-base 2xl:text-xl font-sans tracking-tight underline text-primary`,
					}}
				/>
			</div>
			<Label
				value={
					<>
						Nahal tavor 5, <br /> tel Aviv Region
						<br /> 9064500
						<br /> Israel
					</>
				}
				classes={{
					root: `text-gray-640 tracking-tight font-sans text-base 2xl:text-xl`,
				}}
			/>
			{/* <UsPerson /> */}
			<CheckboxFields
				mainClass="items-start -ml-1 mt-5 mb-3"
				value="I certify, under penalties of perjury, that the representations in this Tax Certificate are true and correct."
				labelClass="text-base 2xl:text-xl font-sans pl-1 pt-1 tracking-tight text-gray-640"
				name="Certification"
				checked={false}
				rules={''}
			/>
		</div>
	);
}
export default TaxResidence2Tech;
