import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BmiCalculator } from "./BmiCalculator";

describe("BmiCalculator", () => {
  it("shows a prompt before any input is entered", () => {
    render(<BmiCalculator />);
    expect(screen.getByText(/enter weight and height/i)).toBeInTheDocument();
  });

  it("calculates and displays BMI once both fields are filled in", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.type(screen.getByLabelText(/weight/i), "70");
    await user.type(screen.getByLabelText(/height/i), "175");

    expect(screen.getByText("22.9")).toBeInTheDocument();
    expect(screen.getByText("Normal weight")).toBeInTheDocument();
  });

  it("goes back to the prompt if a field is cleared", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await user.type(screen.getByLabelText(/weight/i), "70");
    await user.type(screen.getByLabelText(/height/i), "175");
    await user.clear(screen.getByLabelText(/height/i));

    expect(screen.getByText(/enter weight and height/i)).toBeInTheDocument();
  });
});
