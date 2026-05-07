import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MarketList from "./MarketList";

describe("MarketList Component", () => {
  const mockItems = [
    { id: "1", name: "Item 1", rating: 4, price: 19.99 },
    { id: "2", name: "Item 2", rating: 5, price: 29.99 },
  ];

  it("renders a list of market items", () => {
    render(<MarketList items={mockItems} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("19.99$")).toBeInTheDocument();
    expect(screen.getByText("29.99$")).toBeInTheDocument();
  });

  it("renders an empty message when no items are provided", () => {
    render(<MarketList items={[]} />);
    expect(screen.getByText("No items available")).toBeInTheDocument();
  });
});