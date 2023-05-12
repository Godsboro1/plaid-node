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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Button_1 = __importDefault(require("plaid-threads/Button"));
const Note_1 = __importDefault(require("plaid-threads/Note"));
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
const errorPaths = {
    ITEM_ERROR: "item",
    INSTITUTION_ERROR: "institution",
    API_ERROR: "api",
    ASSET_REPORT_ERROR: "assets",
    BANK_TRANSFER_ERROR: "bank-transfers",
    INVALID_INPUT: "invalid-input",
    INVALID_REQUEST: "invalid-request",
    INVALID_RESULT: "invalid-result",
    OAUTH_ERROR: "oauth",
    PAYMENT_ERROR: "payment",
    RATE_LIMIT_EXCEEDED: "rate-limit-exceeded",
    RECAPTCHA_ERROR: "recaptcha",
    SANDBOX_ERROR: "sandbox",
};
const Error = (props) => {
    const [path, setPath] = react_1.useState("");
    react_1.useEffect(() => {
        var _a;
        const errorType = props.error.error_type;
        const errorPath = errorPaths[errorType];
        setPath(`https://plaid.com/docs/errors/${errorPath}/#${(_a = props.error.error_code) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`);
    }, [props.error]);
    return (<>
      <div className={index_module_scss_1.default.errorTop}></div>
      <div className={index_module_scss_1.default.errorContainer}>
        <Note_1.default error className={index_module_scss_1.default.code}>
          {props.error.status_code ? props.error.status_code : "error"}
        </Note_1.default>
        <div className={index_module_scss_1.default.errorContents}>
          <div className={index_module_scss_1.default.errorItem}>
            <span className={index_module_scss_1.default.errorTitle}>Error code: </span>
            <span className={index_module_scss_1.default.errorData}>
              <div className={index_module_scss_1.default.errorCode}>
                {props.error.error_code}
                <div className={index_module_scss_1.default.pinkBox}></div>
              </div>
            </span>
          </div>
          <div className={index_module_scss_1.default.errorItem}>
            <span className={index_module_scss_1.default.errorTitle}>Type: </span>
            <span className={index_module_scss_1.default.errorData}>{props.error.error_type}</span>
          </div>
          <div className={index_module_scss_1.default.errorItem}>
            <span className={index_module_scss_1.default.errorTitle}>Message: </span>
            <span className={index_module_scss_1.default.errorMessage}>
              {props.error.display_message == null
        ? props.error.error_message
        : props.error.display_message}
            </span>
          </div>
        </div>
        <Button_1.default small wide className={index_module_scss_1.default.learnMore} target="_blank" href={path}>
          Learn more
        </Button_1.default>
      </div>
    </>);
};
Error.displayName = "Error";
exports.default = Error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9xdWlja3N0YXJ0L2Zyb250ZW5kL3NyYy9Db21wb25lbnRzL0Vycm9yL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBbUQ7QUFDbkQsa0VBQTBDO0FBQzFDLDhEQUFzQztBQUl0Qyw0RUFBeUM7QUFNekMsTUFBTSxVQUFVLEdBQThCO0lBQzVDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGlCQUFpQixFQUFFLGFBQWE7SUFDaEMsU0FBUyxFQUFFLEtBQUs7SUFDaEIsa0JBQWtCLEVBQUUsUUFBUTtJQUM1QixtQkFBbUIsRUFBRSxnQkFBZ0I7SUFDckMsYUFBYSxFQUFFLGVBQWU7SUFDOUIsZUFBZSxFQUFFLGlCQUFpQjtJQUNsQyxjQUFjLEVBQUUsZ0JBQWdCO0lBQ2hDLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLGFBQWEsRUFBRSxTQUFTO0lBQ3hCLG1CQUFtQixFQUFFLHFCQUFxQjtJQUMxQyxlQUFlLEVBQUUsV0FBVztJQUM1QixhQUFhLEVBQUUsU0FBUztDQUN6QixDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtJQUM3QixNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGdCQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFckMsaUJBQVMsQ0FBQyxHQUFHLEVBQUU7O1FBQ2IsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFXLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FDTCxpQ0FBaUMsU0FBUyxLQUFLLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFdBQVcsRUFBRSxFQUFFLENBQ3ZGLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxLQUFL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QUFPLENBQUM7QUFFNUIsa0JBQWUsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcInBsYWlkLXRocmVhZHMvQnV0dG9uXCI7XG5pbXBvcnQgTm90ZSBmcm9tIFwicGxhaWQtdGhyZWFkcy9Ob3RlXCI7XG5cbmltcG9ydCB7IEVycm9yRGF0YUl0ZW0gfSBmcm9tIFwiLi4vLi4vZGF0YVV0aWxpdGllc1wiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL2luZGV4Lm1vZHVsZS5zY3NzXCI7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGVycm9yOiBFcnJvckRhdGFJdGVtO1xufVxuXG5jb25zdCBlcnJvclBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICBJVEVNX0VSUk9SOiBcIml0ZW1cIixcbiAgSU5TVElUVVRJT05fRVJST1I6IFwiaW5zdGl0dXRpb25cIixcbiAgQVBJX0VSUk9SOiBcImFwaVwiLFxuICBBU1NFVF9SRVBPUlRfRVJST1I6IFwiYXNzZXRzXCIsXG4gIEJBTktfVFJBTlNGRVJfRVJST1I6IFwiYmFuay10cmFuc2ZlcnNcIixcbiAgSU5WQUxJRF9JTlBVVDogXCJpbnZhbGlkLWlucHV0XCIsXG4gIElOVkFMSURfUkVRVUVTVDogXCJpbnZhbGlkLXJlcXVlc3RcIixcbiAgSU5WQUxJRF9SRVNVTFQ6IFwiaW52YWxpZC1yZXN1bHRcIixcbiAgT0FVVEhfRVJST1I6IFwib2F1dGhcIixcbiAgUEFZTUVOVF9FUlJPUjogXCJwYXltZW50XCIsXG4gIFJBVEVfTElNSVRfRVhDRUVERUQ6IFwicmF0ZS1saW1pdC1leGNlZWRlZFwiLFxuICBSRUNBUFRDSEFfRVJST1I6IFwicmVjYXB0Y2hhXCIsXG4gIFNBTkRCT1hfRVJST1I6IFwic2FuZGJveFwiLFxufTtcblxuY29uc3QgRXJyb3IgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZXJyb3JUeXBlID0gcHJvcHMuZXJyb3IuZXJyb3JfdHlwZSE7XG4gICAgY29uc3QgZXJyb3JQYXRoID0gZXJyb3JQYXRoc1tlcnJvclR5cGVdO1xuXG4gICAgc2V0UGF0aChcbiAgICAgIGBodHRwczovL3BsYWlkLmNvbS9kb2NzL2Vycm9ycy8ke2Vycm9yUGF0aH0vIyR7cHJvcHMuZXJyb3IuZXJyb3JfY29kZT8udG9Mb3dlckNhc2UoKX1gXG4gICAgKTtcbiAgfSwgW3Byb3BzLmVycm9yXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclRvcH0+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yQ29udGFpbmVyfT5cbiAgICAgICAgPE5vdGUgZXJyb3IgY2xhc3NOYW1lPXtzdHlsZXMuY29kZX0+XG4gICAgICAgICAge3Byb3BzLmVycm9yLnN0YXR1c19jb2RlID8gcHJvcHMuZXJyb3Iuc3RhdHVzX2NvZGUgOiBcImVycm9yXCJ9XG4gICAgICAgIDwvTm90ZT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvckNvbnRlbnRzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9ySXRlbX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvclRpdGxlfT5FcnJvciBjb2RlOiA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvckRhdGF9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVycm9yQ29kZX0+XG4gICAgICAgICAgICAgICAge3Byb3BzLmVycm9yLmVycm9yX2NvZGV9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5waW5rQm94fT48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvckl0ZW19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+VHlwZTogPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JEYXRhfT57cHJvcHMuZXJyb3IuZXJyb3JfdHlwZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lcnJvckl0ZW19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JUaXRsZX0+TWVzc2FnZTogPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZXJyb3JNZXNzYWdlfT5cbiAgICAgICAgICAgICAge3Byb3BzLmVycm9yLmRpc3BsYXlfbWVzc2FnZSA9PSBudWxsXG4gICAgICAgICAgICAgICAgPyBwcm9wcy5lcnJvci5lcnJvcl9tZXNzYWdlXG4gICAgICAgICAgICAgICAgOiBwcm9wcy5lcnJvci5kaXNwbGF5X21lc3NhZ2V9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgc21hbGxcbiAgICAgICAgICB3aWRlXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMubGVhcm5Nb3JlfVxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgaHJlZj17cGF0aH1cbiAgICAgICAgPlxuICAgICAgICAgIExlYXJuIG1vcmVcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkVycm9yLmRpc3BsYXlOYW1lID0gXCJFcnJvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvcjtcbiJdfQ==