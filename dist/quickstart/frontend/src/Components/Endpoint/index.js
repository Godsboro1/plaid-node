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
const Button_1 = __importDefault(require("plaid-threads/Button"));
const Note_1 = __importDefault(require("plaid-threads/Note"));
const Table_1 = __importDefault(require("../Table"));
const Error_1 = __importDefault(require("../Error"));
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
const Endpoint = (props) => {
    const [showTable, setShowTable] = react_1.useState(false);
    const [transformedData, setTransformedData] = react_1.useState([]);
    const [pdf, setPdf] = react_1.useState(null);
    const [error, setError] = react_1.useState(null);
    const [isLoading, setIsLoading] = react_1.useState(false);
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        const response = yield fetch(`/api/${props.endpoint}`, { method: "GET" });
        const data = yield response.json();
        if (data.error != null) {
            setError(data.error);
            setIsLoading(false);
            return;
        }
        setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
        if (data.pdf != null) {
            setPdf(data.pdf);
        }
        setShowTable(true);
        setIsLoading(false);
    });
    return (<>
      <div className={index_module_scss_1.default.endpointContainer}>
        <Note_1.default info className={index_module_scss_1.default.post}>
          POST
        </Note_1.default>
        <div className={index_module_scss_1.default.endpointContents}>
          <div className={index_module_scss_1.default.endpointHeader}>
            {props.name != null && (<span className={index_module_scss_1.default.endpointName}>{props.name}</span>)}
            <span className={index_module_scss_1.default.schema}>{props.schema}</span>
          </div>
          <div className={index_module_scss_1.default.endpointDescription}>{props.description}</div>
        </div>
        <div className={index_module_scss_1.default.buttonsContainer}>
          <Button_1.default small centered wide secondary className={index_module_scss_1.default.sendRequest} onClick={getData}>
            {isLoading ? "Loading..." : `Send request`}
          </Button_1.default>
          {pdf != null && (<Button_1.default small centered wide className={index_module_scss_1.default.pdf} href={`data:application/pdf;base64,${pdf}`} componentProps={{ download: "Asset Report.pdf" }}>
              Download PDF
            </Button_1.default>)}
        </div>
      </div>
      {showTable && (<Table_1.default categories={props.categories} data={transformedData} isIdentity={props.endpoint === "identity"}/>)}
      {error != null && <Error_1.default error={error}/>}
    </>);
};
Endpoint.displayName = "Endpoint";
exports.default = Endpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9xdWlja3N0YXJ0L2Zyb250ZW5kL3NyYy9Db21wb25lbnRzL0VuZHBvaW50L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0M7QUFDeEMsa0VBQTBDO0FBQzFDLDhEQUFzQztBQUV0QyxxREFBNkI7QUFDN0IscURBQTZCO0FBRzdCLDRFQUF5QztBQVd6QyxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO0lBQ2hDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLEdBQUcsZ0JBQVEsQ0FBTyxFQUFFLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLGdCQUFRLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsZ0JBQVEsQ0FBdUIsSUFBSSxDQUFDLENBQUM7SUFDL0QsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxELE1BQU0sT0FBTyxHQUFHLEdBQVMsRUFBRTtRQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxRSxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFF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QUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFHLENBQzNDO0lBQUEsR0FBRyxDQUNKLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcInBsYWlkLXRocmVhZHMvQnV0dG9uXCI7XG5pbXBvcnQgTm90ZSBmcm9tIFwicGxhaWQtdGhyZWFkcy9Ob3RlXCI7XG5cbmltcG9ydCBUYWJsZSBmcm9tIFwiLi4vVGFibGVcIjtcbmltcG9ydCBFcnJvciBmcm9tIFwiLi4vRXJyb3JcIjtcbmltcG9ydCB7IERhdGFJdGVtLCBDYXRlZ29yaWVzLCBFcnJvckRhdGFJdGVtLCBEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGFVdGlsaXRpZXNcIjtcblxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9pbmRleC5tb2R1bGUuc2Nzc1wiO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBjYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yaWVzPjtcbiAgc2NoZW1hOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHRyYW5zZm9ybURhdGE6IChhcmc6IGFueSkgPT4gQXJyYXk8RGF0YUl0ZW0+O1xufVxuXG5jb25zdCBFbmRwb2ludCA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgY29uc3QgW3Nob3dUYWJsZSwgc2V0U2hvd1RhYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3RyYW5zZm9ybWVkRGF0YSwgc2V0VHJhbnNmb3JtZWREYXRhXSA9IHVzZVN0YXRlPERhdGE+KFtdKTtcbiAgY29uc3QgW3BkZiwgc2V0UGRmXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPEVycm9yRGF0YUl0ZW0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpLyR7cHJvcHMuZW5kcG9pbnR9YCwgeyBtZXRob2Q6IFwiR0VUXCIgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoZGF0YS5lcnJvciAhPSBudWxsKSB7XG4gICAgICBzZXRFcnJvcihkYXRhLmVycm9yKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFRyYW5zZm9ybWVkRGF0YShwcm9wcy50cmFuc2Zvcm1EYXRhKGRhdGEpKTsgLy8gdHJhbnNmb3JtIGRhdGEgaW50byBwcm9wZXIgZm9ybWF0IGZvciBlYWNoIGluZGl2aWR1YWwgcHJvZHVjdFxuICAgIGlmIChkYXRhLnBkZiAhPSBudWxsKSB7XG4gICAgICBzZXRQZGYoZGF0YS5wZGYpO1xuICAgIH1cbiAgICBzZXRTaG93VGFibGUodHJ1ZSk7XG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVuZHBvaW50Q29udGFpbmVyfT5cbiAgICAgICAgPE5vdGUgaW5mbyBjbGFzc05hbWU9e3N0eWxlcy5wb3N0fT5cbiAgICAgICAgICBQT1NUXG4gICAgICAgIDwvTm90ZT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5lbmRwb2ludENvbnRlbnRzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVuZHBvaW50SGVhZGVyfT5cbiAgICAgICAgICAgIHtwcm9wcy5uYW1lICE9IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5lbmRwb2ludE5hbWV9Pntwcm9wcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5zY2hlbWF9Pntwcm9wcy5zY2hlbWF9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZW5kcG9pbnREZXNjcmlwdGlvbn0+e3Byb3BzLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b25zQ29udGFpbmVyfT5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBzbWFsbFxuICAgICAgICAgICAgY2VudGVyZWRcbiAgICAgICAgICAgIHdpZGVcbiAgICAgICAgICAgIHNlY29uZGFyeVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VuZFJlcXVlc3R9XG4gICAgICAgICAgICBvbkNsaWNrPXtnZXREYXRhfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0xvYWRpbmcgPyBcIkxvYWRpbmcuLi5cIiA6IGBTZW5kIHJlcXVlc3RgfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtwZGYgIT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHNtYWxsXG4gICAgICAgICAgICAgIGNlbnRlcmVkXG4gICAgICAgICAgICAgIHdpZGVcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucGRmfVxuICAgICAgICAgICAgICBocmVmPXtgZGF0YTphcHBsaWNhdGlvbi9wZGY7YmFzZTY0LCR7cGRmfWB9XG4gICAgICAgICAgICAgIGNvbXBvbmVudFByb3BzPXt7IGRvd25sb2FkOiBcIkFzc2V0IFJlcG9ydC5wZGZcIiB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBEb3dubG9hZCBQREZcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICB7c2hvd1RhYmxlICYmIChcbiAgICAgICAgPFRhYmxlXG4gICAgICAgICAgY2F0ZWdvcmllcz17cHJvcHMuY2F0ZWdvcmllc31cbiAgICAgICAgICBkYXRhPXt0cmFuc2Zvcm1lZERhdGF9XG4gICAgICAgICAgaXNJZGVudGl0eT17cHJvcHMuZW5kcG9pbnQgPT09IFwiaWRlbnRpdHlcIn1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7ZXJyb3IgIT0gbnVsbCAmJiA8RXJyb3IgZXJyb3I9e2Vycm9yfSAvPn1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkVuZHBvaW50LmRpc3BsYXlOYW1lID0gXCJFbmRwb2ludFwiO1xuXG5leHBvcnQgZGVmYXVsdCBFbmRwb2ludDtcbiJdfQ==