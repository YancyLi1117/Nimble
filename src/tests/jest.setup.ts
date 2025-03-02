import "@testing-library/jest-dom"; // ✅ Allows `.toBeInTheDocument()`
global.fetch = jest.fn(); // ✅ Ensure Jest can mock `fetch()`
