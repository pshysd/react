## input 상태관리

input 태그의 상태 관리하는 방법

**InputSample.js** 파일 만들기

```js
import React from 'react';

function InputSample() {
	return (
		<div>
			<input />
			<button>초기화</button>
			<div>
				<b>값:</b>
			</div>
		</div>
	);
}

export default InputSample;
```

**App.js**에 렌더링

```js
import React from 'react';
import InputSample from './InputSample';

const App = () => {
	return <InputSample />;
};

export default App;
```

input에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 값이 비워지도록 구현

**InputSample.js**

```js
import React, { useState } from 'react';

const InputSample = () => {
	const [text, setText] = useState('');

	const onChange = (e) => { <- 이벤트 객체 e
		setText(e.target.value);
	};
	const onReset = () => {
		setText('');
	};
	return (
		<div>
			<input onChange={onChange} value={text} />
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값: {text}</b>
			</div>
		</div>
	);
};

export default InputSample;
```
