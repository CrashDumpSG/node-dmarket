export interface ApiOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    data?: any;
    timeout?: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export interface ApiError {
    code: string;
    message: string;
    status?: number;
    data?: any;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    offset?: number;
}

export interface Price {
    DMC: string;
    USD: string;
}

export interface LastSale {
    price: string;
    date: string;
    txOperationType: "Offer" | "Order";
    offerAttributes?: Record<string, any>;
    orderAttributes?: Record<string, any>;
}

export interface LastSalesResponse {
    sales: LastSale[];
}

export interface MarketItemsResponse {
    cursor: string;
    objects: MarketOffer[];
    total: string;
}

export interface MarketOffer {
    amount: number;
    classId: string;
    createdAt: number;
    description: string;
    discount: number;
    extra: Extra;
    extraDoc?: string;
    gameId: string;
    gameType: "blockchain" | "steam";
    image: string;
    inMarket: boolean;
    instantPrice: Price;
    instantTargetId: string;
    itemId: string;
    lockStatus: boolean;
    owner: string;
    ownerDetails: OwnerDetails;
    ownersBlockchainId: string;
    price: Price;
    recommendedPrice: Recommendations;
    slug: string;
    status: "default" | "active" | "inactive" | "in_transfer" | "sold" | "recalled" | "unavailable" | "locked";
    suggestedPrice: Price;
    title: string;
    type: "item" | "offer" | "target" | "class" | "airdrop" | "sale" | "product";
}

export interface Extra {
    viewAtSteam?: string;
    quality?: string;
    exterior?: string;
    category?: string;
    tradeLock?: number;
    tradeLockDuration?: number;
    stickers?: { image: string; name: string }[];
    itemType?: string;
    floatValue?: number;
    inspectInGame?: string;
    tagName?: string;
    hero?: string;
    gems?: { image: string; name: string; type: string }[];
    rarity?: string;
    serialNumber?: number;
    ability?: string;
    videos?: number;
    subscribers?: number;
    growth?: number;
    nameColor?: string;
    backgroundColor?: string;
    tradable?: boolean;
    withdrawable?: boolean;
    offerId?: string;
    orderId?: string;
    isNew?: boolean;
    groupId?: string;
    gameId?: string;
    name?: string;
    categoryPath?: string;
    class?: string[];
    collection?: string[];
    grade?: string;
    type?: string;
    linkId?: string;
}

export interface OwnerDetails {
    avatar: string;
    id: string;
    wallet: string;
}

export interface Recommendations {
    d3: Price;
    d7: Price;
    d7Plus: Price;
}

export interface UserBalance {
    usd: string;
    usdAvailableToWithdraw: string;
    dmc: string;
    dmcAvailableToWithdraw: string;
}

export interface AggregatedPrice {
    MarketHashName: string;
    Offers: {
        BestPrice: string;
        Count: number;
    };
    Orders: {
        BestPrice: string;
        Count: number;
    };
}

export interface UserAccount {
    id: string;
    username: string;
    email: string;
    publicKey: string;
    imageUrl: string;
    level: number;
    isEmailVerified: boolean;
    isPasswordSet: boolean;
    countryCode: string;
    countryCodeFromIP: string;
    migrated: boolean;
    hasHistoryEvents: boolean;
    hasActiveSubscriptions: boolean;
    ga_client_id: string;
    regType: "steam" | "user";
    agreementsInfo: {
        isConfirmed: boolean;
        updated: number;
    };
    settings: {
        enabledDeviceConfirmation: boolean;
        isSubscribedToNewsletters: boolean;
        targetsLimit: number;
        tradingApiToken: string;
    };
    features: Array<{
        name: string;
        enabled: boolean;
    }>;
    restrictions: Array<{
        name: string;
        expirationTime: number;
    }>;
    linkedGames: Array<{
        gameId: string;
        gameUserId: string;
        username: string;
    }>;
    steamAccount: {
        steamId: string;
        username: string;
        icon: string;
        level: number;
        apiKey: string;
        apiKeyStatus: string;
        tradeUrl: string;
        isProfilePrivate: boolean;
    };
    twitchAccount: {
        userId: string;
        username: string;
        icon: string;
    };
}

export interface DepositAssetsRequest {
    AssetID: string[];
}

export interface DepositAssetsResponse {
    DepositID: string;
}

export interface DepositStatusResponse {
    DepositID: string;
    AssetID: string[];
    Status: string;
    Error: string;
    Assets: Array<{
        InGameAssetID: string;
    }>;
    SteamDepositInfo: {
        TradeOfferID: string;
        Message: string;
    };
}

