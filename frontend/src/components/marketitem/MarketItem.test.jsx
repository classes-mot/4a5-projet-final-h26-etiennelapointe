import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MarketItem from "./MarketItem";

describe("MarketItem Component", () => {
  const mockProps = {
    name: "Test Item",
    rating: 4,
    price: 99.99,
  };

  it("renders item name, rating, and price", () => {
    render(<MarketItem {...mockProps} />);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("99.99$")).toBeInTheDocument();
  });

  it("disables BUY button when user is not logged in", () => {
    render(<MarketItem {...mockProps} />);
    const buyButton = screen.getByRole("button");
    expect(buyButton).toBeDisabled();
    expect(buyButton).toHaveTextContent("Login required");
  });

  it("enables BUY button when user is logged in", () => {
    // Mock the AuthContext to simulate a logged-in user
    const mockAuthContext = {
      isLoggedIn: true,
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MarketItem {...mockProps} />
      </AuthContext.Provider>
    );

    const buyButton = screen.getByRole("button");
    expect(buyButton).toBeEnabled();
    expect(buyButton).toHaveTextContent("BUY");
  });
});