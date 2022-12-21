import {ESLint} from "eslint";

export const getFormattedCode = async (content: string) => {
  const output = await new ESLint({
    fix: true,
  }).lintText(content);

  return output[0].output ?? content;
};
