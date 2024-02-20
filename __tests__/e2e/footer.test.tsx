import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, jest } from "@jest/globals";
import expect from "expect";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("renders footer", () => {
    const logFirebaseEvent = jest.fn();
    render(<Footer logFirebaseEvent={logFirebaseEvent} />);

    const heading = screen.getByTestId("portfolio").textContent;

    expect(heading).toEqual("Prasheel Soni");
  });

  ["portfolio", "instagram", "github", "x", "linkedin"].forEach((testId) => {
    it(`should log event when ${testId} link is clicked`, () => {
      const logFirebaseEvent = jest.fn();
      render(<Footer logFirebaseEvent={logFirebaseEvent} />);
      const link = screen.getByTestId(testId);
      link.click();
      expect(logFirebaseEvent).toHaveBeenCalled();
    });
  });
});
