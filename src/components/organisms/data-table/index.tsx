import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface TableContainerProps {
	children?: React.ReactNode;
}

interface TableRowProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?(): void;
}

interface TableHeaderProps {
	children?: React.ReactNode;
	className?: string;
}

interface TableHeadProps {
	children?: React.ReactNode;
	onClick?(): void;
	className?: string;
}

interface TableDataProps {
	children?: React.ReactNode;
	className?: string;
	onClick?(): void;
}

interface TableBodyProps {
	children?: React.ReactNode;
}

interface TableFooterProps {
	children?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
	table: {
		width: '100%',
		border: '1px solid #E6E6E6',
		borderRadius: '5px',
		paddingTop: '22px',

		'& td, th': {
			// border: '1px solid #000000',
			padding: 5,
			textAlign: 'left',
		},
	},
}));

const DataTable = {
	Container: (props: TableContainerProps) => {
		const classes = useStyles();

		return <table className={classes.table}>{props?.children}</table>;
	},

	Row: (props: TableRowProps) => (
		<tr
			onClick={props.onClick}
			style={props.style}
			{...props}
		>
			{props?.children}
		</tr>
	),

	Header: (props: TableHeaderProps) => <thead {...props}>{props?.children}</thead>,

	Head: (props: TableHeadProps) => (
		<th
			{...props}
			onClick={props.onClick}
		>
			{props?.children}
		</th>
	),

	Body: (props: TableBodyProps) => <tbody>{props?.children}</tbody>,

	Data: (props: TableDataProps) => <td {...props}>{props?.children}</td>,

	Footer: (props: TableFooterProps) => <tfoot>{props?.children}</tfoot>,
};

export default DataTable;
