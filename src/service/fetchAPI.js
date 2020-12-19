export const fetchTokenAPI = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const responseAPI = await fetch(endpoint);
  const responseJSON = await responseAPI.json();

  return responseJSON;
};

export const getCategoriesAPI = async () => {
  const endpoint = 'https://opentdb.com/api_category.php';
  const responseAPI = await fetch(endpoint);
  const responseJSON = await responseAPI.json();
  const allCategories = responseJSON.trivia_categories;

  return allCategories;
};
