"use client";
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel } from "victory";
const MortgageCalculator = (props) => {
  const [amount, setAmount] = useState(800000);
  const [interest, setInterest] = useState(1.85);
  const [years, setYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform calculation logic here (you can use a library like 'mortgage-calculator' or implement your own logic)
    // For simplicity, I'll just set a timeout to simulate calculation
    setTimeout(() => {
      const calculatedPayment = amount / (years * 12);
      setMonthlyPayment(calculatedPayment.toFixed(2));
      setLoading(false);
    }, 2000);
  };

  const [intrest, setIntrest] = useState(0);
  const [calculatordata, Setcalculatordata] = useState({
    hvalue: props.price,
    dpay: "",
    dper: "10",
    loanamt: "",
    intrate: "2.5",
    loanterm: "30",
  });
  const [calculated, setcalculated] = useState(null);

  useEffect(() => {
    let valll =
      (parseFloat(calculatordata.loanamt) *
        parseFloat(calculatordata.loanterm) *
        parseFloat(calculatordata.intrate)) /
      100;
    setIntrest(valll);
  }, [calculatordata.loanamt, calculatordata.loanterm, calculatordata.intrate]);

  useEffect(() => {
    let dpayment =
      (parseInt(calculatordata.dper) / 100) * parseInt(calculatordata.hvalue);
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["dpay"]: dpayment.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper]);

  useEffect(() => {
    let mortamt =
      parseFloat(calculatordata.hvalue) - parseFloat(calculatordata.dpay);
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["loanamt"]: mortamt.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper, calculatordata.dpay]);

  function CalcMonth() {
    let i = parseFloat(calculatordata.intrate) / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(calculatordata.loanterm) * 12;
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(calculatordata.loanamt) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }

  useEffect(() => {
    setcalculated(CalcMonth().toFixed(2));
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    Setcalculatordata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setcalculated(CalcMonth().toFixed(2));
    /* console.log(calculatordata); */
  };

  let style = { fontSize: "15" };

  // return (
  //   <div className="py-sm-4 w-full" id="mortgage">
  //     <section className="position-relative py-2">
  //       <h2 className="fs-3 fw-bold text-center d-flex custom-underline brand-color pb-2 center-sm">
  //         Mortgage Calculator
  //       </h2>
  //       <div className="container bg-light p-2">
  //         {/* <h3 className="fw-bold d-block d-md-none px-2 mb-3">
  //           Calculate your{" "}
  //           <span className="text-mine2">Monthly Mortgage Payment</span>
  //         </h3> */}
  //         <div className="justify-content-center align-items-center">
  //           {/* <div className="col-md-6"> */}
  //           <div className="card card-body border-0 shadow-sm text-start px-4 py-2">
  //             <form id="loan-form" onSubmit={handleSubmit}>
  //               <label htmlFor="amount" className="form-label">
  //                 Loan Amount
  //               </label>
  //               <div className="input-group mb-3 mt-2">
  //                 <span className="input-group-text">$</span>
  //                 <input
  //                   type="number"
  //                   className="form-control"
  //                   id="amount"
  //                   placeholder="Loan amount"
  //                   value={amount}
  //                   onChange={(e) => setAmount(e.target.value)}
  //                 />
  //               </div>
  //               <div className="row row-cols-2">
  //                 <div className="col">
  //                   <label htmlFor="interest" className="form-label">
  //                     Interest Rate
  //                   </label>
  //                   <div className="input-group mb-3 mt-2">
  //                     <input
  //                       type="text"
  //                       className="form-control"
  //                       id="interest"
  //                       placeholder="Interest"
  //                       value={interest}
  //                       onChange={(e) => setInterest(e.target.value)}
  //                     />
  //                     <span className="input-group-text">%</span>
  //                   </div>
  //                 </div>
  //                 <div className="col">
  //                   <label htmlFor="years" className="form-label">
  //                     Period
  //                   </label>
  //                   <div className="input-group mb-3 mt-2">
  //                     <input
  //                       type="number"
  //                       className="form-control"
  //                       id="years"
  //                       placeholder="Years To Repay"
  //                       value={years}
  //                       onChange={(e) => setYears(e.target.value)}
  //                     />
  //                     <span className="input-group-text">Yrs</span>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="form-group">
  //                 <input
  //                   type="submit"
  //                   className="btn bg-dark text-white btn-md w-100 mb-3"
  //                   value="Calculate"
  //                   disabled={loading}
  //                 />
  //               </div>
  //             </form>
  //           </div>
  //           {/* </div> */}
  //           {/* <div className="col-md-5"> */}
  //           {/* <h3 className="fw-bold d-md-block d-none fs-4">
  //               Calculate your{" "}
  //               <span className="text-mine2">Monthly Mortgage Payment</span>
  //             </h3> */}
  //           {loading && (
  //             <div id="loading" className="w-full flex items-center">
  //               <img src="/loading.gif" className="mx-auto h-12" alt="" />
  //             </div>
  //           )}
  //           {!loading && monthlyPayment && (
  //             <div id="results" className="py-4 center-sm">
  //               <p className="fs-2 fw-bold">${monthlyPayment} / Mo</p>
  //             </div>
  //           )}
  //           {/* </div> */}
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );
  return (
    <div className="py-3 py-md-5 my-5">
      <h2 className="fs-2 fw-bold">
        <span className="aff2">Mortgage Calculator</span>
      </h2>
      <p>Quickly See What Your Mortgage Payments Might Look Like</p>
      <div className="bg-white shadow-2xl rounded-md">
        <div className="row row-cols-1 row-cols-md-2 rounded-mine px-2 shadow-lgg mx-0">
          <div className="my-3 d-block d-sm-none">
            <h3 className="fs-2">
              ${calculated} <span className="fs-5 text-secondary">/mo</span>
            </h3>
          </div>
          <div className="col-md-9 col-lg-9 my-2 my-sm-5">
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col-sm-4 d-flex align-items-center">
                <label className="mortlabel" htmlFor="hvalue">
                  Home Value :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text bg-light" id="basic-addon1">
                    $
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    id="hvalue"
                    value={calculatordata.hvalue}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="dpay" className="mortlabel">
                  Down Payment :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text  bg-light">$</span>
                  <input
                    type="text"
                    className="form-control"
                    id="dpay"
                    value={calculatordata.dpay}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className="form-control"
                    id="dper"
                    value={calculatordata.dper}
                    onChange={handleChange}
                  />
                  <span className="input-group-text rounn bg-light">%</span>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="loanamt" className="mortlabel">
                  Mortgage Amt :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text bg-light" id="basic-addon2">
                    $
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    id="loanamt"
                    value={calculatordata.loanamt}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="intrate" className="mortlabel">
                  Interest Rate (%) :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    id="intrate"
                    value={calculatordata.intrate}
                    onChange={handleChange}
                  />
                  <span className="input-group-text bg-light" id="basic-addon3">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="loanterm" className="mortlabel">
                  Mortgage Term :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon4"
                    id="loanterm"
                    value={calculatordata.loanterm}
                    onChange={handleChange}
                  />
                  <span className="input-group-text bg-light" id="basic-addon4">
                    Yrs
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 my-0 mb-5 col-lg-12">
            <div className="rounded-mine bg-light d-flex align-items-center flex-column flex-md-row">
              <div className="p-3 rounded-mine">
                <h3 className="fs-2 fw-bold text-mine">
                  ${calculated} <span className="fs-5 text-secondary">/mo</span>
                </h3>
                <p className="text-secondary">
                  Your Estimated Monthly Mortgage Payment.
                </p>
              </div>
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  data={[
                    {
                      x: `Mortgage \n$ ${parseInt(
                        calculatordata.loanamt
                      ).toLocaleString()}`,
                      y: parseInt(calculatordata.loanamt),
                    },
                    {
                      x: `Interest \n $ ${parseInt(intrest).toLocaleString()}`,
                      y: parseInt(intrest),
                    },
                  ]}
                  innerRadius={68}
                  labelRadius={100}
                  padding={{ left: 120, right: 120 }}
                  colorScale={["rgb(82 170 146)", "rgb(82 130 146)"]}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={style}
                  x={200}
                  y={200}
                  text={"$" + calculated + "/mo"}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
