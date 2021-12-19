import { store } from '@/store';

const fetchWithAuthentication = (url) => {
  const headers = new Headers();
  headers.set('token', store.getters.getStudentToken);
  return fetch(url, { headers });
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  return btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );
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

export const imageUrl = `https://www.api.devnirone.ir/api/student/getProfileImage/${store.getters.getCurrentStudent.profileImage}`;

export default displayProtectedImage;
