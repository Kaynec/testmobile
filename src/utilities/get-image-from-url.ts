import { store } from '@/store';

const fetchWithAuthentication = (url) => {
  const headers = new Headers();
  headers.set('token', store.getters.getStudentToken);
  return fetch(url, { headers });
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};
const displayProtectedImage = async (imageUrl, imgRef) => {
  // Fetch the image.
  const response = await fetchWithAuthentication(imageUrl);
  // Convert the data to Base64 and build a data URL.
  const binaryData = await response.arrayBuffer();
  const base64 = arrayBufferToBase64(binaryData);
  const dataUrl = `data:image/png;base64,${base64}`;
  imgRef.src = dataUrl;
  return dataUrl;
};

export const returnProtectedImage = async (imageUrl: string) => {
  // Fetch the image.
  const response = await fetchWithAuthentication(imageUrl);
  // Convert the data to Base64 and build a data URL.
  const binaryData = await response.arrayBuffer();
  const base64 = arrayBufferToBase64(binaryData);
  const dataUrl = `data:image/png;base64,${base64}`;
  return dataUrl;
};

export default displayProtectedImage;
