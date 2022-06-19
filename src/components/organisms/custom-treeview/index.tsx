import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ICustomTreeViewProps {
	onClick?(): void;
	title: string;
}
const CustomTreeView: React.FC<ICustomTreeViewProps> = (props) => {
	const [expanded, setExpanded] = useState(false);

	function getValidChildren(children: any) {
		const array = React.Children.toArray(children).filter((child) =>
			React.isValidElement(child)
		) as React.ReactElement[];
		return array.length > 0;
	}

	return (
		<React.Fragment>
			<div
				style={{
					padding: '2px 10px',
					cursor: 'pointer',
					background: expanded ? '#ffe2f9' : '#ffffff',
					userSelect: 'none',
				}}
				onClick={() => {
					if (props.children && getValidChildren(props.children)) {
						setExpanded(!expanded);
					} else {
						if (props.onClick) {
							props.onClick();
						}
					}
				}}
			>
				<span style={{ verticalAlign: 'middle', display: 'inline-block' }}>
					{props.children && getValidChildren(props.children) ? (
						!expanded ? (
							<KeyboardArrowRightIcon />
						) : (
							<KeyboardArrowDownIcon />
						)
					) : null}
				</span>
				<span
					style={{
						verticalAlign: 'middle',
						display: 'inline-block',
						paddingLeft: props.children || getValidChildren(props.children) ? 0 : 24,
					}}
				>
					{props.title}
				</span>
			</div>

			{props.children && expanded && (
				<div style={{ paddingLeft: 20, marginTop: 4 }}>{props.children}</div>
			)}
		</React.Fragment>
	);
};

export default CustomTreeView;
