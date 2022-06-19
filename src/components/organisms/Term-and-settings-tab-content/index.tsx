// import AvatarAtom from "@atoms/avatar";
import React from 'react';
import { IoDocumentTextSharp } from 'react-icons/io5';

const TermAndSettingsTabContent: React.FC<any> = () => {
	return (
		<>
			<div className="bg-white">
				<div className="grid grid-cols-12">
					<div className="col-span-8 pl-4 pt-[30px]">
						<h3 className="text-primary text-[22px] font-semibold ">Contract info</h3>
						<div className="py-[40px]">
							<div className="flex">
								<div className="w-1/2">
									<h5 className="text-base">Start Date</h5>
								</div>
								<div className="w-1/2">
									<h5 className="text-base">October 27, 2020</h5>
								</div>
							</div>
							<div className="mt-[20px]">
								<div className="w-1/2">
									<h5 className="text-base text-primary cursor-pointer">
										View history of contract changes
									</h5>
								</div>
							</div>
						</div>
						<hr />
						<div className="py-[40px]">
							<div className="flex">
								<div className="w-1/2">
									<h5 className="text-base">Hired By</h5>
								</div>
								<div className="w-1/2">
									<h5 className="text-base">Jone Hey</h5>
								</div>
							</div>
							<div className="flex mt-[20px]">
								<div className="w-1/2">
									<h5 className="text-base">Contract Person</h5>
								</div>
								<div className="w-1/2">
									<h5 className="text-base text-primary">Jone Hey</h5>
								</div>
							</div>
							<div className="flex mt-[20px]">
								<div className="w-1/2">
									<h5 className="text-base">Additional Terms</h5>
								</div>
								<div className="w-1/2">
									<h5 className="text-base text-primary">Escrow instructions</h5>
								</div>
							</div>
							<div className="flex mt-[20px]">
								<div className="w-1/2">
									<h5 className="text-base">Contract ID</h5>
								</div>
								<div className="w-1/2">
									<h5 className="text-base">25442988</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-4 bg-[#FAFAFA] my-[30px] mr-[20px] px-[70px] pt-[20px]">
						<h3 className="text-primary text-[22px] font-semibold ">
							Description of Work
						</h3>
						<div className="py-[20px]">
							<h5 className="text-base">Hi</h5>
							<h5 className="text-base">
								You need to translate our paten and all it's documents..
							</h5>
						</div>
						<div className="pb-[20px]">
							<h5 className="text-base text-primary">File1__pdf</h5>
							<h5 className="text-base text-primary">File2__jpeg</h5>
						</div>
						<hr />
						<div className="py-[20px]">
							<div className="flex items-center cursor-pointer">
								<IoDocumentTextSharp className="text-3xl text-primary" />
								<h5 className="text-base text-primary ml-2">
									View original job posting
								</h5>
							</div>
							<div className="flex items-center cursor-pointer mt-3">
								<IoDocumentTextSharp className="text-3xl text-primary" />
								<h5 className="text-base text-primary ml-2">
									Vew origianl proposal
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
TermAndSettingsTabContent.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default TermAndSettingsTabContent;
