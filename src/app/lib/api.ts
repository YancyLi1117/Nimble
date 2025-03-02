export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

/**
 * Fetch a single product by ID
 * @param id - The product ID
 */
export async function fetchProductById(id: string): Promise<Product> {
  const res: Response = await fetch(`/api/products/${id}`);

  if (!res.ok) {
    throw new Error(`Product not found (ID: ${id})`);
  }

  return res.json() as Promise<Product>;
}

/**
 * Fetch all products with optional category filtering
 * @param category - (Optional) Filter products by category
 */
export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category ? `/api/products?category=${category}` : "/api/products";

  try {
    const res: Response = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data: Product[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid API response format: Expected an array.");
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}
