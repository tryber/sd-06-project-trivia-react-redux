export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return '';
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return '';
  }
};

// implementação baseada nesse artigo: https://rodrigo-morais.github.io/pt_BR/react-redux-local-storage/
export const saveState = (state, nameKey) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(nameKey, serializedState);
  } catch (err) {
    // ignore
  }
};
