"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformIncomePaystubsData = exports.transformAssetsData = exports.transformPaymentData = exports.transformAccountsData = exports.transformItemData = exports.transformTransferData = exports.transformLiabilitiesData = exports.transformInvestmentTransactionsData = exports.transformInvestmentsData = exports.transformBalanceData = exports.transformIdentityData = exports.transformTransactionsData = exports.transformAuthData = exports.incomePaystubsCategories = exports.transferCategories = exports.assetsCategories = exports.paymentCategories = exports.accountsCategories = exports.itemCategories = exports.liabilitiesCategories = exports.investmentsTransactionsCategories = exports.investmentsCategories = exports.balanceCategories = exports.identityCategories = exports.transactionsCategories = exports.authCategories = void 0;
const formatCurrency = (number, code) => {
    if (number != null && number !== undefined) {
        return ` ${parseFloat(number.toFixed(2)).toLocaleString("en")} ${code}`;
    }
    return "no data";
};
exports.authCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Balance",
        field: "balance",
    },
    {
        title: "Account #",
        field: "account",
    },
    {
        title: "Routing #",
        field: "routing",
    },
];
exports.transactionsCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Amount",
        field: "amount",
    },
    {
        title: "Date",
        field: "date",
    },
];
exports.identityCategories = [
    {
        title: "Names",
        field: "names",
    },
    {
        title: "Emails",
        field: "emails",
    },
    {
        title: "Phone numbers",
        field: "phoneNumbers",
    },
    {
        title: "Addresses",
        field: "addresses",
    },
];
exports.balanceCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Balance",
        field: "balance",
    },
    {
        title: "Subtype",
        field: "subtype",
    },
    {
        title: "Mask",
        field: "mask",
    },
];
exports.investmentsCategories = [
    {
        title: "Account Mask",
        field: "mask",
    },
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Quantity",
        field: "quantity",
    },
    {
        title: "Close Price",
        field: "price",
    },
    {
        title: "Value",
        field: "value",
    },
];
exports.investmentsTransactionsCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Amount",
        field: "amount",
    },
    {
        title: "Date",
        field: "date",
    },
];
exports.liabilitiesCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Type",
        field: "type",
    },
    {
        title: "Last Payment Date",
        field: "date",
    },
    {
        title: "Last Payment Amount",
        field: "amount",
    },
];
exports.itemCategories = [
    {
        title: "Institution Name",
        field: "name",
    },
    {
        title: "Billed Products",
        field: "billed",
    },
    {
        title: "Available Products",
        field: "available",
    },
];
exports.accountsCategories = [
    {
        title: "Name",
        field: "name",
    },
    {
        title: "Balance",
        field: "balance",
    },
    {
        title: "Subtype",
        field: "subtype",
    },
    {
        title: "Mask",
        field: "mask",
    },
];
exports.paymentCategories = [
    {
        title: "Payment ID",
        field: "paymentId",
    },
    {
        title: "Amount",
        field: "amount",
    },
    {
        title: "Status",
        field: "status",
    },
    {
        title: "Status Update",
        field: "statusUpdate",
    },
    {
        title: "Recipient ID",
        field: "recipientId",
    },
];
exports.assetsCategories = [
    {
        title: "Account",
        field: "account",
    },
    {
        title: "Transactions",
        field: "transactions",
    },
    {
        title: "Balance",
        field: "balance",
    },
    {
        title: "Days Available",
        field: "daysAvailable",
    },
];
exports.transferCategories = [
    {
        title: "Transfer ID",
        field: "transferId",
    },
    {
        title: "Amount",
        field: "amount",
    },
    {
        title: "Type",
        field: "type",
    },
    {
        title: "ACH Class",
        field: "achClass",
    },
    {
        title: "Network",
        field: "network",
    },
    {
        title: "Status",
        field: "status",
    },
];
exports.incomePaystubsCategories = [
    {
        title: "Description",
        field: "description",
    },
    {
        title: "Current Amount",
        field: "currentAmount",
    },
    {
        title: "Currency",
        field: "currency",
    }
];
const transformAuthData = (data) => {
    return data.numbers.ach.map((achNumbers) => {
        const account = data.accounts.filter((a) => {
            return a.account_id === achNumbers.account_id;
        })[0];
        const balance = account.balances.available || account.balances.current;
        const obj = {
            name: account.name,
            balance: formatCurrency(balance, account.balances.iso_currency_code),
            account: achNumbers.account,
            routing: achNumbers.routing,
        };
        return obj;
    });
};
exports.transformAuthData = transformAuthData;
const transformTransactionsData = (data) => {
    return data.latest_transactions.map((t) => {
        const item = {
            name: t.name,
            amount: formatCurrency(t.amount, t.iso_currency_code),
            date: t.date,
        };
        return item;
    });
};
exports.transformTransactionsData = transformTransactionsData;
const transformIdentityData = (data) => {
    const final = [];
    const identityData = data.identity[0];
    identityData.owners.forEach((owner) => {
        const names = owner.names.map((name) => {
            return name;
        });
        const emails = owner.emails.map((email) => {
            return email.data;
        });
        const phones = owner.phone_numbers.map((phone) => {
            return phone.data;
        });
        const addresses = owner.addresses.map((address) => {
            return `${address.data.street} ${address.data.city}, ${address.data.region} ${address.data.postal_code}`;
        });
        const num = Math.max(emails.length, names.length, phones.length, addresses.length);
        for (let i = 0; i < num; i++) {
            const obj = {
                names: names[i] || "",
                emails: emails[i] || "",
                phoneNumbers: phones[i] || "",
                addresses: addresses[i] || "",
            };
            final.push(obj);
        }
    });
    return final;
};
exports.transformIdentityData = transformIdentityData;
const transformBalanceData = (data) => {
    const balanceData = data.accounts;
    return balanceData.map((account) => {
        const balance = account.balances.available || account.balances.current;
        const obj = {
            name: account.name,
            balance: formatCurrency(balance, account.balances.iso_currency_code),
            subtype: account.subtype,
            mask: account.mask,
        };
        return obj;
    });
};
exports.transformBalanceData = transformBalanceData;
const transformInvestmentsData = (data) => {
    const holdingsData = data.holdings.holdings.sort(function (a, b) {
        if (a.account_id > b.account_id)
            return 1;
        return -1;
    });
    return holdingsData.map((holding) => {
        const account = data.holdings.accounts.filter((acc) => acc.account_id === holding.account_id)[0];
        const security = data.holdings.securities.filter((sec) => sec.security_id === holding.security_id)[0];
        const value = holding.quantity * security.close_price;
        const obj = {
            mask: account.mask,
            name: security.name,
            quantity: formatCurrency(holding.quantity, ""),
            price: formatCurrency(security.close_price, account.balances.iso_currency_code),
            value: formatCurrency(value, account.balances.iso_currency_code),
        };
        return obj;
    });
};
exports.transformInvestmentsData = transformInvestmentsData;
const transformInvestmentTransactionsData = (data) => {
    const investmentTransactionsData = data.investments_transactions.investment_transactions.sort(function (a, b) {
        if (a.account_id > b.account_id)
            return 1;
        return -1;
    });
    return investmentTransactionsData.map((investmentTransaction) => {
        const security = data.investments_transactions.securities.filter((sec) => sec.security_id === investmentTransaction.security_id)[0];
        const obj = {
            name: security.name,
            amount: investmentTransaction.amount,
            date: investmentTransaction.date,
        };
        return obj;
    });
};
exports.transformInvestmentTransactionsData = transformInvestmentTransactionsData;
const transformLiabilitiesData = (data) => {
    var _a, _b;
    const liabilitiesData = data.liabilities.liabilities;
    //console.log(liabilitiesData)
    //console.log("random")
    const credit = liabilitiesData.credit.map((credit) => {
        var _a;
        const account = data.liabilities.accounts.filter((acc) => acc.account_id === credit.account_id)[0];
        const obj = {
            name: account.name,
            type: "credit card",
            date: (_a = credit.last_payment_date) !== null && _a !== void 0 ? _a : "",
            amount: formatCurrency(credit.last_payment_amount, account.balances.iso_currency_code),
        };
        return obj;
    });
    const mortgages = (_a = liabilitiesData.mortgage) === null || _a === void 0 ? void 0 : _a.map((mortgage) => {
        const account = data.liabilities.accounts.filter((acc) => acc.account_id === mortgage.account_id)[0];
        const obj = {
            name: account.name,
            type: "mortgage",
            date: mortgage.last_payment_date,
            amount: formatCurrency(mortgage.last_payment_amount, account.balances.iso_currency_code),
        };
        return obj;
    });
    const student = (_b = liabilitiesData.student) === null || _b === void 0 ? void 0 : _b.map((student) => {
        const account = data.liabilities.accounts.filter((acc) => acc.account_id === student.account_id)[0];
        const obj = {
            name: account.name,
            type: "student loan",
            date: student.last_payment_date,
            amount: formatCurrency(student.last_payment_amount, account.balances.iso_currency_code),
        };
        return obj;
    });
    return credit.concat(mortgages).concat(student);
};
exports.transformLiabilitiesData = transformLiabilitiesData;
const transformTransferData = (data) => {
    const transferData = data.transfer;
    return [
        {
            transferId: transferData.id,
            amount: transferData.amount,
            type: transferData.type,
            achClass: transferData.ach_class,
            network: transferData.network,
            status: transferData.status,
        },
    ];
};
exports.transformTransferData = transformTransferData;
const transformItemData = (data) => {
    return [
        {
            name: data.institution.name,
            billed: data.item.billed_products.join(", "),
            available: data.item.available_products.join(", "),
        },
    ];
};
exports.transformItemData = transformItemData;
const transformAccountsData = (data) => {
    const accountsData = data.accounts;
    return accountsData.map((account) => {
        const balance = account.balances.available || account.balances.current;
        const obj = {
            name: account.name,
            balance: formatCurrency(balance, account.balances.iso_currency_code),
            subtype: account.subtype,
            mask: account.mask,
        };
        return obj;
    });
};
exports.transformAccountsData = transformAccountsData;
const transformPaymentData = (data) => {
    const statusUpdate = typeof data.payment.last_status_update === "string"
        ? data.payment.last_status_update.replace("T", " ").replace("Z", "")
        : new Date(data.payment.last_status_update * 1000) // Java data comes as timestamp
            .toISOString()
            .replace("T", " ")
            .replace("Z", "");
    return [
        {
            paymentId: data.payment.payment_id,
            amount: `${data.payment.amount.currency} ${data.payment.amount.value}`,
            status: data.payment.status,
            statusUpdate: statusUpdate,
            recipientId: data.payment.recipient_id,
        },
    ];
};
exports.transformPaymentData = transformPaymentData;
const transformAssetsData = (data) => {
    const assetItems = data.json.items;
    return assetItems.flatMap((item) => {
        return item.accounts.map((account) => {
            const balance = account.balances.available || account.balances.current;
            const obj = {
                account: account.name,
                balance: formatCurrency(balance, account.balances.iso_currency_code),
                transactions: account.transactions.length,
                daysAvailable: account.days_available,
            };
            return obj;
        });
    });
};
exports.transformAssetsData = transformAssetsData;
const transformIncomePaystubsData = (data) => {
    const paystubsItemsArray = data.paystubs.paystubs;
    var finalArray = [];
    for (var i = 0; i < paystubsItemsArray.length; i++) {
        var ActualEarningVariable = paystubsItemsArray[i].earnings;
        for (var j = 0; j < ActualEarningVariable.breakdown.length; j++) {
            var payStubItem = {
                description: paystubsItemsArray[i].employer.name + '_' + ActualEarningVariable.breakdown[j].description,
                currentAmount: ActualEarningVariable.breakdown[j].current_amount,
                currency: ActualEarningVariable.breakdown[j].iso_currency_code
            };
            finalArray.push(payStubItem);
        }
    }
    return finalArray;
};
exports.transformIncomePaystubsData = transformIncomePaystubsData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVV0aWxpdGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3F1aWNrc3RhcnQvZnJvbnRlbmQvc3JjL2RhdGFVdGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBbUJBLE1BQU0sY0FBYyxHQUFHLENBQ3JCLE1BQWlDLEVBQ2pDLElBQStCLEVBQy9CLEVBQUU7SUFDRixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUMxQyxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7S0FDekU7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFrSFcsUUFBQSxjQUFjLEdBQXNCO0lBQy9DO1FBQ0UsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtLQUNkO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsU0FBUztRQUNoQixLQUFLLEVBQUUsU0FBUztLQUNqQjtJQUNEO1FBQ0UsS0FBSyxFQUFFLFdBQVc7UUFDbEIsS0FBSyxFQUFFLFNBQVM7S0FDakI7SUFDRDtRQUNFLEtBQUssRUFBRSxXQUFXO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0NBQ0YsQ0FBQztBQUVXLFFBQUEsc0JBQXNCLEdBQXNCO0lBQ3ZEO1FBQ0UsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtLQUNkO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsUUFBUTtRQUNmLEtBQUssRUFBRSxRQUFRO0tBQ2hCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxNQUFNO0tBQ2Q7Q0FDRixDQUFDO0FBRVcsUUFBQSxrQkFBa0IsR0FBc0I7SUFDbkQ7UUFDRSxLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSxPQUFPO0tBQ2Y7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QUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjthQUMvRCxDQUFBO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUM3QjtLQUNGO0lBQ0MsT0FBTyxVQUFVLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBZlksUUFBQSwyQkFBMkIsK0JBZXZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXV0aEdldFJlc3BvbnNlLFxuICBUcmFuc2FjdGlvbixcbiAgSWRlbnRpdHlHZXRSZXNwb25zZSxcbiAgSW52ZXN0bWVudHNIb2xkaW5nc0dldFJlc3BvbnNlLFxuICBJbnZlc3RtZW50c1RyYW5zYWN0aW9uc0dldFJlc3BvbnNlLFxuICBBY2NvdW50c0dldFJlc3BvbnNlLFxuICBJdGVtR2V0UmVzcG9uc2UsXG4gIEluc3RpdHV0aW9uc0dldEJ5SWRSZXNwb25zZSxcbiAgTGlhYmlsaXRpZXNHZXRSZXNwb25zZSxcbiAgUGF5bWVudEluaXRpYXRpb25QYXltZW50R2V0UmVzcG9uc2UsXG4gIEFzc2V0UmVwb3J0R2V0UmVzcG9uc2UsXG4gIEFzc2V0UmVwb3J0LFxuICBUcmFuc2ZlckdldFJlc3BvbnNlLFxuICBJbmNvbWVWZXJpZmljYXRpb25QYXlzdHVic0dldFJlc3BvbnNlLFxuICBQYXlzdHViLFxuICBFYXJuaW5ncyxcbn0gZnJvbSBcInBsYWlkL2Rpc3QvYXBpXCI7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKFxuICBudW1iZXI6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGNvZGU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWRcbikgPT4ge1xuICBpZiAobnVtYmVyICE9IG51bGwgJiYgbnVtYmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYCAke3BhcnNlRmxvYXQobnVtYmVyLnRvRml4ZWQoMikpLnRvTG9jYWxlU3RyaW5nKFwiZW5cIil9ICR7Y29kZX1gO1xuICB9XG4gIHJldHVybiBcIm5vIGRhdGFcIjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2F0ZWdvcmllcyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGZpZWxkOiBzdHJpbmc7XG59XG5cbi8vaW50ZXJmYWNlcyBmb3IgY2F0ZWdvcmllcyBpbiBlYWNoIGluZGl2aWR1YWwgcHJvZHVjdFxuaW50ZXJmYWNlIEF1dGhEYXRhSXRlbSB7XG4gIHJvdXRpbmc6IHN0cmluZztcbiAgYWNjb3VudDogc3RyaW5nO1xuICBiYWxhbmNlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cbmludGVyZmFjZSBUcmFuc2FjdGlvbnNEYXRhSXRlbSB7XG4gIGFtb3VudDogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElkZW50aXR5RGF0YUl0ZW0ge1xuICBhZGRyZXNzZXM6IHN0cmluZztcbiAgcGhvbmVOdW1iZXJzOiBzdHJpbmc7XG4gIGVtYWlsczogc3RyaW5nO1xuICBuYW1lczogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQmFsYW5jZURhdGFJdGVtIHtcbiAgYmFsYW5jZTogc3RyaW5nO1xuICBzdWJ0eXBlOiBzdHJpbmcgfCBudWxsO1xuICBtYXNrOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEludmVzdG1lbnRzRGF0YUl0ZW0ge1xuICBtYXNrOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBzdHJpbmc7XG4gIHByaWNlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEludmVzdG1lbnRzVHJhbnNhY3Rpb25JdGVtIHtcbiAgYW1vdW50OiBudW1iZXI7XG4gIGRhdGU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTGlhYmlsaXRpZXNzRGF0YUl0ZW0ge1xuICBhbW91bnQ6IHN0cmluZztcbiAgZGF0ZTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFBheW1lbnREYXRhSXRlbSB7XG4gIHBheW1lbnRJZDogc3RyaW5nO1xuICBhbW91bnQ6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIHN0YXR1c1VwZGF0ZTogc3RyaW5nO1xuICByZWNpcGllbnRJZDogc3RyaW5nO1xufVxuaW50ZXJmYWNlIEl0ZW1EYXRhSXRlbSB7XG4gIGJpbGxlZDogc3RyaW5nO1xuICBhdmFpbGFibGU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQXNzZXRzRGF0YUl0ZW0ge1xuICBhY2NvdW50OiBzdHJpbmc7XG4gIGJhbGFuY2U6IHN0cmluZztcbiAgdHJhbnNhY3Rpb25zOiBudW1iZXI7XG4gIGRheXNBdmFpbGFibGU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFRyYW5zZmVyRGF0YUl0ZW0ge1xuICB0cmFuc2ZlcklkOiBzdHJpbmc7XG4gIGFtb3VudDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIGFjaENsYXNzOiBzdHJpbmc7XG4gIG5ldHdvcms6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEluY29tZVBheXN0dWJzRGF0YUl0ZW0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjdXJyZW50QW1vdW50OiBudW1iZXIgfCBudWxsO1xuICBjdXJyZW5jeTogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvckRhdGFJdGVtIHtcbiAgZXJyb3JfdHlwZTogc3RyaW5nO1xuICBlcnJvcl9jb2RlOiBzdHJpbmc7XG4gIGVycm9yX21lc3NhZ2U6IHN0cmluZztcbiAgZGlzcGxheV9tZXNzYWdlOiBzdHJpbmcgfCBudWxsO1xuICBzdGF0dXNfY29kZTogbnVtYmVyIHwgbnVsbDtcbn1cblxuLy9hbGwgcG9zc2libGUgcHJvZHVjdCBkYXRhIGludGVyZmFjZXNcbmV4cG9ydCB0eXBlIERhdGFJdGVtID1cbiAgfCBBdXRoRGF0YUl0ZW1cbiAgfCBUcmFuc2FjdGlvbnNEYXRhSXRlbVxuICB8IElkZW50aXR5RGF0YUl0ZW1cbiAgfCBCYWxhbmNlRGF0YUl0ZW1cbiAgfCBJbnZlc3RtZW50c0RhdGFJdGVtXG4gIHwgSW52ZXN0bWVudHNUcmFuc2FjdGlvbkl0ZW1cbiAgfCBMaWFiaWxpdGllc3NEYXRhSXRlbVxuICB8IEl0ZW1EYXRhSXRlbVxuICB8IFBheW1lbnREYXRhSXRlbVxuICB8IEFzc2V0c0RhdGFJdGVtXG4gIHwgVHJhbnNmZXJEYXRhSXRlbVxuICB8IEluY29tZVBheXN0dWJzRGF0YUl0ZW07XG5cbmV4cG9ydCB0eXBlIERhdGEgPSBBcnJheTxEYXRhSXRlbT47XG5cbmV4cG9ydCBjb25zdCBhdXRoQ2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcmllcz4gPSBbXG4gIHtcbiAgICB0aXRsZTogXCJOYW1lXCIsXG4gICAgZmllbGQ6IFwibmFtZVwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiQmFsYW5jZVwiLFxuICAgIGZpZWxkOiBcImJhbGFuY2VcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkFjY291bnQgI1wiLFxuICAgIGZpZWxkOiBcImFjY291bnRcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlJvdXRpbmcgI1wiLFxuICAgIGZpZWxkOiBcInJvdXRpbmdcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2FjdGlvbnNDYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yaWVzPiA9IFtcbiAge1xuICAgIHRpdGxlOiBcIk5hbWVcIixcbiAgICBmaWVsZDogXCJuYW1lXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBbW91bnRcIixcbiAgICBmaWVsZDogXCJhbW91bnRcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkRhdGVcIixcbiAgICBmaWVsZDogXCJkYXRlXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgaWRlbnRpdHlDYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yaWVzPiA9IFtcbiAge1xuICAgIHRpdGxlOiBcIk5hbWVzXCIsXG4gICAgZmllbGQ6IFwibmFtZXNcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkVtYWlsc1wiLFxuICAgIGZpZWxkOiBcImVtYWlsc1wiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiUGhvbmUgbnVtYmVyc1wiLFxuICAgIGZpZWxkOiBcInBob25lTnVtYmVyc1wiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiQWRkcmVzc2VzXCIsXG4gICAgZmllbGQ6IFwiYWRkcmVzc2VzXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgYmFsYW5jZUNhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgIGZpZWxkOiBcIm5hbWVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkJhbGFuY2VcIixcbiAgICBmaWVsZDogXCJiYWxhbmNlXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJTdWJ0eXBlXCIsXG4gICAgZmllbGQ6IFwic3VidHlwZVwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiTWFza1wiLFxuICAgIGZpZWxkOiBcIm1hc2tcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBpbnZlc3RtZW50c0NhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiQWNjb3VudCBNYXNrXCIsXG4gICAgZmllbGQ6IFwibWFza1wiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgIGZpZWxkOiBcIm5hbWVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlF1YW50aXR5XCIsXG4gICAgZmllbGQ6IFwicXVhbnRpdHlcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkNsb3NlIFByaWNlXCIsXG4gICAgZmllbGQ6IFwicHJpY2VcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlZhbHVlXCIsXG4gICAgZmllbGQ6IFwidmFsdWVcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBpbnZlc3RtZW50c1RyYW5zYWN0aW9uc0NhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgIGZpZWxkOiBcIm5hbWVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkFtb3VudFwiLFxuICAgIGZpZWxkOiBcImFtb3VudFwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiRGF0ZVwiLFxuICAgIGZpZWxkOiBcImRhdGVcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBsaWFiaWxpdGllc0NhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgIGZpZWxkOiBcIm5hbWVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlR5cGVcIixcbiAgICBmaWVsZDogXCJ0eXBlXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJMYXN0IFBheW1lbnQgRGF0ZVwiLFxuICAgIGZpZWxkOiBcImRhdGVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkxhc3QgUGF5bWVudCBBbW91bnRcIixcbiAgICBmaWVsZDogXCJhbW91bnRcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBpdGVtQ2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcmllcz4gPSBbXG4gIHtcbiAgICB0aXRsZTogXCJJbnN0aXR1dGlvbiBOYW1lXCIsXG4gICAgZmllbGQ6IFwibmFtZVwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiQmlsbGVkIFByb2R1Y3RzXCIsXG4gICAgZmllbGQ6IFwiYmlsbGVkXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBdmFpbGFibGUgUHJvZHVjdHNcIixcbiAgICBmaWVsZDogXCJhdmFpbGFibGVcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50c0NhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgIGZpZWxkOiBcIm5hbWVcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkJhbGFuY2VcIixcbiAgICBmaWVsZDogXCJiYWxhbmNlXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJTdWJ0eXBlXCIsXG4gICAgZmllbGQ6IFwic3VidHlwZVwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiTWFza1wiLFxuICAgIGZpZWxkOiBcIm1hc2tcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBwYXltZW50Q2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcmllcz4gPSBbXG4gIHtcbiAgICB0aXRsZTogXCJQYXltZW50IElEXCIsXG4gICAgZmllbGQ6IFwicGF5bWVudElkXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBbW91bnRcIixcbiAgICBmaWVsZDogXCJhbW91bnRcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlN0YXR1c1wiLFxuICAgIGZpZWxkOiBcInN0YXR1c1wiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiU3RhdHVzIFVwZGF0ZVwiLFxuICAgIGZpZWxkOiBcInN0YXR1c1VwZGF0ZVwiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiUmVjaXBpZW50IElEXCIsXG4gICAgZmllbGQ6IFwicmVjaXBpZW50SWRcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBhc3NldHNDYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yaWVzPiA9IFtcbiAge1xuICAgIHRpdGxlOiBcIkFjY291bnRcIixcbiAgICBmaWVsZDogXCJhY2NvdW50XCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJUcmFuc2FjdGlvbnNcIixcbiAgICBmaWVsZDogXCJ0cmFuc2FjdGlvbnNcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkJhbGFuY2VcIixcbiAgICBmaWVsZDogXCJiYWxhbmNlXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJEYXlzIEF2YWlsYWJsZVwiLFxuICAgIGZpZWxkOiBcImRheXNBdmFpbGFibGVcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2ZlckNhdGVnb3JpZXM6IEFycmF5PENhdGVnb3JpZXM+ID0gW1xuICB7XG4gICAgdGl0bGU6IFwiVHJhbnNmZXIgSURcIixcbiAgICBmaWVsZDogXCJ0cmFuc2ZlcklkXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBbW91bnRcIixcbiAgICBmaWVsZDogXCJhbW91bnRcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlR5cGVcIixcbiAgICBmaWVsZDogXCJ0eXBlXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJBQ0ggQ2xhc3NcIixcbiAgICBmaWVsZDogXCJhY2hDbGFzc1wiLFxuICB9LFxuICB7XG4gICAgdGl0bGU6IFwiTmV0d29ya1wiLFxuICAgIGZpZWxkOiBcIm5ldHdvcmtcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIlN0YXR1c1wiLFxuICAgIGZpZWxkOiBcInN0YXR1c1wiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGluY29tZVBheXN0dWJzQ2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcmllcz4gPSBbXG4gIHtcbiAgICB0aXRsZTogXCJEZXNjcmlwdGlvblwiLFxuICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogXCJDdXJyZW50IEFtb3VudFwiLFxuICAgIGZpZWxkOiBcImN1cnJlbnRBbW91bnRcIixcbiAgfSxcbiAge1xuICAgIHRpdGxlOiBcIkN1cnJlbmN5XCIsXG4gICAgZmllbGQ6IFwiY3VycmVuY3lcIixcbiAgfVxuXVxuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtQXV0aERhdGEgPSAoZGF0YTogQXV0aEdldFJlc3BvbnNlKSA9PiB7XG4gIHJldHVybiBkYXRhLm51bWJlcnMuYWNoIS5tYXAoKGFjaE51bWJlcnMpID0+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gZGF0YS5hY2NvdW50cyEuZmlsdGVyKChhKSA9PiB7XG4gICAgICByZXR1cm4gYS5hY2NvdW50X2lkID09PSBhY2hOdW1iZXJzLmFjY291bnRfaWQ7XG4gICAgfSlbMF07XG4gICAgY29uc3QgYmFsYW5jZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCA9XG4gICAgICBhY2NvdW50LmJhbGFuY2VzLmF2YWlsYWJsZSB8fCBhY2NvdW50LmJhbGFuY2VzLmN1cnJlbnQ7XG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG5hbWU6IGFjY291bnQubmFtZSxcbiAgICAgIGJhbGFuY2U6IGZvcm1hdEN1cnJlbmN5KGJhbGFuY2UsIGFjY291bnQuYmFsYW5jZXMuaXNvX2N1cnJlbmN5X2NvZGUpLFxuICAgICAgYWNjb3VudDogYWNoTnVtYmVycy5hY2NvdW50ISxcbiAgICAgIHJvdXRpbmc6IGFjaE51bWJlcnMucm91dGluZyEsXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1UcmFuc2FjdGlvbnNEYXRhID0gKFxuICBkYXRhOiB7bGF0ZXN0X3RyYW5zYWN0aW9uczogVHJhbnNhY3Rpb25bXX1cbik6IEFycmF5PERhdGFJdGVtPiA9PiB7XG4gIHJldHVybiBkYXRhLmxhdGVzdF90cmFuc2FjdGlvbnMhLm1hcCgodCkgPT4ge1xuICAgIGNvbnN0IGl0ZW06IERhdGFJdGVtID0ge1xuICAgICAgbmFtZTogdC5uYW1lISxcbiAgICAgIGFtb3VudDogZm9ybWF0Q3VycmVuY3kodC5hbW91bnQhLCB0Lmlzb19jdXJyZW5jeV9jb2RlKSxcbiAgICAgIGRhdGU6IHQuZGF0ZSxcbiAgICB9O1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcbn07XG5cbmludGVyZmFjZSBJZGVudGl0eURhdGEge1xuICBpZGVudGl0eTogSWRlbnRpdHlHZXRSZXNwb25zZVtcImFjY291bnRzXCJdO1xufVxuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtSWRlbnRpdHlEYXRhID0gKGRhdGE6IElkZW50aXR5RGF0YSkgPT4ge1xuICBjb25zdCBmaW5hbDogQXJyYXk8RGF0YUl0ZW0+ID0gW107XG4gIGNvbnN0IGlkZW50aXR5RGF0YSA9IGRhdGEuaWRlbnRpdHkhWzBdO1xuICBpZGVudGl0eURhdGEub3duZXJzLmZvckVhY2goKG93bmVyKSA9PiB7XG4gICAgY29uc3QgbmFtZXMgPSBvd25lci5uYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH0pO1xuICAgIGNvbnN0IGVtYWlscyA9IG93bmVyLmVtYWlscy5tYXAoKGVtYWlsKSA9PiB7XG4gICAgICByZXR1cm4gZW1haWwuZGF0YTtcbiAgICB9KTtcbiAgICBjb25zdCBwaG9uZXMgPSBvd25lci5waG9uZV9udW1iZXJzLm1hcCgocGhvbmUpID0+IHtcbiAgICAgIHJldHVybiBwaG9uZS5kYXRhO1xuICAgIH0pO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IG93bmVyLmFkZHJlc3Nlcy5tYXAoKGFkZHJlc3MpID0+IHtcbiAgICAgIHJldHVybiBgJHthZGRyZXNzLmRhdGEuc3RyZWV0fSAke2FkZHJlc3MuZGF0YS5jaXR5fSwgJHthZGRyZXNzLmRhdGEucmVnaW9ufSAke2FkZHJlc3MuZGF0YS5wb3N0YWxfY29kZX1gO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbnVtID0gTWF0aC5tYXgoXG4gICAgICBlbWFpbHMubGVuZ3RoLFxuICAgICAgbmFtZXMubGVuZ3RoLFxuICAgICAgcGhvbmVzLmxlbmd0aCxcbiAgICAgIGFkZHJlc3Nlcy5sZW5ndGhcbiAgICApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lczogbmFtZXNbaV0gfHwgXCJcIixcbiAgICAgICAgZW1haWxzOiBlbWFpbHNbaV0gfHwgXCJcIixcbiAgICAgICAgcGhvbmVOdW1iZXJzOiBwaG9uZXNbaV0gfHwgXCJcIixcbiAgICAgICAgYWRkcmVzc2VzOiBhZGRyZXNzZXNbaV0gfHwgXCJcIixcbiAgICAgIH07XG4gICAgICBmaW5hbC5wdXNoKG9iaik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmluYWw7XG59O1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtQmFsYW5jZURhdGEgPSAoZGF0YTogQWNjb3VudHNHZXRSZXNwb25zZSkgPT4ge1xuICBjb25zdCBiYWxhbmNlRGF0YSA9IGRhdGEuYWNjb3VudHM7XG4gIHJldHVybiBiYWxhbmNlRGF0YS5tYXAoKGFjY291bnQpID0+IHtcbiAgICBjb25zdCBiYWxhbmNlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkID1cbiAgICAgIGFjY291bnQuYmFsYW5jZXMuYXZhaWxhYmxlIHx8IGFjY291bnQuYmFsYW5jZXMuY3VycmVudDtcbiAgICBjb25zdCBvYmo6IERhdGFJdGVtID0ge1xuICAgICAgbmFtZTogYWNjb3VudC5uYW1lLFxuICAgICAgYmFsYW5jZTogZm9ybWF0Q3VycmVuY3koYmFsYW5jZSwgYWNjb3VudC5iYWxhbmNlcy5pc29fY3VycmVuY3lfY29kZSksXG4gICAgICBzdWJ0eXBlOiBhY2NvdW50LnN1YnR5cGUsXG4gICAgICBtYXNrOiBhY2NvdW50Lm1hc2shLFxuICAgIH07XG4gICAgcmV0dXJuIG9iajtcbiAgfSk7XG59O1xuXG5pbnRlcmZhY2UgSW52ZXN0bWVudERhdGEge1xuICBlcnJvcjogbnVsbDtcbiAgaG9sZGluZ3M6IEludmVzdG1lbnRzSG9sZGluZ3NHZXRSZXNwb25zZTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUludmVzdG1lbnRzRGF0YSA9IChkYXRhOiBJbnZlc3RtZW50RGF0YSkgPT4ge1xuICBjb25zdCBob2xkaW5nc0RhdGEgPSBkYXRhLmhvbGRpbmdzLmhvbGRpbmdzIS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEuYWNjb3VudF9pZCA+IGIuYWNjb3VudF9pZCkgcmV0dXJuIDE7XG4gICAgcmV0dXJuIC0xO1xuICB9KTtcbiAgcmV0dXJuIGhvbGRpbmdzRGF0YS5tYXAoKGhvbGRpbmcpID0+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gZGF0YS5ob2xkaW5ncy5hY2NvdW50cyEuZmlsdGVyKFxuICAgICAgKGFjYykgPT4gYWNjLmFjY291bnRfaWQgPT09IGhvbGRpbmcuYWNjb3VudF9pZFxuICAgIClbMF07XG4gICAgY29uc3Qgc2VjdXJpdHkgPSBkYXRhLmhvbGRpbmdzLnNlY3VyaXRpZXMhLmZpbHRlcihcbiAgICAgIChzZWMpID0+IHNlYy5zZWN1cml0eV9pZCA9PT0gaG9sZGluZy5zZWN1cml0eV9pZFxuICAgIClbMF07XG4gICAgY29uc3QgdmFsdWUgPSBob2xkaW5nLnF1YW50aXR5ICogc2VjdXJpdHkuY2xvc2VfcHJpY2UhO1xuXG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG1hc2s6IGFjY291bnQubWFzayEsXG4gICAgICBuYW1lOiBzZWN1cml0eS5uYW1lISxcbiAgICAgIHF1YW50aXR5OiBmb3JtYXRDdXJyZW5jeShob2xkaW5nLnF1YW50aXR5LCBcIlwiKSxcbiAgICAgIHByaWNlOiBmb3JtYXRDdXJyZW5jeShcbiAgICAgICAgc2VjdXJpdHkuY2xvc2VfcHJpY2UhLFxuICAgICAgICBhY2NvdW50LmJhbGFuY2VzLmlzb19jdXJyZW5jeV9jb2RlXG4gICAgICApLFxuICAgICAgdmFsdWU6IGZvcm1hdEN1cnJlbmN5KHZhbHVlLCBhY2NvdW50LmJhbGFuY2VzLmlzb19jdXJyZW5jeV9jb2RlKSxcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH0pO1xufTtcblxuaW50ZXJmYWNlIEludmVzdG1lbnRzVHJhbnNhY3Rpb25EYXRhIHtcbiAgZXJyb3I6IG51bGw7XG4gIGludmVzdG1lbnRzX3RyYW5zYWN0aW9uczogSW52ZXN0bWVudHNUcmFuc2FjdGlvbnNHZXRSZXNwb25zZTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUludmVzdG1lbnRUcmFuc2FjdGlvbnNEYXRhID0gKGRhdGE6IEludmVzdG1lbnRzVHJhbnNhY3Rpb25EYXRhKSA9PiB7XG4gIGNvbnN0IGludmVzdG1lbnRUcmFuc2FjdGlvbnNEYXRhID0gZGF0YS5pbnZlc3RtZW50c190cmFuc2FjdGlvbnMuaW52ZXN0bWVudF90cmFuc2FjdGlvbnMhLnNvcnQoZnVuY3Rpb24gKGEsYikge1xuICAgIGlmIChhLmFjY291bnRfaWQgPiBiLmFjY291bnRfaWQpIHJldHVybiAxO1xuICAgIHJldHVybiAtMTtcbiAgfSk7XG4gIHJldHVybiBpbnZlc3RtZW50VHJhbnNhY3Rpb25zRGF0YS5tYXAoKGludmVzdG1lbnRUcmFuc2FjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNlY3VyaXR5ID0gZGF0YS5pbnZlc3RtZW50c190cmFuc2FjdGlvbnMuc2VjdXJpdGllcyEuZmlsdGVyKFxuICAgICAgKHNlYykgPT4gc2VjLnNlY3VyaXR5X2lkID09PSBpbnZlc3RtZW50VHJhbnNhY3Rpb24uc2VjdXJpdHlfaWRcbiAgICApWzBdO1xuXG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG5hbWU6IHNlY3VyaXR5Lm5hbWUhLFxuICAgICAgYW1vdW50OiBpbnZlc3RtZW50VHJhbnNhY3Rpb24uYW1vdW50LFxuICAgICAgZGF0ZTogaW52ZXN0bWVudFRyYW5zYWN0aW9uLmRhdGUsXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9KTtcbn07XG5cbmludGVyZmFjZSBMaWFiaWxpdGllc0RhdGFSZXNwb25zZSB7XG4gIGVycm9yOiBudWxsO1xuICBsaWFiaWxpdGllczogTGlhYmlsaXRpZXNHZXRSZXNwb25zZTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUxpYWJpbGl0aWVzRGF0YSA9IChkYXRhOiBMaWFiaWxpdGllc0RhdGFSZXNwb25zZSkgPT4ge1xuICBjb25zdCBsaWFiaWxpdGllc0RhdGEgPSBkYXRhLmxpYWJpbGl0aWVzLmxpYWJpbGl0aWVzO1xuICAvL2NvbnNvbGUubG9nKGxpYWJpbGl0aWVzRGF0YSlcbiAgLy9jb25zb2xlLmxvZyhcInJhbmRvbVwiKVxuICBjb25zdCBjcmVkaXQgPSBsaWFiaWxpdGllc0RhdGEuY3JlZGl0IS5tYXAoKGNyZWRpdCkgPT4ge1xuICAgIGNvbnN0IGFjY291bnQgPSBkYXRhLmxpYWJpbGl0aWVzLmFjY291bnRzLmZpbHRlcihcbiAgICAgIChhY2MpID0+IGFjYy5hY2NvdW50X2lkID09PSBjcmVkaXQuYWNjb3VudF9pZFxuICAgIClbMF07XG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG5hbWU6IGFjY291bnQubmFtZSxcbiAgICAgIHR5cGU6IFwiY3JlZGl0IGNhcmRcIixcbiAgICAgIGRhdGU6IGNyZWRpdC5sYXN0X3BheW1lbnRfZGF0ZSA/PyBcIlwiLFxuICAgICAgYW1vdW50OiBmb3JtYXRDdXJyZW5jeShcbiAgICAgICAgY3JlZGl0Lmxhc3RfcGF5bWVudF9hbW91bnQsXG4gICAgICAgIGFjY291bnQuYmFsYW5jZXMuaXNvX2N1cnJlbmN5X2NvZGVcbiAgICAgICksXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9KTtcblxuICBjb25zdCBtb3J0Z2FnZXMgPSBsaWFiaWxpdGllc0RhdGEubW9ydGdhZ2U/Lm1hcCgobW9ydGdhZ2UpID0+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gZGF0YS5saWFiaWxpdGllcy5hY2NvdW50cy5maWx0ZXIoXG4gICAgICAoYWNjKSA9PiBhY2MuYWNjb3VudF9pZCA9PT0gbW9ydGdhZ2UuYWNjb3VudF9pZFxuICAgIClbMF07XG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG5hbWU6IGFjY291bnQubmFtZSxcbiAgICAgIHR5cGU6IFwibW9ydGdhZ2VcIixcbiAgICAgIGRhdGU6IG1vcnRnYWdlLmxhc3RfcGF5bWVudF9kYXRlISxcbiAgICAgIGFtb3VudDogZm9ybWF0Q3VycmVuY3koXG4gICAgICAgIG1vcnRnYWdlLmxhc3RfcGF5bWVudF9hbW91bnQhLFxuICAgICAgICBhY2NvdW50LmJhbGFuY2VzLmlzb19jdXJyZW5jeV9jb2RlXG4gICAgICApLFxuICAgIH07XG4gICAgcmV0dXJuIG9iajtcbiAgfSk7XG5cbiAgY29uc3Qgc3R1ZGVudCA9IGxpYWJpbGl0aWVzRGF0YS5zdHVkZW50Py5tYXAoKHN0dWRlbnQpID0+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gZGF0YS5saWFiaWxpdGllcy5hY2NvdW50cy5maWx0ZXIoXG4gICAgICAoYWNjKSA9PiBhY2MuYWNjb3VudF9pZCA9PT0gc3R1ZGVudC5hY2NvdW50X2lkXG4gICAgKVswXTtcbiAgICBjb25zdCBvYmo6IERhdGFJdGVtID0ge1xuICAgICAgbmFtZTogYWNjb3VudC5uYW1lLFxuICAgICAgdHlwZTogXCJzdHVkZW50IGxvYW5cIixcbiAgICAgIGRhdGU6IHN0dWRlbnQubGFzdF9wYXltZW50X2RhdGUhLFxuICAgICAgYW1vdW50OiBmb3JtYXRDdXJyZW5jeShcbiAgICAgICAgc3R1ZGVudC5sYXN0X3BheW1lbnRfYW1vdW50ISxcbiAgICAgICAgYWNjb3VudC5iYWxhbmNlcy5pc29fY3VycmVuY3lfY29kZVxuICAgICAgKSxcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH0pO1xuXG4gIHJldHVybiBjcmVkaXQhLmNvbmNhdChtb3J0Z2FnZXMhKS5jb25jYXQoc3R1ZGVudCEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVRyYW5zZmVyRGF0YSA9IChkYXRhOiBUcmFuc2ZlckdldFJlc3BvbnNlKTogQXJyYXk8RGF0YUl0ZW0+ID0+IHtcbiAgY29uc3QgdHJhbnNmZXJEYXRhID0gZGF0YS50cmFuc2ZlcjtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB0cmFuc2ZlcklkOiB0cmFuc2ZlckRhdGEuaWQsXG4gICAgICBhbW91bnQ6IHRyYW5zZmVyRGF0YS5hbW91bnQsXG4gICAgICB0eXBlOiB0cmFuc2ZlckRhdGEudHlwZSxcbiAgICAgIGFjaENsYXNzOiB0cmFuc2ZlckRhdGEuYWNoX2NsYXNzLFxuICAgICAgbmV0d29yazogdHJhbnNmZXJEYXRhLm5ldHdvcmssXG4gICAgICBzdGF0dXM6IHRyYW5zZmVyRGF0YS5zdGF0dXMsXG4gICAgfSxcbiAgXTtcbn07XG5cbmludGVyZmFjZSBJdGVtRGF0YSB7XG4gIGl0ZW06IEl0ZW1HZXRSZXNwb25zZVtcIml0ZW1cIl07XG4gIGluc3RpdHV0aW9uOiBJbnN0aXR1dGlvbnNHZXRCeUlkUmVzcG9uc2VbXCJpbnN0aXR1dGlvblwiXTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUl0ZW1EYXRhID0gKGRhdGE6IEl0ZW1EYXRhKTogQXJyYXk8RGF0YUl0ZW0+ID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBuYW1lOiBkYXRhLmluc3RpdHV0aW9uLm5hbWUsXG4gICAgICBiaWxsZWQ6IGRhdGEuaXRlbS5iaWxsZWRfcHJvZHVjdHMuam9pbihcIiwgXCIpLFxuICAgICAgYXZhaWxhYmxlOiBkYXRhLml0ZW0uYXZhaWxhYmxlX3Byb2R1Y3RzLmpvaW4oXCIsIFwiKSxcbiAgICB9LFxuICBdO1xufTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUFjY291bnRzRGF0YSA9IChkYXRhOiBBY2NvdW50c0dldFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IGFjY291bnRzRGF0YSA9IGRhdGEuYWNjb3VudHM7XG4gIHJldHVybiBhY2NvdW50c0RhdGEubWFwKChhY2NvdW50KSA9PiB7XG4gICAgY29uc3QgYmFsYW5jZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCA9XG4gICAgICBhY2NvdW50LmJhbGFuY2VzLmF2YWlsYWJsZSB8fCBhY2NvdW50LmJhbGFuY2VzLmN1cnJlbnQ7XG4gICAgY29uc3Qgb2JqOiBEYXRhSXRlbSA9IHtcbiAgICAgIG5hbWU6IGFjY291bnQubmFtZSxcbiAgICAgIGJhbGFuY2U6IGZvcm1hdEN1cnJlbmN5KGJhbGFuY2UsIGFjY291bnQuYmFsYW5jZXMuaXNvX2N1cnJlbmN5X2NvZGUpLFxuICAgICAgc3VidHlwZTogYWNjb3VudC5zdWJ0eXBlLFxuICAgICAgbWFzazogYWNjb3VudC5tYXNrISxcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH0pO1xufTtcblxuaW50ZXJmYWNlIFBheW1lbnREYXRhIHtcbiAgcGF5bWVudDogUGF5bWVudEluaXRpYXRpb25QYXltZW50R2V0UmVzcG9uc2U7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1QYXltZW50RGF0YSA9IChkYXRhOiBQYXltZW50RGF0YSkgPT4ge1xuICBjb25zdCBzdGF0dXNVcGRhdGUgPVxuICAgIHR5cGVvZiBkYXRhLnBheW1lbnQubGFzdF9zdGF0dXNfdXBkYXRlID09PSBcInN0cmluZ1wiXG4gICAgICA/IGRhdGEucGF5bWVudC5sYXN0X3N0YXR1c191cGRhdGUucmVwbGFjZShcIlRcIiwgXCIgXCIpLnJlcGxhY2UoXCJaXCIsIFwiXCIpXG4gICAgICA6IG5ldyBEYXRlKGRhdGEucGF5bWVudC5sYXN0X3N0YXR1c191cGRhdGUgKiAxMDAwKSAvLyBKYXZhIGRhdGEgY29tZXMgYXMgdGltZXN0YW1wXG4gICAgICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAucmVwbGFjZShcIlRcIiwgXCIgXCIpXG4gICAgICAgICAgLnJlcGxhY2UoXCJaXCIsIFwiXCIpO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHBheW1lbnRJZDogZGF0YS5wYXltZW50LnBheW1lbnRfaWQsXG4gICAgICBhbW91bnQ6IGAke2RhdGEucGF5bWVudC5hbW91bnQuY3VycmVuY3l9ICR7ZGF0YS5wYXltZW50LmFtb3VudC52YWx1ZX1gLFxuICAgICAgc3RhdHVzOiBkYXRhLnBheW1lbnQuc3RhdHVzLFxuICAgICAgc3RhdHVzVXBkYXRlOiBzdGF0dXNVcGRhdGUsXG4gICAgICByZWNpcGllbnRJZDogZGF0YS5wYXltZW50LnJlY2lwaWVudF9pZCxcbiAgICB9LFxuICBdO1xufTtcblxuaW50ZXJmYWNlIEFzc2V0UmVzcG9uc2VEYXRhIHtcbiAganNvbjogQXNzZXRSZXBvcnQ7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Bc3NldHNEYXRhID0gKGRhdGE6IEFzc2V0UmVzcG9uc2VEYXRhKSA9PiB7XG4gIGNvbnN0IGFzc2V0SXRlbXMgPSBkYXRhLmpzb24uaXRlbXM7XG4gIHJldHVybiBhc3NldEl0ZW1zLmZsYXRNYXAoKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbS5hY2NvdW50cy5tYXAoKGFjY291bnQpID0+IHtcbiAgICAgIGNvbnN0IGJhbGFuY2U6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQgPVxuICAgICAgICBhY2NvdW50LmJhbGFuY2VzLmF2YWlsYWJsZSB8fCBhY2NvdW50LmJhbGFuY2VzLmN1cnJlbnQ7XG4gICAgICBjb25zdCBvYmo6IERhdGFJdGVtID0ge1xuICAgICAgICBhY2NvdW50OiBhY2NvdW50Lm5hbWUsXG4gICAgICAgIGJhbGFuY2U6IGZvcm1hdEN1cnJlbmN5KGJhbGFuY2UsIGFjY291bnQuYmFsYW5jZXMuaXNvX2N1cnJlbmN5X2NvZGUpLFxuICAgICAgICB0cmFuc2FjdGlvbnM6IGFjY291bnQudHJhbnNhY3Rpb25zIS5sZW5ndGgsXG4gICAgICAgIGRheXNBdmFpbGFibGU6IGFjY291bnQuZGF5c19hdmFpbGFibGUhLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuaW50ZXJmYWNlIEluY29tZVBheXN0dWIge1xuICBwYXlzdHViczogSW5jb21lVmVyaWZpY2F0aW9uUGF5c3R1YnNHZXRSZXNwb25zZSxcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUluY29tZVBheXN0dWJzRGF0YSA9IChkYXRhOiBJbmNvbWVQYXlzdHViKSA9PiB7XG4gIGNvbnN0IHBheXN0dWJzSXRlbXNBcnJheTogQXJyYXk8UGF5c3R1Yj4gPSBkYXRhLnBheXN0dWJzLnBheXN0dWJzXG4gIHZhciBmaW5hbEFycmF5OiBBcnJheTxJbmNvbWVQYXlzdHVic0RhdGFJdGVtPiA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF5c3R1YnNJdGVtc0FycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgQWN0dWFsRWFybmluZ1ZhcmlhYmxlOiBhbnkgPSBwYXlzdHVic0l0ZW1zQXJyYXlbaV0uZWFybmluZ3NcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEFjdHVhbEVhcm5pbmdWYXJpYWJsZS5icmVha2Rvd24ubGVuZ3RoOyBqKyspe1xuICAgICAgdmFyIHBheVN0dWJJdGVtOiBJbmNvbWVQYXlzdHVic0RhdGFJdGVtID0ge1xuICAgICAgICBkZXNjcmlwdGlvbjogcGF5c3R1YnNJdGVtc0FycmF5W2ldLmVtcGxveWVyLm5hbWUgKyAnXycgKyBBY3R1YWxFYXJuaW5nVmFyaWFibGUuYnJlYWtkb3duW2pdLmRlc2NyaXB0aW9uLFxuICAgICAgICBjdXJyZW50QW1vdW50OiBBY3R1YWxFYXJuaW5nVmFyaWFibGUuYnJlYWtkb3duW2pdLmN1cnJlbnRfYW1vdW50LFxuICAgICAgICBjdXJyZW5jeTogQWN0dWFsRWFybmluZ1ZhcmlhYmxlLmJyZWFrZG93bltqXS5pc29fY3VycmVuY3lfY29kZVxuICAgICAgfVxuICAgIGZpbmFsQXJyYXkucHVzaChwYXlTdHViSXRlbSlcbiAgfVxufVxuICByZXR1cm4gZmluYWxBcnJheVxufVxuIl19