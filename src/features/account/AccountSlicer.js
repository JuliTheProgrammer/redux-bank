import PropTpyes from "prop-types";

const accountInitState = {
  //The balance is always kept in USD
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
  //The display balance will be shown on screen and it will be converted to the according currency
  displayBalance: 0,
  displayCurrency: "USD",
};

export default function accountReducer(state = accountInitState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
        displayBalance: state.balance + action.payload,
      };
    case "account/fetchingData":
      return { ...state, isLoading: true };
    case "account/changeDisplayBalance":
      return {
        ...state,
        displayBalance: action.payload.newRate,
        displayCurrency: action.payload.newCurrency,
      };
    case "account/defaultDisplay":
      return {
        ...state,
        displayCurrency: state.displayCurrency,
        displayBalance: state.balance,
      };
    default:
      return state;
  }
}

export function deposit(amount, curreny) {
  console.log(amount, curreny);
  if (curreny === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/fetchingData" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${curreny}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

changeDisplayBalance.PropTpyes = {
  newCurrency: PropTpyes.number.isRequired,
};

export function changeDisplayBalance(displayAmount, newCurrency, balance) {
  console.log(displayAmount, newCurrency);
  if (newCurrency === "USD") return { type: "account/defaultDisplay" };
  return async function (dispatch, getState) {
    try {
      const host = "api.frankfurter.app";
      const res = await fetch(
        `https://${host}/latest?amount=${balance}&from=USD&to=${newCurrency}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log(data);
      console.log(data.rates[newCurrency] + "Data rates new currency");
      dispatch({
        type: "account/changeDisplayBalance",
        payload: { newCurrency, newRate: data.rates[newCurrency] },
      });
    } catch (err) {
      console.error(err);
    }
    /*  dispatch({
      type: "account/changeDisplayCurrency",
      payload: data.res.EUR,
    }); */
  };
}
