export var __esModule: boolean;
export var DUMMY_BASE_URL: string;
/**
 *
 * @throws {RequiredError}
 * @export
 */
export function assertParamExists(functionName: any, paramName: any, paramValue: any): void;
/**
 *
 * @export
 */
export function setApiKeyToObject(object: any, keyParamName: any, configuration: any): any;
/**
 *
 * @export
 */
export function setBasicAuthToObject(object: any, configuration: any): void;
/**
 *
 * @export
 */
export function setBearerAuthToObject(object: any, configuration: any): any;
/**
 *
 * @export
 */
export function setOAuthToObject(object: any, name: any, scopes: any, configuration: any): any;
/**
 *
 * @export
 */
export function setSearchParams(url: any, ...objects: any[]): void;
/**
 *
 * @export
 */
export function serializeDataIfNeeded(value: any, requestOptions: any, configuration: any): any;
/**
 *
 * @export
 */
export function toPathString(url: any): any;
/**
 *
 * @export
 */
export function createRequestFunction(axiosArgs: any, globalAxios: any, BASE_PATH: any, configuration: any): (axios?: any, basePath?: any) => any;
