## 여러 개의 input 상태 관리하기

input의 개수가 여러 개가 됐을 때는 단순히 `useState`를 여러 번 사용하고 `onChange`도 여러 개 만들어서 구현하는게 아니라

input에 name을 설정하고 이벤트가 발생했을 때 이 값을 참조해야 함.

`useState`에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 함.

**InputSample.js**

```js
import React from 'react';
import { useState } from 'react';

const InputSample = () => {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: '',
    -> inputs에 name, nickname이라는 property 초기화
	});
	const { name, nickname } = inputs; -> 객체 구조분해 할당으로 추출

	const onChange = (e) => {
		const { value, name } = e.target; -> 이벤트의 타겟으로 value, name 속성 추출
		setInputs({
			...inputs, 
      -> inputs spread한거 => inputs.name, inputs.nickname
			[name]: value,
      -> e.target.name: e.target.value
		});
	};

	const onReset = () => {
		setInputs({
			name: '',
			nickname: '',
		});
	};
	return (
		<div>
			<input type="text" name="name" placeholder="이름" onChange={onChange} value={name} />
			<input type="text" name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값: </b>
				{name} {nickname}
			</div>
		</div>
	);
};

export default InputSample;
```