export interface UserOffersResponse {
    Items: Array<{
        AssetID: string;
        VariantID: string;
        Title: string;
        ImageURL: string;
        GameID: string;
        GameType: "GameTypeBlockchain" | "GameTypeSteam";
        Location: "AssetLocationInGame" | "AssetLocationInMarket" | "AssetLocationInTransfer";
        Withdrawable: boolean;
        Depositable: boolean;
        Tradable: boolean;
        Attributes: Array<{
            Name: string;
            Value: string;
        }>;
        Offer: {
            OfferID: string;
            Price: {
                Currency: string;
                Amount: number;
            };
            Fee: {
                Currency: string;
                Amount: number;
            };
            CreatedDate: string;
        };
        MarketPrice: {
            Currency: string;
            Amount: number;
        };
        InstantPrice: {
            Currency: string;
            Amount: number;
        };
        ClassID: string;
    }>;
    Total: string;
    Cursor: string;
}

export interface UserOffersCreateRequest {
    Offers: Array<{
        AssetID: string;
        Price: {
            Currency: string;
            Amount: number;
        };
    }>;
}

export interface UserOffersCreateResponse {
    Result: Array<{
        CreateOffer: {
            AssetID: string;
            Price: {
                Currency: string;
                Amount: number;
            };
        };
        OfferID: string;
        Successful: boolean;
        Error?: {
            Code: string;
            Message: string;
        };
    }>;
}

export interface UserOffersEditRequest {
    Offers: Array<{
        OfferID: string;
        AssetID: string;
        Price: {
            Currency: string;
            Amount: number;
        };
    }>;
}

export interface UserOffersEditResponse {
    Result: Array<{
        EditOffer: {
            OfferID: string;
            AssetID: string;
            Price: {
                Currency: string;
                Amount: number;
            };
        };
        Successful: boolean;
        Error?: {
            Code: string;
            Message: string;
        };
        NewOfferID: string;
    }>;
}

export interface DeleteOffersRequest {
    force: boolean;
    objects: Array<{
        itemId: string;
        offerId: string;
        price: {
            amount: string;
            currency: string;
        };
    }>;
}

export interface DeleteOffersResponse {
    created?: Array<{
        assetId: string;
        offerId: string;
    }>;
    fail: string[];
    locked: string[];
    success: string[];
}

export interface UserClosedOffersResponse {
    Trades: Array<{
        OfferID: string;
        TargetID: string;
        AssetID: string;
        Price: {
            Currency: string;
            Amount: number;
        };
        CurrencyCode: string;
        Amount: string;
        Title: string;
        Fee: {
            Amount: {
                Currency: string;
                Amount: number;
            };
            Percent: string;
            IsPersonal: boolean;
        };
        OfferCreatedAt: string;
        OfferClosedAt: string;
    }>;
    Total: string;
    Cursor: string;
}

export interface OffersByTitleResponse {
    objects: MarketOffer[];
    total: number;
    cursor: string;
}

export interface TargetsByTitleResponse {
    orders: Array<{
        amount: string;
        price: string;
        title: string;
        attributes: Record<string, any>;
    }>;
}

export interface MarketDepthResponse {
    orders: Array<{
        price: string;
        amount: string;
        attributes: Array<Record<string, any>>;
    }>;
    offers: Array<{
        price: string;
        amount: string;
        attributes: Array<Record<string, any>>;
    }>;
}

export interface UserTargetsResponse {
    Items: Array<{
        TargetID: string;
        Title: string;
        Amount: string;
        Status: string;
        GameID: string;
        GameType: string;
        Attributes: Array<{
            Name: string;
            Value: string;
        }>;
        Price: {
            Currency: string;
            Amount: number;
        };
    }>;
    Total: string;
    Cursor: string;
}

export interface UserClosedTargetsResponse {
    Trades: Array<{
        OfferID: string;
        TargetID: string;
        AssetID: string;
        Price: {
            Currency: string;
            Amount: number;
        };
        CurrencyCode: string;
        Amount: string;
        Title: string;
    }>;
    Total: string;
}

export interface CreateTargetsRequest {
    GameID: string;
    Targets: Array<{
        Amount: string;
        Price: {
            Currency: string;
            Amount: number;
        };
        Title: string;
        Attrs?: {
            paintSeed?: number;
            phase?: string;
            floatPartValue?: string;
        };
    }>;
}

export interface CreateTargetsResponse {
    Result: Array<{
        CreateTarget: {
            Amount: string;
            Price: {
                Currency: string;
                Amount: number;
            };
            Title: string;
            Attrs?: {
                paintSeed?: number;
                phase?: string;
                floatPartValue?: string;
            };
        };
        TargetID: string;
        Successful: boolean;
        Error?: {
            Code: string;
            Message: string;
        };
    }>;
}

