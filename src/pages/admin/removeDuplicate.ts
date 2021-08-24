export default function removeDuplicates(originalArray: any, prop: any) {
  const newArray: any = [];
  const lookupObject: any = {};

  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
