import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest";
import tsConfig from "./tsconfig.json" assert { type: "json" };

const jestConfigFactory = (tsConfig) =>
  /** @type {import('jest').Config} */
  ({
    moduleFileExtensions: ["mts", ...defaults.moduleFileExtensions],
    moduleNameMapper: pathsToModuleNameMapper(
      tsConfig.compilerOptions.paths || {},
      {
        useESM: true,
        prefix: "<rootDir>",
        isolatedModules: true,
      }
    ),
    testMatch: [
      ...defaults.testMatch,
      "**/__tests__/**/*.[mc][jt]s?(x)",
      "**/?(*.)+(spec|test).[mc][tj]s?(x)",
    ],
    transform: {
      "^.+\\.m?tsx?$": [
        "ts-jest",
        {
          useESM: true,
          isolatedModules: true,
          tsconfig: {
            // HACK
            // https://github.com/kulshekhar/ts-jest/issues/4198
            moduleResolution: "classic",
          },
        },
      ],
    },
  });

export default jestConfigFactory(tsConfig);
