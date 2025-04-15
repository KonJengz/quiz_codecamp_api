export class ObjectHelper {
  public static isEmpty(obj: Object): boolean {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
  }

  public static nonMutateDeDuplicateNewObj<T extends Object>(
    baseObj: T,
    newObj: T,
  ): T {
    const processedObj = { ...newObj };
    for (let key in baseObj) {
      const baseVal = baseObj[key];
      const newVal = newObj[key];
      // If there are no value for the same key in the newObj, continue;
      if (newVal === undefined) continue;

      if (newVal !== baseVal) continue;

      delete processedObj[key];
    }

    return processedObj;
  }
}
