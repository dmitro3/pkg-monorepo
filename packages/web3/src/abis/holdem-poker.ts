export default [
  {
    inputs: [
      {
        internalType: "contract RoleStore",
        name: "_roleStore",
        type: "address",
      },
      {
        internalType: "contract Config",
        name: "_config",
        type: "address",
      },
      {
        internalType: "contract BudgetMiddleware",
        name: "_budget",
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
    name: "AlreadyCompleted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
    ],
    name: "HandResultError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
    ],
    name: "HasUncompletedGame",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "given",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "max",
        type: "uint128",
      },
    ],
    name: "MaxWagerExceeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "given",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "min",
        type: "uint128",
      },
    ],
    name: "MinWagerNotMet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
    ],
    name: "NotPlayersTurn",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
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
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "AttemptedRefund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "anteAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sideBetAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "callAmount",
        type: "uint256",
      },
    ],
    name: "RefundGame",
    type: "event",
  },
  {
    inputs: [],
    name: "REGULAR_ANTE_MULTIPLIER",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SIDEBET_MULTIPLIER",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_client",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bankroll",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "bet",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "escrow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payback",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "delay",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "iterate",
            type: "uint8",
          },
          {
            internalType: "enum ControllerUtils.Signal",
            name: "signal",
            type: "uint8",
          },
        ],
        internalType: "struct ControllerUtils.Response",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "key",
                    type: "string",
                  },
                  {
                    internalType: "bytes",
                    name: "value",
                    type: "bytes",
                  },
                ],
                internalType: "struct EventUtils.BytesKeyValue[]",
                name: "items",
                type: "tuple[]",
              },
            ],
            internalType: "struct EventUtils.BytesItems",
            name: "list",
            type: "tuple",
          },
        ],
        internalType: "struct EventUtils.Log",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "budget",
    outputs: [
      {
        internalType: "contract BudgetMiddleware",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "config",
    outputs: [
      {
        internalType: "contract Config",
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
        name: "_client",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "decide",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "escrow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payback",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "delay",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "iterate",
            type: "uint8",
          },
          {
            internalType: "enum ControllerUtils.Signal",
            name: "signal",
            type: "uint8",
          },
        ],
        internalType: "struct ControllerUtils.Response",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "key",
                    type: "string",
                  },
                  {
                    internalType: "bytes",
                    name: "value",
                    type: "bytes",
                  },
                ],
                internalType: "struct EventUtils.BytesKeyValue[]",
                name: "items",
                type: "tuple[]",
              },
            ],
            internalType: "struct EventUtils.BytesItems",
            name: "list",
            type: "tuple",
          },
        ],
        internalType: "struct EventUtils.Log",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "anteAmount_",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "sideBetAmount_",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "chipAmount_",
        type: "uint128",
      },
    ],
    name: "encodeBet",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_client",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_randoms",
        type: "uint256[]",
      },
    ],
    name: "fill",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "escrow",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payback",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "payout",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "delay",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "iterate",
            type: "uint8",
          },
          {
            internalType: "enum ControllerUtils.Signal",
            name: "signal",
            type: "uint8",
          },
        ],
        internalType: "struct ControllerUtils.Response",
        name: "results_",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "key",
                    type: "string",
                  },
                  {
                    internalType: "bytes",
                    name: "value",
                    type: "bytes",
                  },
                ],
                internalType: "struct EventUtils.BytesKeyValue[]",
                name: "items",
                type: "tuple[]",
              },
            ],
            internalType: "struct EventUtils.BytesItems",
            name: "list",
            type: "tuple",
          },
        ],
        internalType: "struct EventUtils.Log",
        name: "log_",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "games",
    outputs: [
      {
        internalType: "address",
        name: "bankroll",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "anteAmount",
        type: "uint128",
      },
      {
        internalType: "uint32",
        name: "gameIndex",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "anteChipsAmount",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "sideBetChipsAmount",
        type: "uint16",
      },
      {
        internalType: "uint128",
        name: "betAmountSideBet",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "callBetAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "sideBetWonAmount",
        type: "uint128",
      },
      {
        internalType: "enum IWINRPoker.State",
        name: "state",
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
        name: "_player",
        type: "address",
      },
    ],
    name: "getHand",
    outputs: [
      {
        internalType: "uint16[9]",
        name: "",
        type: "uint16[9]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayerStatus",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "bankroll",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "anteChips",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "sideBetChips",
            type: "uint16",
          },
          {
            internalType: "uint16[9]",
            name: "cards",
            type: "uint16[9]",
          },
          {
            internalType: "uint128",
            name: "wager",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "gameIndex",
            type: "uint32",
          },
          {
            internalType: "enum IWINRPoker.State",
            name: "state",
            type: "uint8",
          },
        ],
        internalType: "struct IWINRPoker.PlayerStatus",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "payoutsAA",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "payoutsPerCombination",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_client",
        type: "address",
      },
    ],
    name: "refundGame",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "_combination",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_payout",
        type: "uint256",
      },
    ],
    name: "setPayoutsAA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_combination",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_payout",
        type: "uint256",
      },
    ],
    name: "setPayoutsPerCombination",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPaidIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPaidOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