export interface DeleteTargetsRequest {
    Targets: Array<{
        TargetID: string;
    }>;
}

export interface DeleteTargetsResponse {
    Result: Array<{
        DeleteTarget: {
            TargetID: string;
        };
        Successful: boolean;
        Error?: {
            Code: string;
            Message: string;
        };
    }>;
}

export interface OffersBuyRequest {
    offers: Array<{
        offerId: string;
        price: {
            amount: string;
            currency: string;
        };
        type: "dmarket" | "p2p";
    }>;
}

export interface OffersBuyResponse {
    dmOffersFailReason?: {
        code: string;
    };
    dmOffersStatus?: Record<string, { started: boolean }>;
    p2pOffersStatus?: Record<string, { started: boolean }>;
    orderId: string;
    status: "TxPending" | "TxSuccess" | "TxFailed";
    txId: string;
}

export interface UserInventoryApiResponse {
    Items: Array<{
        AssetID: string;
        VariantID: string;
        Title: string;
        ImageURL: string;
        GameID: string;
        GameType: "GameTypeBlockchain" | "GameTypeSteam";
        Location: "AssetLocationInGame" | "AssetLocationInMarket" | "AssetLocationInTransfer";
        Withdrawable: boolean;
        Depositable: boolean;
        Tradable: boolean;
        Attributes: Array<{
            Name: string;
            Value: string;
        }>;
        Offer?: {
            OfferID: string;
            Price: {
                Currency: string;
                Amount: number;
            };
            Fee: {
                Currency: string;
                Amount: number;
            };
            CreatedDate: string;
        };
        MarketPrice?: {
            Currency: string;
            Amount: number;
        };
        InstantPrice?: {
            Currency: string;
            Amount: number;
        };
        ClassID: string;
    }>;
    Total: string;
    Cursor?: string;
}

export interface UserInventorySyncRequest {
    Type: "UnknownSyncType" | "Inventory";
    GameID: string;
}

export interface WithdrawAssetsRequest {
    assets: Array<{
        id: string;
        gameId: string;
        classId: string;
    }>;
    requestId: string;
}

export interface WithdrawAssetsResponse {
    transferId: string;
}

export interface UserItemsResponse {
    cursor?: string;
    objects: Array<{
        amount: number;
        classId: string;
        createdAt: number;
        description: string;
        discount: number;
        extra: {
            categoryPath: string;
            gameId: string;
            isNew: boolean;
            name: string;
            tradable: boolean;
            tradeLockDuration: number;
            viewAtSteam?: string;
            quality?: string;
            exterior?: string;
            category?: string;
            tradeLock?: number;
            stickers?: Array<{
                image: string;
                name: string;
            }>;
            itemType?: string;
            floatValue?: number;
            inspectInGame?: string;
            tagName?: string;
            hero?: string;
            gems?: Array<{
                image: string;
                name: string;
                type: string;
            }>;
            rarity?: string;
            serialNumber?: number;
            ability?: string;
            videos?: number;
            subscribers?: number;
            growth?: number;
            nameColor?: string;
            backgroundColor?: string;
            withdrawable?: boolean;
            offerId?: string;
            orderId?: string;
            groupId?: string;
            class?: string[];
            collection?: string[];
            grade?: string;
            type?: string;
            linkId?: string;
        };
        gameId: string;
        gameType: "blockchain" | "steam";
        image: string;
        inMarket: boolean;
        instantPrice?: {
            DMC: string;
            USD: string;
        };
        instantTargetId: string;
        itemId: string;
        lockStatus: boolean;
        owner: string;
        ownerDetails: {
            avatar: string;
            id: string;
            wallet: string;
        };
        ownersBlockchainId: string;
        price?: {
            DMC: string;
            USD: string;
        };
        recommendedPrice?: {
            d3: {
                DMC: string;
                USD: string;
            };
            d7: {
                DMC: string;
                USD: string;
            };
            d7Plus: {
                DMC: string;
                USD: string;
            };
        };
        slug: string;
        status: "default" | "active" | "inactive" | "in_transfer" | "sold" | "recalled" | "unavailable" | "locked";
        suggestedPrice?: {
            DMC: string;
            USD: string;
        };
        title: string;
        type: "item" | "offer" | "target" | "class" | "airdrop" | "sale" | "product";
    }>;
    total: {
        offers: number;
        targets: number;
        items: number;
        completedOffers: number;
        closedTargets: number;
    };
}

export interface CustomizedFeesResponse {
    defaultFee: {
        fraction: string;
        minAmount: number;
    };
    reducedFees: Array<{
        title: string;
        fraction: string;
        minPrice: number;
        maxPrice: number;
        expiresAt: number;
    }>;
} 