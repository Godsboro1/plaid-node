export var __esModule: boolean;
export var BASE_PATH: string;
export namespace COLLECTION_FORMATS {
    const csv: string;
    const ssv: string;
    const tsv: string;
    const pipes: string;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    constructor(configuration: any, basePath?: string, axios?: any);
    basePath: any;
    axios: any;
    configuration: any;
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    constructor(field: any, msg: any);
    field: any;
}
