import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductItem from "@/components/ProductItem";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProductItem Component", () => {
  const mockRouter = { push: jest.fn() };
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders product details correctly", () => {
    render(<ProductItem id={1} name="MacBook Pro" category="Laptop" price={2000} />);

    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("$2000.00")).toBeInTheDocument();
  });

  it("navigates to the correct product page on click", () => {
    render(<ProductItem id={1} name="MacBook Pro" category="Laptop" price={2000} />);
    
    fireEvent.click(screen.getByRole("button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/products/1");
  });
});