import { Component } from 'react';

const getNumbers = () => {

};

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    attempts: [],
  };

  onSubmitForm = () => {};

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