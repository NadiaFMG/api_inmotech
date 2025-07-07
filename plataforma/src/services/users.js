import { REACT_APP_API_BASE_URL } from '../utils/constants';

export async function getUsers() {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users`);
  const data = await response.json();
  return data;
}