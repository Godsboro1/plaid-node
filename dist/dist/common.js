"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * The Plaid API
 * The Plaid REST API. Please see https://plaid.com/docs/api for more details.
 *
 * The version of the OpenAPI document: 2020-09-14_1.345.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
const base_1 = require("./base");
/**
 *
 * @export
 */
exports.DUMMY_BASE_URL = 'https://example.com';
/**
 *
 * @throws {RequiredError}
 * @export
 */
const assertParamExists = function (functionName, paramName, paramValue) {
    if (paramValue === null || paramValue === undefined) {
        throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
    }
};
exports.assertParamExists = assertParamExists;
/**
 *
 * @export
 */
const setApiKeyToObject = function (object, keyParamName, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.apiKey) {
            const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                ? yield configuration.apiKey(keyParamName)
                : yield configuration.apiKey;
            object[keyParamName] = localVarApiKeyValue;
        }
    });
};
exports.setApiKeyToObject = setApiKeyToObject;
/**
 *
 * @export
 */
const setBasicAuthToObject = function (object, configuration) {
    if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
    }
};
exports.setBasicAuthToObject = setBasicAuthToObject;
/**
 *
 * @export
 */
const setBearerAuthToObject = function (object, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
            const accessToken = typeof configuration.accessToken === 'function'
                ? yield configuration.accessToken()
                : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + accessToken;
        }
    });
};
exports.setBearerAuthToObject = setBearerAuthToObject;
/**
 *
 * @export
 */
const setOAuthToObject = function (object, name, scopes, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
            const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                ? yield configuration.accessToken(name, scopes)
                : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + localVarAccessTokenValue;
        }
    });
};
exports.setOAuthToObject = setOAuthToObject;
/**
 *
 * @export
 */
const setSearchParams = function (url, ...objects) {
    const searchParams = new URLSearchParams(url.search);
    for (const object of objects) {
        for (const key in object) {
            if (Array.isArray(object[key])) {
                searchParams.delete(key);
                for (const item of object[key]) {
                    searchParams.append(key, item);
                }
            }
            else {
                searchParams.set(key, object[key]);
            }
        }
    }
    url.search = searchParams.toString();
};
exports.setSearchParams = setSearchParams;
/**
 *
 * @export
 */
const serializeDataIfNeeded = function (value, requestOptions, configuration) {
    const nonString = typeof value !== 'string';
    const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
        : nonString;
    return needsSerialization
        ? JSON.stringify(value !== undefined ? value : {})
        : (value || "");
};
exports.serializeDataIfNeeded = serializeDataIfNeeded;
/**
 *
 * @export
 */
const toPathString = function (url) {
    return url.pathname + url.search + url.hash;
};
exports.toPathString = toPathString;
/**
 *
 * @export
 */
