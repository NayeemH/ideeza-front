import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';

const TableRowCheckbox = (props: any) => {
	const { isParentChecked } = props;

	const [checked, setChecked] = useState<boolean>(isParentChecked);

	useEffect(() => {
		setChecked(isParentChecked);
	}, [isParentChecked]);

	return (
		<CheckboxAtom
			checked={checked}
			onChange={(e: any) => setChecked(e.target.checked)}
		/>
	);
};

export default TableRowCheckbox;
