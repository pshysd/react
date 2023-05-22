import React, { useRef, useState } from 'react';

const InputSample = () => {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: '',
	});

	const { name, nickname } = inputs; // 비구조화할당을 통해 값 추출

	const onChange = (e) => {
		const { value, name } = e.target; // e.target에서 name,과 value 추출
		setInputs({
			...inputs, // 기존의 input들 복사
			[name]: value, // name 키를 가진 값을 value로 설정
		});
	};

	const nameInput = useRef();

	const onReset = () => {
		setInputs({
			name: '',
			nickname: '',
		});
		nameInput.current.focus();
	};

	return (
		<div>
			<input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
			<input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값:</b>
				{name} ({nickname})
			</div>
		</div>
	);
};

export default InputSample;
