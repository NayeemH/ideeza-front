// import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
	defaultValue?: string;
	action: (e: any) => void;
	placeholder?: string;
	ref?: any;
	height?: any;
};

const TextEditorNew = (props: Props) => {
	const { defaultValue, action, placeholder, height } = props;

	// const [text, setText] = useState(defaultValue);

	// useEffect(() => {
	// 	setText(defaultValue);
	// }, [defaultValue]);
	// const initialValue = text ? text : placeholder;
	// console.log('text editor', text);

	// const handleChange = (value: string): void => {
	// 	setText(value);
	// 	action(text);
	// };

	return (
		<>
			<Editor
				textareaName="Body"
				initialValue={placeholder}
				value={defaultValue}
				apiKey={process.env.NEXT_PUBLIC_TEXT_EDITOR_API_KEY}
				init={{
					height: height || 300,
					menubar: false,
					branding: false,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
				onEditorChange={action}
			/>
		</>
	);
};

export default TextEditorNew;
