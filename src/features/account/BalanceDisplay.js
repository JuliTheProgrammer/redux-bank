import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisplayBalance } from "./AccountSlicer";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const {
    displayBalance: currentDisplayBalance,
    displayCurrency,
    balance,
  } = useSelector((store) => store.account);

  const dispatch = useDispatch();

  const [currency2, setCurrency] = useState(displayCurrency);
  /* 
  function handleChange(e) {
    setCurrency(e.target.value);
    dispatch(changeDisplayCurrency(currentDisplayBalance, curreny));
    ref.current = curreny;
    console.log("Current Ref" + ref.current);
  }

  console.log("Old Currency" + oldCurrency); */

  useEffect(() => {
    function handleSubmit() {
      if (!currency2) return;
      dispatch(changeDisplayBalance(currentDisplayBalance, currency2, balance));
    }
    handleSubmit();
  }, [currency2]);

  return (
    <form className="balance">
      <select
        value={currency2}
        onChange={(e) => setCurrency(e.target.value)}
        style={{ fontSize: "1.2rem" }}
      >
        <option value={"USD"}>USD</option>
        <option value={"EUR"}>EUR</option>
        <option value={"GBP"}>GBP</option>
      </select>
      {formatCurrency(currentDisplayBalance)}
    </form>
  );
}

export default BalanceDisplay;
