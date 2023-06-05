import React from 'react';

const Hello = ({ color, name, isSpecial }) => {
	return (
		<div style={{ color: color }}>
			{isSpecial && <b>*</b>}
			{name}
		</div>
	);
};

Hello.defaultProps = {
	name: '이름없음',
};

export default Hello;
