export default [
  {
    inputs: [
      {
        internalType: "contract RoleStore",
        name: "_roleStore",
        type: "address",
      },
      {
        internalType: "contract StatisticStore",
        name: "_statisticStore",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
    ],
    name: "GameHalted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "level",
        type: "uint8",
      },
    ],
    name: "LevelUp",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "bankrolls",
        type: "address[]",
      },
    ],
    name: "getClaimable",
    outputs: [
      {
        components: [
          {
            internalType: "uint80",
            name: "profit",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "loss",
            type: "uint80",
          },
          {
            internalType: "uint96",
            name: "volume",
            type: "uint96",
          },
        ],
        internalType: "struct Statistic.Props[]",
        name: "",
        type: "tuple[]",
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
      {
        internalType: "address[]",
        name: "bankrolls",
        type: "address[]",
      },
    ],
    name: "getClaimableByBankrolls",
    outputs: [
      {
        components: [
          {
            internalType: "uint80",
            name: "profit",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "loss",
            type: "uint80",
          },
          {
            internalType: "uint96",
            name: "volume",
            type: "uint96",
          },
        ],
        internalType: "struct Statistic.Props[]",
        name: "",
        type: "tuple[]",
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
    name: "getLevelByPlayer",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
    ],
    name: "getPlayerStatus",
    outputs: [
      {
        components: [
          {
            internalType: "uint96",
            name: "nextLevelVolume",
            type: "uint96",
          },
          {
            internalType: "uint8",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "halted",
            type: "bool",
          },
        ],
        internalType: "struct RankMiddleware.Player",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "bankrolls",
        type: "address[]",
      },
    ],
    name: "getSnapshot",
    outputs: [
      {
        components: [
          {
            internalType: "uint80",
            name: "profit",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "loss",
            type: "uint80",
          },
          {
            internalType: "uint96",
            name: "volume",
            type: "uint96",
          },
        ],
        internalType: "struct Statistic.Props[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        internalType: "bool",
        name: "halt",
        type: "bool",
      },
    ],
    name: "haltPlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "levels",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                internalType: "uint128",
                name: "lastRequestId",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "startBlock",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "endBlock",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "lastSeen",
                type: "uint64",
              },
            ],
            internalType: "struct Session.Detail",
            name: "detail",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "tokenDecimals",
                type: "uint8",
              },
              {
                internalType: "uint64",
                name: "value",
                type: "uint64",
              },
            ],
            internalType: "struct Price.Props",
            name: "price",
            type: "tuple",
          },
          {
            internalType: "enum Session.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "program",
            type: "address",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "escrow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "bankroll",
            type: "address",
          },
        ],
        internalType: "struct Session.Props",
        name: "session",
        type: "tuple",
      },
    ],
    name: "onBegin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                internalType: "uint128",
                name: "lastRequestId",
                type: "uint128",
              },
              {
                internalType: "uint64",
                name: "startBlock",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "endBlock",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "lastSeen",
                type: "uint64",
              },
            ],
            internalType: "struct Session.Detail",
            name: "detail",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "tokenDecimals",
                type: "uint8",
              },
              {
                internalType: "uint64",
                name: "value",
                type: "uint64",
              },
            ],
            internalType: "struct Price.Props",
            name: "price",
            type: "tuple",
          },
          {
            internalType: "enum Session.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "program",
            type: "address",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "escrow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "bankroll",
            type: "address",
          },
        ],
        internalType: "struct Session.Props",
        name: "session",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "payin",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "bankroll",
            type: "address",
          },
        ],
        internalType: "struct CashierUtils.Receipt",
        name: "",
        type: "tuple",
      },
    ],
    name: "onSettlement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "uint96",
        name: "nextLevelVolume",
        type: "uint96",
      },
      {
        internalType: "uint8",
        name: "level",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "halted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roleStore",
    outputs: [
      {
        internalType: "contract RoleStore",
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
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "uint96",
        name: "level",
        type: "uint96",
      },
    ],
    name: "setLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "bankrolls",
        type: "address[]",
      },
    ],
    name: "takeClaimSnapshot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint80",
            name: "profit",
            type: "uint80",
          },
          {
            internalType: "uint80",
            name: "loss",
            type: "uint80",
          },
          {
            internalType: "uint96",
            name: "volume",
            type: "uint96",
          },
        ],
        internalType: "struct Statistic.Props",
        name: "totalStat",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "bankrolls",
        type: "address[]",
      },
    ],
    name: "takeLevelUpSnapshot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
