import { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import { Picker } from 'emoji-mart';
import { IoClose, IoHappySharp } from 'react-icons/io5';
import Button from '@atoms/button';

const ShareModalPublic = (props: any) => {
	const { open, onClose, messageValue, onChangeMessage, onSelectEmoji, onSubmit } = props;

	const ref = useRef(null);
	const [toggle, setToggle] = useState(false);

	return (
		<Dialog
			onClose={onClose}
			open={open}
			PaperProps={{
				style: {
					borderRadius: 20,
					padding: '20px',
					maxWidth: '1111px',
					width: '1111px',
				},
			}}
		>
			<div className="">
				<DialogTitle
					sx={{
						padding: '0',
					}}
				>
					<div className="font-bold font-proxima-nova text-primary text-[25px] leading-[43px] mb-[20px]">
						Share in news feed
					</div>
				</DialogTitle>
			</div>

			<div>
				<textarea
					rows={8}
					style={{ width: '100%' }}
					className="focus:outline-none pt-[25px] pl-[20px] md:placeholder-[#818181] text-[#333333] tracking-widest placeholder-opacity-100 font-proxima-nova text-[16px] leading-[42px] border rounded-[10px] font-semibold"
					placeholder="Write the text here..."
					value={messageValue}
					onChange={onChangeMessage}
				/>

				<div className="flex items-center w-full pr-1 justify-between mt-[20px] relative">
					{toggle && (
						<div
							className="absolute bottom-[80px] "
							ref={ref}
						>
							<Picker
								set="apple"
								onSelect={onSelectEmoji}
								style={{
									width: '600px',
									paddingTop: '25px',
									paddingLeft: '10px',
									paddingRight: '10px',
									zIndex: 5000,
								}}
							/>
							<IoClose
								className="text-[30px] text-red-500 absolute top-2 right-2"
								onClick={() => setToggle(!toggle)}
							/>
						</div>
					)}
					<IoHappySharp
						onClick={() => setToggle(!toggle)}
						className="text-[#1B2E50] text-[41px]"
					/>
					<Button
						type="submit"
						value="Share"
						className="text-white bg-primary transform-none rounded-[6px] text-[20px] font-proxima-nova tracking-tight py-[15px] px-[81px]"
						onClick={onSubmit}
					/>
				</div>
			</div>
		</Dialog>
	);
};

export default ShareModalPublic;
