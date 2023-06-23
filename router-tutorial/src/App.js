import { Route, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import MyPage from './pages/MyPage';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/profiles/:username" element={<Profile />} />
			</Route>
			<Route path="/articles" element={<Articles />}>
				<Route path="/articles/:id" element={<Article />} />
			</Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/mypage" element={<MyPage />}></Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
