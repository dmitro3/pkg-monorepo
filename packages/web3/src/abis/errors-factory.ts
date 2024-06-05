export default [
  {
    type: "error",
    name: "AlreadClaimed",
    inputs: [
      {
        name: "client",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AlreadyFilled",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "AlreadyOperator",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "CallRevert",
    inputs: [
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
  },
  {
    type: "error",
    name: "CannotBeZero",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "ChoiceNotAllowed",
    inputs: [],
  },
  {
    type: "error",
    name: "GameCountExceeded",
    inputs: [
      {
        name: "given",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "max",
        type: "uint8",
        internalType: "uint8",
      },
    ],
  },
  {
    type: "error",
    name: "GameOver",
    inputs: [
      {
        name: "client",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "HasUncompletedGame",
    inputs: [
      {
        name: "client",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "InsufficientEscrow",
    inputs: [
      {
        name: "escrow",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "wanted",
        type: "uint128",
        internalType: "uint128",
      },
    ],
  },
  {
    type: "error",
    name: "LossOverBudget",
    inputs: [
      {
        name: "program",
        type: "address",
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "budget",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "loss",
        type: "uint128",
        internalType: "uint128",
      },
    ],
  },
  {
    type: "error",
    name: "MaxWagerExceeded",
    inputs: [
      {
        name: "given",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "max",
        type: "uint128",
        internalType: "uint128",
      },
    ],
  },
  {
    type: "error",
    name: "MinChip",
    inputs: [
      {
        name: "index",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "selection",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "min",
        type: "uint8",
        internalType: "uint8",
      },
    ],
  },
  {
    type: "error",
    name: "MustBeGreater",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "MustBeLower",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "NeedClaim",
    inputs: [],
  },
  {
    type: "error",
    name: "NoBudget",
    inputs: [
      {
        name: "program",
        type: "address",
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "NoClaim",
    inputs: [
      {
        name: "client",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "NoReward",
    inputs: [],
  },
  {
    type: "error",
    name: "NotOnSale",
    inputs: [
      {
        name: "program",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "NotOnTargetTime",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "NotScheduled",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "OperatorBlocked",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OperatorNotRegistered",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ProgramDidNotRefund",
    inputs: [
      {
        name: "key",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "ProgramHalted",
    inputs: [
      {
        name: "program",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "RandomIncorrect",
    inputs: [],
  },
  {
    type: "error",
    name: "RequestCouldNotFind",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "SessionNotIterable",
    inputs: [
      {
        name: "key",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "SessionNotRefundable",
    inputs: [
      {
        name: "key",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "SessionWaitingIteration",
    inputs: [
      {
        name: "player",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ThereMustBeAtLeastOneRoleAdmin",
    inputs: [],
  },
  {
    type: "error",
    name: "ThereMustBeAtLeastOneTimelockMultiSig",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [
      {
        name: "msgSender",
        type: "address",
        internalType: "address",
      },
      {
        name: "role",
        type: "string",
        internalType: "string",
      },
    ],
  },
] as const;
