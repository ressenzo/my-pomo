import { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
	const IN_ACTION_TIME: number = 0.05;
	const SMALL_INTERVAL_TIME: number = 0.01666666666;
	const LONG_INTERVAL_TIME: number = 0.03333333333;

	const A_MINUTE_IN_SECONDS: number = 60;

	const [inActionQuantity, setInActionQuantity] = useState<number>(0);
	const [smallIntervalQuantity, setSmallIntervalQuantity] = useState<number>(0);
	const [longIntervalQuantity, setLongIntervalQuantity] = useState<number>(0);
	const [isInterval, setIsInterval] = useState<boolean>(false);

	const [remaining, setRemaining] = useState<number>(IN_ACTION_TIME * A_MINUTE_IN_SECONDS);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const pad = (n: number) => String(n).padStart(2, '0');
	const minutesPart = pad(Math.floor(remaining / 60));
	const secordsPart = pad(remaining % 60);

	useEffect(() => {
		if (!isRunning) {
			if (intervalRef.current)
				clearInterval(intervalRef.current);
			return;
		}

		intervalRef.current = setInterval(() => {
			setRemaining(prev => {
				if (prev <= 1) {
					clearInterval(intervalRef.current!);
					setIsRunning(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalRef.current!);
	}, [isRunning])

	const startTime = () => {
		setIsRunning(true);
		if (isInterval && inActionQuantity % 4 === 0) {
			setRemaining(LONG_INTERVAL_TIME * A_MINUTE_IN_SECONDS);
			setLongIntervalQuantity(v => v + 1);
		} else if (isInterval) {
			setRemaining(SMALL_INTERVAL_TIME * A_MINUTE_IN_SECONDS);
			setSmallIntervalQuantity(v => v + 1);
		} else {
			setRemaining(IN_ACTION_TIME * A_MINUTE_IN_SECONDS);
			setInActionQuantity(v => v + 1);
		}
		setIsInterval(v => !v);
	}

	// const stopTime = () => setRunning(false);

	return (
		<div className="App">
			<h1>In action quantity: {inActionQuantity}</h1>
			<h1>Small intervals: {smallIntervalQuantity}</h1>
			<h1>Long intervals: {longIntervalQuantity}</h1>
			<button disabled={isRunning} onClick={() => startTime()}>Start</button>
			<h1>{minutesPart}:{secordsPart}</h1>
		</div>
	);
}

export default App;
