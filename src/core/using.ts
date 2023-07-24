// https://www.fiovex.de/blog/implementing-a-c-like-using-concept-in-typescript
export interface IDisposable {
  dispose: () => Promise<void> | void;
}

export function using<T extends IDisposable, TResult>(
  resource: T,
  function_: (resource: T) => TResult
) {
  try {
    return function_(resource);
  } finally {
    resource.dispose();
  }
}

export async function usingAsync<T extends IDisposable, TResult>(
  resource: T,
  function_: (resource: T) => Promise<TResult>
) {
  try {
    return await function_(resource);
  } finally {
    await resource.dispose();
  }
}
