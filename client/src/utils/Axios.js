import axios from "axios";
import { HandleError } from "./GlobalError";

axios.defaults.withCredentials = true;
const globalAxios = axios.create({
  baseURL: "https://api.dbhamz.com/app/v1",
//  baseURL: "http://localhost:3067/app/v1",
});
export default globalAxios;

// @ GET Get Products EndPoint
export const getProducts = async (filters = {}) => {
  const formattedFilters = {};

  // Price range filters
  if (filters.minPrice)
    formattedFilters.price = { $gte: Number(filters.minPrice) };
  if (filters.maxPrice)
    formattedFilters.price = {
      ...formattedFilters.price,
      $lte: Number(filters.maxPrice),
    };

  // Brand filter
  if (filters.brand) formattedFilters.brand = filters.brand;
  if (filters.isLike) formattedFilters.isLike = filters.isLike;

  // Package sizes filter
  if (filters.packageSizes && filters.packageSizes.length > 0) {
    formattedFilters.packageSize = { $in: filters.packageSizes };
  }

  try {
    const res = await globalAxios.get("/products", {
      params: formattedFilters, // Pass formatted filters as query parameters
    });
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
// @ GET Get One Product EndPoint
export const getProduct = async (id) => {
  try {
    const res = await globalAxios.get(`/products/${id}`);
    const data = res?.data?.data;
    return data;
  } catch (err) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ GET Get Products that belong to specific brand EndPoint
export const getSimilarProduct = async (brandId) => {
  try {
    const res = await globalAxios.get(`/brands/${brandId}/products`);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    // Handle different error scenarios
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ DELETE Delete One Product EndPoint
export const deleteProduct = async (productId) => {
  try {
    const res = await globalAxios.delete(`/products/${productId}`);
    return res?.data; // Return the response data
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      errorMessage =
        error.response.data?.message || "Failed to delete the product.";
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage =
        "No response from the server. Please check your connection.";
    } else {
      // Something happened in setting up the request
      errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
    }

    throw new Error(errorMessage); // Throw the error with a user-friendly message
  }
};

// @ POST create Product EndPoint
export const CreateProduct = async (formData) => {
  try {
    const res = await globalAxios.post(`/products`, formData);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    // Handle different error scenarios
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ PATCH Update Product EndPoint
export const UpdateProduct = async (productId, formData) => {
  try {
    const res = await globalAxios.patch(`/products/${productId}`, formData);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ PATCH create Product EndPoint
export const CreateBrand = async (formData) => {
  try {
    const res = await globalAxios.post(`/brands`, formData);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ GET Get Brands EndPoint
export const GetBrands = async () => {
  try {
    const res = await globalAxios.get("/brands");
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ DELETE Delete One Brand EndPoint
export const deleteBrand = async (brandId) => {
  try {
    const res = await globalAxios.delete(`/brands/${brandId}`);
    return res?.data; // Return the response data
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      errorMessage =
        error.response.data?.message || "Failed to delete the brandId.";
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage =
        "No response from the server. Please check your connection.";
    } else {
      // Something happened in setting up the request
      errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
    }

    throw new Error(errorMessage); // Throw the error with a user-friendly message
  }
};
// @ PATCH create Product EndPoint
export const UpdateBrand = async (brandId, formData) => {
  try {
    const res = await globalAxios.patch(`/brands/${brandId}`, formData);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const Login = async (form) => {
  try {
    const res = await globalAxios.post("/auth/login", {
      password: form.password,
      phone: form.code + form.phone,
    });
    return res;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const Signup = async (form) => {
  try {
    const res = await globalAxios.post("/auth/signup", form);
    return res?.data?.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const AddCart = async (productId, quantity) => {
  try {
    const res = await globalAxios.post("/cart", { productId, quantity });
    return res?.data?.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ GET Get One Product EndPoint
export const GetCart = async () => {
  try {
    const res = await globalAxios.get(`/cart`);
    const data = res?.data?.data;
    return data;
  } catch (err) {
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const UpdateCartQuantity = async (productId, quantity) => {
  try {
    const res = await globalAxios.patch(`/cart/${productId}`, { quantity });
    const data = res?.data?.data;
    return data;
  } catch (err) {
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// @ DELETE Delete One Brand EndPoint
export const ApplyCoupon = async ({id,coupon}) => {
  try {
    const res = await globalAxios.post(`/order/apply-coupon/${id}`, { coupon });
    return res?.data; // Return the response data
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      errorMessage =
        error.response.data?.message || "Failed to delete the brandId.";
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage =
        "No response from the server. Please check your connection.";
    } else {
      // Something happened in setting up the request
      errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
    }

    throw new Error(errorMessage); // Throw the error with a user-friendly message
  }
};
// @ DELETE Delete One Brand EndPoint
export const deleteProductInCart = async (productId) => {
  try {
    const res = await globalAxios.delete(`/cart/${productId}`);
    return res?.data; // Return the response data
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      errorMessage =
        error.response.data?.message || "Failed to delete the brandId.";
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage =
        "No response from the server. Please check your connection.";
    } else {
      // Something happened in setting up the request
      errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
    }

    throw new Error(errorMessage); // Throw the error with a user-friendly message
  }
};

// @ GET Get Brands EndPoint
export const GetUsers = async () => {
  try {
    const res = await globalAxios.get("/users");
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const getMe = async () => {
  try {
    const res = await globalAxios.get("/auth/getme");
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const GetOnCart = async (cartId) => {
  try {
    const res = await globalAxios.get(`/cart/${cartId}`);
    const data = res?.data?.data;
    return data;
  } catch (err) {
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};


export const DeleteUser = async (id) => {
  try {
    const res = await globalAxios.delete(`/users/${id}`);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
export const DeleteCoupon = async (id) => {
  try {
    const res = await globalAxios.delete(`/coupon/${id}`);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const CreateCoupon = async (formData) => {
  try {
    const res = await globalAxios.post(`/coupon`, formData);
    const data = res?.data?.data;
    return data;
  } catch (error) {
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const GetCoupon = async () => {
  try {
    const res = await globalAxios.get("/coupon");
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};


export const CreateOrder = async (cart) => {
  try {
    const res = await globalAxios.post(`/order`, {items: cart});
    const data = res?.data;
    return data;
  } catch (error) {
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const GetOrder = async (id) => {
  try {
    const res = await globalAxios.get(`/order/${id}`);
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
export const GetMyOrders = async () => {
  try {
    const res = await globalAxios.get(`/order/my-order`);
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};



export const checkOut = async ({id , shippingData}) => {
  try {
    const res = await globalAxios.post(`/order/checkout-payments/${id}`, {shippingData});
    const data = res?.data;
    return data;
  } catch (error) {
    if (error) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(error) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const GetOrders = async () => {
  try {
    const res = await globalAxios.get(`/order`);
    return res?.data?.data;
  } catch (error) {
    // Handle different error scenarios
    if (err) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = HandleError(err) || "An unknown error occurred";
      throw new Error(errorMessage); // Throw the error
    } else if (err.request) {
      // The request was made but no response was received
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      // Something happened in setting up the request
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};









export const getOffers = async (filters = {}) => {
  try {
    const res = await globalAxios.get("/offers", {
      params: filters
    });
    return res?.data?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};

// @ GET Get Single Offer EndPoint
export const getOffer = async (id) => {
  try {
    const res = await globalAxios.get(`/offers/${id}`);
    return res?.data?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};

// @ POST Create Offer EndPoint
export const createOffer = async (formData) => {
  try {
    const res = await globalAxios.post("/offers", formData);
    return res?.data?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};

// @ PATCH Update Offer EndPoint
export const updateOffer = async (id, formData) => {
  try {
    const res = await globalAxios.patch(`/offers/${id}`, formData);
    return res?.data?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};

// @ DELETE Delete Offer EndPoint
export const deleteOffer = async (id) => {
  try {
    const res = await globalAxios.delete(`/offers/${id}`);
    return res?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};

// @ PATCH Toggle Offer Status EndPoint
export const toggleOfferStatus = async (id) => {
  try {
    const res = await globalAxios.patch(`/offers/${id}/toggle-status`);
    return res?.data?.data;
  } catch (error) {
    HandleError(error);
    throw error;
  }
};