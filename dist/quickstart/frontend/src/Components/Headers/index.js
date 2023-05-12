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
const Callout_1 = __importDefault(require("plaid-threads/Callout"));
const Button_1 = __importDefault(require("plaid-threads/Button"));
const InlineLink_1 = __importDefault(require("plaid-threads/InlineLink"));
const Link_1 = __importDefault(require("../Link"));
const Context_1 = __importDefault(require("../../Context"));
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
const Header = () => {
    const { itemId, accessToken, linkToken, linkSuccess, isItemAccess, backend, linkTokenError, isPaymentInitiation, } = react_1.useContext(Context_1.default);
    return (<div className={index_module_scss_1.default.grid}>
      <h3 className={index_module_scss_1.default.title}>Plaid Quickstart</h3>

      {!linkSuccess ? (<>
          <h4 className={index_module_scss_1.default.subtitle}>
            A sample end-to-end integration with Plaid
          </h4>
          <p className={index_module_scss_1.default.introPar}>
            The Plaid flow begins when your user wants to connect their bank
            account to your app. Simulate this by clicking the button below to
            launch Link - the client-side component that your users will
            interact with in order to link their accounts to Plaid and allow you
            to access their accounts via the Plaid API.
          </p>
          
          {!backend ? (<Callout_1.default warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout_1.default>) : /* message if backend is running and there is no link token */
        linkToken == null && backend ? (<Callout_1.default warning>
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>
              <div>
                If you are on a Windows machine, please ensure that you have
                cloned the repo with{" "}
                <InlineLink_1.default href="https://github.com/plaid/quickstart#special-instructions-for-windows" target="_blank">
                  symlinks turned on.
                </InlineLink_1.default>{" "}
                You can also try checking your{" "}
                <InlineLink_1.default href="https://dashboard.plaid.com/activity/logs" target="_blank">
                  activity log
                </InlineLink_1.default>{" "}
                on your Plaid dashboard.
              </div>
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout_1.default>) : linkToken === "" ? (<div className={index_module_scss_1.default.linkButton}>
              <Button_1.default large disabled>
                Loading...
              </Button_1.default>
            </div>) : (<div className={index_module_scss_1.default.linkButton}>
              <Link_1.default />
            </div>)}
        </>) : (<>
          {isPaymentInitiation ? (<>
            <h4 className={index_module_scss_1.default.subtitle}>
              Congrats! Your payment is now confirmed.
              <p />
              <Callout_1.default>
                You can see information of all your payments in the{' '}
                <InlineLink_1.default href="https://dashboard.plaid.com/activity/payments" target="_blank">
                  Payments Dashboard
                </InlineLink_1.default>
                .
              </Callout_1.default>
            </h4>
            <p className={index_module_scss_1.default.requests}>
              Now that the 'payment_id' stored in your server, you can use it to access the payment information:
            </p>
          </>) : /* If not using the payment_initiation product, show the item_id and access_token information */ (<>
            {isItemAccess ? (<h4 className={index_module_scss_1.default.subtitle}>
                  Congrats! By linking an account, you have created an{" "}
                  <InlineLink_1.default href="http://plaid.com/docs/quickstart/glossary/#item" target="_blank">
                    Item
                  </InlineLink_1.default>
                  .
                </h4>) : (<h4 className={index_module_scss_1.default.subtitle}>
                  <Callout_1.default warning>
                    Unable to create an item. Please check your backend server
                  </Callout_1.default>
                </h4>)}
            <div className={index_module_scss_1.default.itemAccessContainer}>
              <p className={index_module_scss_1.default.itemAccessRow}>
                <span className={index_module_scss_1.default.idName}>item_id</span>
                <span className={index_module_scss_1.default.tokenText}>{itemId}</span>
              </p>

              <p className={index_module_scss_1.default.itemAccessRow}>
                <span className={index_module_scss_1.default.idName}>access_token</span>
                <span className={index_module_scss_1.default.tokenText}>{accessToken}</span>
              </p>
            </div>
            {isItemAccess && (<p className={index_module_scss_1.default.requests}>
                  Now that you have an access_token, you can make all of the
                  following requests:
                </p>)}
          </>)}
        </>)}
    </div>);
};
Header.displayName = "Header";
exports.default = Header;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9xdWlja3N0YXJ0L2Zyb250ZW5kL3NyYy9Db21wb25lbnRzL0hlYWRlcnMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQyxvRUFBNEM7QUFDNUMsa0VBQTBDO0FBQzFDLDBFQUFrRDtBQUVsRCxtREFBMkI7QUFDM0IsNERBQW9DO0FBRXBDLDRFQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbEIsTUFBTSxFQUNKLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osT0FBTyxFQUNQLGNBQWMsRUFDZCxtQkFBbUIsR0FDcEIsR0FBRyxrQkFBVSxDQUFDLGlCQUFPLENBQUMsQ0FBQztJQUV4QixPQUFPLENBQ0wsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsMkJBQU0sQ0FBQyxJQUFJLENBQUMsQ0FDMUI7TUFBQSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQywyQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FFakQ7O01BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZCxFQUNFO1VBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsMkJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FDN0I7O1VBQ0YsRUFBRSxFQUFFLENBQ0o7VUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQywyQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUM1Qjs7Ozs7O1VBS0YsRUFBRSxDQUFDLENBQ0g7VUFDQTtVQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQyxpQkFBTyxDQUFDLE9BQU8sQ0FDZDs7O2NBRUEsQ0FBQyxJQUFJLENBQUMsZUFB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MkJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FDNUI7OztnQkFFRixFQUFFLENBQUMsQ0FBQyxDQUNQLENBQ0g7VUFBQSxHQUFHLENBQ0YsQ0FDSDtRQUFBLEdBQUcsQ0FDSixDQUNIO0lBQUEsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7QUFFOUIsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDYWxsb3V0IGZyb20gXCJwbGFpZC10aHJlYWRzL0NhbGxvdXRcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcInBsYWlkLXRocmVhZHMvQnV0dG9uXCI7XG5pbXBvcnQgSW5saW5lTGluayBmcm9tIFwicGxhaWQtdGhyZWFkcy9JbmxpbmVMaW5rXCI7XG5cbmltcG9ydCBMaW5rIGZyb20gXCIuLi9MaW5rXCI7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi4vLi4vQ29udGV4dFwiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL2luZGV4Lm1vZHVsZS5zY3NzXCI7XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+IHtcbiAgY29uc3Qge1xuICAgIGl0ZW1JZCxcbiAgICBhY2Nlc3NUb2tlbixcbiAgICBsaW5rVG9rZW4sXG4gICAgbGlua1N1Y2Nlc3MsXG4gICAgaXNJdGVtQWNjZXNzLFxuICAgIGJhY2tlbmQsXG4gICAgbGlua1Rva2VuRXJyb3IsXG4gICAgaXNQYXltZW50SW5pdGlhdGlvbixcbiAgfSA9IHVzZUNvbnRleHQoQ29udGV4dCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmdyaWR9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT5QbGFpZCBRdWlja3N0YXJ0PC9oMz5cblxuICAgICAgeyFsaW5rU3VjY2VzcyA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8aDQgY2xhc3NOYW1lPXtzdHlsZXMuc3VidGl0bGV9PlxuICAgICAgICAgICAgQSBzYW1wbGUgZW5kLXRvLWVuZCBpbnRlZ3JhdGlvbiB3aXRoIFBsYWlkXG4gICAgICAgICAgPC9oND5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5pbnRyb1Bhcn0+XG4gICAgICAgICAgICBUaGUgUGxhaWQgZmxvdyBiZWdpbnMgd2hlbiB5b3VyIHVzZXIgd2FudHMgdG8gY29ubmVjdCB0aGVpciBiYW5rXG4gICAgICAgICAgICBhY2NvdW50IHRvIHlvdXIgYXBwLiBTaW11bGF0ZSB0aGlzIGJ5IGNsaWNraW5nIHRoZSBidXR0b24gYmVsb3cgdG9cbiAgICAgICAgICAgIGxhdW5jaCBMaW5rIC0gdGhlIGNsaWVudC1zaWRlIGNvbXBvbmVudCB0aGF0IHlvdXIgdXNlcnMgd2lsbFxuICAgICAgICAgICAgaW50ZXJhY3Qgd2l0aCBpbiBvcmRlciB0byBsaW5rIHRoZWlyIGFjY291bnRzIHRvIFBsYWlkIGFuZCBhbGxvdyB5b3VcbiAgICAgICAgICAgIHRvIGFjY2VzcyB0aGVpciBhY2NvdW50cyB2aWEgdGhlIFBsYWlkIEFQSS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgey8qIG1lc3NhZ2UgaWYgYmFja2VuZCBpcyBub3QgcnVubmluZyBhbmQgdGhlcmUgaXMgbm8gbGluayB0b2tlbiAqL31cbiAgICAgICAgICB7IWJhY2tlbmQgPyAoXG4gICAgICAgICAgICA8Q2FsbG91dCB3YXJuaW5nPlxuICAgICAgICAgICAgICBVbmFibGUgdG8gZmV0Y2ggbGlua190b2tlbjogcGxlYXNlIG1ha2Ugc3VyZSB5b3VyIGJhY2tlbmQgc2VydmVyXG4gICAgICAgICAgICAgIGlzIHJ1bm5pbmcgYW5kIHRoYXQgeW91ciAuZW52IGZpbGUgaGFzIGJlZW4gY29uZmlndXJlZCB3aXRoIHlvdXJcbiAgICAgICAgICAgICAgPGNvZGU+UExBSURfQ0xJRU5UX0lEPC9jb2RlPiBhbmQgPGNvZGU+UExBSURfU0VDUkVUPC9jb2RlPi5cbiAgICAgICAgICAgIDwvQ2FsbG91dD5cbiAgICAgICAgICApIDogLyogbWVzc2FnZSBpZiBiYWNrZW5kIGlzIHJ1bm5pbmcgYW5kIHRoZXJlIGlzIG5vIGxpbmsgdG9rZW4gKi9cbiAgICAgICAgICBsaW5rVG9rZW4gPT0gbnVsbCAmJiBiYWNrZW5kID8gKFxuICAgICAgICAgICAgPENhbGxvdXQgd2FybmluZz5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICBVbmFibGUgdG8gZmV0Y2ggbGlua190b2tlbjogcGxlYXNlIG1ha2Ugc3VyZSB5b3VyIGJhY2tlbmQgc2VydmVyXG4gICAgICAgICAgICAgICAgaXMgcnVubmluZyBhbmQgdGhhdCB5b3VyIC5lbnYgZmlsZSBoYXMgYmVlbiBjb25maWd1cmVkXG4gICAgICAgICAgICAgICAgY29ycmVjdGx5LlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICBJZiB5b3UgYXJlIG9uIGEgV2luZG93cyBtYWNoaW5lLCBwbGVhc2UgZW5zdXJlIHRoYXQgeW91IGhhdmVcbiAgICAgICAgICAgICAgICBjbG9uZWQgdGhlIHJlcG8gd2l0aHtcIiBcIn1cbiAgICAgICAgICAgICAgICA8SW5saW5lTGlua1xuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9wbGFpZC9xdWlja3N0YXJ0I3NwZWNpYWwtaW5zdHJ1Y3Rpb25zLWZvci13aW5kb3dzXCJcbiAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgc3ltbGlua3MgdHVybmVkIG9uLlxuICAgICAgICAgICAgICAgIDwvSW5saW5lTGluaz57XCIgXCJ9XG4gICAgICAgICAgICAgICAgWW91IGNhbiBhbHNvIHRyeSBjaGVja2luZyB5b3Vye1wiIFwifVxuICAgICAgICAgICAgICAgIDxJbmxpbmVMaW5rXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kYXNoYm9hcmQucGxhaWQuY29tL2FjdGl2aXR5L2xvZ3NcIlxuICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBhY3Rpdml0eSBsb2dcbiAgICAgICAgICAgICAgICA8L0lubGluZUxpbms+e1wiIFwifVxuICAgICAgICAgICAgICAgIG9uIHlvdXIgUGxhaWQgZGFzaGJvYXJkLlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICBFcnJvciBDb2RlOiA8Y29kZT57bGlua1Rva2VuRXJyb3IuZXJyb3JfY29kZX08L2NvZGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIEVycm9yIFR5cGU6IDxjb2RlPntsaW5rVG9rZW5FcnJvci5lcnJvcl90eXBlfTwvY29kZT57XCIgXCJ9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PkVycm9yIE1lc3NhZ2U6IHtsaW5rVG9rZW5FcnJvci5lcnJvcl9tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgPC9DYWxsb3V0PlxuICAgICAgICAgICkgOiBsaW5rVG9rZW4gPT09IFwiXCIgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxpbmtCdXR0b259PlxuICAgICAgICAgICAgICA8QnV0dG9uIGxhcmdlIGRpc2FibGVkPlxuICAgICAgICAgICAgICAgIExvYWRpbmcuLi5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5saW5rQnV0dG9ufT5cbiAgICAgICAgICAgICAgPExpbmsgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICB7aXNQYXltZW50SW5pdGlhdGlvbiA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPXtzdHlsZXMuc3VidGl0bGV9PlxuICAgICAgICAgICAgICBDb25ncmF0cyEgWW91ciBwYXltZW50IGlzIG5vdyBjb25maXJtZWQuXG4gICAgICAgICAgICAgIDxwLz5cbiAgICAgICAgICAgICAgPENhbGxvdXQ+XG4gICAgICAgICAgICAgICAgWW91IGNhbiBzZWUgaW5mb3JtYXRpb24gb2YgYWxsIHlvdXIgcGF5bWVudHMgaW4gdGhleycgJ31cbiAgICAgICAgICAgICAgICA8SW5saW5lTGlua1xuICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kYXNoYm9hcmQucGxhaWQuY29tL2FjdGl2aXR5L3BheW1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBQYXltZW50cyBEYXNoYm9hcmRcbiAgICAgICAgICAgICAgICA8L0lubGluZUxpbms+XG4gICAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgICA8L0NhbGxvdXQ+XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMucmVxdWVzdHN9PlxuICAgICAgICAgICAgICBOb3cgdGhhdCB0aGUgJ3BheW1lbnRfaWQnIHN0b3JlZCBpbiB5b3VyIHNlcnZlciwgeW91IGNhbiB1c2UgaXQgdG8gYWNjZXNzIHRoZSBwYXltZW50IGluZm9ybWF0aW9uOlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAvKiBJZiBub3QgdXNpbmcgdGhlIHBheW1lbnRfaW5pdGlhdGlvbiBwcm9kdWN0LCBzaG93IHRoZSBpdGVtX2lkIGFuZCBhY2Nlc3NfdG9rZW4gaW5mb3JtYXRpb24gKi8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgIHtpc0l0ZW1BY2Nlc3MgPyAoXG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT17c3R5bGVzLnN1YnRpdGxlfT5cbiAgICAgICAgICAgICAgICAgIENvbmdyYXRzISBCeSBsaW5raW5nIGFuIGFjY291bnQsIHlvdSBoYXZlIGNyZWF0ZWQgYW57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICA8SW5saW5lTGlua1xuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vcGxhaWQuY29tL2RvY3MvcXVpY2tzdGFydC9nbG9zc2FyeS8jaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgSXRlbVxuICAgICAgICAgICAgICAgICAgPC9JbmxpbmVMaW5rPlxuICAgICAgICAgICAgICAgICAgLlxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9e3N0eWxlcy5zdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICA8Q2FsbG91dCB3YXJuaW5nPlxuICAgICAgICAgICAgICAgICAgICBVbmFibGUgdG8gY3JlYXRlIGFuIGl0ZW0uIFBsZWFzZSBjaGVjayB5b3VyIGJhY2tlbmQgc2VydmVyXG4gICAgICAgICAgICAgICAgICA8L0NhbGxvdXQ+XG4gICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLml0ZW1BY2Nlc3NDb250YWluZXJ9PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5pdGVtQWNjZXNzUm93fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5pZE5hbWV9Pml0ZW1faWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMudG9rZW5UZXh0fT57aXRlbUlkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLml0ZW1BY2Nlc3NSb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmlkTmFtZX0+YWNjZXNzX3Rva2VuPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnRva2VuVGV4dH0+e2FjY2Vzc1Rva2VufTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7aXNJdGVtQWNjZXNzICYmIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5yZXF1ZXN0c30+XG4gICAgICAgICAgICAgICAgICBOb3cgdGhhdCB5b3UgaGF2ZSBhbiBhY2Nlc3NfdG9rZW4sIHlvdSBjYW4gbWFrZSBhbGwgb2YgdGhlXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmcgcmVxdWVzdHM6XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5IZWFkZXIuZGlzcGxheU5hbWUgPSBcIkhlYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iXX0=