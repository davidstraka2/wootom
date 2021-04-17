/* Based on:
 * https://github.com/microsoft/TypeScript/issues/1897#issuecomment-331765301
 */

/** Any valid JSON value */
export type AnyJSON = boolean | number | string | null | JSONArray | JSONMap;

/** JSON Array */
export type JSONArray = AnyJSON[];

/** JSON map object */
export interface JSONMap {
    [key: string]: AnyJSON;
}
