export var __esModule: boolean;
export var authCategories: {
    title: string;
    field: string;
}[];
export var transactionsCategories: {
    title: string;
    field: string;
}[];
export var identityCategories: {
    title: string;
    field: string;
}[];
export var balanceCategories: {
    title: string;
    field: string;
}[];
export var investmentsCategories: {
    title: string;
    field: string;
}[];
export var investmentsTransactionsCategories: {
    title: string;
    field: string;
}[];
export var liabilitiesCategories: {
    title: string;
    field: string;
}[];
export var itemCategories: {
    title: string;
    field: string;
}[];
export var accountsCategories: {
    title: string;
    field: string;
}[];
export var paymentCategories: {
    title: string;
    field: string;
}[];
export var assetsCategories: {
    title: string;
    field: string;
}[];
export var transferCategories: {
    title: string;
    field: string;
}[];
export var incomePaystubsCategories: {
    title: string;
    field: string;
}[];
export function transformAuthData(data: any): any;
export function transformTransactionsData(data: any): any;
export function transformIdentityData(data: any): any[];
export function transformBalanceData(data: any): any;
export function transformInvestmentsData(data: any): any;
export function transformInvestmentTransactionsData(data: any): any;
export function transformLiabilitiesData(data: any): any;
export function transformTransferData(data: any): {
    transferId: any;
    amount: any;
    type: any;
    achClass: any;
    network: any;
    status: any;
}[];
export function transformItemData(data: any): {
    name: any;
    billed: any;
    available: any;
}[];
export function transformAccountsData(data: any): any;
export function transformPaymentData(data: any): {
    paymentId: any;
    amount: string;
    status: any;
    statusUpdate: any;
    recipientId: any;
}[];
export function transformAssetsData(data: any): any;
export function transformIncomePaystubsData(data: any): {
    description: string;
    currentAmount: any;
    currency: any;
}[];
