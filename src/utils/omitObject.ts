type Object = Record<string, any>;

export default function omitObject<T extends Object>(obj: T, fields: (keyof T)[]) {
  const res: Object = {};

  for (const key of Object.keys(obj)) {
    if (!fields.find((field) => field === key)) {
      res[key] = obj[key];
    }
  }

  return res;
}
