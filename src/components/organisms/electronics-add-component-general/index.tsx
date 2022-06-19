import Label from '@atoms/label';
import AddDetailPart from '@organisms/electronics-general-add-details';
import React from 'react';

const ElectronicsAddComponentGeneral = (props: any) => {
	return (
		<div className="pt-5 bg-white mt-[24px] p-[30px] rounded-[10px]">
			<div className="md:w-[665px]">
				<Label
					value="Add Details of the component"
					className="leading-tight font-proxima-nova texl-lg 2xl:text-[24px] font-semibold text-primary mb-5"
				/>
				{/* <hr /> */}
				<AddDetailPart
					name={props.name}
					onChangeName={props.onChangeName}
					description={props.description}
					onChangeDescription={props.onChangeDescription}
					onSelectType={props.onSelectType}
					onSelectCategory={props.onSelectCategory}
				/>
			</div>
		</div>
	);
};

export default ElectronicsAddComponentGeneral;
