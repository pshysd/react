/* 액션 타입 만들기 */
// Ducks 패턴에서는 액션 이름에 접두사를 넣는다. (다른 모듈과 액션 이름이 중복되는 것을 방지하기 위해)
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* State 초기화 */
const initialState = {
  number: 0,
  diff: 1
};

/* 리듀서 생성 */
const counter = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      };

    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      };

    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      };

    default:
      return state;
  }
};

export default counter;