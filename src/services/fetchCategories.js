export default function fetchCategories() {
  const URL = 'https://opentdb.com/api_category.php';
  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => error);
}
