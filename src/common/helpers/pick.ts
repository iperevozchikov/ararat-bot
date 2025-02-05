export function pick<T extends {} = {}>(value: T, regExpRule: RegExp): T {
  return Object.keys(value)
    .reduce(
      (acc, key) => regExpRule.test(key)
        // @ts-ignore
        ? {...acc, [key]: value[key]}
        : acc,
      {} as T
    );
}
