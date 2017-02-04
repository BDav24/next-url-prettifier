/* @flow */

const isObject: (any) => boolean = (param: any): boolean =>
  param === Object(param)
;

const paramsToStringList = (entries: [string, any][]): string[] =>
  entries.reduce(
    (result: string[], [key, value]: [string, any]): string[] =>
      result.concat(Array.isArray(value)
        ? paramsToStringList(
          value.map((arrayValue: any): [string, any] => [`${key}[]`, arrayValue])
        )
        : [typeof value === 'string' || typeof value === 'number' ? `${key}=${value}` : '']),
    []
  )
;

export default function paramsToQueryString(params: any): string {
  const paramsString: string = isObject(params)
    ? paramsToStringList(
        Object.keys(params)
          .sort()
          .map((key: string | number): [string, any] => [String(key), params[key]])
      )
      .filter((chunk: string): boolean => chunk.length > 0)
      .join('&')
    : ''
  ;
  return paramsString.length > 0 ? `?${paramsString}` : '';
}