const createRequestFunction = function (axiosArgs, globalAxios, BASE_PATH, configuration) {
    return (axios = globalAxios, basePath = BASE_PATH) => {
        const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
        return axios.request(axiosRequestArgs);
    };
};
exports.createRequestFunction = createRequestFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY29tbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEI7Ozs7Ozs7Ozs7R0FVRztBQUNILElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7SUFDbkYsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUNyRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzNGLFNBQVMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQztRQUM5RixTQUFTLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENB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SSxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFDRixPQUFPLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7QUFDdEQ7OztHQUdHO0FBQ0gsTUFBTSxZQUFZLEdBQUcsVUFBVSxHQUFHO0lBQzlCLE9BQU8sR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBQ0YsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDcEM7OztHQUdHO0FBQ0gsTUFBTSxxQkFBcUIsR0FBRyxVQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWE7SUFDcEYsT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLEVBQUUsUUFBUSxHQUFHLFNBQVMsRUFBRSxFQUFFO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxJQUFJLElBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVNLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUNGLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRoZSBQbGFpZCBBUElcbiAqIFRoZSBQbGFpZCBSRVNUIEFQSS4gUGxlYXNlIHNlZSBodHRwczovL3BsYWlkLmNvbS9kb2NzL2FwaSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAyMDIwLTA5LTE0XzEuMzQ1LjFcbiAqXG4gKlxuICogTk9URTogVGhpcyBjbGFzcyBpcyBhdXRvIGdlbmVyYXRlZCBieSBPcGVuQVBJIEdlbmVyYXRvciAoaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoKS5cbiAqIGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaFxuICogRG8gbm90IGVkaXQgdGhlIGNsYXNzIG1hbnVhbGx5LlxuICovXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlUmVxdWVzdEZ1bmN0aW9uID0gZXhwb3J0cy50b1BhdGhTdHJpbmcgPSBleHBvcnRzLnNlcmlhbGl6ZURhdGFJZk5lZWRlZCA9IGV4cG9ydHMuc2V0U2VhcmNoUGFyYW1zID0gZXhwb3J0cy5zZXRPQXV0aFRvT2JqZWN0ID0gZXhwb3J0cy5zZXRCZWFyZXJBdXRoVG9PYmplY3QgPSBleHBvcnRzLnNldEJhc2ljQXV0aFRvT2JqZWN0ID0gZXhwb3J0cy5zZXRBcGlLZXlUb09iamVjdCA9IGV4cG9ydHMuYXNzZXJ0UGFyYW1FeGlzdHMgPSBleHBvcnRzLkRVTU1ZX0JBU0VfVVJMID0gdm9pZCAwO1xuY29uc3QgYmFzZV8xID0gcmVxdWlyZShcIi4vYmFzZVwiKTtcbi8qKlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0cy5EVU1NWV9CQVNFX1VSTCA9ICdodHRwczovL2V4YW1wbGUuY29tJztcbi8qKlxuICpcbiAqIEB0aHJvd3Mge1JlcXVpcmVkRXJyb3J9XG4gKiBAZXhwb3J0XG4gKi9cbmNvbnN0IGFzc2VydFBhcmFtRXhpc3RzID0gZnVuY3Rpb24gKGZ1bmN0aW9uTmFtZSwgcGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG4gICAgaWYgKHBhcmFtVmFsdWUgPT09IG51bGwgfHwgcGFyYW1WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBiYXNlXzEuUmVxdWlyZWRFcnJvcihwYXJhbU5hbWUsIGBSZXF1aXJlZCBwYXJhbWV0ZXIgJHtwYXJhbU5hbWV9IHdhcyBudWxsIG9yIHVuZGVmaW5lZCB3aGVuIGNhbGxpbmcgJHtmdW5jdGlvbk5hbWV9LmApO1xuICAgIH1cbn07XG5leHBvcnRzLmFzc2VydFBhcmFtRXhpc3RzID0gYXNzZXJ0UGFyYW1FeGlzdHM7XG4vKipcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmNvbnN0IHNldEFwaUtleVRvT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCwga2V5UGFyYW1OYW1lLCBjb25maWd1cmF0aW9uKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24gJiYgY29uZmlndXJhdGlvbi5hcGlLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsVmFyQXBpS2V5VmFsdWUgPSB0eXBlb2YgY29uZmlndXJhdGlvbi5hcGlLZXkgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/IHlpZWxkIGNvbmZpZ3VyYXRpb24uYXBpS2V5KGtleVBhcmFtTmFtZSlcbiAgICAgICAgICAgICAgICA6IHlpZWxkIGNvbmZpZ3VyYXRpb24uYXBpS2V5O1xuICAgICAgICAgICAgb2JqZWN0W2tleVBhcmFtTmFtZV0gPSBsb2NhbFZhckFwaUtleVZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0cy5zZXRBcGlLZXlUb09iamVjdCA9IHNldEFwaUtleVRvT2JqZWN0O1xuLyoqXG4gKlxuICogQGV4cG9ydFxuICovXG5jb25zdCBzZXRCYXNpY0F1dGhUb09iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICBpZiAoY29uZmlndXJhdGlvbiAmJiAoY29uZmlndXJhdGlvbi51c2VybmFtZSB8fCBjb25maWd1cmF0aW9uLnBhc3N3b3JkKSkge1xuICAgICAgICBvYmplY3RbXCJhdXRoXCJdID0geyB1c2VybmFtZTogY29uZmlndXJhdGlvbi51c2VybmFtZSwgcGFzc3dvcmQ6IGNvbmZpZ3VyYXRpb24ucGFzc3dvcmQgfTtcbiAgICB9XG59O1xuZXhwb3J0cy5zZXRCYXNpY0F1dGhUb09iamVjdCA9IHNldEJhc2ljQXV0aFRvT2JqZWN0O1xuLyoqXG4gKlxuICogQGV4cG9ydFxuICovXG5jb25zdCBzZXRCZWFyZXJBdXRoVG9PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCBjb25maWd1cmF0aW9uKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24gJiYgY29uZmlndXJhdGlvbi5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0eXBlb2YgY29uZmlndXJhdGlvbi5hY2Nlc3NUb2tlbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8geWllbGQgY29uZmlndXJhdGlvbi5hY2Nlc3NUb2tlbigpXG4gICAgICAgICAgICAgICAgOiB5aWVsZCBjb25maWd1cmF0aW9uLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgb2JqZWN0W1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgYWNjZXNzVG9rZW47XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnRzLnNldEJlYXJlckF1dGhUb09iamVjdCA9IHNldEJlYXJlckF1dGhUb09iamVjdDtcbi8qKlxuICpcbiAqIEBleHBvcnRcbiAqL1xuY29uc3Qgc2V0T0F1dGhUb09iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHNjb3BlcywgY29uZmlndXJhdGlvbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uICYmIGNvbmZpZ3VyYXRpb24uYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsVmFyQWNjZXNzVG9rZW5WYWx1ZSA9IHR5cGVvZiBjb25maWd1cmF0aW9uLmFjY2Vzc1Rva2VuID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyB5aWVsZCBjb25maWd1cmF0aW9uLmFjY2Vzc1Rva2VuKG5hbWUsIHNjb3BlcylcbiAgICAgICAgICAgICAgICA6IHlpZWxkIGNvbmZpZ3VyYXRpb24uYWNjZXNzVG9rZW47XG4gICAgICAgICAgICBvYmplY3RbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyBsb2NhbFZhckFjY2Vzc1Rva2VuVmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnRzLnNldE9BdXRoVG9PYmplY3QgPSBzZXRPQXV0aFRvT2JqZWN0O1xuLyoqXG4gKlxuICogQGV4cG9ydFxuICovXG5jb25zdCBzZXRTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAodXJsLCAuLi5vYmplY3RzKSB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuc2VhcmNoKTtcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBvYmplY3RzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIG9iamVjdFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cmwuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG59O1xuZXhwb3J0cy5zZXRTZWFyY2hQYXJhbXMgPSBzZXRTZWFyY2hQYXJhbXM7XG4vKipcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmNvbnN0IHNlcmlhbGl6ZURhdGFJZk5lZWRlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVxdWVzdE9wdGlvbnMsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICBjb25zdCBub25TdHJpbmcgPSB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnO1xuICAgIGNvbnN0IG5lZWRzU2VyaWFsaXphdGlvbiA9IG5vblN0cmluZyAmJiBjb25maWd1cmF0aW9uICYmIGNvbmZpZ3VyYXRpb24uaXNKc29uTWltZVxuICAgICAgICA/IGNvbmZpZ3VyYXRpb24uaXNKc29uTWltZShyZXF1ZXN0T3B0aW9ucy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSlcbiAgICAgICAgOiBub25TdHJpbmc7XG4gICAgcmV0dXJuIG5lZWRzU2VyaWFsaXphdGlvblxuICAgICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KVxuICAgICAgICA6ICh2YWx1ZSB8fCBcIlwiKTtcbn07XG5leHBvcnRzLnNlcmlhbGl6ZURhdGFJZk5lZWRlZCA9IHNlcmlhbGl6ZURhdGFJZk5lZWRlZDtcbi8qKlxuICpcbiAqIEBleHBvcnRcbiAqL1xuY29uc3QgdG9QYXRoU3RyaW5nID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG59O1xuZXhwb3J0cy50b1BhdGhTdHJpbmcgPSB0b1BhdGhTdHJpbmc7XG4vKipcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmNvbnN0IGNyZWF0ZVJlcXVlc3RGdW5jdGlvbiA9IGZ1bmN0aW9uIChheGlvc0FyZ3MsIGdsb2JhbEF4aW9zLCBCQVNFX1BBVEgsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICByZXR1cm4gKGF4aW9zID0gZ2xvYmFsQXhpb3MsIGJhc2VQYXRoID0gQkFTRV9QQVRIKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9zUmVxdWVzdEFyZ3MgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGF4aW9zQXJncy5vcHRpb25zKSwgeyB1cmw6ICgoY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCBjb25maWd1cmF0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWd1cmF0aW9uLmJhc2VQYXRoKSB8fCBiYXNlUGF0aCkgKyBheGlvc0FyZ3MudXJsIH0pO1xuICAgICAgICByZXR1cm4gYXhpb3MucmVxdWVzdChheGlvc1JlcXVlc3RBcmdzKTtcbiAgICB9O1xufTtcbmV4cG9ydHMuY3JlYXRlUmVxdWVzdEZ1bmN0aW9uID0gY3JlYXRlUmVxdWVzdEZ1bmN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTI5dGJXOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZZMjl0Ylc5dUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVN4dlFrRkJiMEk3UVVGRGNFSXNiMEpCUVc5Q08wRkJRM0JDT3pzN096czdPenM3TzBkQlZVYzdPenM3T3pzN096czdPenRCUVVsSUxHbERRVUZ2UkR0QlFVZHdSRHM3TzBkQlIwYzdRVUZEVlN4UlFVRkJMR05CUVdNc1IwRkJSeXh4UWtGQmNVSXNRMEZCUVR0QlFVVnVSRHM3T3p0SFFVbEhPMEZCUTBrc1RVRkJUU3hwUWtGQmFVSXNSMEZCUnl4VlFVRlZMRmxCUVc5Q0xFVkJRVVVzVTBGQmFVSXNSVUZCUlN4VlFVRnRRanRKUVVOdVJ5eEpRVUZKTEZWQlFWVXNTMEZCU3l4SlFVRkpMRWxCUVVrc1ZVRkJWU3hMUVVGTExGTkJRVk1zUlVGQlJUdFJRVU5xUkN4TlFVRk5MRWxCUVVrc2IwSkJRV0VzUTBGQlF5eFRRVUZUTEVWQlFVVXNjMEpCUVhOQ0xGTkJRVk1zZFVOQlFYVkRMRmxCUVZrc1IwRkJSeXhEUVVGRExFTkJRVU03UzBGRE4wZzdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRktXU3hSUVVGQkxHbENRVUZwUWl4eFFrRkpOMEk3UVVGRlJEczdPMGRCUjBjN1FVRkRTU3hOUVVGTkxHbENRVUZwUWl4SFFVRkhMRlZCUVdkQ0xFMUJRVmNzUlVGQlJTeFpRVUZ2UWl4RlFVRkZMR0ZCUVRaQ096dFJRVU0zUnl4SlFVRkpMR0ZCUVdFc1NVRkJTU3hoUVVGaExFTkJRVU1zVFVGQlRTeEZRVUZGTzFsQlEzWkRMRTFCUVUwc2JVSkJRVzFDTEVkQlFVY3NUMEZCVHl4aFFVRmhMRU5CUVVNc1RVRkJUU3hMUVVGTExGVkJRVlU3WjBKQlEyeEZMRU5CUVVNc1EwRkJReXhOUVVGTkxHRkJRV0VzUTBGQlF5eE5RVUZOTEVOQlFVTXNXVUZCV1N4RFFVRkRPMmRDUVVNeFF5eERRVUZETEVOQlFVTXNUVUZCVFN4aFFVRmhMRU5CUVVNc1RVRkJUU3hEUVVGRE8xbEJRMnBETEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1IwRkJSeXh0UWtGQmJVSXNRMEZCUXp0VFFVTTVRenRKUVVOTUxFTkJRVU03UTBGQlFTeERRVUZCTzBGQlVGa3NVVUZCUVN4cFFrRkJhVUlzY1VKQlR6ZENPMEZCUlVRN096dEhRVWRITzBGQlEwa3NUVUZCVFN4dlFrRkJiMElzUjBGQlJ5eFZRVUZWTEUxQlFWY3NSVUZCUlN4aFFVRTJRanRKUVVOd1JpeEpRVUZKTEdGQlFXRXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhSUVVGUkxFbEJRVWtzWVVGQllTeERRVUZETEZGQlFWRXNRMEZCUXl4RlFVRkZPMUZCUTNKRkxFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRkZCUVZFc1JVRkJSU3hoUVVGaExFTkJRVU1zVVVGQlVTeEZRVUZGTEZGQlFWRXNSVUZCUlN4aFFVRmhMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU03UzBGRE0wWTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRktXU3hSUVVGQkxHOUNRVUZ2UWl4M1FrRkphRU03UVVGRlJEczdPMGRCUjBjN1FVRkRTU3hOUVVGTkxIRkNRVUZ4UWl4SFFVRkhMRlZCUVdkQ0xFMUJRVmNzUlVGQlJTeGhRVUUyUWpzN1VVRkRNMFlzU1VGQlNTeGhRVUZoTEVsQlFVa3NZVUZCWVN4RFFVRkRMRmRCUVZjc1JVRkJSVHRaUVVNMVF5eE5RVUZOTEZkQlFWY3NSMEZCUnl4UFFVRlBMR0ZCUVdFc1EwRkJReXhYUVVGWExFdEJRVXNzVlVGQlZUdG5Ra0ZETDBRc1EwRkJReXhEUVVGRExFMUJRVTBzWVVGQllTeERRVUZETEZkQlFWY3NSVUZCUlR0blFrRkRia01zUTBGQlF5eERRVUZETEUxQlFVMHNZVUZCWVN4RFFVRkRMRmRCUVZjc1EwRkJRenRaUVVOMFF5eE5RVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWRCUVVjc1UwRkJVeXhIUVVGSExGZEJRVmNzUTBGQlF6dFRRVU55UkR0SlFVTk1MRU5CUVVNN1EwRkJRU3hEUVVGQk8wRkJVRmtzVVVGQlFTeHhRa0ZCY1VJc2VVSkJUMnBETzBGQlJVUTdPenRIUVVkSE8wRkJRMGtzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhWUVVGblFpeE5RVUZYTEVWQlFVVXNTVUZCV1N4RlFVRkZMRTFCUVdkQ0xFVkJRVVVzWVVGQk5rSTdPMUZCUTNSSUxFbEJRVWtzWVVGQllTeEpRVUZKTEdGQlFXRXNRMEZCUXl4WFFVRlhMRVZCUVVVN1dVRkROVU1zVFVGQlRTeDNRa0ZCZDBJc1IwRkJSeXhQUVVGUExHRkJRV0VzUTBGQlF5eFhRVUZYTEV0QlFVc3NWVUZCVlR0blFrRkROVVVzUTBGQlF5eERRVUZETEUxQlFVMHNZVUZCWVN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETzJkQ1FVTXZReXhEUVVGRExFTkJRVU1zVFVGQlRTeGhRVUZoTEVOQlFVTXNWMEZCVnl4RFFVRkRPMWxCUTNSRExFMUJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNSMEZCUnl4VFFVRlRMRWRCUVVjc2QwSkJRWGRDTEVOQlFVTTdVMEZEYkVVN1NVRkRUQ3hEUVVGRE8wTkJRVUVzUTBGQlFUdEJRVkJaTEZGQlFVRXNaMEpCUVdkQ0xHOUNRVTgxUWp0QlFVVkVPenM3UjBGSFJ6dEJRVU5KTEUxQlFVMHNaVUZCWlN4SFFVRkhMRlZCUVZVc1IwRkJVU3hGUVVGRkxFZEJRVWNzVDBGQll6dEpRVU5vUlN4TlFVRk5MRmxCUVZrc1IwRkJSeXhKUVVGSkxHVkJRV1VzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRja1FzUzBGQlN5eE5RVUZOTEUxQlFVMHNTVUZCU1N4UFFVRlBMRVZCUVVVN1VVRkRNVUlzUzBGQlN5eE5RVUZOTEVkQlFVY3NTVUZCU1N4TlFVRk5MRVZCUVVVN1dVRkRkRUlzU1VGQlNTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEZRVUZGTzJkQ1FVTTFRaXhaUVVGWkxFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVONlFpeExRVUZMTEUxQlFVMHNTVUZCU1N4SlFVRkpMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJUdHZRa0ZETlVJc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN2FVSkJRMnhETzJGQlEwbzdhVUpCUVUwN1owSkJRMGdzV1VGQldTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRVZCUVVVc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdZVUZEZEVNN1UwRkRTanRMUVVOS08wbEJRMFFzUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnl4WlFVRlpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU03UVVGRGVrTXNRMEZCUXl4RFFVRkJPMEZCWmxrc1VVRkJRU3hsUVVGbExHMUNRV1V6UWp0QlFVVkVPenM3UjBGSFJ6dEJRVU5KTEUxQlFVMHNjVUpCUVhGQ0xFZEJRVWNzVlVGQlZTeExRVUZWTEVWQlFVVXNZMEZCYlVJc1JVRkJSU3hoUVVFMlFqdEpRVU42Unl4TlFVRk5MRk5CUVZNc1IwRkJSeXhQUVVGUExFdEJRVXNzUzBGQlN5eFJRVUZSTEVOQlFVTTdTVUZETlVNc1RVRkJUU3hyUWtGQmEwSXNSMEZCUnl4VFFVRlRMRWxCUVVrc1lVRkJZU3hKUVVGSkxHRkJRV0VzUTBGQlF5eFZRVUZWTzFGQlF6ZEZMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zVlVGQlZTeERRVUZETEdOQlFXTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03VVVGRGJFVXNRMEZCUXl4RFFVRkRMRk5CUVZNc1EwRkJRenRKUVVOb1FpeFBRVUZQTEd0Q1FVRnJRanRSUVVOeVFpeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFdEJRVXNzVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF6dFJRVU5zUkN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTTdRVUZEZUVJc1EwRkJReXhEUVVGQk8wRkJVbGtzVVVGQlFTeHhRa0ZCY1VJc2VVSkJVV3BETzBGQlJVUTdPenRIUVVkSE8wRkJRMGtzVFVGQlRTeFpRVUZaTEVkQlFVY3NWVUZCVlN4SFFVRlJPMGxCUXpGRExFOUJRVThzUjBGQlJ5eERRVUZETEZGQlFWRXNSMEZCUnl4SFFVRkhMRU5CUVVNc1RVRkJUU3hIUVVGSExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVRTdRVUZETDBNc1EwRkJReXhEUVVGQk8wRkJSbGtzVVVGQlFTeFpRVUZaTEdkQ1FVVjRRanRCUVVWRU96czdSMEZIUnp0QlFVTkpMRTFCUVUwc2NVSkJRWEZDTEVkQlFVY3NWVUZCVlN4VFFVRnpRaXhGUVVGRkxGZEJRVEJDTEVWQlFVVXNVMEZCYVVJc1JVRkJSU3hoUVVFMlFqdEpRVU12U1N4UFFVRlBMRU5CUVVNc1VVRkJkVUlzVjBGQlZ5eEZRVUZGTEZkQlFXMUNMRk5CUVZNc1JVRkJSU3hGUVVGRk8xRkJRM2hGTEUxQlFVMHNaMEpCUVdkQ0xHMURRVUZQTEZOQlFWTXNRMEZCUXl4UFFVRlBMRXRCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlFTeGhRVUZoTEdGQlFXSXNZVUZCWVN4MVFrRkJZaXhoUVVGaExFTkJRVVVzVVVGQlVTeExRVUZKTEZGQlFWRXNRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFZEJRVU1zUTBGQlF6dFJRVU0xUnl4UFFVRlBMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenRKUVVNelF5eERRVUZETEVOQlFVTTdRVUZEVGl4RFFVRkRMRU5CUVVFN1FVRk1XU3hSUVVGQkxIRkNRVUZ4UWl4NVFrRkxha01pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktpQjBjMnhwYm5RNlpHbHpZV0pzWlNBcUwxeHVMeW9nWlhOc2FXNTBMV1JwYzJGaWJHVWdLaTljYmk4cUtseHVJQ29nVkdobElGQnNZV2xrSUVGUVNWeHVJQ29nVkdobElGQnNZV2xrSUZKRlUxUWdRVkJKTGlCUWJHVmhjMlVnYzJWbElHaDBkSEJ6T2k4dmNHeGhhV1F1WTI5dEwyUnZZM012WVhCcElHWnZjaUJ0YjNKbElHUmxkR0ZwYkhNdVhHNGdLbHh1SUNvZ1ZHaGxJSFpsY25OcGIyNGdiMllnZEdobElFOXdaVzVCVUVrZ1pHOWpkVzFsYm5RNklESXdNakF0TURrdE1UUmZNUzR6TkRVdU1WeHVJQ29nWEc0Z0tseHVJQ29nVGs5VVJUb2dWR2hwY3lCamJHRnpjeUJwY3lCaGRYUnZJR2RsYm1WeVlYUmxaQ0JpZVNCUGNHVnVRVkJKSUVkbGJtVnlZWFJ2Y2lBb2FIUjBjSE02THk5dmNHVnVZWEJwTFdkbGJtVnlZWFJ2Y2k1MFpXTm9LUzVjYmlBcUlHaDBkSEJ6T2k4dmIzQmxibUZ3YVMxblpXNWxjbUYwYjNJdWRHVmphRnh1SUNvZ1JHOGdibTkwSUdWa2FYUWdkR2hsSUdOc1lYTnpJRzFoYm5WaGJHeDVMbHh1SUNvdlhHNWNibHh1YVcxd2IzSjBJSHNnUTI5dVptbG5kWEpoZEdsdmJpQjlJR1p5YjIwZ1hDSXVMMk52Ym1acFozVnlZWFJwYjI1Y0lqdGNibWx0Y0c5eWRDQjdJRkpsY1hWcGNtVmtSWEp5YjNJczQ0Q0FVbVZ4ZFdWemRFRnlaM01nZlNCbWNtOXRJRndpTGk5aVlYTmxYQ0k3WEc1cGJYQnZjblFnZXlCQmVHbHZjMGx1YzNSaGJtTmxJSDBnWm5KdmJTQW5ZWGhwYjNNbk8xeHVYRzR2S2lwY2JpQXFYRzRnS2lCQVpYaHdiM0owWEc0Z0tpOWNibVY0Y0c5eWRDQmpiMjV6ZENCRVZVMU5XVjlDUVZORlgxVlNUQ0E5SUNkb2RIUndjem92TDJWNFlXMXdiR1V1WTI5dEoxeHVYRzR2S2lwY2JpQXFYRzRnS2lCQWRHaHliM2R6SUh0U1pYRjFhWEpsWkVWeWNtOXlmVnh1SUNvZ1FHVjRjRzl5ZEZ4dUlDb3ZYRzVsZUhCdmNuUWdZMjl1YzNRZ1lYTnpaWEowVUdGeVlXMUZlR2x6ZEhNZ1BTQm1kVzVqZEdsdmJpQW9ablZ1WTNScGIyNU9ZVzFsT2lCemRISnBibWNzSUhCaGNtRnRUbUZ0WlRvZ2MzUnlhVzVuTENCd1lYSmhiVlpoYkhWbE9pQjFibXR1YjNkdUtTQjdYRzRnSUNBZ2FXWWdLSEJoY21GdFZtRnNkV1VnUFQwOUlHNTFiR3dnZkh3Z2NHRnlZVzFXWVd4MVpTQTlQVDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QlNaWEYxYVhKbFpFVnljbTl5S0hCaGNtRnRUbUZ0WlN3Z1lGSmxjWFZwY21Wa0lIQmhjbUZ0WlhSbGNpQWtlM0JoY21GdFRtRnRaWDBnZDJGeklHNTFiR3dnYjNJZ2RXNWtaV1pwYm1Wa0lIZG9aVzRnWTJGc2JHbHVaeUFrZTJaMWJtTjBhVzl1VG1GdFpYMHVZQ2s3WEc0Z0lDQWdmVnh1ZlZ4dVhHNHZLaXBjYmlBcVhHNGdLaUJBWlhod2IzSjBYRzRnS2k5Y2JtVjRjRzl5ZENCamIyNXpkQ0J6WlhSQmNHbExaWGxVYjA5aWFtVmpkQ0E5SUdGemVXNWpJR1oxYm1OMGFXOXVJQ2h2WW1wbFkzUTZJR0Z1ZVN3Z2EyVjVVR0Z5WVcxT1lXMWxPaUJ6ZEhKcGJtY3NJR052Ym1acFozVnlZWFJwYjI0L09pQkRiMjVtYVdkMWNtRjBhVzl1S1NCN1hHNGdJQ0FnYVdZZ0tHTnZibVpwWjNWeVlYUnBiMjRnSmlZZ1kyOXVabWxuZFhKaGRHbHZiaTVoY0dsTFpYa3BJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdiRzlqWVd4V1lYSkJjR2xMWlhsV1lXeDFaU0E5SUhSNWNHVnZaaUJqYjI1bWFXZDFjbUYwYVc5dUxtRndhVXRsZVNBOVBUMGdKMloxYm1OMGFXOXVKMXh1SUNBZ0lDQWdJQ0FnSUNBZ1B5QmhkMkZwZENCamIyNW1hV2QxY21GMGFXOXVMbUZ3YVV0bGVTaHJaWGxRWVhKaGJVNWhiV1VwWEc0Z0lDQWdJQ0FnSUNBZ0lDQTZJR0YzWVdsMElHTnZibVpwWjNWeVlYUnBiMjR1WVhCcFMyVjVPMXh1SUNBZ0lDQWdJQ0J2WW1wbFkzUmJhMlY1VUdGeVlXMU9ZVzFsWFNBOUlHeHZZMkZzVm1GeVFYQnBTMlY1Vm1Gc2RXVTdYRzRnSUNBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxWEc0Z0tpQkFaWGh3YjNKMFhHNGdLaTljYm1WNGNHOXlkQ0JqYjI1emRDQnpaWFJDWVhOcFkwRjFkR2hVYjA5aWFtVmpkQ0E5SUdaMWJtTjBhVzl1SUNodlltcGxZM1E2SUdGdWVTd2dZMjl1Wm1sbmRYSmhkR2x2Ymo4NklFTnZibVpwWjNWeVlYUnBiMjRwSUh0Y2JpQWdJQ0JwWmlBb1kyOXVabWxuZFhKaGRHbHZiaUFtSmlBb1kyOXVabWxuZFhKaGRHbHZiaTUxYzJWeWJtRnRaU0I4ZkNCamIyNW1hV2QxY21GMGFXOXVMbkJoYzNOM2IzSmtLU2tnZTF4dUlDQWdJQ0FnSUNCdlltcGxZM1JiWENKaGRYUm9YQ0pkSUQwZ2V5QjFjMlZ5Ym1GdFpUb2dZMjl1Wm1sbmRYSmhkR2x2Ymk1MWMyVnlibUZ0WlN3Z2NHRnpjM2R2Y21RNklHTnZibVpwWjNWeVlYUnBiMjR1Y0dGemMzZHZjbVFnZlR0Y2JpQWdJQ0I5WEc1OVhHNWNiaThxS2x4dUlDcGNiaUFxSUVCbGVIQnZjblJjYmlBcUwxeHVaWGh3YjNKMElHTnZibk4wSUhObGRFSmxZWEpsY2tGMWRHaFViMDlpYW1WamRDQTlJR0Z6ZVc1aklHWjFibU4wYVc5dUlDaHZZbXBsWTNRNklHRnVlU3dnWTI5dVptbG5kWEpoZEdsdmJqODZJRU52Ym1acFozVnlZWFJwYjI0cElIdGNiaUFnSUNCcFppQW9ZMjl1Wm1sbmRYSmhkR2x2YmlBbUppQmpiMjVtYVdkMWNtRjBhVzl1TG1GalkyVnpjMVJ2YTJWdUtTQjdYRzRnSUNBZ0lDQWdJR052Ym5OMElHRmpZMlZ6YzFSdmEyVnVJRDBnZEhsd1pXOW1JR052Ym1acFozVnlZWFJwYjI0dVlXTmpaWE56Vkc5clpXNGdQVDA5SUNkbWRXNWpkR2x2YmlkY2JpQWdJQ0FnSUNBZ0lDQWdJRDhnWVhkaGFYUWdZMjl1Wm1sbmRYSmhkR2x2Ymk1aFkyTmxjM05VYjJ0bGJpZ3BYRzRnSUNBZ0lDQWdJQ0FnSUNBNklHRjNZV2wwSUdOdmJtWnBaM1Z5WVhScGIyNHVZV05qWlhOelZHOXJaVzQ3WEc0Z0lDQWdJQ0FnSUc5aWFtVmpkRnRjSWtGMWRHaHZjbWw2WVhScGIyNWNJbDBnUFNCY0lrSmxZWEpsY2lCY0lpQXJJR0ZqWTJWemMxUnZhMlZ1TzF4dUlDQWdJSDFjYm4xY2JseHVMeW9xWEc0Z0tseHVJQ29nUUdWNGNHOXlkRnh1SUNvdlhHNWxlSEJ2Y25RZ1kyOXVjM1FnYzJWMFQwRjFkR2hVYjA5aWFtVmpkQ0E5SUdGemVXNWpJR1oxYm1OMGFXOXVJQ2h2WW1wbFkzUTZJR0Z1ZVN3Z2JtRnRaVG9nYzNSeWFXNW5MQ0J6WTI5d1pYTTZJSE4wY21sdVoxdGRMQ0JqYjI1bWFXZDFjbUYwYVc5dVB6b2dRMjl1Wm1sbmRYSmhkR2x2YmlrZ2UxeHVJQ0FnSUdsbUlDaGpiMjVtYVdkMWNtRjBhVzl1SUNZbUlHTnZibVpwWjNWeVlYUnBiMjR1WVdOalpYTnpWRzlyWlc0cElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2JHOWpZV3hXWVhKQlkyTmxjM05VYjJ0bGJsWmhiSFZsSUQwZ2RIbHdaVzltSUdOdmJtWnBaM1Z5WVhScGIyNHVZV05qWlhOelZHOXJaVzRnUFQwOUlDZG1kVzVqZEdsdmJpZGNiaUFnSUNBZ0lDQWdJQ0FnSUQ4Z1lYZGhhWFFnWTI5dVptbG5kWEpoZEdsdmJpNWhZMk5sYzNOVWIydGxiaWh1WVcxbExDQnpZMjl3WlhNcFhHNGdJQ0FnSUNBZ0lDQWdJQ0E2SUdGM1lXbDBJR052Ym1acFozVnlZWFJwYjI0dVlXTmpaWE56Vkc5clpXNDdYRzRnSUNBZ0lDQWdJRzlpYW1WamRGdGNJa0YxZEdodmNtbDZZWFJwYjI1Y0lsMGdQU0JjSWtKbFlYSmxjaUJjSWlBcklHeHZZMkZzVm1GeVFXTmpaWE56Vkc5clpXNVdZV3gxWlR0Y2JpQWdJQ0I5WEc1OVhHNWNiaThxS2x4dUlDcGNiaUFxSUVCbGVIQnZjblJjYmlBcUwxeHVaWGh3YjNKMElHTnZibk4wSUhObGRGTmxZWEpqYUZCaGNtRnRjeUE5SUdaMWJtTjBhVzl1SUNoMWNtdzZJRlZTVEN3Z0xpNHViMkpxWldOMGN6b2dZVzU1VzEwcElIdGNiaUFnSUNCamIyNXpkQ0J6WldGeVkyaFFZWEpoYlhNZ1BTQnVaWGNnVlZKTVUyVmhjbU5vVUdGeVlXMXpLSFZ5YkM1elpXRnlZMmdwTzF4dUlDQWdJR1p2Y2lBb1kyOXVjM1FnYjJKcVpXTjBJRzltSUc5aWFtVmpkSE1wSUh0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2hqYjI1emRDQnJaWGtnYVc0Z2IySnFaV04wS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2h2WW1wbFkzUmJhMlY1WFNrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV0Z5WTJoUVlYSmhiWE11WkdWc1pYUmxLR3RsZVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2hqYjI1emRDQnBkR1Z0SUc5bUlHOWlhbVZqZEZ0clpYbGRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxZWEpqYUZCaGNtRnRjeTVoY0hCbGJtUW9hMlY1TENCcGRHVnRLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxZWEpqYUZCaGNtRnRjeTV6WlhRb2EyVjVMQ0J2WW1wbFkzUmJhMlY1WFNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lDQWdkWEpzTG5ObFlYSmphQ0E5SUhObFlYSmphRkJoY21GdGN5NTBiMU4wY21sdVp5Z3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcVhHNGdLaUJBWlhod2IzSjBYRzRnS2k5Y2JtVjRjRzl5ZENCamIyNXpkQ0J6WlhKcFlXeHBlbVZFWVhSaFNXWk9aV1ZrWldRZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVNklHRnVlU3dnY21WeGRXVnpkRTl3ZEdsdmJuTTZJR0Z1ZVN3Z1kyOXVabWxuZFhKaGRHbHZiajg2SUVOdmJtWnBaM1Z5WVhScGIyNHBJSHRjYmlBZ0lDQmpiMjV6ZENCdWIyNVRkSEpwYm1jZ1BTQjBlWEJsYjJZZ2RtRnNkV1VnSVQwOUlDZHpkSEpwYm1jbk8xeHVJQ0FnSUdOdmJuTjBJRzVsWldSelUyVnlhV0ZzYVhwaGRHbHZiaUE5SUc1dmJsTjBjbWx1WnlBbUppQmpiMjVtYVdkMWNtRjBhVzl1SUNZbUlHTnZibVpwWjNWeVlYUnBiMjR1YVhOS2MyOXVUV2x0WlZ4dUlDQWdJQ0FnSUNBL0lHTnZibVpwWjNWeVlYUnBiMjR1YVhOS2MyOXVUV2x0WlNoeVpYRjFaWE4wVDNCMGFXOXVjeTVvWldGa1pYSnpXeWREYjI1MFpXNTBMVlI1Y0dVblhTbGNiaUFnSUNBZ0lDQWdPaUJ1YjI1VGRISnBibWM3WEc0Z0lDQWdjbVYwZFhKdUlHNWxaV1J6VTJWeWFXRnNhWHBoZEdsdmJseHVJQ0FnSUNBZ0lDQS9JRXBUVDA0dWMzUnlhVzVuYVdaNUtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdQeUIyWVd4MVpTQTZJSHQ5S1Z4dUlDQWdJQ0FnSUNBNklDaDJZV3gxWlNCOGZDQmNJbHdpS1R0Y2JuMWNibHh1THlvcVhHNGdLbHh1SUNvZ1FHVjRjRzl5ZEZ4dUlDb3ZYRzVsZUhCdmNuUWdZMjl1YzNRZ2RHOVFZWFJvVTNSeWFXNW5JRDBnWm5WdVkzUnBiMjRnS0hWeWJEb2dWVkpNS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFZ5YkM1d1lYUm9ibUZ0WlNBcklIVnliQzV6WldGeVkyZ2dLeUIxY213dWFHRnphRnh1ZlZ4dVhHNHZLaXBjYmlBcVhHNGdLaUJBWlhod2IzSjBYRzRnS2k5Y2JtVjRjRzl5ZENCamIyNXpkQ0JqY21WaGRHVlNaWEYxWlhOMFJuVnVZM1JwYjI0Z1BTQm1kVzVqZEdsdmJpQW9ZWGhwYjNOQmNtZHpPaUJTWlhGMVpYTjBRWEpuY3l3Z1oyeHZZbUZzUVhocGIzTTZJRUY0YVc5elNXNXpkR0Z1WTJVc0lFSkJVMFZmVUVGVVNEb2djM1J5YVc1bkxDQmpiMjVtYVdkMWNtRjBhVzl1UHpvZ1EyOXVabWxuZFhKaGRHbHZiaWtnZTF4dUlDQWdJSEpsZEhWeWJpQW9ZWGhwYjNNNklFRjRhVzl6U1c1emRHRnVZMlVnUFNCbmJHOWlZV3hCZUdsdmN5d2dZbUZ6WlZCaGRHZzZJSE4wY21sdVp5QTlJRUpCVTBWZlVFRlVTQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCaGVHbHZjMUpsY1hWbGMzUkJjbWR6SUQwZ2V5NHVMbUY0YVc5elFYSm5jeTV2Y0hScGIyNXpMQ0IxY213NklDaGpiMjVtYVdkMWNtRjBhVzl1UHk1aVlYTmxVR0YwYUNCOGZDQmlZWE5sVUdGMGFDa2dLeUJoZUdsdmMwRnlaM011ZFhKc2ZUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHRjRhVzl6TG5KbGNYVmxjM1FvWVhocGIzTlNaWEYxWlhOMFFYSm5jeWs3WEc0Z0lDQWdmVHRjYm4xY2JpSmRmUT09Il19