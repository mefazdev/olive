export const initialState = {
 
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

 

const reducer = (state  , action) => {
  // console.log(action, state);
  switch (action.type) {
     

     case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case "OPEN__SIGNUP__MODAL":
      return {
        ...state,
        signupModal:action.signupModal,
      };
    case "CLOSE__SIGNUP__MODAL":
      return {
        ...state,
        signupModal: action.signupModal,
      };
    case "OPEN__LOGIN__MODAL":
      return {
        ...state,
        loginModal:action.signinModal,
      };
    case "CLOSE__LOGIN__MODAL":
      return {
        ...state,
        loginModal: action.signinModal,
      };
      case "SHOW__TOAST":
        return {
          ...state,
          openToast: true,
        };
        case "HIDE__TOAST":
        return {
          ...state,
          openToast: false,
        };
    default:
      return state;
  }
};

export default reducer;
