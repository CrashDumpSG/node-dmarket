import { Http } from './http';
import {
    LastSalesResponse,
    MarketItemsResponse,
    UserBalance,
    AggregatedPrice,
    UserAccount,
    DepositAssetsRequest,
    DepositAssetsResponse,
    DepositStatusResponse,
    UserOffersResponse,
    UserOffersCreateRequest,
    UserOffersCreateResponse,
    UserOffersEditRequest,
    UserOffersEditResponse,
    DeleteOffersRequest,
    DeleteOffersResponse,
    UserClosedOffersResponse,
    OffersByTitleResponse,
    TargetsByTitleResponse,
    MarketDepthResponse,
    UserTargetsResponse,
    UserClosedTargetsResponse,
    CreateTargetsRequest,
    CreateTargetsResponse,
    DeleteTargetsRequest,
    DeleteTargetsResponse,
    OffersBuyRequest,
    OffersBuyResponse,
    UserInventoryApiResponse,
    UserInventorySyncRequest,
    WithdrawAssetsRequest,
    WithdrawAssetsResponse,
    UserItemsResponse,
    CustomizedFeesResponse
} from './interfaces';
import { PaginationParams } from './interfaces';
import { ApiOptions } from './interfaces';

export class DMarketService {
    private baseUrl = "https://api.dmarket.com";
    private http: Http;
    private gameId: "a8db" | "tf2" | "9a92" | "rust";

    /**
     * Initialize the DMarket API client
     * @param apiKey Your DMarket API key
     * @param apiSecret Your DMarket API secret
     * @param gameId Game ID ("a8db" for CS:GO, "tf2" for Team Fortress 2, "9a92" for Dota 2, "rust" for Rust)
     * @param timeout Request timeout in milliseconds
     */
    constructor(apiKey: string, apiSecret: string, gameId: "a8db" | "tf2" | "9a92" | "rust", timeout: number = 10000) {
        this.http = new Http(this.baseUrl, apiKey, apiSecret, timeout);
        this.gameId = gameId;
    }

