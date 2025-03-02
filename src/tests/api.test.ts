import { fetchProductById, fetchProducts } from "../app/lib/api";

describe("API Fetch Functions", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mock before each test
  });

  test("fetchProducts should return a list of products", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "MacBook Pro", category: "Laptop", price: 2000 },
      ],
    });

    const products = await fetchProducts();

    expect(products).toEqual([
      { id: 1, name: "MacBook Pro", category: "Laptop", price: 2000 },
    ]);
    expect(fetch).toHaveBeenCalledWith("/api/products", { cache: "no-store" });
  });

  test("fetchProductById should return a single product", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: "MacBook Pro",
        category: "Laptop",
        price: 2000,
      }),
    });

    const product = await fetchProductById("1");

    expect(product).toEqual({
      id: 1,
      name: "MacBook Pro",
      category: "Laptop",
      price: 2000,
    });
    expect(fetch).toHaveBeenCalledWith("/api/products/1");
  });

  test("fetchProductById should throw an error for non-existent product", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchProductById("999")).rejects.toThrow("Product not found (ID: 999)");
  });

  test("fetchProducts should handle API errors", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchProducts()).rejects.toThrow("Failed to fetch products: 500 Internal Server Error");
  });
});
