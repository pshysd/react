import { Component } from 'react';

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    attempts: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런!',
        attempts: [...this.state.attempts, { attempt: this.state.value, result: '홈런!' }]
      });

      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        attempts: [],
      });
    } else {
      const answerArray = this.state.value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.attempts.length >= 9) {
        this.setState({
          result: `졋음ㅉㅉ 정답알려줌 ${answer.join(',')}`
        });
        alert('게임을 다시 시작합니다');
        this.setState({
          value: '',
          answer: getNumbers(),
          attempts: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          attempts: [...this.state.attempts, { attempt: this.state.value, result: `${strike} 스트라이크, ${ball} 볼` }],
          value: '',
        });
      }
    }
  };

  onChangeInput = () => {};

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} defaultValue={this.state.value} onChange={onChangeInput} />
          <button></button>
        </form>
        <div>시도: {this.state.attempts.length}회</div>
        <ul>
          {this.state.attempts.map((attempt) => {
            return (
              <li key={attempt.id}>{attempt}</li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;