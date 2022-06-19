import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import TextField from '@molecules/text-field';
import React from 'react';

import { GoPlus } from 'react-icons/go';

interface NetworkCardProps {
	value: string;
	cellular?: string;
	rf?: string;
	classessort?: any;
	extraBtn?: boolean;
}

const NetworkCard: React.FC<NetworkCardProps> = (props) => {
	const { value, cellular, rf, classessort } = props;
	return (
		<div className="lg:w-3/4 w-full lg:ml-auto md:p-3 md:flex md:space-x-1">
			<Label
				value={value}
				className="text-base 2xl:text-xl w-20 text-gray-700 tracking-tight font-sans py-3"
			/>
			<div className="flex items-center space-x-2 w-full lg:pr-20">
				<div className="px-3 py-2 border w-full space-y-2">
					<div className="grid md:grid-cols-3 grid-cols-1 items-start md:space-x-3 space-y-2 md:space-y-0">
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'CDMA',
									value: 'CDMA',
								},
								{
									name: 'USA',
									value: 'USA',
								},
							]}
							inputClasses="h-12 rounded-sm 2xl:w-60 xl:w-40 md:w-36 pl-2 font-sans tracking-wider bg-gray-200 text-lg cursor-pointer border border-solid"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-0 text-base 2xl:text-xl font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-16 truncate md:w-auto font-sans"
							labelWrapperClass="flex items-center cursor-pointer md:relative"
							dropDownClasses="origin-top-right mt-0 2xl:w-60 xl:w-40 md:w-36 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
							//   placeholder="Search..."
						/>

						{/* <Select
              placeholder="CDMA"
              containerClass="w-full bg-gray-200 text-gray-900 text-base 2xl:text-xl border border-gray-160"
              inputClass="text-base tracking-tight px-2 py-1"
              options={[{ value: "Some", name: "Some" }]}
            /> */}
						<div className="col-span-2">
							<div className={`${cellular} space-y-3`}>
								<div className="flex items-center space-x-3">
									<input
										placeholder="1 MHz"
										className=" w-full bg-gray-200 text-gray-700 text-base 2xl:text-xl font-sans sm:-ml-2 ml-0 p-3 rounded border border-solid border-gray-160"
									/>
									<span>-</span>
									<input
										placeholder="100 MHz"
										className="w-full  bg-gray-200 text-gray-700 text-base 2xl:text-xl font-sans sm:-ml-2 ml-0 p-3 rounded border border-solid border-gray-160"
									/>
									<div>
										<GoPlus className="text-primary cursor-pointer font-semibold text-2xl" />
									</div>
								</div>
								<div className="grid grid-cols-2">
									<div className="flex items-center justify-center space-x-2">
										<input
											placeholder="1 MHz"
											className="bg-gray-200 text-gray-700 text-base 2xl:text-xl font-sans sm:-ml-2 ml-28 md:ml-14 p-3 rounded border border-solid border-gray-160"
										/>
										<div>
											<GoPlus className="text-primary cursor-pointer font-semibold text-2xl" />
										</div>
									</div>
								</div>
							</div>
							<div className={`lg:px-10 md:px-5 space-y-3 ${rf}`}>
								<TextField
									mainClass="flex items-center space-x-3"
									containerClass="w-full pl-3 p-0 bg-gray-200 rounded border border-solid border-gray-160 text-base 2xl:text-xl"
									inputClasses="text-base 2xl:text-xl py-1"
									labelClasses="text-gray-700 text-base 2xl:text-xl w-56 font-sans tracking-tight text-right whitespace-nowrap"
									labelvalue="Frequency allowed"
									placeholder="100 MHz"
								/>
								<TextField
									mainClass="flex items-center space-x-3"
									containerClass="w-full pl-3 p-0 bg-gray-200 rounded border border-solid border-gray-160 text-base 2xl:text-xl"
									inputClasses="text-base 2xl:text-xl py-1"
									labelClasses="text-gray-700 text-base 2xl:text-xl w-56 font-sans tracking-tight text-right whitespace-nowrap"
									labelvalue="Max Power"
									placeholder="10 W"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<GoPlus className="text-primary cursor-pointer font-semibold text-2xl" />
				</div>
			</div>
		</div>
	);
};
NetworkCard.defaultProps = {
	value: 'Cellular',
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default NetworkCard;
