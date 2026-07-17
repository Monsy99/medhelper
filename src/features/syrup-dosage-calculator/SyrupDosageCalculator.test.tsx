import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyrupDosageCalculator } from "./SyrupDosageCalculator";

describe("SyrupDosageCalculator", () => {
  it("shows a prompt before all fields are filled in", () => {
    render(<SyrupDosageCalculator />);
    expect(
      screen.getByText(/enter weight, dose, and syrup concentration/i)
    ).toBeInTheDocument();
  });

  it("calculates volume once weight, dose, and concentration are filled in", async () => {
    const user = userEvent.setup();
    render(<SyrupDosageCalculator />);

    await user.type(screen.getByLabelText(/patient weight/i), "20");
    await user.type(screen.getByLabelText(/prescribed dose/i), "15");
    await user.type(
      screen.getByLabelText(/concentration amount in milligrams/i),
      "250"
    );
    await user.type(
      screen.getByLabelText(/concentration volume in milliliters/i),
      "5"
    );

    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("Total dose: 300 mg")).toBeInTheDocument();
  });
});
