import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const IN_ACTION_TIME: number = 5;
	const SMALL_INTERVAL_TIME: number = 2;
	const LONG_INTERVAL_TIME: number = 4;
	
	const [inActionQuantity, setInActionQuantity] = useState<number>(0);
	const [smallIntervalQuantity, setSmallIntervalQuantity] = useState<number>(0);
	const [longIntervalQuantity, setLongIntervalQuantity] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [isInterval, setIsInterval] = useState<boolean>(false);

	useEffect(() => {
		if (time === 0) return;

		const interval = setInterval(() => {
			setTime(v => v - 1);
		}, 1000)
		
		return () => clearInterval(interval);
	}, [time])

	const startTime = () => {
		if (isInterval && inActionQuantity % 4 === 0) {
			setTime(LONG_INTERVAL_TIME);
			setIsInterval(false);
			setLongIntervalQuantity(v => v + 1);
		} else if (isInterval) {
			setTime(SMALL_INTERVAL_TIME);
			setIsInterval(false);
			setSmallIntervalQuantity(v => v + 1);
		} else {
			setInActionQuantity(v => v + 1);
			setTime(IN_ACTION_TIME);
			setIsInterval(true);
		}
	}

	return (
		<div className="App">
			<h1>Hello</h1>
			<h1>{time}</h1>
			<h1>In action quantity: {inActionQuantity}</h1>
			<h1>Small intervals: {smallIntervalQuantity}</h1>
			<h1>Long intervals: {longIntervalQuantity}</h1>
			<button onClick={() => startTime()}>Start</button>
		</div>
	);
}

export default App;
