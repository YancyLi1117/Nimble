import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../app/lib/api";
import { useRouter } from "next/navigation";
import React from "react";

// ✅ Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// ✅ Mock API fetch function
jest.mock("../app/lib/api", () => ({
  fetchProducts: jest.fn(),
}));

describe("ProductList Component", () => {
  const mockProducts = [
    { id: 1, name: "MacBook Pro", category: "Laptop", price: 2000 },
    { id: 2, name: "Dell XPS", category: "Laptop", price: 1500 },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  test("renders products correctly", async () => {
    (fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<ProductList />);

    expect(screen.getByText("Product List")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
      expect(screen.getByText("Dell XPS")).toBeInTheDocument();
    });
  });

  test("displays loading indicator while fetching", async () => {
    (fetchProducts as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ProductList />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("handles API errors gracefully", async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<ProductList />);

    await waitFor(() =>
      expect(screen.getByText("Failed to load products.")).toBeInTheDocument()
    );
  });

  test("filters products by category", async () => {
    (fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<ProductList />);

    // ✅ Ensure the select element is available
    const select = screen.getByRole("combobox");
    
    // ✅ Open the dropdown
    fireEvent.mouseDown(select);

    // ✅ Wait for dropdown options to appear
    const option = await screen.findByText(/laptop/i); // Case-insensitive match

    // ✅ Click on the option
    fireEvent.click(option);

    // ✅ Ensure fetchProducts() is called with "laptop" (lowercase match)
    await waitFor(() =>
      expect(fetchProducts).toHaveBeenCalledWith(expect.stringMatching(/laptop/i))
    );
  });
});
