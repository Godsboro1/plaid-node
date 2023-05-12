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
const react_plaid_link_1 = require("react-plaid-link");
const Button_1 = __importDefault(require("plaid-threads/Button"));
const Context_1 = __importDefault(require("../../Context"));
const Link = () => {
    const { linkToken, isPaymentInitiation, dispatch } = react_1.useContext(Context_1.default);
    const onSuccess = react_1.default.useCallback((public_token) => {
        // If the access_token is needed, send public_token to server
        const exchangePublicTokenForAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch("/api/set_access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: `public_token=${public_token}`,
            });
            if (!response.ok) {
                dispatch({
                    type: "SET_STATE",
                    state: {
                        itemId: `no item_id retrieved`,
                        accessToken: `no access_token retrieved`,
                        isItemAccess: false,
                    },
                });
                return;
            }
            const data = yield response.json();
            dispatch({
                type: "SET_STATE",
                state: {
                    itemId: data.item_id,
                    accessToken: data.access_token,
                    isItemAccess: true,
                },
            });
        });
        // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
        if (isPaymentInitiation) {
            dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
        }
        else {
            exchangePublicTokenForAccessToken();
        }
        dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
        window.history.pushState("", "", "/");
    }, [dispatch]);
    let isOauth = false;
    const config = {
        token: linkToken,
        onSuccess,
    };
    if (window.location.href.includes("?oauth_state_id=")) {
        // TODO: figure out how to delete this ts-ignore
        // @ts-ignore
        config.receivedRedirectUri = window.location.href;
        isOauth = true;
    }
    const { open, ready } = react_plaid_link_1.usePlaidLink(config);
    react_1.useEffect(() => {
        if (isOauth && ready) {
            open();
        }
    }, [ready, open, isOauth]);
    return (<Button_1.default type="button" large onClick={() => open()} disabled={!ready}>
      Launch Link
    </Button_1.default>);
};
Link.displayName = "Link";
exports.default = Link;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9xdWlja3N0YXJ0L2Zyb250ZW5kL3NyYy9Db21wb25lbnRzL0xpbmsvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFxRDtBQUNyRCx1REFBZ0Q7QUFDaEQsa0VBQTBDO0FBRTFDLDREQUFvQztBQUdwQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDaEIsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsR0FBRyxrQkFBVSxDQUFDLGlCQUFPLENBQUMsQ0FBQztJQUV6RSxNQUFNLFNBQVMsR0FBRyxlQUFLLENBQUMsV0FBVyxDQUNqQyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtRQUN2Qiw2REFBNkQ7UUFDN0QsTUFBTSxpQ0FBaUMsR0FBRyxHQUFTLEVBQUU7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ3BELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsaURBQWlEO2lCQUNsRTtnQkFDRCxJQUFJLEVBQUUsZ0JBQWdCLFlBQVksRUFBRTthQUNyQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxDQUFDO29CQUNQLElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUU7d0JBQ0wsTUFBTSxFQUFFLHNCQUFzQjt3QkFDOUIsV0FBVyxFQUFFLDJCQUEyQjt3QkFDeEMsWUFBWSxFQUFFLEtBQUs7cUJBQ3BCO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1I7WUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxRQUFRLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFDOUIsWUFBWSxFQUFFLElBQUk7aUJBQ25CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBLENBQUM7UUFFRixxR0FBcUc7UUFDckcsSUFBSSxtQkFBbUIsRUFBQztZQUN0QixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNMLGlDQUFpQyxFQUFFLENBQUM7U0FDckM7UUFFRCxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDLEVBQ0QsQ0FBQyxRQUFRLENBQUMsQ0FDWCxDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLE1BQU0sTUFBTSxHQUF1QztRQUNqRCxLQUFLLEVBQUUsU0FBVTtRQUNqQixTQUFTO0tBQ1YsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDckQsZ0RBQWdEO1FBQ2hELGFBQWE7UUFDYixNQUFNLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtJQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsK0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QyxpQkFBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksT0FBTyxJQUFJLEtBQUssRUFBRTtZQUNwQixJQUFJLEVBQUUsQ0FBQztTQUNSO0lBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sQ0FDTCxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNsRTs7SUFDRixFQUFFLGdCQUFNLENBQUMsQ0FDVixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFFMUIsa0JBQWUsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUGxhaWRMaW5rIH0gZnJvbSBcInJlYWN0LXBsYWlkLWxpbmtcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcInBsYWlkLXRocmVhZHMvQnV0dG9uXCI7XG5cbmltcG9ydCBDb250ZXh0IGZyb20gXCIuLi8uLi9Db250ZXh0XCI7XG5pbXBvcnQge1Byb2R1Y3RzfSBmcm9tIFwicGxhaWRcIjtcblxuY29uc3QgTGluayA9ICgpID0+IHtcbiAgY29uc3QgeyBsaW5rVG9rZW4sIGlzUGF5bWVudEluaXRpYXRpb24sIGRpc3BhdGNoIH0gPSB1c2VDb250ZXh0KENvbnRleHQpO1xuXG4gIGNvbnN0IG9uU3VjY2VzcyA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChwdWJsaWNfdG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgLy8gSWYgdGhlIGFjY2Vzc190b2tlbiBpcyBuZWVkZWQsIHNlbmQgcHVibGljX3Rva2VuIHRvIHNlcnZlclxuICAgICAgY29uc3QgZXhjaGFuZ2VQdWJsaWNUb2tlbkZvckFjY2Vzc1Rva2VuID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9zZXRfYWNjZXNzX3Rva2VuXCIsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IGBwdWJsaWNfdG9rZW49JHtwdWJsaWNfdG9rZW59YCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBcIlNFVF9TVEFURVwiLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgaXRlbUlkOiBgbm8gaXRlbV9pZCByZXRyaWV2ZWRgLFxuICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYG5vIGFjY2Vzc190b2tlbiByZXRyaWV2ZWRgLFxuICAgICAgICAgICAgICBpc0l0ZW1BY2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFwiU0VUX1NUQVRFXCIsXG4gICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgIGl0ZW1JZDogZGF0YS5pdGVtX2lkLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IGRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgaXNJdGVtQWNjZXNzOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gJ3BheW1lbnRfaW5pdGlhdGlvbicgcHJvZHVjdHMgZG8gbm90IHJlcXVpcmUgdGhlIHB1YmxpY190b2tlbiB0byBiZSBleGNoYW5nZWQgZm9yIGFuIGFjY2Vzc190b2tlbi5cbiAgICAgIGlmIChpc1BheW1lbnRJbml0aWF0aW9uKXtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcIlNFVF9TVEFURVwiLCBzdGF0ZTogeyBpc0l0ZW1BY2Nlc3M6IGZhbHNlIH0gfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGNoYW5nZVB1YmxpY1Rva2VuRm9yQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cblxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcIlNFVF9TVEFURVwiLCBzdGF0ZTogeyBsaW5rU3VjY2VzczogdHJ1ZSB9IH0pO1xuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiXCIsIFwiXCIsIFwiL1wiKTtcbiAgICB9LFxuICAgIFtkaXNwYXRjaF1cbiAgKTtcblxuICBsZXQgaXNPYXV0aCA9IGZhbHNlO1xuICBjb25zdCBjb25maWc6IFBhcmFtZXRlcnM8dHlwZW9mIHVzZVBsYWlkTGluaz5bMF0gPSB7XG4gICAgdG9rZW46IGxpbmtUb2tlbiEsXG4gICAgb25TdWNjZXNzLFxuICB9O1xuXG4gIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcIj9vYXV0aF9zdGF0ZV9pZD1cIikpIHtcbiAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBkZWxldGUgdGhpcyB0cy1pZ25vcmVcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uZmlnLnJlY2VpdmVkUmVkaXJlY3RVcmkgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBpc09hdXRoID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgb3BlbiwgcmVhZHkgfSA9IHVzZVBsYWlkTGluayhjb25maWcpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzT2F1dGggJiYgcmVhZHkpIHtcbiAgICAgIG9wZW4oKTtcbiAgICB9XG4gIH0sIFtyZWFkeSwgb3BlbiwgaXNPYXV0aF0pO1xuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbGFyZ2Ugb25DbGljaz17KCkgPT4gb3BlbigpfSBkaXNhYmxlZD17IXJlYWR5fT5cbiAgICAgIExhdW5jaCBMaW5rXG4gICAgPC9CdXR0b24+XG4gICk7XG59O1xuXG5MaW5rLmRpc3BsYXlOYW1lID0gXCJMaW5rXCI7XG5cbmV4cG9ydCBkZWZhdWx0IExpbms7XG4iXX0=