import { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { decrement, increment, incrementAsync, selectCount } from './redux';

function Home() {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectCount);
	const [incrementAmount, setIncrementAmount] = useState('2');

	const incrementValue = Number(incrementAmount) || 0;

	// console.log('count', count);

	return (
		<div>
			<div>
				<button
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					-
				</button>
				<span>{count}</span>
				<button
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					+
				</button>
			</div>
			<div>
				<input
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={(e) => setIncrementAmount(e.target.value)}
				/>
				<button onClick={() => dispatch(incrementAsync(incrementValue))}>Add Async</button>
			</div>
		</div>
	);
}

export default Home;
