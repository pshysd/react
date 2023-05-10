const React = require('react');
const { useState, useRef } = React;
const GuGuDan = () => {
  // 밑에 얘네들은 무조건 컴포넌트 안에 넣어줘야 함
  const [firstNum, setFirstNum] = useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === firstNum * secondNum) {
      setResult(`정답: ${value}`);
      setFirstNum(Math.ceil(Math.random() * 9));
      setSecondNum(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();
    } else {
      setResult(`${value}?? 구구단도 못하는데 무슨 리액트`);
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        {firstNum} 곱하기 {secondNum}는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} type="text" value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
