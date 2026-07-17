import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyrupDosageCalculator } from "./SyrupDosageCalculator";

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  {
    weight,
    doseMin,
    doseMax,
    concentrationAmount,
    concentrationVolume,
  }: {
    weight: string;
    doseMin: string;
    doseMax: string;
    concentrationAmount: string;
    concentrationVolume: string;
  }
) {
  await user.type(screen.getByLabelText(/patient weight/i), weight);
  await user.type(screen.getByLabelText(/min dose/i), doseMin);
  await user.type(screen.getByLabelText(/max dose/i), doseMax);
  await user.type(
    screen.getByLabelText(/concentration amount in units/i),
    concentrationAmount
  );
  await user.type(
    screen.getByLabelText(/concentration volume in milliliters/i),
    concentrationVolume
  );
}

describe("SyrupDosageCalculator", () => {
  it("shows a prompt before all fields are filled in", () => {
    render(<SyrupDosageCalculator />);
    expect(
      screen.getByText(/enter weight, dose range, and syrup concentration/i)
    ).toBeInTheDocument();
  });

  it("computes the daily dose and per-frequency volume ranges", async () => {
    const user = userEvent.setup();
    render(<SyrupDosageCalculator />);

    await fillForm(user, {
      weight: "20",
      doseMin: "15",
      doseMax: "30",
      concentrationAmount: "250",
      concentrationVolume: "5",
    });

    expect(screen.getByText("Daily dose: 300–600 j")).toBeInTheDocument();
    expect(screen.getByText("3–6 mL")).toBeInTheDocument();
    expect(screen.getByText("2–4 mL")).toBeInTheDocument();
    expect(screen.getByText("1.5–3 mL")).toBeInTheDocument();
  });

  it("shows a validation message when the max dose is below the min dose", async () => {
    const user = userEvent.setup();
    render(<SyrupDosageCalculator />);

    await fillForm(user, {
      weight: "20",
      doseMin: "30",
      doseMax: "15",
      concentrationAmount: "250",
      concentrationVolume: "5",
    });

    expect(screen.getByText(/maximum dose must be/i)).toBeInTheDocument();
  });
});
