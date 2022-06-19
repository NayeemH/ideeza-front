import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuill: any = dynamic(() => import('react-quill'), {
	ssr: false,
});

// const ImageResize: any = dynamic(() => import('quill-image-resize-module-react'), { ssr: false });
// import ImageResize from 'quill-image-resize-module-react';

import 'react-quill/dist/quill.bubble.css';

type Props = {
	defaultValue?: string;
	action: (e: any) => void;
	placeholder?: string;
	ref?: any;
	height?: string;
};

const TextEditor = (props: Props) => {
	const { defaultValue, action, placeholder, height } = props;

	const [text, setText] = useState(defaultValue);

	useEffect(() => {
		setText(defaultValue);
	}, [defaultValue]);

	// useEffect(() => { action(text) }, [text]);

	// console.log('2.1. Editor DefaultValue----------', defaultValue)
	// console.log('2.2. Editor text----------', text)

	// const formats = ['bold', 'italic', 'underline', 'list', 'bullet'];
	// const modules = {
	// 	toolbar: {
	// 		container: '#toolbar',
	// 	},
	// };

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
		'align',
	];

	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			[{ align: 'justify' }, { align: 'right' }, { align: 'center' }],
			['link', 'image', 'video'],
			['clean'],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
		// imageResize: {
		// 	// parchment: Quill.import('parchment'),
		// 	modules: ['Resize', 'DisplaySize']
		// }
	};

	const handleChange = (value: string): void => {
		// console.log(value);
		setText(value);
		action(value);
	};

	return (
		<>
			<Box
			// sx={{
			// 	svg: {
			// 		display: 'inline-block !important',
			// 	},
			// }}
			>
				{/* <div className="flex justify-between bg-gray-200 rounded-t">
					<div
						id="toolbar"
						className="ql-toolbar ql-snow"
					>
						<button
							className="ql-bold"
							type="button"
						></button>
						<button
							className="ql-italic"
							type="button"
						>
							<span className="icon">
								<svg viewBox="0 0 18 18">
									{' '}
									<line
										className="ql-stroke"
										x1="7"
										x2="13"
										y1="4"
										y2="4"
									></line>{' '}
									<line
										className="ql-stroke"
										x1="5"
										x2="11"
										y1="14"
										y2="14"
									></line>{' '}
									<line
										className="ql-stroke"
										x1="8"
										x2="10"
										y1="14"
										y2="4"
									></line>{' '}
								</svg>
							</span>
						</button>
						<button
							className="ql-underline"
							type="button"
						>
							<span className="icon">
								<svg viewBox="0 0 18 18">
									{' '}
									<path
										className="ql-stroke"
										d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
									></path>{' '}
									<rect
										className="ql-fill"
										height="1"
										rx="0.5"
										ry="0.5"
										width="12"
										x="3"
										y="15"
									></rect>{' '}
								</svg>
							</span>
						</button>
						<button
							className="ql-list"
							value="ordered"
							type="button"
						>
							<svg viewBox="0 0 18 18">
								{' '}
								<line
									className="ql-stroke"
									x1="7"
									x2="15"
									y1="4"
									y2="4"
								></line>{' '}
								<line
									className="ql-stroke"
									x1="7"
									x2="15"
									y1="9"
									y2="9"
								></line>{' '}
								<line
									className="ql-stroke"
									x1="7"
									x2="15"
									y1="14"
									y2="14"
								></line>{' '}
								<line
									className="ql-stroke ql-thin"
									x1="2.5"
									x2="4.5"
									y1="5.5"
									y2="5.5"
								></line>{' '}
								<path
									className="ql-fill"
									d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
								></path>{' '}
								<path
									className="ql-stroke ql-thin"
									d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
								></path>{' '}
								<path
									className="ql-stroke ql-thin"
									d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
								></path>{' '}
							</svg>
						</button>
						<button
							className="ql-list"
							value="bullet"
							type="button"
						>
							viewBox="0 0 18 18"
						</button>
					</div>
				</div> */}
				<ReactQuill
					value={text}
					theme="bubble"
					onChange={handleChange}
					formats={formats}
					modules={modules}
					style={{ height: height || '300px' }}
					placeholder={placeholder}
				/>
			</Box>
			{/* <ReactQuill
				value={text}
				theme='bubble'
				onChange={handleChange}
				formats={formats}
				modules={modules}
				style={{ height: height || '300px' }}
				placeholder={placeholder}
			/> */}
		</>
	);
};

export default TextEditor;
