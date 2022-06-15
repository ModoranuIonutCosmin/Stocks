export enum ApiPaths {
    CompanyData = `/api/1.0/StocksInfo/company`,
    CompaniesShortData = `/api/1.0/StocksInfo/report`,
    CompanyHistoricalDataAll = `/api/1.0/StocksInfo/historicalData`,
    CompanyForecastDataAll = `/api/1.0/StocksInfo/forecastData`,


    AuthLogin = `/api/1.0/Account/login`,
    AuthRegister = `/api/1.0/Account/register`,
    ForgotPasswordPost = `/api/1.0/Account/forgotPassword`,
    ModifyPasswordPut = `/api/1.0/Account/modifyPassword`,
    ResetPasswordPost = `/api/1.0/Account/resetPassword`,
    ConfirmEmailPost = '/api/1.0/Account/confirmEmail',

    ProfileDataGet = '/api/1.0/Profile/info',


    TradingContext = `/api/1.0/Portofolio/tradingContext`,
    PreviewOrder = `/api/1.0/Portofolio/previewPlaceOrder`,
    OrderPost = `/api/1.0/Portofolio/placeOrder`,
    RefillBalancePost = `/api/1.0/Portofolio/refillBalance`,
    TransactionsGrouped = `/api/1.0/Transactions/openTransactions`,
    TransactionsParticular = `/api/1.0/Transactions/openTransactionsForTicker/`,
    CloseTransactionPost = `/api/1.0/Transactions/closeTransaction`,

    //Payment
    StripeCreateCheckoutSession = '/api/1.0/PaymentCheckout/create-checkout-session',
    StripeCreateCustomerPortalSession = '/api/1.0/StripePortalApi/create-portal-session',

    //Sugestii
    GetTradeSuggestions = '/api/1.0/SuggestedTrade/suggestions'
}
