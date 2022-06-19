import { DialogTitle } from '@mui/material';
import { IoClose, IoHappySharp } from 'react-icons/io5';
import Dialog from '@mui/material/Dialog';
import { GrFacebook, GrLinkedin } from 'react-icons/gr';
import { useRef, useState } from 'react';
import Button from '@atoms/button';
import { Picker } from 'emoji-mart';

const ShareModalSocial = (props: any) => {
	const { onClose, open, messageValue, onChangeMessage, onSelectEmoji, onSubmit } = props;

	const [toggle, setToggle] = useState(false);

	const ref = useRef(null);

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
			<div className="flex gap-[20px] mb-[25px]">
				<GrFacebook
					size={40}
					color={'#475993'}
					className="rounded-[5px]"
				/>
				<GrLinkedin
					size={40}
					color={'#818181'}
					className="rounded-[5px]"
				/>
				<div className="">
					<img
						src="/images/logo/instagram.svg"
						alt="icon"
					/>
				</div>
				<div className="rounded-[5px]">
					<img
						src="/images/logo/twitter.svg"
						alt="icon"
					/>
				</div>
				<div className="rounded-[5px]">
					<img
						src="/images/logo/brand.svg"
						alt="icon"
					/>
				</div>
			</div>
			<div className="">
				<DialogTitle
					sx={{
						padding: '0',
					}}
				>
					<div className="font-bold font-proxima-nova text-primary text-[25px] leading-[43px] mb-[20px]">
						Share on Facebook
					</div>
				</DialogTitle>
			</div>
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
						className="absolute bottom-[80px]"
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
		</Dialog>
	);
};

export default ShareModalSocial;
