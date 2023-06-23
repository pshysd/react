import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
	const navigate = useNavigate();

	const goBack = () => {
		// 이전 페이지로
		navigate(-1);
	};

	const goArticles = () => {
		// articles 경로로 이동
		navigate('/articles', { replace: true });
	};

	const goHome = () => {
		navigate('/');
	};
	return (
		<div>
			<header style={{ background: 'lightgrey', padding: 16, fontSize: 24 }}>
				<button onClick={goBack}>뒤로가기</button>
				<button onClick={goArticles}>게시글 목록</button>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<button onClick={goHome}>홈으로</button>
			</footer>
		</div>
	);
};

export default Layout;
