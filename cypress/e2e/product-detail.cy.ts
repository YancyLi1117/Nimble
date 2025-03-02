describe("Product Detail Page", () => {
    beforeEach(() => {
      cy.visit("/"); // ✅ Visit homepage first
    });
  
    it("Navigates to a product detail page", () => {
      cy.contains("MacBook Pro").click(); // ✅ Click product
      cy.url().should("include", "/products/1"); // ✅ Ensure navigation works
  
      // ✅ Ensure product details are displayed
      cy.contains("Product Details").should("be.visible");
      cy.contains("MacBook Pro").should("be.visible");
      cy.contains("$2299.99").should("be.visible");
    });
  
    it("Shows an error for an invalid product ID", () => {
      cy.visit("/products/9999"); // ✅ Test invalid product
      cy.contains("Product not found").should("be.visible");
    });
  });
  