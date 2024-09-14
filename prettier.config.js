export const config = {
  printWidth: 120,
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  exclude: ["./node_modules"],
};
