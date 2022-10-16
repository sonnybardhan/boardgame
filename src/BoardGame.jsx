import { useState, useEffect } from 'react';
export default function Board({ initialConfiguration, onSolveCallback }) {
  const [newConfig, setNewConfig] = useState(initialConfiguration);

  const renderConfig = newConfig.map((tile, idx) => {
    return tile === 0 ? (
      <div className='' key={idx}></div>
    ) : (
      <div className='tile' onClick={() => checkNeighbour(idx, tile)} key={idx}>
        {tile}
      </div>
    );
  });

  function checkNeighbour(tileIdx) {
    const upper = getUpperTile(tileIdx);
    const right = getRightTile(tileIdx);
    const lower = getLowerTile(tileIdx);
    const left = getLeftTile(tileIdx);

    if (upper != null && newConfig[upper] === 0) {
      swap(tileIdx, upper, newConfig);
    } else if (right != null && newConfig[right] === 0) {
      swap(tileIdx, right, newConfig);
    } else if (lower != null && newConfig[lower] === 0) {
      swap(tileIdx, lower, newConfig);
    } else if (left != null && newConfig[left] === 0) {
      swap(tileIdx, left, newConfig);
    }
  }

  function swap(i, j, array) {
    const tempArray = [...array];
    const _i = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = _i;
    setNewConfig(tempArray);
  }

  useEffect(() => {
    if (checkSolution(newConfig)) {
      setTimeout(() => {
        onSolveCallback();
      });
    }
  }, [newConfig]);

  return <div className='board'>{renderConfig}</div>;
}

function checkSolution(newConfig) {
  if (newConfig[newConfig.length - 1] !== 0) return false;

  for (let i = 1; i < 15; i++) {
    if (i !== newConfig[i - 1]) {
      return false;
    } else {
      console.log(i, newConfig[i - 1]);
    }
  }
  return true;
}

function getUpperTile(tileIdx) {
  const col = (tileIdx + 1) % 4;
  const row = Math.floor((tileIdx + 1) / 4);
  const upperTile = 4 * (row - 1) + col - 1;
  if (upperTile < 0) return undefined;
  return upperTile;
}

function getLowerTile(tileIdx) {
  const col = (tileIdx + 1) % 4;
  const row = Math.floor((tileIdx + 1) / 4);
  const lowerTile = 4 * (row + 1) + col - 1;
  if (lowerTile > 15) return undefined;
  return lowerTile;
}

function getLeftTile(tileIdx) {
  let col = tileIdx % 4;
  if (col === 0 || col < 0) return undefined;
  tileIdx -= 1;
  if (tileIdx < 0) return undefined;
  return tileIdx;
}

function getRightTile(tileIdx) {
  let col = (tileIdx + 1) % 4;
  if (col === 0) return undefined;
  tileIdx += 1;
  if (tileIdx > 15) return undefined;
  return tileIdx;
}
