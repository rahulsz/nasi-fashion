# Frontend Implementation Plan for Nasi Fashion House

This document outlines the plan for the frontend application (`nasi-fashion`) to integrate with the new custom backend and enhance the user experience.

## Goal
To transition from any mock data/local state to a fully dynamic e-commerce frontend powered by the `nasi-backend` service.

## Current Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM

## Proposed Changes & Integration

### 1. API Integration Layer
- **Setup Axios/Fetch**: Create a centralized API client instance (e.g., `src/api/client.js`) with base URL pointing to the backend which is set to run on **`http://localhost:5000`**.
- **Endpoints Integration**:
    - **Auth**: Connect Login and Signup forms to backend auth routes `POST /api/auth/register` and `POST /api/auth/login`.
    - **Products**: Replace hardcoded product lists with `GET /api/products` calls.
    - **Product Details**: Fetch individual product data via `GET /api/products/:id`.

### 2. State Management Updates (Zustand)
- Update `useCartStore` to sync with backend (optional: merge local cart with server cart on login).
- Create `useAuthStore` to manage user session (JWT token storage, user profile).

### 3. UI/UX Enhancements
- **Loading States**: Add skeletons or spinners while data is fetching.
- **Error Handling**: Display toast notifications (e.g., "Login failed", "Added to cart") using a library like `sonner` or `react-hot-toast`.
- **Protected Routes**: Ensure checkout and profile pages are accessible only to logged-in users.

## Workflow
1.  **Configure Environment**: Add `.env` for `VITE_API_URL`.
2.  **Auth Integration**: Implement Login/Register flows.
3.  **Product Catalog**: Fetch and display dynamic products.
4.  **Cart & Checkout**: Handle cart operations and verified checkout flow.

## Verification
- **Manual Testing**: User signs up, logs in, browses products (fetched from DB), adds to cart, and proceeds to checkout.
