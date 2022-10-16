import './App.css';
import BoardGame from './BoardGame';

function App() {
  const celebrate = () => {
    alert('Done!');
  };

  return (
    <div className='App'>
      <BoardGame
        initialConfiguration={() => randomizeConfig()}
        onSolveCallback={celebrate}
      />
    </div>
  );
}

export default App;

// function sorted() {
//   const arr = Array(15).fill(0);
//   arr.forEach((num, idx) => (arr[idx] = idx + 1));
//   arr.push(0);

//   return arr;
// }
function randomizeConfig() {
  let arr = [];

  for (let i = 0; i < 16; i++) {
    arr.push({
      num: i,
      value: Math.random(),
    });
  }

  arr.sort((a, b) => a.value - b.value);

  const randomArr = arr.map(({ num }) => num);

  return randomArr;
}

//63623 54832
