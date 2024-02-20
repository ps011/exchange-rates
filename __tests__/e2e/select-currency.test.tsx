import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import { SelectCurrency } from "../../components/SelectCurrency";
import { CURRENCIES } from "../../lib/constants";
import { fn } from "jest-mock";
import expect from "expect";
import { act } from "react-dom/test-utils";

describe("Select Currency", () => {
  it("renders component", () => {
    const onChange = fn();
    render(
      <SelectCurrency
        currencyList={Object.values(CURRENCIES)}
        currency={CURRENCIES.INR}
        onChange={onChange}
      />,
    );
  });

  it("calls on change when a new option is selected", async () => {
    const onChange = fn();
    render(
      <SelectCurrency
        currencyList={Object.values(CURRENCIES)}
        currency={CURRENCIES.INR}
        onChange={onChange}
      />,
    );

    const select = await screen.findByTitle("Open");
    act(() => {
      select.click();
    });

    const option = await screen.findByTestId("option-USD");
    act(() => {
      option.click();
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("should filter based on code", async () => {
    const onChange = fn();
    render(
      <SelectCurrency
        currencyList={Object.values(CURRENCIES)}
        currency={CURRENCIES.INR}
        onChange={onChange}
      />,
    );

    const autocompleteInput = await screen.findByTestId("select-currency");
    const input = autocompleteInput.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "USD" } });

    const option = await screen.findByTestId("option-USD");
    act(() => {
      option.click();
    });
    expect(onChange).toHaveBeenCalled();
  });
});
