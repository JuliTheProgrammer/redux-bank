const customerInitState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = customerInitState, action) {
  switch (action.type) {
    case "account/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "account/createCustomer",
    payload: { fullName, nationalId, createAt: new Date().toISOString },
  };
}
