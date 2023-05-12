'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// read env vars from .env file
require('dotenv').config();
const { Configuration, PlaidApi, Products, PlaidEnvironments } = require('plaid');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',');
// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',');
// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';
// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || '';
// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId .
let PAYMENT_ID = null;
// The transfer_id is only relevant for Transfer ACH product.
// We store the transfer_id in memory - in production, store it in a secure
// persistent data store
let TRANSFER_ID = null;
// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});
const client = new PlaidApi(configuration);
const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.post('/api/info', function (request, response, next) {
    response.json({
        item_id: ITEM_ID,
        access_token: ACCESS_TOKEN,
        products: PLAID_PRODUCTS,
    });
});
// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post('/api/create_link_token', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = {
                user: {
                    // This should correspond to a unique id for the current user.
                    client_user_id: 'user-id',
                },
                client_name: 'Plaid Quickstart',
                products: PLAID_PRODUCTS,
                country_codes: PLAID_COUNTRY_CODES,
                language: 'en',
            };
            if (PLAID_REDIRECT_URI !== '') {
                configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            if (PLAID_ANDROID_PACKAGE_NAME !== '') {
                configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
            }
            const createTokenResponse = yield client.linkTokenCreate(configs);
            prettyPrintResponse(createTokenResponse);
            response.json(createTokenResponse.data);
        });
    })
        .catch(next);
});
// Create a link token with configs which we can then use to initialize Plaid Link client-side
// for a 'payment-initiation' flow.
// See:
// - https://plaid.com/docs/payment-initiation/
// - https://plaid.com/docs/#payment-initiation-create-link-token-request
app.post('/api/create_link_token_for_payment', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const createRecipientResponse = yield client.paymentInitiationRecipientCreate({
                name: 'Harry Potter',
                iban: 'GB33BUKB20201555555555',
                address: {
                    street: ['4 Privet Drive'],
                    city: 'Little Whinging',
                    postal_code: '11111',
                    country: 'GB',
                },
            });
            const recipientId = createRecipientResponse.data.recipient_id;
            prettyPrintResponse(createRecipientResponse);
            const createPaymentResponse = yield client.paymentInitiationPaymentCreate({
                recipient_id: recipientId,
                reference: 'paymentRef',
                amount: {
                    value: 1.23,
                    currency: 'GBP',
                },
            });
            prettyPrintResponse(createPaymentResponse);
            const paymentId = createPaymentResponse.data.payment_id;
            // We store the payment_id in memory for demo purposes - in production, store it in a secure
            // persistent data store along with the Payment metadata, such as userId.
            PAYMENT_ID = paymentId;
            const configs = {
                client_name: 'Plaid Quickstart',
                user: {
                    // This should correspond to a unique id for the current user.
                    // Typically, this will be a user ID number from your application.
                    // Personally identifiable information, such as an email address or phone number, should not be used here.
                    client_user_id: uuidv4(),
                },
                // Institutions from all listed countries will be shown.
                country_codes: PLAID_COUNTRY_CODES,
                language: 'en',
                // The 'payment_initiation' product has to be the only element in the 'products' list.
                products: [Products.PaymentInitiation],
                payment_initiation: {
                    payment_id: paymentId,
                },
            };
            if (PLAID_REDIRECT_URI !== '') {
                configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            const createTokenResponse = yield client.linkTokenCreate(configs);
            prettyPrintResponse(createTokenResponse);
            response.json(createTokenResponse.data);
        });
    })
        .catch(next);
});
// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/api/set_access_token', function (request, response, next) {
    PUBLIC_TOKEN = request.body.public_token;
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenResponse = yield client.itemPublicTokenExchange({
                public_token: PUBLIC_TOKEN,
            });
            prettyPrintResponse(tokenResponse);
            ACCESS_TOKEN = tokenResponse.data.access_token;
            ITEM_ID = tokenResponse.data.item_id;
            if (PLAID_PRODUCTS.includes(Products.Transfer)) {
                TRANSFER_ID = yield authorizeAndCreateTransfer(ACCESS_TOKEN);
            }
            response.json({
                // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
                access_token: ACCESS_TOKEN,
                item_id: ITEM_ID,
                error: null,
            });
        });
    })
        .catch(next);
});
// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
app.get('/api/auth', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const authResponse = yield client.authGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(authResponse);
            response.json(authResponse.data);
        });
    })
        .catch(next);
});
// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/api/transactions', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Set cursor to empty to receive all historical updates
            let cursor = null;
            // New transaction updates since "cursor"
            let added = [];
            let modified = [];
            // Removed transaction ids
            let removed = [];
            let hasMore = true;
            // Iterate through each page of new transaction updates for item
            while (hasMore) {
                const request = {
                    access_token: ACCESS_TOKEN,
                    cursor: cursor,
                };
                const response = yield client.transactionsSync(request);
                const data = response.data;
                // Add this page of results
                added = added.concat(data.added);
                modified = modified.concat(data.modified);
                removed = removed.concat(data.removed);
                hasMore = data.has_more;
                // Update cursor to the next cursor
                cursor = data.next_cursor;
                prettyPrintResponse(response);
            }
            const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
            // Return the 8 most recent transactions
            const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
            response.json({ latest_transactions: recently_added });
        });
    })
        .catch(next);
});
// Retrieve Investment Transactions for an Item
// https://plaid.com/docs/#investments
app.get('/api/investments_transactions', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
            const endDate = moment().format('YYYY-MM-DD');
            const configs = {
                access_token: ACCESS_TOKEN,
                start_date: startDate,
                end_date: endDate,
            };
            const investmentTransactionsResponse = yield client.investmentsTransactionsGet(configs);
            prettyPrintResponse(investmentTransactionsResponse);
            response.json({
                error: null,
                investments_transactions: investmentTransactionsResponse.data,
            });
        });
    })
        .catch(next);
});
// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
app.get('/api/identity', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const identityResponse = yield client.identityGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(identityResponse);
            response.json({ identity: identityResponse.data.accounts });
        });
    })
        .catch(next);
});
// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
app.get('/api/balance', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const balanceResponse = yield client.accountsBalanceGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(balanceResponse);
            response.json(balanceResponse.data);
        });
    })
        .catch(next);
});
// Retrieve Holdings for an Item
// https://plaid.com/docs/#investments
app.get('/api/holdings', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const holdingsResponse = yield client.investmentsHoldingsGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(holdingsResponse);
            response.json({ error: null, holdings: holdingsResponse.data });
        });
    })
        .catch(next);
});
// Retrieve Liabilities for an Item
// https://plaid.com/docs/#liabilities
app.get('/api/liabilities', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const liabilitiesResponse = yield client.liabilitiesGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(liabilitiesResponse);
            response.json({ error: null, liabilities: liabilitiesResponse.data });
        });
    })
        .catch(next);
});
// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/api/item', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull the Item - this includes information about available products,
            // billed products, webhook information, and more.
            const itemResponse = yield client.itemGet({
                access_token: ACCESS_TOKEN,
            });
            // Also pull information about the institution
            const configs = {
                institution_id: itemResponse.data.item.institution_id,
                country_codes: PLAID_COUNTRY_CODES,
            };
            const instResponse = yield client.institutionsGetById(configs);
            prettyPrintResponse(itemResponse);
            response.json({
                item: itemResponse.data.item,
                institution: instResponse.data.institution,
            });
        });
    })
        .catch(next);
});
// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get('/api/accounts', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const accountsResponse = yield client.accountsGet({
                access_token: ACCESS_TOKEN,
            });
            prettyPrintResponse(accountsResponse);
            response.json(accountsResponse.data);
        });
    })
        .catch(next);
});
// Create and then retrieve an Asset Report for one or more Items. Note that an
// Asset Report can contain up to 100 items, but for simplicity we're only
// including one Item here.
// https://plaid.com/docs/#assets
app.get('/api/assets', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // You can specify up to two years of transaction history for an Asset
            // Report.
            const daysRequested = 10;
            // The `options` object allows you to specify a webhook for Asset Report
            // generation, as well as information that you want included in the Asset
            // Report. All fields are optional.
            const options = {
                client_report_id: 'Custom Report ID #123',
                // webhook: 'https://your-domain.tld/plaid-webhook',
                user: {
                    client_user_id: 'Custom User ID #456',
                    first_name: 'Alice',
                    middle_name: 'Bobcat',
                    last_name: 'Cranberry',
                    ssn: '123-45-6789',
                    phone_number: '555-123-4567',
                    email: 'alice@example.com',
                },
            };
            const configs = {
                access_tokens: [ACCESS_TOKEN],
                days_requested: daysRequested,
                options,
            };
            const assetReportCreateResponse = yield client.assetReportCreate(configs);
            prettyPrintResponse(assetReportCreateResponse);
            const assetReportToken = assetReportCreateResponse.data.asset_report_token;
            const getResponse = yield getAssetReportWithRetries(client, assetReportToken);
            const pdfRequest = {
                asset_report_token: assetReportToken,
            };
            const pdfResponse = yield client.assetReportPdfGet(pdfRequest, {
                responseType: 'arraybuffer',
            });
            prettyPrintResponse(getResponse);
            prettyPrintResponse(pdfResponse);
            response.json({
                json: getResponse.data.report,
                pdf: pdfResponse.data.toString('base64'),
            });
        });
    })
        .catch(next);
});
app.get('/api/transfer', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const transferGetResponse = yield client.transferGet({
                transfer_id: TRANSFER_ID,
            });
            prettyPrintResponse(transferGetResponse);
            response.json({
                error: null,
                transfer: transferGetResponse.data.transfer,
            });
        });
    })
        .catch(next);
});
// This functionality is only relevant for the UK/EU Payment Initiation product.
// Retrieve Payment for a specified Payment ID
app.get('/api/payment', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentGetResponse = yield client.paymentInitiationPaymentGet({
                payment_id: PAYMENT_ID,
            });
            prettyPrintResponse(paymentGetResponse);
            response.json({ error: null, payment: paymentGetResponse.data });
        });
    })
        .catch(next);
});
//TO-DO: This endpoint will be deprecated in the near future
app.get('/api/income/verification/paystubs', function (request, response, next) {
    Promise.resolve()
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const paystubsGetResponse = yield client.incomeVerificationPaystubsGet({
                access_token: ACCESS_TOKEN
            });
            prettyPrintResponse(paystubsGetResponse);
            response.json({ error: null, paystubs: paystubsGetResponse.data });
        });
    })
        .catch(next);
});
app.use('/api', function (error, request, response, next) {
    prettyPrintResponse(error.response);
    response.json(formatError(error.response));
});
const server = app.listen(APP_PORT, function () {
    console.log('plaid-quickstart server listening on port ' + APP_PORT);
});
const prettyPrintResponse = (response) => {
    console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};
