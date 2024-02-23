import { useState } from "react";
import "./App.css";
import BillSplit from "./BillSplit";

export default function App() {
  const [step, setStep] = useState(1);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handlePrevious() {
    setStep(1);
  }

  function handleNext() {
    setStep(2);
  }

  return (
    <div className="body">
      <div className="nav-tabs">
        <p className={step == 1 ? "bold" : "normal"}>Split Bill</p>
        <p className={step == 2 ? "bold" : "normal"}>Give tip</p>
        <p className={step == 3 ? "bold" : "normal"}>Finish</p>
      </div>
      <TipCalculator step={step} />
      <BillSplit
        step={step}
        selectedFriend={selectedFriend}
        setShowAddFriend={setShowAddFriend}
        showAddFriend={showAddFriend}
        setSelectedFriend={setSelectedFriend}
        onSelect={handleSelection}
        onShow={handleShowAddFriend}
      />

      <div className="buttons">
        <Button textColor="#6f2525" bgColor="#fff" onClick={handlePrevious}>
          <span></span>Back
        </Button>

        <Button textColor="#6f2525" bgColor="#fff" onClick={handleNext}>
          Next <span></span>
        </Button>
        <Button textColor="#6f2525" bgColor="#fff" onClick={handleNext}>
          Finish <span></span>
        </Button>
      </div>
    </div>
  );
}

function TipCalculator({ step, selectedFriend }) {
  const [bill, setBill] = useState("");
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);

  const tip = (bill * (percent1 + percent2)) / 2 / 100;
  function handleReset() {
    setBill(0);
    setPercent1(0);
    setPercent2(0);
  }

  return (
    <div className={`app ${step == 1 ? "hiding" : ""}`}>
      <Form
        bill={bill}
        onSetbill={setBill}
        p1={percent1}
        setP1={setPercent1}
        p2={percent2}
        setP2={setPercent2}
        onReset={handleReset}
      />
      {bill > 0 && (
        <>
          {" "}
          <Output bill={bill} tip={tip} selectedFriend={selectedFriend} />
        </>
      )}
    </div>
  );
}

function Form({ bill, onSetbill, p1, p2, setP1, setP2, onReset }) {
  return (
    <div className="container">
      <h1 className="header">Tip Calculator</h1>
      <form action="" className="form">
        <FormFields label="How much was the bill?">
          <input
            type="text"
            className="input"
            value={bill}
            onChange={(e) => onSetbill(Number(e.target.value))}
          />
        </FormFields>

        <FormFields label="How do you like the service?">
          <SelectedPercentage p={p1} setP={setP1} />
        </FormFields>

        <FormFields label="How did your friend like the service?">
          <SelectedPercentage p={p2} setP={setP2} />
        </FormFields>
      </form>
      <div className="button">{bill > 0 && <Reset onReset={onReset} />}</div>
    </div>
  );
}

function FormFields({ children, label }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function SelectedPercentage({ p, setP }) {
  return (
    <select value={p} onChange={(e) => setP(Number(e.target.value))}>
      <option value="0">Desatisfied(0%)</option>
      <option value="5">It is okay (5%)</option>
      <option value="10">It is good (10%)</option>
      <option value="15">Abslutely amazing(20%)</option>
    </select>
  );
}

function Output({ bill, tip, selectedFriend }) {
  return (
    <div className="container">
      <div className="show-field">
        You and {selectedFriend} pay ${bill + tip} (${bill} + ${tip} tip)
      </div>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div className="button">
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
}

export function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
