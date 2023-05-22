- 컴포넌트를 만들고 중첩하는 방법
- 마크업과 스타일을 추가하는 방법
- 데이터를 표시하는 방법
- 조건과 리스트를 렌더링하는 방법
- 이벤트에 응답하고 화면을 업데이트하는 방법
- 컴포넌트 간에 데이터를 공유하는 방법

<br><br>

# 컴포넌트 생성 및 중첩하기

<br>

React 앱은 컴포넌트로 구성된다.

> 컴포넌트란?
>
> > 고유한 로직과 모양을 가진 UI의 일부
> >
> > > 그냥 버튼같은거, 기능이 담겨있는 요소 하나하나를 컴포넌트라고 부름

```js
function MyButton() {
 return (
 <button>I'm a button</button>;
  )
}
```

이제 MyButton을 선언했으므로 다른 컴포넌트 안에 중첩할 수 있다.

```js
export default function MyApp() {
	return (
		<div>
			<h1>Welcome to my App</h1>
			<MyButton />
		</div>
	);
}
```

- **React 컴포넌트의 이름은 항상 대문자로 시작해야 한다.**

- **HTML 태그의 이름은 항상 소문자로 시작해야 한다.**

- **`export default` 키워드는 파일의 기본 컴포넌트를 지정한다.**

<br>

# JSX로 마크업 작성하기

위에서 본 마크업 문법을 JSX라고 한다. 그냥 무조건 쓴다.

JSX는 HTML보다 엄격하다. `<br />`과 같이 태그를 무조건 닫아야 함.

컴포넌트는 여러 개의 JSX 태그를 반환할 수 없음 `<div></div>` 또는 `<></>`(Fragment)로 감싸야 한다.

```js
function AboutPage() {
	return (
		<>
			<h1></h1>
			<p>
				Hello there. <br />
				How do you do?
			</p>
		</>
	);
}
```

**_JSX로 변환할 HTML이 많을 경우 [온라인 변환기](https://transform.tools/html-to-jsx)를 사용할 수 있음._**

<br>

# 스타일 추가하기

React에서는 className으로 CSS class를 지정한다. (== HTML의 class)

`<img className="avatar" />`

그 다음 별도의 CSS 파일에 대한 해당 CSS 규칙을 작성한다.

```css
/* in your CSS */
.avatar {
	background-image: url('asdasdasdasd');
}
```

React에서 CSS 파일을 추가하는 방법을 규정하지는 않는다.

<br>

# 데이터 표시하기

JSX를 사용하면 자바스크립트에 마크업(HTML)을 넣을 수 있다. 중괄호를 사용하면 코드에서 일부 변수를 삽입하여 사용자에게 자바스크립트로 _이스케이프 백_ 할 수 있음

```js
return <h1>{user.name}</h1>;
```

<br>

JSX Attribute에서 따옴표 대신에 중괄호를 사용하여 자바스크립트로 _이스케이프 백_ 할 수도 있음

```js
return (
  <img
    className="avatar"
    src={user.imgURL}
  >
);
```

문자열 연결도 가능하다.

```js
const user = {
	name: 'Hedy Lamarr',
	imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
	imageSize: 90,
};

export default function Profile() {
	return (
		<>
			<h1>{user.name}</h1>
			<img
				className="avatar"
				src={user.imageUrl}
				alt={'Photo of ' + user.name}
				style={{
					width: user.imageSize,
					height: user.imageSize,
				}}
			/>
		</>
	);
}
```

위에서 **style={{...}}** 은 별거 아니고 그냥 객체 넣은거임

<br />

# 조건부 렌더링

React에서 조건문을 작성할 때는 일반적인 자바스크립트 조건문을 작성하면 된다.

```js
let content;
if (isLoggedIn) {
	content = <AdminPanel />;
} else {
	content = <LoginForm />;
}

return <div>{content}</div>;
```

더 줄이고 싶으면 삼항 연산자도 사용 가능하다.

```js
<div>
  {isLoggedIn ? (
    <AdminPanel />;
  ) : (
    <LoginForm />;
  )}
</div>
```

else 마저 필요 없다면 단축평가도 가능

```js
<div>{isLoggedIn && <AdminPanel />}</div>
// isLoggedIn이 true이면 <AdminPanel />이 리턴됨. false면 그냥 검사하고 끝
```

# 리스트 렌더링하기

컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map() 메서드를 사용한다

근데 map()쓰자

```js
const products = [
	{ title: 'Cabbage', id: 1 },
	{ title: 'Garlic', id: 2 },
	{ title: 'Apple', id: 3 },
];

const listItems = products.map((product) => {
	<li key={product.id}>{product.title}</li>;
});

return <ul>{listItems}</ul>;
```

`<li>`에 `key` attribute가 있는 것에 주목 해야한다.

목록의 각 항목에 대해, 형제 항목 사이에서 해당 항목을 고유하게 식별하는 문자열 또는 숫자를 전달해야 한다.

React는 나중에 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 Key를 사용한다.

<br>

# 이벤트에 응답하기

컴포넌트 내부에 이벤트 핸들러 함수를 선언하여 이벤트에 응답할 수 있다.

```js
function MyButton() {
	function handleClick() {
		alert('You Clicked Me ! ! !');
	}

	return <button onClick={handleClick}>click me</button>;
}
```

> `onClick={handleClick}`의 끝에 소괄호가 없다.
>
> > 소괄호를 붙일 시 함수를 호출해버리기 때문에 함수를 전달(등록)만 해주면 됨

<br>

# 화면 업데이트하기

컴포넌트가 특정 정보를 **기억**하여 표시하기를 원한다면 컴포넌트에 `State`를 추가한다.

```js
import { useState } from 'react';

function MyButton() {
	const [count, setCount] = useState(0); // 0은 초기값, 가져온 방법은 구조분해할당(distructuring)
}
```

`useState`로부터 현재 **State**`count`와 이를 업데이트할 수 있게 해주는 함수 `setCount`를 얻을 수 있다.

이름은 어떤 형식으로든 지정할 수 있지만, `[something, setSomething]` 형식이 일반적이다.

setCount를 사용하여 State를 업데이트 해봅시다

```js
function MyButton() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

버튼을 클릭하면 React가 `MyButton`을 다시 호출하여 count가 1이 되고, 다음엔 2가 되고 하는 식

**같은 컴포넌트를 여러 번 렌더링하면 각 컴포넌트는 고유의 State를 갖게 된다.**

=> 같은 이름이라고 공유 안함

# React Hooks 사용하기

`use`로 시작하는 함수를 `hook`이라고 부른다. `useState`는 React에서 제공하는 빌트인 훅이다.

다른 빌트인 훅은 [React API References](https://react-ko.dev/reference/react)에서 찾을 수 있다. Custom Hooks도 가능하다.

훅은 일반 함수보다 더 제한적이다.컴포넌트(또는 다른 훅)의 최상위 레벨에서만 훅을 호출할 수 있다.

조건문이나 반복문에서 `useState`를 사용하고 싶다면, 대신 새로운 컴포넌트를 추출하고 그 컴포넌트에 작성해야한다.

<br>

# 컴포넌트간 데이터 공유하기

이전 예제에서는 각각의 `MyButton`에 독립적인 `count`가 있고, 각 버튼을 클릭하면 클릭한 버튼의 `count`만 증가했었다.

그러나 데이터를 공유하고 함께 업데이트하기 위한 컴포넌트가 필요한 경우가 있다.

이런 경우엔 개별 버튼에서 모든 버튼이 포함된 가장 가까운 컴포넌트로 `state`를 **위쪽**으로 이동해야 한다.

```js
export default function MyApp() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div>
			<h1>Counters that update separately</h1>
			<MyButton />
			<MyButton />
		</div>
	);
}

