import React from 'react';

const Hello = ({ name, color, isSpecial }) => {
  // 파라미터에 props가 들어감, 비구조화 할당으로 넣어줄 때 순서 상관없음 (당연)
  return (
    <div style={{ color: color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}.
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;
