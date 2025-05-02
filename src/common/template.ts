export function template<T>(str: string, ctx: T): string {
  return str.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    return (
      key
        .trim()
        .split('.')
        .reduce((acc, part) => acc?.[part], ctx) ?? ''
    );
  });
}
