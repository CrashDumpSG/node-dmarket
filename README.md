# DMarket API

A TypeScript wrapper for the DMarket API, allowing you to easily interact with the DMarket trading platform.

## Installation

```bash
npm install node-dmarket
```

## Usage

```typescript
import { DMarketService } from "node-dmarket";

// Initialize the API client
const apiKey = "YOUR_API_KEY";
const apiSecret = "YOUR_API_SECRET";
const gameId = "a8db"; // a8db for CS:GO, tf2 for TF2, 9a92 for Dota 2, rust for Rust

const dmarket = new DMarketService(apiKey, apiSecret, gameId);

// Example: Search market items
dmarket
  .searchMarketItems("item name", { limit: 10 })
  .then((res) => {
    console.log("result: ", res);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
```

## Features

- Full TypeScript support with comprehensive type definitions
- Handles authentication automatically
- Support for all major DMarket API endpoints:
  - Marketplace operations
  - Inventory management
  - Trading
  - Account information
  - And more...

## API Methods

- `getUserAccount()` - /account/v1/user
- `getUserBalance()` - /account/v1/balance
- `searchMarketItems(title, params)` - /exchange/v1/market/items
- `getLastSales(title, limit)` - /trade-aggregator/v1/last-sales
- `getAggregatedPrices(title)` - /price-aggregator/v1/aggregated-prices
- `getMarketDepth(title, filters, aggregatedData)` - /marketplace-api/v1/market-depth
- `getUserInventoryApi(params)` - /marketplace-api/v1/user-inventory
- `syncUserInventory(game)` - /marketplace-api/v1/user-inventory/sync
- `depositAssets(assetIds)` - /marketplace-api/v1/deposit-assets
- `getDepositStatus(depositId)` - /marketplace-api/v1/deposit-status/depositId
- `withdrawAssets(assets, requestId)` - /exchange/v1/withdraw-assets
- `getUserItems(params)` - /exchange/v1/user/items
- `getUserOffersApi(params)` - /marketplace-api/v1/user-offers
- `createUserOffers(offers)` - /marketplace-api/v1/user-offers/create
- `editUserOffers(offers)` - /marketplace-api/v1/user-offers/edit
- `deleteOffersApi(offers, force)` - /exchange/v1/offers
- `getUserClosedOffers(params)` - /marketplace-api/v1/user-offers/closed
- `getOffersByTitle(title, limit, cursor)` - /exchange/v1/offers-by-title
- `buyOffers(offers)` - /exchange/v1/offers-buy
- `getUserTargets(params)` - /marketplace-api/v1/user-targets
- `getUserClosedTargets(params)` - /marketplace-api/v1/user-targets/closed
- `createTargets(targets)` - /marketplace-api/v1/user-targets/create
- `deleteTargets(targetIds)` - /marketplace-api/v1/user-targets/delete
- `getTargetsByTitle(title)` - /marketplace-api/v1/targets-by-title/gameId/title
- `getCustomizedFees(offerType, limit, offset)` - /exchange/v1/customized-fees

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Getting DMarket API Keys

To get your DMarket API keys:

1. Go to [DMarket.com](https://dmarket.com/)
2. Log in to your account
3. Navigate to Settings
4. Find the Trading API section
5. Generate your API keys (public and secret keys)

Please refer to the [DMarket FAQ](https://dmarket.com/faq#tradingAPI) for more details.
