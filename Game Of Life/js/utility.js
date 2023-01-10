'use strict'

function copyMat(mat) {
  var newMat = [];
  for (let i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (let j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

