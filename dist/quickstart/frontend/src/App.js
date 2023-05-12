"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Headers_1 = __importDefault(require("./Components/Headers"));
const Products_1 = __importDefault(require("./Components/ProductTypes/Products"));
const Items_1 = __importDefault(require("./Components/ProductTypes/Items"));
const Context_1 = __importDefault(require("./Context"));
const App_module_scss_1 = __importDefault(require("./App.module.scss"));
const App = () => {
    const { linkSuccess, isItemAccess, isPaymentInitiation, dispatch } = react_1.useContext(Context_1.default);
    const getInfo = react_1.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch("/api/info", { method: "POST" });
        if (!response.ok) {
            dispatch({ type: "SET_STATE", state: { backend: false } });
            return { paymentInitiation: false };
        }
        const data = yield response.json();
        const paymentInitiation = data.products.includes("payment_initiation");
        dispatch({
            type: "SET_STATE",
            state: {
                products: data.products,
                isPaymentInitiation: paymentInitiation,
            },
        });
        return { paymentInitiation };
    }), [dispatch]);
    const generateToken = react_1.useCallback((isPaymentInitiation) => __awaiter(void 0, void 0, void 0, function* () {
        // Link tokens for 'payment_initiation' use a different creation flow in your backend.
        const path = isPaymentInitiation
            ? "/api/create_link_token_for_payment"
            : "/api/create_link_token";
        const response = yield fetch(path, {
            method: "POST",
        });
        if (!response.ok) {
            dispatch({ type: "SET_STATE", state: { linkToken: null } });
            return;
        }
        const data = yield response.json();
        if (data) {
            if (data.error != null) {
                dispatch({
                    type: "SET_STATE",
                    state: {
                        linkToken: null,
                        linkTokenError: data.error,
                    },
                });
                return;
            }
            dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
        }
        // Save the link_token to be used later in the Oauth flow.
        localStorage.setItem("link_token", data.link_token);
    }), [dispatch]);
    react_1.useEffect(() => {
        const init = () => __awaiter(void 0, void 0, void 0, function* () {
            const { paymentInitiation } = yield getInfo(); // used to determine which path to take when generating token
            // do not generate a new token for OAuth redirect; instead
            // setLinkToken from localStorage
            if (window.location.href.includes("?oauth_state_id=")) {
                dispatch({
                    type: "SET_STATE",
                    state: {
                        linkToken: localStorage.getItem("link_token"),
                    },
                });
                return;
            }
            generateToken(paymentInitiation);
        });
        init();
    }, [dispatch, generateToken, getInfo]);
    return (<div className={App_module_scss_1.default.App}>
      <div className={App_module_scss_1.default.container}>
        <Headers_1.default />
        {linkSuccess && (<>
            {isPaymentInitiation && (<Products_1.default />)}
            {isItemAccess && (<>
                <Products_1.default />
                <Items_1.default />
              </>)}
          </>)}
      </div>
    </div>);
};
exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcXVpY2tzdGFydC9mcm9udGVuZC9zcmMvQXBwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBa0U7QUFFbEUsbUVBQTBDO0FBQzFDLGtGQUEwRDtBQUMxRCw0RUFBb0Q7QUFDcEQsd0RBQWdDO0FBRWhDLHdFQUF1QztBQUV2QyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7SUFDZixNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsR0FBRyxrQkFBVSxDQUFDLGlCQUFPLENBQUMsQ0FBQztJQUV6RixNQUFNLE9BQU8sR0FBRyxtQkFBVyxDQUFDLEdBQVMsRUFBRTtRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNoQixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsTUFBTSxpQkFBaUIsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDdkQsb0JBQW9CLENBQ3JCLENBQUM7UUFDRixRQUFRLENBQUM7WUFDUCxJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixtQkFBbUIsRUFBRSxpQkFBaUI7YUFDdkM7U0FDRixDQUFD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QSxHQUFHLENBQ0osQ0FDSDtNQUFBLEVBQUUsR0FBRyxDQUNQO0lBQUEsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsa0JBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlQ29udGV4dCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9Db21wb25lbnRzL0hlYWRlcnNcIjtcbmltcG9ydCBQcm9kdWN0cyBmcm9tIFwiLi9Db21wb25lbnRzL1Byb2R1Y3RUeXBlcy9Qcm9kdWN0c1wiO1xuaW1wb3J0IEl0ZW1zIGZyb20gXCIuL0NvbXBvbmVudHMvUHJvZHVjdFR5cGVzL0l0ZW1zXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9Db250ZXh0XCI7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vQXBwLm1vZHVsZS5zY3NzXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgeyBsaW5rU3VjY2VzcywgaXNJdGVtQWNjZXNzLCBpc1BheW1lbnRJbml0aWF0aW9uLCBkaXNwYXRjaCB9ID0gdXNlQ29udGV4dChDb250ZXh0KTtcblxuICBjb25zdCBnZXRJbmZvID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2luZm9cIiwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJTRVRfU1RBVEVcIiwgc3RhdGU6IHsgYmFja2VuZDogZmFsc2UgfSB9KTtcbiAgICAgIHJldHVybiB7IHBheW1lbnRJbml0aWF0aW9uOiBmYWxzZSB9O1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHBheW1lbnRJbml0aWF0aW9uOiBib29sZWFuID0gZGF0YS5wcm9kdWN0cy5pbmNsdWRlcyhcbiAgICAgIFwicGF5bWVudF9pbml0aWF0aW9uXCJcbiAgICApO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFwiU0VUX1NUQVRFXCIsXG4gICAgICBzdGF0ZToge1xuICAgICAgICBwcm9kdWN0czogZGF0YS5wcm9kdWN0cyxcbiAgICAgICAgaXNQYXltZW50SW5pdGlhdGlvbjogcGF5bWVudEluaXRpYXRpb24sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiB7IHBheW1lbnRJbml0aWF0aW9uIH07XG4gIH0sIFtkaXNwYXRjaF0pO1xuXG4gIGNvbnN0IGdlbmVyYXRlVG9rZW4gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoaXNQYXltZW50SW5pdGlhdGlvbikgPT4ge1xuICAgICAgLy8gTGluayB0b2tlbnMgZm9yICdwYXltZW50X2luaXRpYXRpb24nIHVzZSBhIGRpZmZlcmVudCBjcmVhdGlvbiBmbG93IGluIHlvdXIgYmFja2VuZC5cbiAgICAgIGNvbnN0IHBhdGggPSBpc1BheW1lbnRJbml0aWF0aW9uXG4gICAgICAgID8gXCIvYXBpL2NyZWF0ZV9saW5rX3Rva2VuX2Zvcl9wYXltZW50XCJcbiAgICAgICAgOiBcIi9hcGkvY3JlYXRlX2xpbmtfdG9rZW5cIjtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJTRVRfU1RBVEVcIiwgc3RhdGU6IHsgbGlua1Rva2VuOiBudWxsIH0gfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5lcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogXCJTRVRfU1RBVEVcIixcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgIGxpbmtUb2tlbjogbnVsbCxcbiAgICAgICAgICAgICAgbGlua1Rva2VuRXJyb3I6IGRhdGEuZXJyb3IsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiU0VUX1NUQVRFXCIsIHN0YXRlOiB7IGxpbmtUb2tlbjogZGF0YS5saW5rX3Rva2VuIH0gfSk7XG4gICAgICB9XG4gICAgICAvLyBTYXZlIHRoZSBsaW5rX3Rva2VuIHRvIGJlIHVzZWQgbGF0ZXIgaW4gdGhlIE9hdXRoIGZsb3cuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxpbmtfdG9rZW5cIiwgZGF0YS5saW5rX3Rva2VuKTtcbiAgICB9LFxuICAgIFtkaXNwYXRjaF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB7IHBheW1lbnRJbml0aWF0aW9uIH0gPSBhd2FpdCBnZXRJbmZvKCk7IC8vIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIHBhdGggdG8gdGFrZSB3aGVuIGdlbmVyYXRpbmcgdG9rZW5cbiAgICAgIC8vIGRvIG5vdCBnZW5lcmF0ZSBhIG5ldyB0b2tlbiBmb3IgT0F1dGggcmVkaXJlY3Q7IGluc3RlYWRcbiAgICAgIC8vIHNldExpbmtUb2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiP29hdXRoX3N0YXRlX2lkPVwiKSkge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogXCJTRVRfU1RBVEVcIixcbiAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgbGlua1Rva2VuOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpbmtfdG9rZW5cIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGdlbmVyYXRlVG9rZW4ocGF5bWVudEluaXRpYXRpb24pO1xuICAgIH07XG4gICAgaW5pdCgpO1xuICB9LCBbZGlzcGF0Y2gsIGdlbmVyYXRlVG9rZW4sIGdldEluZm9dKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICB7bGlua1N1Y2Nlc3MgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7aXNQYXltZW50SW5pdGlhdGlvbiAmJiAoXG4gICAgICAgICAgICAgIDxQcm9kdWN0cyAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtpc0l0ZW1BY2Nlc3MgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxQcm9kdWN0cyAvPlxuICAgICAgICAgICAgICAgIDxJdGVtcyAvPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==