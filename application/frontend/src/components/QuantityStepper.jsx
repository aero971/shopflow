export default function QuantityStepper({ value, min = 1, max, onChange, disabled }) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(max ? Math.min(max, value + 1) : value + 1);

  return (
    <div className="qty-stepper" data-testid="quantity-stepper">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        data-testid="quantity-decrement"
      >
        &minus;
      </button>
      <span data-testid="quantity-value">{value}</span>
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max != null && value >= max)}
        aria-label="Increase quantity"
        data-testid="quantity-increment"
      >
        +
      </button>
    </div>
  );
}
