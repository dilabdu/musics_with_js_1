export const timeCorrector = (_seconds) => {
  const minutes = Math.trunc(_seconds / 60);
  const seconds = Math.trunc(_seconds % 60);
  return `${minutes > 10 ? minutes : "0" + minutes}:${
    seconds >= 10 ? seconds : "0" + seconds
  }`;
};
