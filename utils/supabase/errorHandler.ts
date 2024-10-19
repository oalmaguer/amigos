export const handleApiError = async (response: any) => {
  console.log(response);
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
  return response.json();
};
