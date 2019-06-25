export function changeNameOfPage(newName) {
  return {
    type: 'CHANGE_NAME',
    payload: { newName }
  };
}
