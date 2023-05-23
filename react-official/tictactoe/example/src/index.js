// App.js 파일에서 만든 컴포넌트와 웹 브라우저 사이의 다리같은 역할을 한다.

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/* 
  필요한 모든 조각들을 한 곳으로 모음
  React
  웹 브라우저와 상호작용하는 React의 라이브러리 (React DOM)
  컴포넌트의 스타일
  App.js에서 만들어진 컴포넌트
 */
import App from './App';

/*
  모든 조각을 한데 모아 최종 결과물을 public 폴더의 index.html에 주입한다.
 */
const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
