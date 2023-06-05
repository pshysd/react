## 조건부 렌더링

특정 조건에 따라 다른 결과물을 렌더링

Hello 컴포넌트에 isSpecial이라는 props를 설정

**App.js**

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

const App = () => {
	return (
		<Wrapper>
			<Hello name="react" color="red" isSpecial={true} />
			<Hello color="Pink" />
		</Wrapper>
	);
};

export default App;
```

1. 삼항 연산자 사용

**Hello.js**

```js
import React from 'react';

const Hello = ({ color, name, isSpecial }) => {
	return (
		<div style={{ color: color }}>
			{isSpecial ? <b>*</b> : null} {name} <- isSpecial이 true일 경우 '<b>* react</b>' 이렇게 렌더링 됨
		</div>
	);
};

Hello.defaultProps = {
	name: '이름없음',
};

export default Hello;
```

2. 단축평가 사용

**Hello.js**

```js
import React from 'react';

const Hello = ({ color, name, isSpecial }) => {
	return (
		<div style={{ color: color }}>
			{isSpecial && <b>*</b>} <- isSpecial이 true일 경우 <b>*</b> 반환, false일 경우에 평가를 멈추므로 아무것도 하지 않음
			{name}
		</div>
	);
};

Hello.defaultProps = {
	name: '이름없음',
};

export default Hello;
```

### props 값 설정을 생략하면 ={true}

컴포넌트의 props 값을 설정하게 될 때 만약 props 이름만 작성하고 값 설정을 생략한다면, `true`로 설정한 것으로 간주한다.

**App.js**

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

const App = () => {
	return (
		<Wrapper>
			<Hello name="react" color="red" isSpecial /> <- isSpecial에 아무런 값 할당이 되어있지 않음
			<Hello color="Pink" />
		</Wrapper>
	);
};

export default App;

```

`isSpecial`만 작성한다면 `isSpecial={true}`와 동일한 의미