    /**
     * Get last sales for a specific item
     * @param title Item name/title
     * @param limit Number of sales to return (max 100)
     */
    public async getLastSales(title: string, limit: number = 100, options?: ApiOptions): Promise<LastSalesResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                title,
                limit: Math.min(limit, 500),
                ...options?.params,
            },
            ...options,
        };
        const response = await this.http.get<LastSalesResponse>('/trade-aggregator/v1/last-sales', mergedOptions);
        return response.data;
    }

    /**
     * Search for items on the marketplace
     * @param title Item name/title to search for
     * @param params Pagination parameters
     */
    public async searchMarketItems(title: string, params?: PaginationParams, options?: ApiOptions): Promise<MarketItemsResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                title,
                limit: params?.limit || 100,
                offset: params?.offset || 0,
                currency: 'USD',
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<MarketItemsResponse>('/exchange/v1/market/items', mergedOptions);
        return response.data;
    }

    /**
     * Get user balance information
     */
    public async getUserBalance(options?: ApiOptions): Promise<UserBalance> {
        const response = await this.http.get<UserBalance>('/account/v1/balance', options);
        return response.data;
    }

    /**
     * Get aggregated prices for a specific item
     * @param title Item name/title
     */
    public async getAggregatedPrices(title: string, options?: ApiOptions): Promise<AggregatedPrice> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                title,
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<AggregatedPrice>('/price-aggregator/v1/aggregated-prices', mergedOptions);
        return response.data;
    }

    /**
     * Get user account information
     */
    public async getUserAccount(options?: ApiOptions): Promise<UserAccount> {
        const response = await this.http.get<UserAccount>('/account/v1/user', options);
        return response.data;
    }

    /**
     * Deposit assets to DMarket
     * @param assetIds Array of asset IDs to deposit
     */
    public async depositAssets(assetIds: string[], options?: ApiOptions): Promise<DepositAssetsResponse> {
        const data: DepositAssetsRequest = {
            AssetID: assetIds
        };

        const response = await this.http.post<DepositAssetsResponse>('/marketplace-api/v1/deposit-assets', data, options);
        return response.data;
    }

    /**
     * Get deposit status
     * @param depositId Deposit ID to check status for
     */
    public async getDepositStatus(depositId: string, options?: ApiOptions): Promise<DepositStatusResponse> {
        const response = await this.http.get<DepositStatusResponse>(`/marketplace-api/v1/deposit-status/${depositId}`, options);
        return response.data;
    }

    /**
     * Get user's active offers
     * @param params Pagination parameters
     */
    public async getUserOffersApi(params?: PaginationParams, options?: ApiOptions): Promise<UserOffersResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                GameID: this.gameId,
                Limit: params?.limit || 100,
                Offset: params?.offset || 0,
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<UserOffersResponse>('/marketplace-api/v1/user-offers', mergedOptions);
        return response.data;
    }

    /**
     * Create offers to sell items
     * @param offers Array of offer details (asset ID and price)
     */
    public async createUserOffers(offers: Array<{ AssetID: string, Price: { Currency: string, Amount: number } }>, options?: ApiOptions): Promise<UserOffersCreateResponse> {
        const data: UserOffersCreateRequest = {
            Offers: offers
        };

        const response = await this.http.post<UserOffersCreateResponse>('/marketplace-api/v1/user-offers/create', data, options);
        return response.data;
    }

    /**
     * Edit existing offers
     * @param offers Array of offer details to update
     */
    public async editUserOffers(offers: Array<{ OfferID: string, AssetID: string, Price: { Currency: string, Amount: number } }>, options?: ApiOptions): Promise<UserOffersEditResponse> {
        const data: UserOffersEditRequest = {
            Offers: offers
        };

        const response = await this.http.post<UserOffersEditResponse>('/marketplace-api/v1/user-offers/edit', data, options);
        return response.data;
    }

    /**
     * Delete offers
     * @param offers Array of offers to delete
     * @param force Force deletion flag
     */
    public async deleteOffersApi(offers: Array<{ itemId: string, offerId: string, price: { amount: string, currency: string } }>, force: boolean = false, options?: ApiOptions): Promise<DeleteOffersResponse> {
        const data: DeleteOffersRequest = {
            force,
            objects: offers
        };

        const response = await this.http.delete<DeleteOffersResponse>('/exchange/v1/offers', { ...options, data });
        return response.data;
    }

    /**
     * Get user's closed offers
     * @param params Pagination and ordering parameters
     */
    public async getUserClosedOffers(params?: { limit?: number, offset?: number, orderDir?: 'desc' | 'asc' }, options?: ApiOptions): Promise<UserClosedOffersResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                Limit: params?.limit || 100,
                Offset: params?.offset || 0,
                OrderDir: params?.orderDir || 'desc',
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<UserClosedOffersResponse>('/marketplace-api/v1/user-offers/closed', mergedOptions);
        return response.data;
    }

    /**
     * Get offers by item title
     * @param title Item name/title
     * @param limit Number of offers to return
     * @param cursor Pagination cursor
     */
    public async getOffersByTitle(title: string, limit: number = 100, cursor?: string, options?: ApiOptions): Promise<OffersByTitleResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                Title: title,
                Limit: limit,
                ...(cursor ? { Cursor: cursor } : {}),
                ...(options?.params || {}),
            },
            ...(options || {}),
        };

        const response = await this.http.get<OffersByTitleResponse>('/exchange/v1/offers-by-title', mergedOptions);
        return response.data;
    }

    /**
     * Get targets by item title
     * @param title Item name/title
     */
    public async getTargetsByTitle(title: string, options?: ApiOptions): Promise<TargetsByTitleResponse> {
        const response = await this.http.get<TargetsByTitleResponse>(`/marketplace-api/v1/targets-by-title/${this.gameId}/${title}`, options);
        return response.data;
    }

    /**
     * Get market depth for a specific item
     * @param title Item name/title
     * @param filters Optional filters
     * @param aggregatedData Data aggregation option
     */
    public async getMarketDepth(
        title: string,
        filters?: string,
        aggregatedData?: 'Full' | 'Offers' | 'Orders',
        options?: ApiOptions
    ): Promise<MarketDepthResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                title,
                ...(filters ? { filters } : {}),
                ...(aggregatedData ? { aggregatedData } : { aggregatedData: 'Full' }),
                ...(options?.params || {}),
            },
            ...(options || {}),
        };

        const response = await this.http.get<MarketDepthResponse>('/marketplace-api/v1/market-depth', mergedOptions);
        return response.data;
    }

    /**
     * Get user's targets (buy orders)
     * @param params Pagination parameters
     */
    public async getUserTargets(params?: PaginationParams, options?: ApiOptions): Promise<UserTargetsResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                GameID: this.gameId,
                Limit: params?.limit || 100,
                Offset: params?.offset || 0,
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<UserTargetsResponse>('/marketplace-api/v1/user-targets', mergedOptions);
        return response.data;
    }

    /**
     * Get user's closed targets
     * @param params Pagination and ordering parameters
     */
    public async getUserClosedTargets(params?: { limit?: number, offset?: number, orderDir?: 'desc' | 'asc' }, options?: ApiOptions): Promise<UserClosedTargetsResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                Limit: params?.limit || 100,
                Offset: params?.offset || 0,
                OrderDir: params?.orderDir || 'desc',
                ...options?.params,
            },
            ...options,
        };

        const response = await this.http.get<UserClosedTargetsResponse>('/marketplace-api/v1/user-targets/closed', mergedOptions);
        return response.data;
    }

    /**
     * Create targets (buy orders)
     * @param targets Array of target details
     */
    public async createTargets(
        targets: Array<{
            Amount: string,
            Price: { Currency: string, Amount: number },
            Title: string,
            Attrs?: { paintSeed?: number, phase?: string, floatPartValue?: string }
        }>,
        options?: ApiOptions
    ): Promise<CreateTargetsResponse> {
        const data: CreateTargetsRequest = {
            GameID: this.gameId,
            Targets: targets
        };

        const response = await this.http.post<CreateTargetsResponse>('/marketplace-api/v1/user-targets/create', data, options);
        return response.data;
    }

    /**
     * Delete targets (buy orders)
     * @param targetIds Array of target IDs to delete
     */
    public async deleteTargets(targetIds: string[], options?: ApiOptions): Promise<DeleteTargetsResponse> {
        const data: DeleteTargetsRequest = {
            Targets: targetIds.map(id => ({ TargetID: id }))
        };

        const response = await this.http.post<DeleteTargetsResponse>('/marketplace-api/v1/user-targets/delete', data, options);
        return response.data;
    }

    /**
     * Buy offers
     * @param offers Array of offers to buy
     */
    public async buyOffers(
        offers: Array<{
            offerId: string,
            price: { amount: string, currency: string },
            type: "dmarket" | "p2p"
        }>,
        options?: ApiOptions
    ): Promise<OffersBuyResponse> {
        const data: OffersBuyRequest = {
            offers
        };

        const response = await this.http.patch<OffersBuyResponse>('/exchange/v1/offers-buy', data, options);
        return response.data;
    }

    /**
     * Get user inventory from DMarket API
     * @param params Filtering and pagination parameters
     */
    public async getUserInventoryApi(params?: PaginationParams & {
        GameID?: string,
        BasicFilters?: {
            Title?: string,
            InMarket?: boolean,
            HasSteamLock?: boolean,
            SteamLockDays?: number,
            AssetID?: string[]
        },
        SortType?: string,
        Presentation?: "InventoryPresentationSimple" | "InventoryPresentationDetailed"
    }, options?: ApiOptions): Promise<UserInventoryApiResponse> {
        const apiParams: Record<string, any> = {
            GameID: params?.GameID || this.gameId,
            Limit: params?.limit || 100,
            Offset: params?.offset || 0,
            Presentation: params?.Presentation || "InventoryPresentationSimple",
        };

        if (params?.BasicFilters?.Title !== undefined) {
            apiParams["BasicFilters.Title"] = params.BasicFilters.Title;
        }

        if (params?.BasicFilters?.InMarket !== undefined) {
            apiParams["BasicFilters.InMarket"] = params.BasicFilters.InMarket;
        }

        if (params?.BasicFilters?.HasSteamLock !== undefined) {
            apiParams["BasicFilters.HasSteamLock"] = params.BasicFilters.HasSteamLock;
        }

        if (params?.BasicFilters?.SteamLockDays !== undefined) {
            apiParams["BasicFilters.SteamLockDays"] = params.BasicFilters.SteamLockDays;
        }

        if (params?.BasicFilters?.AssetID !== undefined && params.BasicFilters.AssetID.length > 0) {
            apiParams["BasicFilters.AssetID"] = params.BasicFilters.AssetID;
        }

        if (params?.SortType) {
            apiParams.SortType = params.SortType;
        }

        if (options?.params) {
            Object.assign(apiParams, options.params);
        }

        const mergedOptions: ApiOptions = {
            params: apiParams,
            ...(options ? { headers: options.headers, timeout: options.timeout } : {})
        };

        const response = await this.http.get<UserInventoryApiResponse>('/marketplace-api/v1/user-inventory', mergedOptions);
        return response.data;
    }

    /**
     * Sync user inventory with Steam
     * @param game Game to sync inventory for
     */
    public async syncUserInventory(game: "CSGO" | "Dota2" | "TF2" | "LifeBeyond" | "Rust", options?: ApiOptions): Promise<{}> {
        const data: UserInventorySyncRequest = {
            Type: "Inventory",
            GameID: game
        };

        const response = await this.http.post<{}>('/marketplace-api/v1/user-inventory/sync', data, options);
        return response.data;
    }

    /**
     * Withdraw assets from DMarket to Steam
     * @param assets Assets to withdraw
     * @param requestId Unique request ID
     */
    public async withdrawAssets(
        assets: Array<{
            id: string,
            gameId: string,
            classId: string
        }>,
        requestId: string,
        options?: ApiOptions
    ): Promise<WithdrawAssetsResponse> {
        const data: WithdrawAssetsRequest = {
            assets,
            requestId
        };

        const response = await this.http.post<WithdrawAssetsResponse>('/exchange/v1/withdraw-assets', data, options);
        return response.data;
    }

    /**
     * Get user items from exchange API
     * @param params Filtering and pagination parameters
     */
    public async getUserItems(
        params?: {
            title?: string,
            limit?: number,
            offset?: number,
            orderBy?: string,
            orderDir?: string,
            treeFilters?: string,
            priceFrom?: number,
            priceTo?: number,
            classIds?: string,
            cursor?: string
        },
        options?: ApiOptions
    ): Promise<UserItemsResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                currency: 'USD',
                ...(params?.title ? { title: params.title } : {}),
                limit: params?.limit || 50,
                offset: params?.offset || 0,
                orderBy: params?.orderBy || 'title',
                orderDir: params?.orderDir || 'desc',
                ...(params?.treeFilters ? { treeFilters: params.treeFilters } : {}),
                priceFrom: params?.priceFrom || 0,
                priceTo: params?.priceTo || 0,
                ...(params?.classIds ? { classIds: params.classIds } : {}),
                ...(params?.cursor ? { cursor: params.cursor } : {}),
                ...(options?.params || {})
            },
            ...(options || {})
        };

        const response = await this.http.get<UserItemsResponse>('/exchange/v1/user/items', mergedOptions);
        return response.data;
    }

    /**
     * Get items with reduced fees
     * @param offerType Offer type filter
     * @param limit Number of items to return
     * @param offset Pagination offset
     */
    public async getCustomizedFees(
        offerType?: 'dmarket' | 'p2p',
        limit?: number,
        offset?: number,
        options?: ApiOptions
    ): Promise<CustomizedFeesResponse> {
        const mergedOptions: ApiOptions = {
            params: {
                gameId: this.gameId,
                offerType: offerType || 'dmarket',
                limit: limit || 10,
                offset: offset || 0,
                ...(options?.params || {})
            },
            ...(options || {})
        };

        const response = await this.http.get<CustomizedFeesResponse>('/exchange/v1/customized-fees', mergedOptions);
        return response.data;
    }
}

