import Label from '@atoms/label';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ServiceCertificateAdditionalInfo = () => {
	return (
		<div>
			<div className="w-full flex justify-between p-4 ">
				<div className="flex flex-col content-between">
					<Label
						value="Services"
						className="text-xl font-bold"
					/>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="Pick up"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="ship"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="3D modeling"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="Geometry Optimization"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
				</div>
				<div className="bg-gray-300 h-32 md:h-40 w-[2px]"></div>
				<div className="mr-4">
					<Label
						value="Certifications"
						className="text-xl font-bold"
					/>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="ISO 9001:2008"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="ISO 13485:2003"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="AS/EN/JISQ 9100:2009 (Rev C)"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
					<div className=" flex items-center">
						<AiOutlineCheckCircle className="text-primary" />
						<Label
							value="ISO 9001:2015"
							className="text-base md:text-xl md:ml-1  text-gray-400"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCertificateAdditionalInfo;
