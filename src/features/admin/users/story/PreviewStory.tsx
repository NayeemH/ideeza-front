import { useEffect, useState } from 'react';
// import TextEditor from '@organisms/editor/TextEditor';
import dynamic from 'next/dynamic';
const ReactQuill: any = dynamic(() => import('react-quill'), {
	ssr: false,
});
import { Box } from '@mui/material';
// import Label from '@atoms/label';

interface StoryPreviewProps {
	preview: { title: string; description: string };
}

const PreviewStory: React.FC<StoryPreviewProps> = (props) => {
	const [previewStory, setPreviewStory] = useState<{ title: string; description: string }>({
		title: '',
		description: '',
	});

	useEffect(() => {
		setPreviewStory(props.preview);
	}, [props.preview]);

	return (
		<div>
			<Box
				className="lg:col-span-4 col-span-3 bg-white p-5 mt-2 rounded-lg shadow-md overflow-y-auto"
				sx={{
					height: 500,
					backgroundColor: 'primary.dark',
					'&:hover': {
						backgroundColor: 'primary.main',
						opacity: [0.9, 0.8, 0.7],
					},
				}}
			>
				<h1
					className="text-center"
					style={{ fontSize: '5vw', fontWeight: 'bold' }}
				>
					{previewStory.title}
				</h1>
				<ReactQuill
					readOnly
					value={previewStory.description || ''}
					theme="bubble"
					// onChange={handleChange}
					// formats={formats}
					// modules={modules}
					// style={{ height: height || '300px' }}
					// placeholder={placeholder}
				/>
				{/* <TextEditor
                placeholder={'Type your description here...'}
                defaultValue={previewStory.description}
            /> */}
			</Box>
		</div>
	);
};

export default PreviewStory;
