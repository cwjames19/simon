export function getRandomColor() {
  const num = Math.floor((Math.random() * 4));
  switch (num) {
    case 0:
      return 'red';
    case 1:
      return 'blue';
    case 2:
      return 'yellow';
    case 3:
      return 'green';
    default:
      throw (Error('An error occurred while fetching a random color'));
  }
}