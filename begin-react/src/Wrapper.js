import React from 'react';

const Wrapper = ({ children }) => {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };

  return (
    <div style={style}>
      {children} {/* 내부의 내용이 보여지게 하기 위해서는 props.children을 렌더링해줘야함 */}
    </div>
  );
};

export default Wrapper;
