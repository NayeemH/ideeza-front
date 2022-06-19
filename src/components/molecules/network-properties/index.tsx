import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
import { FORMINPUT } from 'utils/styles';
import CheckboxAtom from '@atoms/checkbox';
import Button from '@atoms/button';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';

interface NetworkPropertiesProps {
	onChangeProperties?(propertiesObject: any): void;
	setNetworkStep?: (e?: any) => void;
	close?: (e?: any) => void;
	projectId?: any;
}

const NetworkProperties: React.FC<NetworkPropertiesProps> = (props) => {
	const [topology, setTopology] = useState<any>('');
	const [networkType, setNetworkType] = useState<any>('');
	const [networkFrequency, setNetworkFrequency] = useState<any>(0);
	const [networkRepeater, setNetworkRepeater] = useState<any>(0);
	const [cloudType, setCloudType] = useState<any>('');
	const [cloudName, setCloudName] = useState<any>('');
	const [cloudPass, setCloudPass] = useState<any>('');
	const [cloudSensors, setCloudSensors] = useState<any>('');
	const [cellularGateway, setCellularGateway] = useState<any>(false);
	const [cloudFrequency, setCloudFrequency] = useState<any>(0);
	const [master, setMaster] = useState<any>(0);
	const [isLoading, setIsLoading] = useState<any>(false);
	const propertiesObject = {
		topology,
		network_type: networkType.toUpperCase(),
		network_frequency: Number(networkFrequency) ?? 0,
		network_repeater: Number(networkRepeater),
		cloud_type: cloudType,
		cloud_name: cloudName,
		cloud_pass: cloudPass,
		cloud_sensors: cloudSensors,
		cellular_gateway: cellularGateway,
		cloud_frequency: Number(cloudFrequency) ?? 0,
		// master: Number(master),
		project: props.projectId,
	};

	const postNetwork = () => {
		if (!topology) {
			return toast.error('Enter Topology');
		}
		if (networkType === '') {
			return toast.error('Enter Network Type');
		}
		if (!networkFrequency) {
			return toast.error('Enter Network Frequency');
		}
		if (!networkRepeater) {
			return toast.error('Enter Network Repeater');
		}
		if (!cloudType) {
			return toast.error('Enter Cloud Type');
		}
		if (!cloudName) {
			return toast.error('Enter Cloud Name');
		}
		if (!cloudPass) {
			return toast.error('Enter Cloud Pass');
		}
		if (!cloudSensors) {
			return toast.error('Enter Cloud Sensors');
		}
		if (!cloudFrequency) {
			return toast.error('Enter Cloud Frequency');
		}
		setIsLoading(true);
		apiService(
			{
				method: 'post',
				url: `/project/network/`,
				data: propertiesObject,
				token: true,
			},
			(res: any, err: any) => {
				setIsLoading(false);
				if (res) {
					if (props.close) {
						props.close();
					}
					toast.success('Successfully Updated Network');
					return;
				}
				if (err) {
					if (err?.response?.data?.project[0] == 'This field must be unique.') {
						toast.error('You have already saved Network');
					}
				}
			}
		);
	};

	useEffect(() => {
		if (props.onChangeProperties) {
			props.onChangeProperties(propertiesObject);
		}
	}, [
		topology,
		networkType,
		networkFrequency,
		networkRepeater,
		cloudType,
		cloudName,
		cloudPass,
		cloudSensors,
		cellularGateway,
		cloudFrequency,
		master,
	]);

	return (
		<div className="">
			<div className=" w-full  ">
				<Label
					value="Network properties"
					className="text-xl font-semibold text-[#666666] py-4"
				/>
			</div>
			<div className="w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24">
				<div className="">
					<Label
						value="Topology"
						className="text-base text-[##333333]"
					/>
					<select
						className="bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setTopology(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: '1' },
							{ name: 'WIFI', value: '2' },
							{ name: 'Bluetooth', value: '3' },
							{ name: 'Cellular', value: '4' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            //labelValue={topology}
            selectOptions={[
              { name: "RF", value: "RF" },
              { name: "WIFI", value: "WIFI" },
              { name: "Bluetooth", value: "Bluetooth" },
              { name: "Cellular", value: "Cellular" },
            ]}
            labelWrapperClass="text-left w-full"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-56 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setTopology(value)}
            // selectedValue={}
            placeholder="Master - slave"
          // extraBtn={extraBtn}
          /> */}
				</div>

				<div className="">
					<Label
						value="Master"
						className="text-base text-[##333333] mr-1"
					/>
					<select
						className="bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setMaster(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: '1' },
							{ name: 'WIFI', value: '2' },
							{ name: 'Bluetooth', value: '3' },
							{ name: 'Cellular', value: '4' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            // labelValue={master}
            selectOptions={[
              { name: "RF", value: "1" },
              { name: "WIFI", value: "2" },
              { name: "Bluetooth", value: "3" },
              { name: "Cellular", value: "4" },
            ]}
            labelWrapperClass="text-left w-full"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setMaster(value)}
            // selectedValue={}
            placeholder="Car"
          // extraBtn={extraBtn}
          /> */}
				</div>
			</div>
			<Label
				value="Network Frequency"
				className="text-base text-[##333333] my-2 2xl:mt-6"
			/>
			<div className="w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24">
				<div className="flex items-center w-full ">
					<Label
						value="Type"
						className="text-base text-[##333333] "
					/>
					<select
						className="lg:ml-4 bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setNetworkType(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: 'RF' },
							{ name: 'Cellular', value: 'CELLULAR' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            // labelValue={networkType}
            selectOptions={[
              { name: "RF", value: "RF" },
              { name: "Cellular", value: "Cellular" },
            ]}
            labelWrapperClass="text-left w-full"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setNetworkType(value)}
            // selectedValue={}
            placeholder="RF"
          // extraBtn={extraBtn}
          /> */}
				</div>
				<div className="flex items-center">
					<Label
						value="Freq."
						className="text-base text-[##333333] "
					/>
					<select
						className="lg:ml-4 bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setNetworkFrequency(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: '1' },
							{ name: 'WIFI', value: '2' },
							{ name: 'Bluetooth', value: '3' },
							{ name: 'Cellular', value: '4' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            // labelValue={networkFrequency}
            selectOptions={[
              { name: "RF", value: "1" },
              { name: "WIFI", value: "2" },
              { name: "Bluetooth", value: "3" },
              { name: "Cellular", value: "4" },
            ]}
            labelWrapperClass="text-left w-full"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setNetworkFrequency(value)}
            // selectedValue={}
            placeholder="433 MHz"
          // extraBtn={extraBtn}
          /> */}
				</div>
			</div>
			<Label
				value="Add repiter"
				className="text-base mt-2 2xl:mt-6 text-[##333333]"
			/>
			<div className="w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24">
				<select
					className="bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
					onChange={(e) => setNetworkRepeater(e.target.value)}
					name=""
					id=""
				>
					{[
						{ name: 'Select', value: '' },
						{ name: '0', value: '0' },
						{ name: '1', value: '1' },
						{ name: '2', value: '2' },
						{ name: '4', value: '4' },
						{ name: '5', value: '5' },
						{ name: '6', value: '6' },
						{ name: '7', value: '7' },
						{ name: '8', value: '8' },
						{ name: '9', value: '9' },
						{ name: '10', value: '10' },
					].map((val: any) => (
						<option
							value={val.value}
							key={val.value}
						>
							{val.name}
						</option>
					))}
				</select>
				{/* <CustomDropDownMenu
          // labelValue={networkRepeater}
          selectOptions={[
            { name: "0", value: "0" },
            { name: "1", value: "1" },
            { name: "2", value: "2" },
            { name: "4", value: "4" },
            { name: "5", value: "5" },
            { name: "6", value: "6" },
            { name: "7", value: "7" },
            { name: "8", value: "8" },
            { name: "9", value: "9" },
            { name: "10", value: "10" },
          ]}
          labelWrapperClass="text-left w-full"
          inputClasses={FORMINPUT + " 2xl:text-base"}
          labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
          labelClasses="w-full font-sans text-gray-700 pb-2"
          dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
          onChange={(value) => setNetworkRepeater(value)}
          // selectedValue={}
          placeholder="0"
        // extraBtn={extraBtn}
        /> */}
				<div className=""></div>
			</div>

			<Label
				value="Cloud"
				className="text-base my-2 2xl:mt-6 text-[##333333]"
			/>
			<div className="w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24">
				<div className="flex items-center">
					<Label
						value="Type"
						className="text-base text-[##333333]"
					/>
					<select
						className="lg:ml-4 bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setCloudType(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: '1' },
							{ name: 'WIFI', value: '2' },
							{ name: 'Bluetooth', value: '3' },
							{ name: 'Cellular', value: '4' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            // labelValue={cloudType}
            selectOptions={[
              { name: "RF", value: "RF" },
              { name: "WIFI", value: "WIFI" },
              { name: "Bluetooth", value: "Bluetooth" },
              { name: "Cellular", value: "Cellular" },
            ]}
            labelWrapperClass="text-left w-full col-span-2"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setCloudType(value)}
            // selectedValue={}
            placeholder="IDEEZA"
          // extraBtn={extraBtn}
          /> */}
				</div>
				<div className="flex items-center mt-1">
					<Label
						value="Name"
						className="text-base text-[#333333]"
					/>
					<input
						type="text"
						className={FORMINPUT + '  ml-4 py-1'}
						value={cloudName}
						onChange={(e) => setCloudName(e.target.value)}
					/>
				</div>
				<div className="flex items-center mt-1">
					<Label
						value="Pass"
						className="text-base text-[#333333]"
					/>
					<input
						type="password"
						className={FORMINPUT + '  ml-4'}
						value={cloudPass}
						onChange={(e) => setCloudPass(e.target.value)}
					/>
				</div>
				<div className="flex items-center mt-1">
					<Label
						value="Sensor"
						className="text-base text-[#333333]"
					/>
					<select
						className="lg:ml-[14px] bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => setCloudSensors(e.target.value)}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'temperature', value: 'temperature' },
							{ name: 'touch', value: 'touch' },
							{ name: 'magnetic', value: 'magnetic' },
							{ name: 'audio', value: 'audio' },
							{ name: 'light', value: 'light' },
							{ name: 'photoresistor', value: 'photoresistor' },
							{ name: 'soil moisture', value: 'soil moisture' },
							{ name: 'humidity', value: 'humidity' },
							{ name: 'audio', value: 'audio' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>

					{/* <CustomDropDownMenu
            // labelValue={cloudSensors}
            selectOptions={[
              { name: "temperature", value: "temperature" },
              { name: "touch", value: "touch" },
              { name: "magnetic", value: "magnetic" },
              { name: "audio", value: "audio" },
              { name: "light", value: "light" },
              { name: "photoresistor", value: "photoresistor" },
              { name: "soil moisture", value: "soil moisture" },
              { name: "humidity", value: "humidity" },
              { name: "audio", value: "audio" },
            ]}
            labelWrapperClass="z"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm  text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 "
            dropDownClasses="origin-top-right w-36 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setCloudSensors(value)}
            // selectedValue={}
            placeholder="Temperature"
          // extraBtn={extraBtn}
          /> */}
				</div>
			</div>
			<div className="flex items-center justify-start my-4 2xl:mt-6">
				<Label
					value="Cellular gateway"
					className="text-base text-[##333333]"
				/>
				<CheckboxAtom
					checked={cellularGateway}
					onChange={() => setCellularGateway(!cellularGateway)}
				/>
			</div>
			<div className="w-full 2xl:w-11/12 grid lg:grid-cols-2 gap-4 lg:gap-x-8 2xl:gap-x-24">
				<div className="flex items-center">
					<Label
						value="Freq."
						className="text-base text-[##333333]"
					/>
					<select
						className="ml-4 bg-[#FBFBFB] w-full focus:outline-none px-[15px] pt-[13px] pb-[16px] border border-[#E6E6E6] rounded-md"
						onChange={(e) => {
							setCloudFrequency(e.target.value);
						}}
						name=""
						id=""
					>
						{[
							{ name: 'Select', value: '' },
							{ name: 'RF', value: '1' },
							{ name: 'WIFI', value: '2' },
							{ name: 'Bluetooth', value: '3' },
							{ name: 'Cellular', value: '4' },
						].map((val: any) => (
							<option
								value={val.value}
								key={val.value}
							>
								{val.name}
							</option>
						))}
					</select>
					{/* <CustomDropDownMenu
            // labelValue={cloudFrequency}
            selectOptions={[
              { name: "RF", value: "1" },
              { name: "WIFI", value: "2" },
              { name: "Bluetooth", value: "3" },
              { name: "Cellular", value: "4" },
            ]}
            labelWrapperClass="text-left w-full"
            inputClasses={FORMINPUT + " 2xl:text-base"}
            labelBtnClasses="inline-flex w-full rounded-md shadow-sm py-2 text-sm font-medium focus:outline-none text-gray-700"
            labelClasses="w-full font-sans text-gray-700 pb-2"
            dropDownClasses="origin-top-right w-28 max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
            onChange={(value) => setCloudFrequency(value)}
            // selectedValue={}
            placeholder="433 MHz"
          // extraBtn={extraBtn}
          /> */}
				</div>
			</div>
			<div className="w-full mt-[19px] pb-[24px] flex justify-center">
				<Button
					onClick={() =>
						props.setNetworkStep ? props.setNetworkStep((prev: number) => prev - 1) : ''
					}
					value="Back"
					variant="outlined"
					className="text-white bg-primary pl-[122px] pr-[127px] pt-[11px] pb-[15px] text-lg mr-[21px]"
				/>
				<Button
					loading={isLoading}
					value="Next"
					onClick={() => postNetwork()}
					variant="outlined"
					className="text-white bg-primary pl-[122px] pr-[127px] pt-[11px] pb-[15px] text-lg"
				/>
			</div>
		</div>
	);
};

export default NetworkProperties;
