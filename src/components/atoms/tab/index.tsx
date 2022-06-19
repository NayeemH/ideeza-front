import React from 'react';
import { Tab as TabItem } from '@mui/material';
import Proptype from 'prop-types';
function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
function Tab(props: any) {
	const { index } = props;
	return (
		<TabItem
			{...props}
			{...a11yProps(index)}
		/>
	);
}
Tab.defaultProps = {
	classes: () => {
		return {
			root: 'w-1/2',
		};
	},
	disabled: false,
	disableFocusRipple: false,
	wrapped: false,
};
Tab.prototype = {
	classes: Proptype.object,
	label: Proptype.element,
	icon: Proptype.element,
	value: Proptype.string,
	disableRipple: Proptype.bool,
};

export default Tab;
