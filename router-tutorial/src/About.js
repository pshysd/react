import { Link, useSearchParams } from 'react-router-dom';

const About = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const detail = searchParams.get('detail');
	const mode = searchParams.get('mode');

	const onToggleDetail = () => {
		setSearchParams({ mode, detail: detail === 'true' ? false : true });
	};

	const onIncreaseMode = () => {
		const nextMode = mode === null ? 1 : parseInt(mode) + 1;
		setSearchParams({mode: nextMode, detail})
	}
	return (
		<div>
			<h1>About</h1>
			<p>about Page</p>
			<p>detail: {detail}</p>
			<p>mode: {mode} </p>
			<button onClick={onToggleDetail} >Toggle detail</button>
			<button onClick={onIncreaseMode} >mode + 1</button>
			<br />
		</div>
	);
};

export default About;
