/** Any valid JSON value */
export declare type AnyJSON = boolean | number | string | null | JSONArray | JSONMap;
/** JSON Array */
export declare type JSONArray = AnyJSON[];
/** JSON map object */
export interface JSONMap {
    [key: string]: AnyJSON;
}
