const React = require('react');
const { useState, useRef } = React;

const WordChain = () => {
  const [word, setWord] = useState('성현');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('ㅇㅋ');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('한글도 모르는데 리액트를 하겠다고');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input type="text" ref={useRef} value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordChain;
