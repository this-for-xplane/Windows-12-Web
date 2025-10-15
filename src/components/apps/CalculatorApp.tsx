import { useState } from "react";
import { Delete } from "lucide-react";

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay("0");
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = 0;
      
      switch (operation) {
        case "+":
          result = previousValue + current;
          break;
        case "-":
          result = previousValue - current;
          break;
        case "×":
          result = previousValue * current;
          break;
        case "÷":
          result = current !== 0 ? previousValue / current : 0;
          break;
      }
      
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="h-full flex flex-col bg-background/80 p-4">
      <div className="max-w-sm mx-auto w-full">
        {/* Display */}
        <div className="mb-4 p-6 bg-secondary/30 rounded-xl border border-border/30">
          <div className="text-right">
            {operation && <div className="text-sm text-muted-foreground mb-1">{previousValue} {operation}</div>}
            <div className="text-4xl font-bold text-foreground">{display}</div>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="w-full mb-2 p-3 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Delete className="w-4 h-4" />
          Clear
        </button>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") handleEquals();
                else if (["+", "-", "×", "÷"].includes(btn)) handleOperation(btn);
                else handleNumber(btn);
              }}
              className={`h-16 rounded-xl font-semibold text-lg transition-colors ${
                ["+", "-", "×", "÷", "="].includes(btn)
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary/50 text-foreground hover:bg-secondary/70"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
