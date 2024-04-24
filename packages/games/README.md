# @winrlabs/games

`@winrlabs/games` includes a collection of games that can be integrated into your application. It is ready to use and can be customized to fit your needs.

## Installation

```bash
npm install @winrlabs/games
# or
yarn add @winrlabs/games
# or (recommended)
pnpm add @winrlabs/games
```

## Usage

You need to wrap your react application via the `GameProvider` component to use the games.

```javascript
import { GameProvider } from "@winrlabs/games";

const App = () => {
  return (
    <GameProvider>
      <div>{/* Your application */}</div>
    </GameProvider>
  );
};
```

Here is the basic usage of the `DiceTemplate` component:

```javascript
import { DiceTemplate } from "@winrlabs/games";

const Page = () => {
  return (
    <div>
      <DiceTemplate
        options={{
          scene: {
            backgroundImage: "url(/range.svg)",
          },
        }}
        onSubmit={(data) => {
          // send data to external
          // get results

          setResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: Math.floor(Math.random() * 100),
            },
            {
              payout: 2,
              payoutInUsd: 2,
              resultNumber: Math.floor(Math.random() * 100),
            },
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: Math.floor(Math.random() * 100),
            },
          ]);
        }}
        onAnimationComplete={() => setResults([])}
        results={results}
      />
    </div>
  );
};
```
