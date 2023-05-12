import { Transaction, IdentityGetResponse, InvestmentsHoldingsGetResponse, InvestmentsTransactionsGetResponse, ItemGetResponse, InstitutionsGetByIdResponse, LiabilitiesGetResponse, PaymentInitiationPaymentGetResponse, AssetReport, IncomeVerificationPaystubsGetResponse } from "plaid/dist/api";
export interface Categories {
    title: string;
    field: string;
}
interface AuthDataItem {
    routing: string;
    account: string;
    balance: string;
    name: string;
}
interface TransactionsDataItem {
    amount: string;
    date: string;
    name: string;
}
interface IdentityDataItem {
    addresses: string;
    phoneNumbers: string;
    emails: string;
    names: string;
}
interface BalanceDataItem {
    balance: string;
    subtype: string | null;
    mask: string;
    name: string;
}
interface InvestmentsDataItem {
    mask: string;
    quantity: string;
    price: string;
    value: string;
    name: string;
}
interface InvestmentsTransactionItem {
    amount: number;
    date: string;
    name: string;
}
interface LiabilitiessDataItem {
    amount: string;
    date: string;
    name: string;
    type: string;
}
interface PaymentDataItem {
    paymentId: string;
    amount: string;
    status: string;
    statusUpdate: string;
    recipientId: string;
}
interface ItemDataItem {
    billed: string;
    available: string;
    name: string;
}
interface AssetsDataItem {
    account: string;
    balance: string;
    transactions: number;
    daysAvailable: number;
}
interface TransferDataItem {
    transferId: string;
    amount: string;
    type: string;
    achClass: string;
    network: string;
}
interface IncomePaystubsDataItem {
    description: string;
    currentAmount: number | null;
    currency: number | null;
}
export interface ErrorDataItem {
    error_type: string;
    error_code: string;
    error_message: string;
    display_message: string | null;
    status_code: number | null;
}
export declare type DataItem = AuthDataItem | TransactionsDataItem | IdentityDataItem | BalanceDataItem | InvestmentsDataItem | InvestmentsTransactionItem | LiabilitiessDataItem | ItemDataItem | PaymentDataItem | AssetsDataItem | TransferDataItem | IncomePaystubsDataItem;
export declare type Data = Array<DataItem>;
export declare const authCategories: Array<Categories>;
export declare const transactionsCategories: Array<Categories>;
export declare const identityCategories: Array<Categories>;
export declare const balanceCategories: Array<Categories>;
export declare const investmentsCategories: Array<Categories>;
export declare const investmentsTransactionsCategories: Array<Categories>;
export declare const liabilitiesCategories: Array<Categories>;
export declare const itemCategories: Array<Categories>;
export declare const accountsCategories: Array<Categories>;
export declare const paymentCategories: Array<Categories>;
export declare const assetsCategories: Array<Categories>;
export declare const transferCategories: Array<Categories>;
export declare const incomePaystubsCategories: Array<Categories>;
export declare const transformAuthData: (data: any) => any;
export declare const transformTransactionsData: (data: {
    latest_transactions: Transaction[];
}) => Array<DataItem>;
interface IdentityData {
    identity: IdentityGetResponse["accounts"];
}
export declare const transformIdentityData: (data: IdentityData) => DataItem[];
export declare const transformBalanceData: (data: any) => any;
interface InvestmentData {
    error: null;
    holdings: InvestmentsHoldingsGetResponse;
}
export declare const transformInvestmentsData: (data: InvestmentData) => any;
interface InvestmentsTransactionData {
    error: null;
    investments_transactions: InvestmentsTransactionsGetResponse;
}
export declare const transformInvestmentTransactionsData: (data: InvestmentsTransactionData) => any;
interface LiabilitiesDataResponse {
    error: null;
    liabilities: LiabilitiesGetResponse;
}
export declare const transformLiabilitiesData: (data: LiabilitiesDataResponse) => any;
export declare const transformTransferData: (data: any) => Array<DataItem>;
interface ItemData {
    item: ItemGetResponse["item"];
    institution: InstitutionsGetByIdResponse["institution"];
}
export declare const transformItemData: (data: ItemData) => Array<DataItem>;
export declare const transformAccountsData: (data: any) => any;
interface PaymentData {
    payment: PaymentInitiationPaymentGetResponse;
}
export declare const transformPaymentData: (data: PaymentData) => {
    paymentId: any;
    amount: string;
    status: any;
    statusUpdate: any;
    recipientId: any;
}[];
interface AssetResponseData {
    json: AssetReport;
}
export declare const transformAssetsData: (data: AssetResponseData) => any;
interface IncomePaystub {
    paystubs: IncomeVerificationPaystubsGetResponse;
}
export declare const transformIncomePaystubsData: (data: IncomePaystub) => IncomePaystubsDataItem[];
export {};
