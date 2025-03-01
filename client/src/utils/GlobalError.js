export const HandleError = (error) => {
    const message =
    (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0].msg) || 
    (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
     return message
  };

export default HandleError