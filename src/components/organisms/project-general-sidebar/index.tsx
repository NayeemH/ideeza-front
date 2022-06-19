import Button from '@atoms/button';
import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SingleManuFactureWork from '@organisms/single-manufacture-work';
import { IoMdClose } from 'react-icons/io';
import SingleManuFactureWorkBottom from '@organisms/single-manufacture-work-bottom';
import SingleNotificationManuWork from '@organisms/single-notification-manu-work';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress
					variant="determinate"
					{...props}
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}
const ProjectGeneralSideBar: React.FC<any> = (props: any) => {
	const { handleLeftClose } = props;
	//   const [progress, setProgress] = React.useState(40);

	//   React.useEffect(() => {
	//     const timer = setInterval(() => {
	//       setProgress((prevProgress) =>
	//         prevProgress >= 40 ? 1 : prevProgress + 1
	//       );
	//     }, 100);
	//     return () => {
	//       clearInterval(timer);
	//     };
	//   }, []);
	return (
		<>
			<div className="p-[30px] project-progress-bar">
				<Button
					value="Add service +"
					className="text-white text-base 2xl:text-lg shadow-none flex ml-auto bg-primary capitalize px-10 py-2.5"
					color="primary"
				/>
				<div className="flex justify-between pt-2 items-center">
					<h5 className="text-[20px] font-semibold relative">
						Electronics
						<div className="w-3/5 h-1 absolute bg-primary"></div>
					</h5>

					<div className="flex">
						<span className="text-[25px]">{'<'}</span>
						<span className="text-[25px]">{'>'}</span>
					</div>
				</div>
				<Box sx={{ width: '100%', marginTop: '20px' }}>
					<LinearProgressWithLabel
						value={40}
						sx={{
							//   borderRadius: "23px",
							height: '40px',
							backgroundColor: '#fff',
							border: '1px solid #FF00C7',
						}}
					/>
				</Box>
				<div className="mt-[45px]">
					<h5 className="text-[20px] font-semibold relative">
						Manufacturers working on electronics:
						<div className="w-[70px] h-1 absolute bg-primary"></div>
					</h5>
					<div className="mb-[60px]">
						<div className="h-[245px] overflow-y-auto">
							<div className="my-3">
								<SingleManuFactureWork
									authorName="John Doe"
									authorPost="Google consultant"
									companyName="Google"
									companyPost="Dealer"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWork
									authorName="Alicia Berger"
									authorPost="Freelance Front-end"
									companyName="Microsoft"
									companyPost="PCB maker"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWork
									authorName="Piter Parker"
									authorPost="Back-end developer"
									companyName="Epic coders LTD"
									companyPost="Assembly"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWork
									authorName="Piter Parker"
									authorPost="Back-end developer"
									companyName="Epic coders LTD"
									companyPost="Assembly"
								/>
							</div>
						</div>
					</div>
					<div className="relative">
						<IoMdClose
							className="text-white bg-red-500 h-12 absolute left-[-30px] top-[-24px] px-1 w-8 rounded-r-2xl flex items-center justify-center cursor-pointer"
							onClick={handleLeftClose}
						/>
					</div>
					<div className="border-b-4 border-solid border-[#E0E0E0]"></div>
					<div className="py-[60px]">
						<div className="h-[245px] overflow-y-auto">
							<div className="my-3">
								<SingleManuFactureWorkBottom
									authorName="Natalia Roblox"
									authorPost="Frizty Studio LTD"
									AuthorType="Patent"
									img="/images/choose-your-avatar/avatar-project-manu-girl.png"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWorkBottom
									authorName="Teona London"
									authorPost="Frizty Studio LTD"
									AuthorType="Cloud service"
									img="/images/choose-your-avatar/avater-girl-second.png"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWorkBottom
									authorName="Alexander Prokelter"
									authorPost="Frizty Studio LTD"
									AuthorType="Marketing"
								/>
							</div>
							<div className="my-3">
								<SingleManuFactureWorkBottom
									authorName="Natalia Roblox"
									authorPost="Frizty Studio LTD"
									AuthorType="Patent"
								/>
							</div>
						</div>
					</div>
					<div className="pb-2">
						<h5 className="text-[20px] font-semibold relative">
							Notifications
							<div className="w-[70px] h-1 absolute bg-primary"></div>
						</h5>
						<div className="h-[330px] overflow-y-auto">
							<div className="my-[20px]">
								<SingleNotificationManuWork />
							</div>
							<div className="my-[20px]">
								<SingleNotificationManuWork />
							</div>
							<div className="my-[20px]">
								<SingleNotificationManuWork />
							</div>
							<div className="my-[20px]">
								<SingleNotificationManuWork />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
ProjectGeneralSideBar.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default ProjectGeneralSideBar;
