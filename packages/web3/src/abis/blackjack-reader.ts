export default [
  {
    inputs: [
      {
        internalType: "address",
        name: "_blackjack",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "blackjack",
    outputs: [
      {
        internalType: "contract IWINRBlackJack",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getPlayerStatus",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint128",
                name: "wagerAmount",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "activeHandIndex",
                type: "uint64",
              },
              {
                internalType: "uint32",
                name: "amountHands",
                type: "uint32",
              },
              {
                internalType: "bool",
                name: "canInsure",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "awaitingRandomness",
                type: "bool",
              },
              {
                internalType: "enum IWINRBlackJack.GameStatus",
                name: "status",
                type: "uint8",
              },
            ],
            internalType: "struct IWINRBlackJack.Game",
            name: "game",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "player",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "bankroll",
                    type: "address",
                  },
                  {
                    internalType: "uint96",
                    name: "gameIndex",
                    type: "uint96",
                  },
                  {
                    internalType: "uint16",
                    name: "chipsAmount",
                    type: "uint16",
                  },
                  {
                    internalType: "uint96",
                    name: "betAmount",
                    type: "uint96",
                  },
                  {
                    internalType: "enum IWINRBlackJack.HandStatus",
                    name: "status",
                    type: "uint8",
                  },
                  {
                    internalType: "bool",
                    name: "isInsured",
                    type: "bool",
                  },
                  {
                    internalType: "bool",
                    name: "isDouble",
                    type: "bool",
                  },
                ],
                internalType: "struct IWINRBlackJack.Hand",
                name: "hand",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint8[8]",
                    name: "cards",
                    type: "uint8[8]",
                  },
                  {
                    internalType: "uint8",
                    name: "amountCards",
                    type: "uint8",
                  },
                  {
                    internalType: "uint8",
                    name: "totalCount",
                    type: "uint8",
                  },
                  {
                    internalType: "bool",
                    name: "isSoftHand",
                    type: "bool",
                  },
                  {
                    internalType: "bool",
                    name: "canSplit",
                    type: "bool",
                  },
                ],
                internalType: "struct IWINRBlackJack.Cards",
                name: "cards",
                type: "tuple",
              },
              {
                internalType: "uint256",
                name: "splitHandIndex",
                type: "uint256",
              },
            ],
            internalType: "struct IWINRBlackJackReader.HandData[]",
            name: "hands",
            type: "tuple[]",
          },
        ],
        internalType: "struct IWINRBlackJackReader.GameData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getVersion",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;
