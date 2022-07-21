export function DeepTrim(obj: any) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] == 'string') {
        obj[prop] = obj[prop].trim();
      } else if (typeof obj[prop] == 'object') {
        DeepTrim(obj[prop]);
      }
    }
  }
}
