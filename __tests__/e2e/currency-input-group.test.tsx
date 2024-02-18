import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import expect from "expect";
import CurrencyInputGroup from "../../components/CurrencyInputGroup";

describe("Currency Input Group", () => {
  it("renders component", () => {
    render(
      <CurrencyInputGroup
        select={
          <>
            <p>Select</p>
          </>
        }
        input={
          <>
            <p>Input</p>
          </>
        }
      />,
    );

    const select = screen.getByTestId("select").textContent;
    const input = screen.getByTestId("input").textContent;

    expect(select).toEqual("Select");
    expect(input).toEqual("Input");
  });
});
