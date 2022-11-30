type Logger = (d: DurationReturn) => void;

/**
 * Api that any supplied logger function needs to accept.
 */
interface DurationReturn {
  /**
   * Decorator `propertyKey` value
   */
  propertyKey: string;
  /**
   * Measured runtime duration for the method.
   */
  duration: string;
  /**
   * Number of decimal points that the `duration` value returns.
   */
  granularity: number;
  /**
   * Always milliseconds
   */
  unit: "msec";
}

type MeasureDurationParams = {
  /**
   * Sets an output channel for the measured value. Default: `console.log`.
   * See `DurationReturn` interface for details.
   */
  logger: Logger;
  /**
   * Sets how many digits the return value will have after the decimal point.
   */
  granularity: number;
  /**
   * IANA language subtag
   * Ex: EN-US
   */
  locale: string;
};

/**
 * A method decorator for measuring the duration of the method run.
 * @param param0 optional object for customizing the behavior of the decorator.
 *   See `MeasureDurationParams` type for details.
 *
 * @dev
 * Note that a method like this has next to no business caring about the locale
 * or maybe even the granularity of the returned value. They are only included
 * in this method because I felt like it.
 */
export function measureDuration({
  logger = console.log,
  granularity = 1e3,
  locale = "EN-US",
}: Partial<MeasureDurationParams> = {}) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    return {
      writeable: false,
      value: function (
        ...args: Parameters<typeof descriptor.value>
      ): ReturnType<typeof descriptor.value> {
        const start = performance.now();
        const response = descriptor.value.apply(target, args);
        const end = performance.now();
        const rounded = Math.round((end - start) * granularity) / granularity;
        logger({
          propertyKey,
          duration: rounded.toLocaleString(locale),
          granularity,
          unit: "msec" as "msec",
        });
        return response;
      },
    };
  };
}
