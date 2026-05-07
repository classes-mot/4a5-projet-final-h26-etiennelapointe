import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NumberList from "./NumberList";

describe("NumberList Component", () => {
  const mockNumbers = [
    { id: "1", name: "1", value: 1000 },
    { id: "2", name: "2", value: 2000000 },
  ];

  it("renders a list of number items", () => {
    render(<NumberList numbers={mockNumbers} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1K")).toBeInTheDocument();
    expect(screen.getByText("2M")).toBeInTheDocument();
  });

  it("renders an empty message when no numbers are provided", () => {
    render(<NumberList numbers={[]} />);
    expect(screen.getByText("No numbers available")).toBeInTheDocument();
  });
}); 