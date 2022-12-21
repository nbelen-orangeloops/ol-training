import _glob, {IOptions} from "glob";

export const glob = (globPath: string, options: IOptions = {}): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    _glob(globPath, options, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
};
