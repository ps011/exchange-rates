import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import expect from "expect";
import Header from "../../components/Header";

describe("Page", () => {
  it("renders heading", () => {
    render(<Header />);

    const heading = screen.getByTestId("app-name").textContent;

    expect(heading).toEqual("Exchange Rates");
  });
});
