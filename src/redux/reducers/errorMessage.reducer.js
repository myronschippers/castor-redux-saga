const errorMessage = (state = null, action) => {
  if (action.type === 'ERROR_MSG') {
    return action.payload;
  } else if (action.type === 'ERROR_RESET') {
    return null;
  }

  return state;
};

export default errorMessage;
