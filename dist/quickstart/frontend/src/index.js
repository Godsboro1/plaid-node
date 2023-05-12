"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const Context_1 = require("./Context");
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
react_dom_1.default.render(<react_1.default.StrictMode>
    <Context_1.QuickstartProvider>
      <App_1.default />
    </Context_1.QuickstartProvider>
  </react_1.default.StrictMode>, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1.default();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9xdWlja3N0YXJ0L2Zyb250ZW5kL3NyYy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsMERBQWlDO0FBQ2pDLGdEQUF3QjtBQUN4Qix1Q0FBK0M7QUFDL0Msd0VBQWdEO0FBRWhELG1CQUFRLENBQUMsTUFBTSxDQUNiLENBQUMsZUFBSyxDQUFDLFVBQVUsQ0FDZjtJQUFBLENBQUMsNEJBQWtCLENBQ2pCO01BQUEsQ0FBQyxhQUFHLENBQUMsQUFBRCxFQUNOO0lBQUEsRUFBRSw0QkFBa0IsQ0FDdEI7RUFBQSxFQUFFLGVBQUssQ0FBQyxVQUFVLENBQUMsRUFDbkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FDaEMsQ0FBQztBQUVGLDBFQUEwRTtBQUMxRSw2REFBNkQ7QUFDN0QsMEVBQTBFO0FBQzFFLHlCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcFwiO1xuaW1wb3J0IHsgUXVpY2tzdGFydFByb3ZpZGVyIH0gZnJvbSBcIi4vQ29udGV4dFwiO1xuaW1wb3J0IHJlcG9ydFdlYlZpdGFscyBmcm9tIFwiLi9yZXBvcnRXZWJWaXRhbHNcIjtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICA8UXVpY2tzdGFydFByb3ZpZGVyPlxuICAgICAgPEFwcCAvPlxuICAgIDwvUXVpY2tzdGFydFByb3ZpZGVyPlxuICA8L1JlYWN0LlN0cmljdE1vZGU+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbik7XG5cbi8vIElmIHlvdSB3YW50IHRvIHN0YXJ0IG1lYXN1cmluZyBwZXJmb3JtYW5jZSBpbiB5b3VyIGFwcCwgcGFzcyBhIGZ1bmN0aW9uXG4vLyB0byBsb2cgcmVzdWx0cyAoZm9yIGV4YW1wbGU6IHJlcG9ydFdlYlZpdGFscyhjb25zb2xlLmxvZykpXG4vLyBvciBzZW5kIHRvIGFuIGFuYWx5dGljcyBlbmRwb2ludC4gTGVhcm4gbW9yZTogaHR0cHM6Ly9iaXQubHkvQ1JBLXZpdGFsc1xucmVwb3J0V2ViVml0YWxzKCk7XG4iXX0=