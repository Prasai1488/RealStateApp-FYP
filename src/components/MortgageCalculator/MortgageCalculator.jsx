import React, { useState } from 'react';
import './mortgageCalculator.scss';

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = 
      (principal * monthlyInterestRate) / 
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className="mortgage-calculator">
      <h2>Mortgage Calculator</h2>
      <div className="form-group">
        <label>Home Price</label>
        <input 
          type="number" 
          value={homePrice} 
          onChange={(e) => setHomePrice(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Down Payment</label>
        <input 
          type="number" 
          value={downPayment} 
          onChange={(e) => setDownPayment(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Loan Term (years)</label>
        <input 
          type="number" 
          value={loanTerm} 
          onChange={(e) => setLoanTerm(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Interest Rate (%)</label>
        <input 
          type="number" 
          value={interestRate} 
          onChange={(e) => setInterestRate(e.target.value)} 
        />
      </div>
      <button onClick={calculateMortgage}>Calculate</button>
      {monthlyPayment !== null && (
        <div className="result">
          <h3>Monthly Payment: Rs.{monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;
