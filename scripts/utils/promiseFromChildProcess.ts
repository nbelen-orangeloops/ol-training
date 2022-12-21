import {ChildProcess, spawn as _spawn} from "child_process";

export function promiseFromChildProcess<T extends ChildProcess>(child: T): Promise<unknown> {
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
}