function MyButton() {
	// 여기 있던 [count, setCount] ... 코드가 위의 MyApp 컴포넌트로 이동했다.
}
```

그다음 `MyApp`에서 `MyButton`으로 공유 클릭 핸들러와 함께 state를 전달한다. 이전에 `<img>`와 같은 빌트인 태그에서 했던 것처럼 JSX 중괄호를 사용하여 `MyButton`에 정보를 전달할 수 있다.

```js
export default function MyApp() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div>
			<h1>Counters that update together</h1>
			<MyButton count={count} onClick={handleClick} />
			<MyButton count={count} onClick={handleClick} />
		</div>
	);
}
```

이렇게 전달한 정보를 **props**라고 부른다.

이제 `MyApp` 컴포넌트에는 count state와 handleClick 이벤트 핸들러가 포함되어 있으며, 이 두 가지를 각 버튼에 props로 전달한다.

마지막으로, 부모 컴포넌트에서 전달한 props를 읽기 위해 `MyButton`을 변경한다.

```js
function MyButton({ count, onClick }) {
	return <button onClick={onClick}>Clicked {count} times</button>;
}
```

버튼을 클릭하면 `onClick` 핸들러가 실행된다.

각 버튼의 `onClick` **prop**은 `MyApp` 내부의 `handleClick` 함수로 설정되었으므로 그 안에 있는 코드가 실행된다.

이 코드는 `setCount(count+1)`를 호출하여 `count` state 변수를 증가시킨다.

새로운 `count`의 값은 각 버튼의 **prop**으로 전달되므로 모든 버튼에 새로운 값이 표시된다.

-> 이러한 방식이 **state 끌어올리기** -> 컴포넌트 간에 공유하는 방식

## 전체 코드

```js
import {useState} from 'react';

export default fuction MyApp() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count + 1);
  }

  return (
    <div>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  )
}

function MyButton({count, onClick}) {
  return (
    <button onClick={onClick}>
    Clicked {count} times
    </button>>
  )
}
```
