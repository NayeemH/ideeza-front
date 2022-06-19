import React from 'react';
import Proptype from 'prop-types';
function TabPanel(props: any) {
	const { className, children, value, index, ...other } = props;

	return (
		<div
			className={`bg-transparent ${className}`}
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}

TabPanel.prototype = {
	children: Proptype.node,
	index: Proptype.any.isRequired,
	value: Proptype.any.isRequired,
};
export default TabPanel;
