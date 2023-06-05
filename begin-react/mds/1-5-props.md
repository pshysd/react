## props

어떠한 값을 **컴포넌트에게 전달해줘야 할 때** 사용

-> 부모 컴포넌트에서 자식 컴포넌트로 내려주는 값

-> 수정할 수 없다는 특징이 있음.(자식 입장에서 readonly)

**App.js**

```js
import React from 'react';
import Hello from './Hello';

const App = () => {
	return (
		<>
			<Hello name="react" /> <- name이라는 props를 전달
		</>
	);
};

export default App;
```

<br><br>

**Hello.js**

```js
import React from 'react';

const Hello = (props) => { <- props는 객체 형태로 전달된다.
	return <div>안녕하세요 {props.name}</div>;
};

export default Hello;
```

### 여러 개의 props, 비구조화 할당

**App.js**

```js
import React from 'react';
import Hello from './Hello';

const App = () => {
	return (
		<>
			<Hello name="react" color="red" /> <- red가 추가되었음
		</>
	);
};

export default App;
```

<br><br>

**Hello.js**

```js
import React from 'react';

function Hello(props) {
	return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>; <- props.어쩌고 props.저쩌고 자꾸 쓰기 귀찮음
}

export default Hello;
```

**Hello.js**

```js
import React from 'react';

const Hello = ({ color, name }) => { <- props는 객체라고 했으니 객체 구조분해 할당 했음
	return <div style={{color}}>안녕하세요 {name}</div>; <- {{color}} <- JSX 문법 안에 객체 {}
};

export default Hello;
```

### defaultProps로 기본값 설정

컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값을 설정

**Hello.js**

```js
import React from 'react';

const Hello = ({ color, name }) => {
	return <div style={{color}}>안녕하세요 {name}</div>;
};

Hello.defaultProps = {
	name: '이름없음',
};

export default Hello;
```

<br><br>

**App.js**

```js
import React from 'react';
import Hello from './Hello';

const App = () => {
	return (
		<>
			<Hello name="react" color="red" />
			<Hello color="Pink" /> <- 여기 name이 없으므로 '이름없음'이 들어감
		</>
	);
};

export default App;
```

### props.children

컴포넌트 태그 사이에 넣은 값을 조회할 때 사용

Wrapper.js 컴포넌트 생성

```js
import React from 'react';

function Wrapper({ children }) { <- props.children
	const style = {
		border: '2px solid black',
		padding: '16px',
	};
	return <div style={style}>{children}</div>; <- props.children
}

export default Wrapper;
```

**App.js**

```js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

const App = () => {
	return (
		<Wrapper>
			<Hello name="react" color="red" />
			<Hello color="Pink" />
		</Wrapper>
	);
};

export default App;
```
