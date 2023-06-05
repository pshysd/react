**Hello.js**

```js
import React from 'react'; // 리액트 불러옴

const Hello = () => {
	return <div>안녕하세요.</div>;
};

export default Hello; // Hello 컴포넌트를 내보냄
```

<br><br>

**App.js**

```js
import React from 'react';
import Hello from './Hello';

const App = () => {
	return (
		<>
			<Hello />
			<Hello />
			<Hello />
			// 같은 컴포넌트 여러 개 만들어도 각각 개별로 동작한다
		</>
	);
};

export default App;
```
