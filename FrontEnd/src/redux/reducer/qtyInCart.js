const initialState = {
    count: 0,
  };
  
  const qtyInCartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'plus':
        return { ...state, count: state.count + action.payload };
      case 'minus':
        return { ...state, count: state.count - action.payload };
      default:
        return state;
    }
  };
  
  export default qtyInCartReducer;
  