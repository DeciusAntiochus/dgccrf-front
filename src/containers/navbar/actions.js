export function changeNameOfPage(newName) {
  return {
    type: 'CHANGE_NAME',
    payload: { newName }
  };
}

export function changeBackUrl(backUrl) {
  return {
    type: 'CHANGE_BACK_URL',
    payload: { backUrl }
  };
}
