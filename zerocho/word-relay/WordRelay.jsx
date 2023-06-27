import React, { Component, useRef, useState } from 'react';


const WordRelay = () => {
	const [word, setWord] = useState('감자');
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');

	const inputRef = useRef(null);

	const onChangeInput = (e) => setValue(e.target.value);

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === value[0]) {
			setResult('정답');
			setWord(value);
			setValue('');
			inputRef.current.focus();
		} else {
			setResult('틀렷다 ㅉㅉ');
			setValue('');
			inputRef.current.focus();
		}
	};

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input type="text" value={value} ref={inputRef} onChange={onChangeInput} />
				<button>입력!</button>
			</form>
			<div>{result}</div>
		</>
	);
};

export default WordRelay;
