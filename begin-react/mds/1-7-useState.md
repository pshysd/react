## useState를 통해 컴포넌트에서 바뀌는 값 관리하기

<br>
새로 컴포넌트 하나 만듦

**Counter.js**

```js
import React from 'react';

function Counter() {
	return (
		<div>
			<h1>0</h1>
			<button>+1</button>
			<button>-1</button>
		</div>
	);
}

export default Counter;
```

App.js에 렌더링

**App.js**

```js
import React from 'react';
import Counter from './Counter';

const App = () => {
	return <Counter />;
};

export default App;
```

### 이벤트 설정

**Counter.js**

```js
import React, { useState } from 'react';

const Counter = () => {
	const [number, setNumber] = useState(0); <- 배열 구조분해할당

	const onIncrease = () => {
		setNumber(number+1);
	};
	const onDecrease = () => {
		setNumber(number-1)
	};

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
		</div>
	);
};

export default Counter;
```

### 함수형 업데이트

- setNumber()에 number 대신 파라미터(여기서는 prevNumber라고 지었음)를 넘겨주면 기존 값을 어떻게 업데이트할 것인지에 대한 함수를 등록할 수 있다. (컴포넌트 최적화할 때 사용된다.)

**Counter.js**

```js
import React, { useState } from 'react';

const Counter = () => {
	const [number, setNumber] = useState(0);

	const onIncrease = () => {
		setNumber((prevNumber) => prevNumber + 1); <- setNumber(number + 1) => setNumber((prevNumber) => prevNumber + 1)로 바뀌었다.;
	};
	const onDecrease = () => {
		setNumber((prevNumber) => prevNumber - 1);
	};

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
		</div>
	);
};

export default Counter;
```
