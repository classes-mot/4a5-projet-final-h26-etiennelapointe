import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NumberItem from "./NumberItem";

describe("NumberItem Component", () => {
  const mockProps = {
    name: "3",
    value: 123456,
  };

  it("renders number name and formatted value", () => {
    render(<NumberItem {...mockProps} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("123K")).toBeInTheDocument();
  });
});