// This is a helper function to poll for the completion of an Asset Report and
// then send it in the response to the client. Alternatively, you can provide a
// webhook in the `options` object in your `/asset_report/create` request to be
// notified when the Asset Report is finished being generated.
const getAssetReportWithRetries = (plaidClient, asset_report_token, ms = 1000, retriesLeft = 20) => new Promise((resolve, reject) => {
    const request = {
        asset_report_token,
    };
    plaidClient
        .assetReportGet(request)
        .then(resolve)
        .catch(() => {
        setTimeout(() => {
            if (retriesLeft === 1) {
                reject('Ran out of retries while polling for asset report');
                return;
            }
            getAssetReportWithRetries(plaidClient, asset_report_token, ms, retriesLeft - 1).then(resolve);
        }, ms);
    });
});
const formatError = (error) => {
    return {
        error: Object.assign(Object.assign({}, error.data), { status_code: error.status }),
    };
};
// This is a helper function to authorize and create a Transfer after successful
// exchange of a public_token for an access_token. The TRANSFER_ID is then used
// to obtain the data about that particular Transfer.
const authorizeAndCreateTransfer = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    // We call /accounts/get to obtain first account_id - in production,
    // account_id's should be persisted in a data store and retrieved
    // from there.
    const accountsResponse = yield client.accountsGet({
        access_token: accessToken,
    });
    const accountId = accountsResponse.data.accounts[0].account_id;
    const transferAuthorizationResponse = yield client.transferAuthorizationCreate({
        access_token: accessToken,
        account_id: accountId,
        type: 'credit',
        network: 'ach',
        amount: '1.34',
        ach_class: 'ppd',
        user: {
            legal_name: 'FirstName LastName',
            email_address: 'foobar@email.com',
            address: {
                street: '123 Main St.',
                city: 'San Francisco',
                region: 'CA',
                postal_code: '94053',
                country: 'US',
            },
        },
    });
    prettyPrintResponse(transferAuthorizationResponse);
    const authorizationId = transferAuthorizationResponse.data.authorization.id;
    const transferResponse = yield client.transferCreate({
        idempotency_key: '1223abc456xyz7890001',
        access_token: accessToken,
        account_id: accountId,
        authorization_id: authorizationId,
        type: 'credit',
        network: 'ach',
        amount: '12.34',
        description: 'Payment',
        ach_class: 'ppd',
        user: {
            legal_name: 'FirstName LastName',
            email_address: 'foobar@email.com',
            address: {
                street: '123 Main St.',
                city: 'San Francisco',
                region: 'CA',
                postal_code: '94053',
                country: 'US',
            },
        },
    });
    prettyPrintResponse(transferResponse);
    return transferResponse.data.transfer.id;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9xdWlja3N0YXJ0L25vZGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsK0JBQStCO0FBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQixNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDOUMsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFDcEQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDOUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO0FBRXJELGdGQUFnRjtBQUNoRiw2RUFBNkU7QUFDN0UsNkNBQTZDO0FBQzdDLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElB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T0FBTyxFQUFFLElBQUk7YUFDZDtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBQ0wsbUJBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNuRCxNQUFNLGVBQWUsR0FBRyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztJQUU1RSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUNuRCxlQUFlLEVBQUUsc0JBQXNCO1FBQ3ZDLFlBQVksRUFBRSxXQUFXO1FBQ3pCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLGdCQUFnQixFQUFFLGVBQWU7UUFDakMsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsS0FBSztRQUNkLE1BQU0sRUFBRSxPQUFPO1FBQ2YsV0FBVyxFQUFFLFNBQVM7UUFDdEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsSUFBSSxFQUFFO1lBQ0osVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxhQUFhLEVBQUUsa0JBQWtCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsY0FBYztnQkFDdEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixPQUFPLEVBQUUsSUFBSTthQUNkO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFDSCxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDM0MsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIHJlYWQgZW52IHZhcnMgZnJvbSAuZW52IGZpbGVcbnJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuY29uc3QgeyBDb25maWd1cmF0aW9uLCBQbGFpZEFwaSwgUHJvZHVjdHMsIFBsYWlkRW52aXJvbm1lbnRzfSA9IHJlcXVpcmUoJ3BsYWlkJyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyB2NDogdXVpZHY0IH0gPSByZXF1aXJlKCd1dWlkJyk7XG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKCdjb3JzJyk7XG5cbmNvbnN0IEFQUF9QT1JUID0gcHJvY2Vzcy5lbnYuQVBQX1BPUlQgfHwgODAwMDtcbmNvbnN0IFBMQUlEX0NMSUVOVF9JRCA9IHByb2Nlc3MuZW52LlBMQUlEX0NMSUVOVF9JRDtcbmNvbnN0IFBMQUlEX1NFQ1JFVCA9IHByb2Nlc3MuZW52LlBMQUlEX1NFQ1JFVDtcbmNvbnN0IFBMQUlEX0VOViA9IHByb2Nlc3MuZW52LlBMQUlEX0VOViB8fCAnc2FuZGJveCc7XG5cbi8vIFBMQUlEX1BST0RVQ1RTIGlzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgcHJvZHVjdHMgdG8gdXNlIHdoZW4gaW5pdGlhbGl6aW5nXG4vLyBMaW5rLiBOb3RlIHRoYXQgdGhpcyBsaXN0IG11c3QgY29udGFpbiAnYXNzZXRzJyBpbiBvcmRlciBmb3IgdGhlIGFwcCB0byBiZVxuLy8gYWJsZSB0byBjcmVhdGUgYW5kIHJldHJpZXZlIGFzc2V0IHJlcG9ydHMuXG5jb25zdCBQTEFJRF9QUk9EVUNUUyA9IChwcm9jZXNzLmVudi5QTEFJRF9QUk9EVUNUUyB8fCBQcm9kdWN0cy5UcmFuc2FjdGlvbnMpLnNwbGl0KFxuICAnLCcsXG4pO1xuXG4vLyBQTEFJRF9DT1VOVFJZX0NPREVTIGlzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgY291bnRyaWVzIGZvciB3aGljaCB1c2Vyc1xuLy8gd2lsbCBiZSBhYmxlIHRvIHNlbGVjdCBpbnN0aXR1dGlvbnMgZnJvbS5cbmNvbnN0IFBMQUlEX0NPVU5UUllfQ09ERVMgPSAocHJvY2Vzcy5lbnYuUExBSURfQ09VTlRSWV9DT0RFUyB8fCAnVVMnKS5zcGxpdChcbiAgJywnLFxuKTtcblxuLy8gUGFyYW1ldGVycyB1c2VkIGZvciB0aGUgT0F1dGggcmVkaXJlY3QgTGluayBmbG93LlxuLy9cbi8vIFNldCBQTEFJRF9SRURJUkVDVF9VUkkgdG8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbi8vIFRoZSBPQXV0aCByZWRpcmVjdCBmbG93IHJlcXVpcmVzIGFuIGVuZHBvaW50IG9uIHRoZSBkZXZlbG9wZXIncyB3ZWJzaXRlXG4vLyB0aGF0IHRoZSBiYW5rIHdlYnNpdGUgc2hvdWxkIHJlZGlyZWN0IHRvLiBZb3Ugd2lsbCBuZWVkIHRvIGNvbmZpZ3VyZVxuLy8gdGhpcyByZWRpcmVjdCBVUkkgZm9yIHlvdXIgY2xpZW50IElEIHRocm91Z2ggdGhlIFBsYWlkIGRldmVsb3BlciBkYXNoYm9hcmRcbi8vIGF0IGh0dHBzOi8vZGFzaGJvYXJkLnBsYWlkLmNvbS90ZWFtL2FwaS5cbmNvbnN0IFBMQUlEX1JFRElSRUNUX1VSSSA9IHByb2Nlc3MuZW52LlBMQUlEX1JFRElSRUNUX1VSSSB8fCAnJztcblxuLy8gUGFyYW1ldGVyIHVzZWQgZm9yIE9BdXRoIGluIEFuZHJvaWQuIFRoaXMgc2hvdWxkIGJlIHRoZSBwYWNrYWdlIG5hbWUgb2YgeW91ciBhcHAsXG4vLyBlLmcuIGNvbS5wbGFpZC5saW5rc2FtcGxlXG5jb25zdCBQTEFJRF9BTkRST0lEX1BBQ0tBR0VfTkFNRSA9IHByb2Nlc3MuZW52LlBMQUlEX0FORFJPSURfUEFDS0FHRV9OQU1FIHx8ICcnO1xuXG4vLyBXZSBzdG9yZSB0aGUgYWNjZXNzX3Rva2VuIGluIG1lbW9yeSAtIGluIHByb2R1Y3Rpb24sIHN0b3JlIGl0IGluIGEgc2VjdXJlXG4vLyBwZXJzaXN0ZW50IGRhdGEgc3RvcmVcbmxldCBBQ0NFU1NfVE9LRU4gPSBudWxsO1xubGV0IFBVQkxJQ19UT0tFTiA9IG51bGw7XG5sZXQgSVRFTV9JRCA9IG51bGw7XG4vLyBUaGUgcGF5bWVudF9pZCBpcyBvbmx5IHJlbGV2YW50IGZvciB0aGUgVUsvRVUgUGF5bWVudCBJbml0aWF0aW9uIHByb2R1Y3QuXG4vLyBXZSBzdG9yZSB0aGUgcGF5bWVudF9pZCBpbiBtZW1vcnkgLSBpbiBwcm9kdWN0aW9uLCBzdG9yZSBpdCBpbiBhIHNlY3VyZVxuLy8gcGVyc2lzdGVudCBkYXRhIHN0b3JlIGFsb25nIHdpdGggdGhlIFBheW1lbnQgbWV0YWRhdGEsIHN1Y2ggYXMgdXNlcklkIC5cbmxldCBQQVlNRU5UX0lEID0gbnVsbDtcbi8vIFRoZSB0cmFuc2Zlcl9pZCBpcyBvbmx5IHJlbGV2YW50IGZvciBUcmFuc2ZlciBBQ0ggcHJvZHVjdC5cbi8vIFdlIHN0b3JlIHRoZSB0cmFuc2Zlcl9pZCBpbiBtZW1vcnkgLSBpbiBwcm9kdWN0aW9uLCBzdG9yZSBpdCBpbiBhIHNlY3VyZVxuLy8gcGVyc2lzdGVudCBkYXRhIHN0b3JlXG5sZXQgVFJBTlNGRVJfSUQgPSBudWxsO1xuXG4vLyBJbml0aWFsaXplIHRoZSBQbGFpZCBjbGllbnRcbi8vIEZpbmQgeW91ciBBUEkga2V5cyBpbiB0aGUgRGFzaGJvYXJkIChodHRwczovL2Rhc2hib2FyZC5wbGFpZC5jb20vYWNjb3VudC9rZXlzKVxuXG5jb25zdCBjb25maWd1cmF0aW9uID0gbmV3IENvbmZpZ3VyYXRpb24oe1xuICBiYXNlUGF0aDogUGxhaWRFbnZpcm9ubWVudHNbUExBSURfRU5WXSxcbiAgYmFzZU9wdGlvbnM6IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnUExBSUQtQ0xJRU5ULUlEJzogUExBSURfQ0xJRU5UX0lELFxuICAgICAgJ1BMQUlELVNFQ1JFVCc6IFBMQUlEX1NFQ1JFVCxcbiAgICAgICdQbGFpZC1WZXJzaW9uJzogJzIwMjAtMDktMTQnLFxuICAgIH0sXG4gIH0sXG59KTtcblxuY29uc3QgY2xpZW50ID0gbmV3IFBsYWlkQXBpKGNvbmZpZ3VyYXRpb24pO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKFxuICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgIGV4dGVuZGVkOiBmYWxzZSxcbiAgfSksXG4pO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGNvcnMoKSk7XG5cbmFwcC5wb3N0KCcvYXBpL2luZm8nLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgcmVzcG9uc2UuanNvbih7XG4gICAgaXRlbV9pZDogSVRFTV9JRCxcbiAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICBwcm9kdWN0czogUExBSURfUFJPRFVDVFMsXG4gIH0pO1xufSk7XG5cbi8vIENyZWF0ZSBhIGxpbmsgdG9rZW4gd2l0aCBjb25maWdzIHdoaWNoIHdlIGNhbiB0aGVuIHVzZSB0byBpbml0aWFsaXplIFBsYWlkIExpbmsgY2xpZW50LXNpZGUuXG4vLyBTZWUgaHR0cHM6Ly9wbGFpZC5jb20vZG9jcy8jY3JlYXRlLWxpbmstdG9rZW5cbmFwcC5wb3N0KCcvYXBpL2NyZWF0ZV9saW5rX3Rva2VuJywgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29uZmlncyA9IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIC8vIFRoaXMgc2hvdWxkIGNvcnJlc3BvbmQgdG8gYSB1bmlxdWUgaWQgZm9yIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICAgICAgY2xpZW50X3VzZXJfaWQ6ICd1c2VyLWlkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY2xpZW50X25hbWU6ICdQbGFpZCBRdWlja3N0YXJ0JyxcbiAgICAgICAgcHJvZHVjdHM6IFBMQUlEX1BST0RVQ1RTLFxuICAgICAgICBjb3VudHJ5X2NvZGVzOiBQTEFJRF9DT1VOVFJZX0NPREVTLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgIH07XG5cbiAgICAgIGlmIChQTEFJRF9SRURJUkVDVF9VUkkgIT09ICcnKSB7XG4gICAgICAgIGNvbmZpZ3MucmVkaXJlY3RfdXJpID0gUExBSURfUkVESVJFQ1RfVVJJO1xuICAgICAgfVxuXG4gICAgICBpZiAoUExBSURfQU5EUk9JRF9QQUNLQUdFX05BTUUgIT09ICcnKSB7XG4gICAgICAgIGNvbmZpZ3MuYW5kcm9pZF9wYWNrYWdlX25hbWUgPSBQTEFJRF9BTkRST0lEX1BBQ0tBR0VfTkFNRTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNyZWF0ZVRva2VuUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQubGlua1Rva2VuQ3JlYXRlKGNvbmZpZ3MpO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShjcmVhdGVUb2tlblJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmpzb24oY3JlYXRlVG9rZW5SZXNwb25zZS5kYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBDcmVhdGUgYSBsaW5rIHRva2VuIHdpdGggY29uZmlncyB3aGljaCB3ZSBjYW4gdGhlbiB1c2UgdG8gaW5pdGlhbGl6ZSBQbGFpZCBMaW5rIGNsaWVudC1zaWRlXG4vLyBmb3IgYSAncGF5bWVudC1pbml0aWF0aW9uJyBmbG93LlxuLy8gU2VlOlxuLy8gLSBodHRwczovL3BsYWlkLmNvbS9kb2NzL3BheW1lbnQtaW5pdGlhdGlvbi9cbi8vIC0gaHR0cHM6Ly9wbGFpZC5jb20vZG9jcy8jcGF5bWVudC1pbml0aWF0aW9uLWNyZWF0ZS1saW5rLXRva2VuLXJlcXVlc3RcbmFwcC5wb3N0KFxuICAnL2FwaS9jcmVhdGVfbGlua190b2tlbl9mb3JfcGF5bWVudCcsXG4gIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVJlY2lwaWVudFJlc3BvbnNlID1cbiAgICAgICAgICBhd2FpdCBjbGllbnQucGF5bWVudEluaXRpYXRpb25SZWNpcGllbnRDcmVhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ0hhcnJ5IFBvdHRlcicsXG4gICAgICAgICAgICBpYmFuOiAnR0IzM0JVS0IyMDIwMTU1NTU1NTU1NScsXG4gICAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICAgIHN0cmVldDogWyc0IFByaXZldCBEcml2ZSddLFxuICAgICAgICAgICAgICBjaXR5OiAnTGl0dGxlIFdoaW5naW5nJyxcbiAgICAgICAgICAgICAgcG9zdGFsX2NvZGU6ICcxMTExMScsXG4gICAgICAgICAgICAgIGNvdW50cnk6ICdHQicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZWNpcGllbnRJZCA9IGNyZWF0ZVJlY2lwaWVudFJlc3BvbnNlLmRhdGEucmVjaXBpZW50X2lkO1xuICAgICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGNyZWF0ZVJlY2lwaWVudFJlc3BvbnNlKTtcblxuICAgICAgICBjb25zdCBjcmVhdGVQYXltZW50UmVzcG9uc2UgPVxuICAgICAgICAgIGF3YWl0IGNsaWVudC5wYXltZW50SW5pdGlhdGlvblBheW1lbnRDcmVhdGUoe1xuICAgICAgICAgICAgcmVjaXBpZW50X2lkOiByZWNpcGllbnRJZCxcbiAgICAgICAgICAgIHJlZmVyZW5jZTogJ3BheW1lbnRSZWYnLFxuICAgICAgICAgICAgYW1vdW50OiB7XG4gICAgICAgICAgICAgIHZhbHVlOiAxLjIzLFxuICAgICAgICAgICAgICBjdXJyZW5jeTogJ0dCUCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGNyZWF0ZVBheW1lbnRSZXNwb25zZSk7XG4gICAgICAgIGNvbnN0IHBheW1lbnRJZCA9IGNyZWF0ZVBheW1lbnRSZXNwb25zZS5kYXRhLnBheW1lbnRfaWQ7XG5cbiAgICAgICAgLy8gV2Ugc3RvcmUgdGhlIHBheW1lbnRfaWQgaW4gbWVtb3J5IGZvciBkZW1vIHB1cnBvc2VzIC0gaW4gcHJvZHVjdGlvbiwgc3RvcmUgaXQgaW4gYSBzZWN1cmVcbiAgICAgICAgLy8gcGVyc2lzdGVudCBkYXRhIHN0b3JlIGFsb25nIHdpdGggdGhlIFBheW1lbnQgbWV0YWRhdGEsIHN1Y2ggYXMgdXNlcklkLlxuICAgICAgICBQQVlNRU5UX0lEID0gcGF5bWVudElkO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZ3MgPSB7XG4gICAgICAgICAgY2xpZW50X25hbWU6ICdQbGFpZCBRdWlja3N0YXJ0JyxcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCBjb3JyZXNwb25kIHRvIGEgdW5pcXVlIGlkIGZvciB0aGUgY3VycmVudCB1c2VyLlxuICAgICAgICAgICAgLy8gVHlwaWNhbGx5LCB0aGlzIHdpbGwgYmUgYSB1c2VyIElEIG51bWJlciBmcm9tIHlvdXIgYXBwbGljYXRpb24uXG4gICAgICAgICAgICAvLyBQZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbiwgc3VjaCBhcyBhbiBlbWFpbCBhZGRyZXNzIG9yIHBob25lIG51bWJlciwgc2hvdWxkIG5vdCBiZSB1c2VkIGhlcmUuXG4gICAgICAgICAgICBjbGllbnRfdXNlcl9pZDogdXVpZHY0KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBJbnN0aXR1dGlvbnMgZnJvbSBhbGwgbGlzdGVkIGNvdW50cmllcyB3aWxsIGJlIHNob3duLlxuICAgICAgICAgIGNvdW50cnlfY29kZXM6IFBMQUlEX0NPVU5UUllfQ09ERVMsXG4gICAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgICAgLy8gVGhlICdwYXltZW50X2luaXRpYXRpb24nIHByb2R1Y3QgaGFzIHRvIGJlIHRoZSBvbmx5IGVsZW1lbnQgaW4gdGhlICdwcm9kdWN0cycgbGlzdC5cbiAgICAgICAgICBwcm9kdWN0czogW1Byb2R1Y3RzLlBheW1lbnRJbml0aWF0aW9uXSxcbiAgICAgICAgICBwYXltZW50X2luaXRpYXRpb246IHtcbiAgICAgICAgICAgIHBheW1lbnRfaWQ6IHBheW1lbnRJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUExBSURfUkVESVJFQ1RfVVJJICE9PSAnJykge1xuICAgICAgICAgIGNvbmZpZ3MucmVkaXJlY3RfdXJpID0gUExBSURfUkVESVJFQ1RfVVJJO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNyZWF0ZVRva2VuUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQubGlua1Rva2VuQ3JlYXRlKGNvbmZpZ3MpO1xuICAgICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGNyZWF0ZVRva2VuUmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5qc29uKGNyZWF0ZVRva2VuUmVzcG9uc2UuZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKG5leHQpO1xuICB9LFxuKTtcblxuLy8gRXhjaGFuZ2UgdG9rZW4gZmxvdyAtIGV4Y2hhbmdlIGEgTGluayBwdWJsaWNfdG9rZW4gZm9yXG4vLyBhbiBBUEkgYWNjZXNzX3Rva2VuXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNleGNoYW5nZS10b2tlbi1mbG93XG5hcHAucG9zdCgnL2FwaS9zZXRfYWNjZXNzX3Rva2VuJywgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gIFBVQkxJQ19UT0tFTiA9IHJlcXVlc3QuYm9keS5wdWJsaWNfdG9rZW47XG4gIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdG9rZW5SZXNwb25zZSA9IGF3YWl0IGNsaWVudC5pdGVtUHVibGljVG9rZW5FeGNoYW5nZSh7XG4gICAgICAgIHB1YmxpY190b2tlbjogUFVCTElDX1RPS0VOLFxuICAgICAgfSk7XG4gICAgICBwcmV0dHlQcmludFJlc3BvbnNlKHRva2VuUmVzcG9uc2UpO1xuICAgICAgQUNDRVNTX1RPS0VOID0gdG9rZW5SZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgIElURU1fSUQgPSB0b2tlblJlc3BvbnNlLmRhdGEuaXRlbV9pZDtcbiAgICAgIGlmIChQTEFJRF9QUk9EVUNUUy5pbmNsdWRlcyhQcm9kdWN0cy5UcmFuc2ZlcikpIHtcbiAgICAgICAgVFJBTlNGRVJfSUQgPSBhd2FpdCBhdXRob3JpemVBbmRDcmVhdGVUcmFuc2ZlcihBQ0NFU1NfVE9LRU4pO1xuICAgICAgfVxuICAgICAgcmVzcG9uc2UuanNvbih7XG4gICAgICAgIC8vIHRoZSAnYWNjZXNzX3Rva2VuJyBpcyBhIHByaXZhdGUgdG9rZW4sIERPIE5PVCBwYXNzIHRoaXMgdG9rZW4gdG8gdGhlIGZyb250ZW5kIGluIHlvdXIgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICAgICAgaXRlbV9pZDogSVRFTV9JRCxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSBBQ0ggb3IgRVRGIEF1dGggZGF0YSBmb3IgYW4gSXRlbSdzIGFjY291bnRzXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNhdXRoXG5hcHAuZ2V0KCcvYXBpL2F1dGgnLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBhdXRoUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuYXV0aEdldCh7XG4gICAgICAgIGFjY2Vzc190b2tlbjogQUNDRVNTX1RPS0VOLFxuICAgICAgfSk7XG4gICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGF1dGhSZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5qc29uKGF1dGhSZXNwb25zZS5kYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSBUcmFuc2FjdGlvbnMgZm9yIGFuIEl0ZW1cbi8vIGh0dHBzOi8vcGxhaWQuY29tL2RvY3MvI3RyYW5zYWN0aW9uc1xuYXBwLmdldCgnL2FwaS90cmFuc2FjdGlvbnMnLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBTZXQgY3Vyc29yIHRvIGVtcHR5IHRvIHJlY2VpdmUgYWxsIGhpc3RvcmljYWwgdXBkYXRlc1xuICAgICAgbGV0IGN1cnNvciA9IG51bGw7XG5cbiAgICAgIC8vIE5ldyB0cmFuc2FjdGlvbiB1cGRhdGVzIHNpbmNlIFwiY3Vyc29yXCJcbiAgICAgIGxldCBhZGRlZCA9IFtdO1xuICAgICAgbGV0IG1vZGlmaWVkID0gW107XG4gICAgICAvLyBSZW1vdmVkIHRyYW5zYWN0aW9uIGlkc1xuICAgICAgbGV0IHJlbW92ZWQgPSBbXTtcbiAgICAgIGxldCBoYXNNb3JlID0gdHJ1ZTtcbiAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBhZ2Ugb2YgbmV3IHRyYW5zYWN0aW9uIHVwZGF0ZXMgZm9yIGl0ZW1cbiAgICAgIHdoaWxlIChoYXNNb3JlKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgYWNjZXNzX3Rva2VuOiBBQ0NFU1NfVE9LRU4sXG4gICAgICAgICAgY3Vyc29yOiBjdXJzb3IsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnRyYW5zYWN0aW9uc1N5bmMocmVxdWVzdClcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIC8vIEFkZCB0aGlzIHBhZ2Ugb2YgcmVzdWx0c1xuICAgICAgICBhZGRlZCA9IGFkZGVkLmNvbmNhdChkYXRhLmFkZGVkKTtcbiAgICAgICAgbW9kaWZpZWQgPSBtb2RpZmllZC5jb25jYXQoZGF0YS5tb2RpZmllZCk7XG4gICAgICAgIHJlbW92ZWQgPSByZW1vdmVkLmNvbmNhdChkYXRhLnJlbW92ZWQpO1xuICAgICAgICBoYXNNb3JlID0gZGF0YS5oYXNfbW9yZTtcbiAgICAgICAgLy8gVXBkYXRlIGN1cnNvciB0byB0aGUgbmV4dCBjdXJzb3JcbiAgICAgICAgY3Vyc29yID0gZGF0YS5uZXh0X2N1cnNvcjtcbiAgICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXBhcmVUeG5zQnlEYXRlQXNjZW5kaW5nID0gKGEsIGIpID0+IChhLmRhdGUgPiBiLmRhdGUpIC0gKGEuZGF0ZSA8IGIuZGF0ZSk7XG4gICAgICAvLyBSZXR1cm4gdGhlIDggbW9zdCByZWNlbnQgdHJhbnNhY3Rpb25zXG4gICAgICBjb25zdCByZWNlbnRseV9hZGRlZCA9IFsuLi5hZGRlZF0uc29ydChjb21wYXJlVHhuc0J5RGF0ZUFzY2VuZGluZykuc2xpY2UoLTgpO1xuICAgICAgcmVzcG9uc2UuanNvbih7bGF0ZXN0X3RyYW5zYWN0aW9uczogcmVjZW50bHlfYWRkZWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSBJbnZlc3RtZW50IFRyYW5zYWN0aW9ucyBmb3IgYW4gSXRlbVxuLy8gaHR0cHM6Ly9wbGFpZC5jb20vZG9jcy8jaW52ZXN0bWVudHNcbmFwcC5nZXQoJy9hcGkvaW52ZXN0bWVudHNfdHJhbnNhY3Rpb25zJywgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KCkuc3VidHJhY3QoMzAsICdkYXlzJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICBjb25zdCBlbmREYXRlID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICBjb25zdCBjb25maWdzID0ge1xuICAgICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICAgICAgc3RhcnRfZGF0ZTogc3RhcnREYXRlLFxuICAgICAgICBlbmRfZGF0ZTogZW5kRGF0ZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBpbnZlc3RtZW50VHJhbnNhY3Rpb25zUmVzcG9uc2UgPVxuICAgICAgICBhd2FpdCBjbGllbnQuaW52ZXN0bWVudHNUcmFuc2FjdGlvbnNHZXQoY29uZmlncyk7XG4gICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGludmVzdG1lbnRUcmFuc2FjdGlvbnNSZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5qc29uKHtcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIGludmVzdG1lbnRzX3RyYW5zYWN0aW9uczogaW52ZXN0bWVudFRyYW5zYWN0aW9uc1Jlc3BvbnNlLmRhdGEsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSBJZGVudGl0eSBmb3IgYW4gSXRlbVxuLy8gaHR0cHM6Ly9wbGFpZC5jb20vZG9jcy8jaWRlbnRpdHlcbmFwcC5nZXQoJy9hcGkvaWRlbnRpdHknLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBpZGVudGl0eVJlc3BvbnNlID0gYXdhaXQgY2xpZW50LmlkZW50aXR5R2V0KHtcbiAgICAgICAgYWNjZXNzX3Rva2VuOiBBQ0NFU1NfVE9LRU4sXG4gICAgICB9KTtcbiAgICAgIHByZXR0eVByaW50UmVzcG9uc2UoaWRlbnRpdHlSZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5qc29uKHsgaWRlbnRpdHk6IGlkZW50aXR5UmVzcG9uc2UuZGF0YS5hY2NvdW50cyB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSByZWFsLXRpbWUgQmFsYW5jZXMgZm9yIGVhY2ggb2YgYW4gSXRlbSdzIGFjY291bnRzXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNiYWxhbmNlXG5hcHAuZ2V0KCcvYXBpL2JhbGFuY2UnLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBiYWxhbmNlUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuYWNjb3VudHNCYWxhbmNlR2V0KHtcbiAgICAgICAgYWNjZXNzX3Rva2VuOiBBQ0NFU1NfVE9LRU4sXG4gICAgICB9KTtcbiAgICAgIHByZXR0eVByaW50UmVzcG9uc2UoYmFsYW5jZVJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmpzb24oYmFsYW5jZVJlc3BvbnNlLmRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKG5leHQpO1xufSk7XG5cbi8vIFJldHJpZXZlIEhvbGRpbmdzIGZvciBhbiBJdGVtXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNpbnZlc3RtZW50c1xuYXBwLmdldCgnL2FwaS9ob2xkaW5ncycsIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGhvbGRpbmdzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuaW52ZXN0bWVudHNIb2xkaW5nc0dldCh7XG4gICAgICAgIGFjY2Vzc190b2tlbjogQUNDRVNTX1RPS0VOLFxuICAgICAgfSk7XG4gICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGhvbGRpbmdzUmVzcG9uc2UpO1xuICAgICAgcmVzcG9uc2UuanNvbih7IGVycm9yOiBudWxsLCBob2xkaW5nczogaG9sZGluZ3NSZXNwb25zZS5kYXRhIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKG5leHQpO1xufSk7XG5cbi8vIFJldHJpZXZlIExpYWJpbGl0aWVzIGZvciBhbiBJdGVtXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNsaWFiaWxpdGllc1xuYXBwLmdldCgnL2FwaS9saWFiaWxpdGllcycsIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGxpYWJpbGl0aWVzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQubGlhYmlsaXRpZXNHZXQoe1xuICAgICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICAgIH0pO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShsaWFiaWxpdGllc1Jlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmpzb24oeyBlcnJvcjogbnVsbCwgbGlhYmlsaXRpZXM6IGxpYWJpbGl0aWVzUmVzcG9uc2UuZGF0YSB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBSZXRyaWV2ZSBpbmZvcm1hdGlvbiBhYm91dCBhbiBJdGVtXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNyZXRyaWV2ZS1pdGVtXG5hcHAuZ2V0KCcvYXBpL2l0ZW0nLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBQdWxsIHRoZSBJdGVtIC0gdGhpcyBpbmNsdWRlcyBpbmZvcm1hdGlvbiBhYm91dCBhdmFpbGFibGUgcHJvZHVjdHMsXG4gICAgICAvLyBiaWxsZWQgcHJvZHVjdHMsIHdlYmhvb2sgaW5mb3JtYXRpb24sIGFuZCBtb3JlLlxuICAgICAgY29uc3QgaXRlbVJlc3BvbnNlID0gYXdhaXQgY2xpZW50Lml0ZW1HZXQoe1xuICAgICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICAgIH0pO1xuICAgICAgLy8gQWxzbyBwdWxsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpbnN0aXR1dGlvblxuICAgICAgY29uc3QgY29uZmlncyA9IHtcbiAgICAgICAgaW5zdGl0dXRpb25faWQ6IGl0ZW1SZXNwb25zZS5kYXRhLml0ZW0uaW5zdGl0dXRpb25faWQsXG4gICAgICAgIGNvdW50cnlfY29kZXM6IFBMQUlEX0NPVU5UUllfQ09ERVMsXG4gICAgICB9O1xuICAgICAgY29uc3QgaW5zdFJlc3BvbnNlID0gYXdhaXQgY2xpZW50Lmluc3RpdHV0aW9uc0dldEJ5SWQoY29uZmlncyk7XG4gICAgICBwcmV0dHlQcmludFJlc3BvbnNlKGl0ZW1SZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5qc29uKHtcbiAgICAgICAgaXRlbTogaXRlbVJlc3BvbnNlLmRhdGEuaXRlbSxcbiAgICAgICAgaW5zdGl0dXRpb246IGluc3RSZXNwb25zZS5kYXRhLmluc3RpdHV0aW9uLFxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2gobmV4dCk7XG59KTtcblxuLy8gUmV0cmlldmUgYW4gSXRlbSdzIGFjY291bnRzXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNhY2NvdW50c1xuYXBwLmdldCgnL2FwaS9hY2NvdW50cycsIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuYWNjb3VudHNHZXQoe1xuICAgICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTixcbiAgICAgIH0pO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShhY2NvdW50c1Jlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmpzb24oYWNjb3VudHNSZXNwb25zZS5kYXRhKTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vLyBDcmVhdGUgYW5kIHRoZW4gcmV0cmlldmUgYW4gQXNzZXQgUmVwb3J0IGZvciBvbmUgb3IgbW9yZSBJdGVtcy4gTm90ZSB0aGF0IGFuXG4vLyBBc3NldCBSZXBvcnQgY2FuIGNvbnRhaW4gdXAgdG8gMTAwIGl0ZW1zLCBidXQgZm9yIHNpbXBsaWNpdHkgd2UncmUgb25seVxuLy8gaW5jbHVkaW5nIG9uZSBJdGVtIGhlcmUuXG4vLyBodHRwczovL3BsYWlkLmNvbS9kb2NzLyNhc3NldHNcbmFwcC5nZXQoJy9hcGkvYXNzZXRzJywgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gWW91IGNhbiBzcGVjaWZ5IHVwIHRvIHR3byB5ZWFycyBvZiB0cmFuc2FjdGlvbiBoaXN0b3J5IGZvciBhbiBBc3NldFxuICAgICAgLy8gUmVwb3J0LlxuICAgICAgY29uc3QgZGF5c1JlcXVlc3RlZCA9IDEwO1xuXG4gICAgICAvLyBUaGUgYG9wdGlvbnNgIG9iamVjdCBhbGxvd3MgeW91IHRvIHNwZWNpZnkgYSB3ZWJob29rIGZvciBBc3NldCBSZXBvcnRcbiAgICAgIC8vIGdlbmVyYXRpb24sIGFzIHdlbGwgYXMgaW5mb3JtYXRpb24gdGhhdCB5b3Ugd2FudCBpbmNsdWRlZCBpbiB0aGUgQXNzZXRcbiAgICAgIC8vIFJlcG9ydC4gQWxsIGZpZWxkcyBhcmUgb3B0aW9uYWwuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjbGllbnRfcmVwb3J0X2lkOiAnQ3VzdG9tIFJlcG9ydCBJRCAjMTIzJyxcbiAgICAgICAgLy8gd2ViaG9vazogJ2h0dHBzOi8veW91ci1kb21haW4udGxkL3BsYWlkLXdlYmhvb2snLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgY2xpZW50X3VzZXJfaWQ6ICdDdXN0b20gVXNlciBJRCAjNDU2JyxcbiAgICAgICAgICBmaXJzdF9uYW1lOiAnQWxpY2UnLFxuICAgICAgICAgIG1pZGRsZV9uYW1lOiAnQm9iY2F0JyxcbiAgICAgICAgICBsYXN0X25hbWU6ICdDcmFuYmVycnknLFxuICAgICAgICAgIHNzbjogJzEyMy00NS02Nzg5JyxcbiAgICAgICAgICBwaG9uZV9udW1iZXI6ICc1NTUtMTIzLTQ1NjcnLFxuICAgICAgICAgIGVtYWlsOiAnYWxpY2VAZXhhbXBsZS5jb20nLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbmZpZ3MgPSB7XG4gICAgICAgIGFjY2Vzc190b2tlbnM6IFtBQ0NFU1NfVE9LRU5dLFxuICAgICAgICBkYXlzX3JlcXVlc3RlZDogZGF5c1JlcXVlc3RlZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgIH07XG4gICAgICBjb25zdCBhc3NldFJlcG9ydENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2xpZW50LmFzc2V0UmVwb3J0Q3JlYXRlKGNvbmZpZ3MpO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShhc3NldFJlcG9ydENyZWF0ZVJlc3BvbnNlKTtcbiAgICAgIGNvbnN0IGFzc2V0UmVwb3J0VG9rZW4gPVxuICAgICAgICBhc3NldFJlcG9ydENyZWF0ZVJlc3BvbnNlLmRhdGEuYXNzZXRfcmVwb3J0X3Rva2VuO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBnZXRBc3NldFJlcG9ydFdpdGhSZXRyaWVzKFxuICAgICAgICBjbGllbnQsXG4gICAgICAgIGFzc2V0UmVwb3J0VG9rZW4sXG4gICAgICApO1xuICAgICAgY29uc3QgcGRmUmVxdWVzdCA9IHtcbiAgICAgICAgYXNzZXRfcmVwb3J0X3Rva2VuOiBhc3NldFJlcG9ydFRva2VuLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcGRmUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuYXNzZXRSZXBvcnRQZGZHZXQocGRmUmVxdWVzdCwge1xuICAgICAgICByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXG4gICAgICB9KTtcbiAgICAgIHByZXR0eVByaW50UmVzcG9uc2UoZ2V0UmVzcG9uc2UpO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShwZGZSZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5qc29uKHtcbiAgICAgICAganNvbjogZ2V0UmVzcG9uc2UuZGF0YS5yZXBvcnQsXG4gICAgICAgIHBkZjogcGRmUmVzcG9uc2UuZGF0YS50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG5hcHAuZ2V0KCcvYXBpL3RyYW5zZmVyJywgZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XG4gIFByb21pc2UucmVzb2x2ZSgpXG4gICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdHJhbnNmZXJHZXRSZXNwb25zZSA9IGF3YWl0IGNsaWVudC50cmFuc2ZlckdldCh7XG4gICAgICAgIHRyYW5zZmVyX2lkOiBUUkFOU0ZFUl9JRCxcbiAgICAgIH0pO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZSh0cmFuc2ZlckdldFJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmpzb24oe1xuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHJhbnNmZXI6IHRyYW5zZmVyR2V0UmVzcG9uc2UuZGF0YS50cmFuc2ZlcixcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKG5leHQpO1xufSk7XG5cbi8vIFRoaXMgZnVuY3Rpb25hbGl0eSBpcyBvbmx5IHJlbGV2YW50IGZvciB0aGUgVUsvRVUgUGF5bWVudCBJbml0aWF0aW9uIHByb2R1Y3QuXG4vLyBSZXRyaWV2ZSBQYXltZW50IGZvciBhIHNwZWNpZmllZCBQYXltZW50IElEXG5hcHAuZ2V0KCcvYXBpL3BheW1lbnQnLCBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwYXltZW50R2V0UmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucGF5bWVudEluaXRpYXRpb25QYXltZW50R2V0KHtcbiAgICAgICAgcGF5bWVudF9pZDogUEFZTUVOVF9JRCxcbiAgICAgIH0pO1xuICAgICAgcHJldHR5UHJpbnRSZXNwb25zZShwYXltZW50R2V0UmVzcG9uc2UpO1xuICAgICAgcmVzcG9uc2UuanNvbih7IGVycm9yOiBudWxsLCBwYXltZW50OiBwYXltZW50R2V0UmVzcG9uc2UuZGF0YSB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChuZXh0KTtcbn0pO1xuXG4vL1RPLURPOiBUaGlzIGVuZHBvaW50IHdpbGwgYmUgZGVwcmVjYXRlZCBpbiB0aGUgbmVhciBmdXR1cmVcbmFwcC5nZXQoJy9hcGkvaW5jb21lL3ZlcmlmaWNhdGlvbi9wYXlzdHVicycsIGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICBQcm9taXNlLnJlc29sdmUoKVxuICAudGhlbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcGF5c3R1YnNHZXRSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5pbmNvbWVWZXJpZmljYXRpb25QYXlzdHVic0dldCh7XG4gICAgICBhY2Nlc3NfdG9rZW46IEFDQ0VTU19UT0tFTlxuICAgIH0pO1xuICAgIHByZXR0eVByaW50UmVzcG9uc2UocGF5c3R1YnNHZXRSZXNwb25zZSk7XG4gICAgcmVzcG9uc2UuanNvbih7IGVycm9yOiBudWxsLCBwYXlzdHViczogcGF5c3R1YnNHZXRSZXNwb25zZS5kYXRhfSlcbiAgfSlcbiAgLmNhdGNoKG5leHQpO1xufSlcblxuYXBwLnVzZSgnL2FwaScsIGZ1bmN0aW9uIChlcnJvciwgcmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgcHJldHR5UHJpbnRSZXNwb25zZShlcnJvci5yZXNwb25zZSk7XG4gIHJlc3BvbnNlLmpzb24oZm9ybWF0RXJyb3IoZXJyb3IucmVzcG9uc2UpKTtcbn0pO1xuXG5jb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKEFQUF9QT1JULCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCdwbGFpZC1xdWlja3N0YXJ0IHNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAnICsgQVBQX1BPUlQpO1xufSk7XG5cbmNvbnN0IHByZXR0eVByaW50UmVzcG9uc2UgPSAocmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KHJlc3BvbnNlLmRhdGEsIHsgY29sb3JzOiB0cnVlLCBkZXB0aDogNCB9KSk7XG59O1xuXG4vLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHBvbGwgZm9yIHRoZSBjb21wbGV0aW9uIG9mIGFuIEFzc2V0IFJlcG9ydCBhbmRcbi8vIHRoZW4gc2VuZCBpdCBpbiB0aGUgcmVzcG9uc2UgdG8gdGhlIGNsaWVudC4gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBwcm92aWRlIGFcbi8vIHdlYmhvb2sgaW4gdGhlIGBvcHRpb25zYCBvYmplY3QgaW4geW91ciBgL2Fzc2V0X3JlcG9ydC9jcmVhdGVgIHJlcXVlc3QgdG8gYmVcbi8vIG5vdGlmaWVkIHdoZW4gdGhlIEFzc2V0IFJlcG9ydCBpcyBmaW5pc2hlZCBiZWluZyBnZW5lcmF0ZWQuXG5cbmNvbnN0IGdldEFzc2V0UmVwb3J0V2l0aFJldHJpZXMgPSAoXG4gIHBsYWlkQ2xpZW50LFxuICBhc3NldF9yZXBvcnRfdG9rZW4sXG4gIG1zID0gMTAwMCxcbiAgcmV0cmllc0xlZnQgPSAyMCxcbikgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICBhc3NldF9yZXBvcnRfdG9rZW4sXG4gICAgfTtcblxuICAgIHBsYWlkQ2xpZW50XG4gICAgICAuYXNzZXRSZXBvcnRHZXQocmVxdWVzdClcbiAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAocmV0cmllc0xlZnQgPT09IDEpIHtcbiAgICAgICAgICAgIHJlamVjdCgnUmFuIG91dCBvZiByZXRyaWVzIHdoaWxlIHBvbGxpbmcgZm9yIGFzc2V0IHJlcG9ydCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBnZXRBc3NldFJlcG9ydFdpdGhSZXRyaWVzKFxuICAgICAgICAgICAgcGxhaWRDbGllbnQsXG4gICAgICAgICAgICBhc3NldF9yZXBvcnRfdG9rZW4sXG4gICAgICAgICAgICBtcyxcbiAgICAgICAgICAgIHJldHJpZXNMZWZ0IC0gMSxcbiAgICAgICAgICApLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgIH0sIG1zKTtcbiAgICAgIH0pO1xuICB9KTtcblxuY29uc3QgZm9ybWF0RXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvcjogeyAuLi5lcnJvci5kYXRhLCBzdGF0dXNfY29kZTogZXJyb3Iuc3RhdHVzIH0sXG4gIH07XG59O1xuXG4vLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIGF1dGhvcml6ZSBhbmQgY3JlYXRlIGEgVHJhbnNmZXIgYWZ0ZXIgc3VjY2Vzc2Z1bFxuLy8gZXhjaGFuZ2Ugb2YgYSBwdWJsaWNfdG9rZW4gZm9yIGFuIGFjY2Vzc190b2tlbi4gVGhlIFRSQU5TRkVSX0lEIGlzIHRoZW4gdXNlZFxuLy8gdG8gb2J0YWluIHRoZSBkYXRhIGFib3V0IHRoYXQgcGFydGljdWxhciBUcmFuc2Zlci5cblxuY29uc3QgYXV0aG9yaXplQW5kQ3JlYXRlVHJhbnNmZXIgPSBhc3luYyAoYWNjZXNzVG9rZW4pID0+IHtcbiAgLy8gV2UgY2FsbCAvYWNjb3VudHMvZ2V0IHRvIG9idGFpbiBmaXJzdCBhY2NvdW50X2lkIC0gaW4gcHJvZHVjdGlvbixcbiAgLy8gYWNjb3VudF9pZCdzIHNob3VsZCBiZSBwZXJzaXN0ZWQgaW4gYSBkYXRhIHN0b3JlIGFuZCByZXRyaWV2ZWRcbiAgLy8gZnJvbSB0aGVyZS5cbiAgY29uc3QgYWNjb3VudHNSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5hY2NvdW50c0dldCh7XG4gICAgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbixcbiAgfSk7XG4gIGNvbnN0IGFjY291bnRJZCA9IGFjY291bnRzUmVzcG9uc2UuZGF0YS5hY2NvdW50c1swXS5hY2NvdW50X2lkO1xuXG4gIGNvbnN0IHRyYW5zZmVyQXV0aG9yaXphdGlvblJlc3BvbnNlID1cbiAgICBhd2FpdCBjbGllbnQudHJhbnNmZXJBdXRob3JpemF0aW9uQ3JlYXRlKHtcbiAgICAgIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICBhY2NvdW50X2lkOiBhY2NvdW50SWQsXG4gICAgICB0eXBlOiAnY3JlZGl0JyxcbiAgICAgIG5ldHdvcms6ICdhY2gnLFxuICAgICAgYW1vdW50OiAnMS4zNCcsXG4gICAgICBhY2hfY2xhc3M6ICdwcGQnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBsZWdhbF9uYW1lOiAnRmlyc3ROYW1lIExhc3ROYW1lJyxcbiAgICAgICAgZW1haWxfYWRkcmVzczogJ2Zvb2JhckBlbWFpbC5jb20nLFxuICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgc3RyZWV0OiAnMTIzIE1haW4gU3QuJyxcbiAgICAgICAgICBjaXR5OiAnU2FuIEZyYW5jaXNjbycsXG4gICAgICAgICAgcmVnaW9uOiAnQ0EnLFxuICAgICAgICAgIHBvc3RhbF9jb2RlOiAnOTQwNTMnLFxuICAgICAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICBwcmV0dHlQcmludFJlc3BvbnNlKHRyYW5zZmVyQXV0aG9yaXphdGlvblJlc3BvbnNlKTtcbiAgY29uc3QgYXV0aG9yaXphdGlvbklkID0gdHJhbnNmZXJBdXRob3JpemF0aW9uUmVzcG9uc2UuZGF0YS5hdXRob3JpemF0aW9uLmlkO1xuXG4gIGNvbnN0IHRyYW5zZmVyUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQudHJhbnNmZXJDcmVhdGUoe1xuICAgIGlkZW1wb3RlbmN5X2tleTogJzEyMjNhYmM0NTZ4eXo3ODkwMDAxJyxcbiAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgIGFjY291bnRfaWQ6IGFjY291bnRJZCxcbiAgICBhdXRob3JpemF0aW9uX2lkOiBhdXRob3JpemF0aW9uSWQsXG4gICAgdHlwZTogJ2NyZWRpdCcsXG4gICAgbmV0d29yazogJ2FjaCcsXG4gICAgYW1vdW50OiAnMTIuMzQnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF5bWVudCcsXG4gICAgYWNoX2NsYXNzOiAncHBkJyxcbiAgICB1c2VyOiB7XG4gICAgICBsZWdhbF9uYW1lOiAnRmlyc3ROYW1lIExhc3ROYW1lJyxcbiAgICAgIGVtYWlsX2FkZHJlc3M6ICdmb29iYXJAZW1haWwuY29tJyxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgc3RyZWV0OiAnMTIzIE1haW4gU3QuJyxcbiAgICAgICAgY2l0eTogJ1NhbiBGcmFuY2lzY28nLFxuICAgICAgICByZWdpb246ICdDQScsXG4gICAgICAgIHBvc3RhbF9jb2RlOiAnOTQwNTMnLFxuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbiAgcHJldHR5UHJpbnRSZXNwb25zZSh0cmFuc2ZlclJlc3BvbnNlKTtcbiAgcmV0dXJuIHRyYW5zZmVyUmVzcG9uc2UuZGF0YS50cmFuc2Zlci5pZDtcbn07XG4iXX0=