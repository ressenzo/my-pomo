import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const SMALL_INTERVAL_TIME: number = 2;
	const SMALL_INTERVAL_QUANTITY: number = 3;
	const LONG_INTERVAL_TIME: number = 4;
	const LONG_INTERVAL_QUANTITY: number = 1;

	const IN_ACTION_TIME: number = 5;
	
	const FULL_CYCLE_INTERVAL_QUANTITY: number = SMALL_INTERVAL_QUANTITY + LONG_INTERVAL_QUANTITY;

	const [inActionQuantity, setInActionQuantity] = useState<number>(0);
	const [intervalQuantity, setIntervalQuantity] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [isInterval, setIsInterval] = useState<boolean>(false);

	useEffect(() => {
		
		if (inActionQuantity > 0) {
			if (time === 0) return;

			const interval = setInterval(() => {
				setTime(p => p -1);
			}, 1000)
			
			return () => clearInterval(interval);
		}
	}, [time])

	const startTime = () => {
		if (intervalQuantity == 0 || !isInterval)
		{
			setIsInterval(true);
			setInActionQuantity(qtt => qtt + 1);
			setTime(IN_ACTION_TIME);
			return;
		}

		setIsInterval(false);
		if (inActionQuantity % 4 === 0)
			setTime(LONG_INTERVAL_TIME);
		else
			setTime(SMALL_INTERVAL_TIME);
		// if (intervalQuantity % 4 === 0) {
		// 	setTime(SMALL_INTERVAL_TIME);
		// }
	}

	return (
		<div className="App">
			<h1>Hello</h1>
			<h1>{time}</h1>
			<h1>Small intervals: {intervalQuantity - Math.floor(intervalQuantity / FULL_CYCLE_INTERVAL_QUANTITY)}</h1>
			<h1>Long intervals: {Math.floor(intervalQuantity / FULL_CYCLE_INTERVAL_QUANTITY)}</h1>
			<h1>Intervals: {intervalQuantity}</h1>
			<button onClick={() => startTime()}>Start</button>
		</div>
	);
}

export default App;
