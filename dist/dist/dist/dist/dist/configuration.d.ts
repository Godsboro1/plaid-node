export var __esModule: boolean;
export namespace PlaidEnvironments {
    const production: string;
    const sandbox: string;
    const development: string;
}
export class Configuration {
    constructor(param?: {});
    apiKey: any;
    username: any;
    password: any;
    accessToken: any;
    basePath: any;
    baseOptions: any;
    formDataCtor: any;
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime: any): boolean;
}
