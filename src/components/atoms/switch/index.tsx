import React from 'react';
import Proptype from 'prop-types';
import { Switch as Switches } from '@mui/material';
function Switch(props: any) {
	return <Switches {...props} />;
}
Switch.prototype = {
	required: Proptype.bool,
	value: Proptype.any,
	onChange: Proptype.func,
	checked: Proptype.bool,
	classes: Proptype.object,
	id: Proptype.string,
	size: Proptype.oneOf(['medium', 'small']),
};
export default Switch;
