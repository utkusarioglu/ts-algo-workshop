export function measureDuration(name: string, callback: () => any) {
  const start = performance.now();
  const response = callback();
  const end = performance.now();
  console.log(`${name}: ${end - start}`);
  return response;
}

export function duration() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const cb = descriptor.value;
    return {
      writeable: false,
      configurable: false,
      enumerable: false,
      value: function (
        ...args: Parameters<typeof descriptor.value>
      ): ReturnType<typeof descriptor.value> {
        const start = performance.now();
        const response = cb.call(target, ...args);
        const end = performance.now();
        const granularity = 1e2;
        const rounded = Math.round((end - start) * granularity) / granularity;
        console.log(
          [
            `'${propertyKey.toString()}'`,
            "lasted",
            rounded.toLocaleString("EN-us"),
            "msecs",
          ].join(" ")
        );
        return response;
      },
    };
  };
}
