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
export let imageUrl;

if (
  store.getters.getCurrentStudent &&
  store.getters.getCurrentStudent.profileImage
) {
  imageUrl = `https://www.api.devnirone.ir/api/student/getProfileImage/${store.getters.getCurrentStudent.profileImage}`;
} else {
  imageUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEXo6OhgYGDv7+9ycnLs7OxYWFhdXV1VVVVaWlrh4eHm5ubw8PBSUlLT09O1tbXExMSWlpafn597e3tvb2/Nzc1qamqnp6eCgoJ4eHjW1tbHx8epqamSkpJlZWWMjIzd3d27u7sDIhXfAAAEbklEQVR4nO3c65KqOhAFYI2dCwrhpuIVff+n3AHnnK3OjEOCA7Z7fVVTNT9Z1Z0QImEyAQAAAAAAAAAAAAAAAAAAAAAAAAAAAIAvEZG4cP+NfTHPR2KS2LwuNrNNUec2mYi3CkkistVUS6MujNTTykZvE5IoLWKppreUjKv0LbqVRFrq+3gfIXWZ8q+jSDbf5LtkLLZi7EvshSh/kO+SMefcqnSayYf5GnIWsY1IS/O4gB9lVAnTiCLVHfK1nbpjGZG6BnT0kmFESroHdBG37CLSSXUZg/836jQa+4p9iZlPwOnUFMzui2L9823ilt6z6lPa+gzCC3ka+6p9iMKvRxumZtSntPMvoetTRjd+sfEvoZtPKzZFpCQOCDidxmxuiuJgghKajEsR5yE92lDzsS+9G58F6S2d8mhTysKatGlTHgnFKrhLSx4DMQqbSRsxi4FIy9BhyOU5kazvovsveWaRcB060biphsUDRvhU6hLmLBIGrmjahCxuF70SHlgk7NOlPGqYv/043L/9XHrucT9ksfT22wq+xWQjg8ITShYBA3dpGorJtnD4ss2sedQw/OGCyTB0EY9hAdWKScDgNuVxN2ydwtpU8/mFLWzDlM92afPzaEgRJZ8SuiIGrL7lmk8JG94B1ZHNNNOi1HdLMWaxzXZFZH5PGDrn1aMObXyGouHz2+EVj819M2PWoi2Kjl0jmpLFbv4nLmK3RnUBOZbQoXnRZbrR1YRpwElz5//hBdrmxURmd/o7Ynd8XEa5WrIO2LwHvTbfj0aj9vxfZXcTTmY+nUVo+1OqnOsUc0dM7CaWN5VsDpUUZ87vsN8hOtnD0WgppXF/2qyy8+kN+vNac6orSs7W7u35nESLNyrfNfrP2BcCAMBRO4FejgA3JxIvR4HfZEptktFku7PrvC7K1bH5SeNYFnW2tmkyJ96Hnl22xTw559VKai1Newj4Y82mlHFrG62PRWaX8wXHmC7dZGsPK9Meb37wdOjWp6bM2rPdjFK63lvuL2e3Hz4bXsdUxXpJLFaqrngnW7nC+P7SrYw2tX355TgttvuN/vJpsFNK90hl3ap87Bjfab4rUMbexbsPGRcv+i0CorSWwdW7DWnq3ctlFHN7/HFbzSOkXtmX2mIUUa6eUr6rjFKtX2YTh6L8wXZaOKP2L1FHor38jXwNObXjrwMW6Q9bvv3ocuQNY5pXT5xfvqLibMwyimXHX5f6kKtktDKKffy7BbxQsR0pojiEv0jqR4/zLhFVvznF3EWsRxiLVA8X0A3Gw+BVXHi+TdLX4G+jkA0/ZBgmHvY1fjoNW8HWoC/2LaohbhO3zJBDkbZD92hjyA8SiPr3lzKfDVnE4E8K9DPcBwnCPynQz3AfJOhz/q6P4Q6ciHqkLh3sGz0hXxB6SsLBjkX5fsfraQlnSIiESIiESIiESIiESIiESIiESIiESIiESPjPJRyFGS5hVc7GUA53pF2MZaiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOP5A13sRs+9EUssAAAAAElFTkSuQmCC';
}

export default displayProtectedImage;
