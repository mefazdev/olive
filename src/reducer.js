export const initialState = {
  basket: [],
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action, state);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as it is not in basket`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

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
    default:
      return state;
  }
};

export default reducer;
