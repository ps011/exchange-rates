import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, jest } from "@jest/globals";
import expect from "expect";
import Header from "../../components/Header";

describe("Page", () => {
  it("renders heading", () => {
    const logFirebaseEvent = jest.fn();
    render(<Header logFirebaseEvent={logFirebaseEvent} />);

    const heading = screen.getByTestId("app-name").textContent;

    expect(heading).toEqual("Exchange Rates");
  });

  it("should log event when link is clicked", () => {
    const logFirebaseEvent = jest.fn();
    render(<Header logFirebaseEvent={logFirebaseEvent} />);
    const link = screen.getByTestId("github");
    link.click();
  });
});
