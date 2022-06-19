import React, { useState } from 'react';
import IconsSide1 from '../icons-side-1';
import IconsSide2 from '../icons-side-2';
import IconsSide3 from '../icons-side-3';
import IconsSide4 from '../icons-side-4';
import IconsSide5 from '../icons-side-5';
import IconsSide6 from '../icons-side-6';
import IconsSide7 from '../icons-side-7';
import IconsSide8 from '../icons-side-8';
import IconsSide9 from '../icons-side-9';

function ElectronicIconBar() {
	const [state, setState] = useState('');

	const handleClick = (param: any) => {
		return setState(param);
	};
	return (
		<>
			<div className="bg-white rounded-b-lg shadow-lg flex justify-center space-x-2 px-4 pt-2">
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide1 />
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide2
						handleClick={handleClick}
						active={state}
					/>
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide3
						handleClick={handleClick}
						active={state}
					/>
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide4 />
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide5
						handleClick={handleClick}
						active={state}
					/>
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide6 handleClick={handleClick} />
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide7 />
					<hr className="h-3/4 border-r" />
				</div>
				<div className="flex justify-center space-x-2 w-full">
					<IconsSide8 />
					<hr className="h-3/4 border-r" />
				</div>
				<IconsSide9 />
			</div>
		</>
	);
}

export default ElectronicIconBar;
