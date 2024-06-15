import { RouletteWheelColor } from "../types";

export const MIN_BET_COUNT = 1 as const;

export const MAX_BET_COUNT = 50 as const;

export const NUMBER_INDEX_COUNT = 145;

export const rouletteNumbers = [
  3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26,
  29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34,
];

export const redNumbers = [
  32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
];

export const chunkMultipliers: number[] = [];

export const chunkMaps: number[][] = [];

export const chunkMinWagerIndexes = [
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
];

export const minWagerMultiplierForSideBets = 10;

// for 0,1,2 // 37
chunkMultipliers[0] = 12;

// for 0,2,3 // 38
chunkMultipliers[1] = 12;

// for 1,2,4,5 // 39
chunkMultipliers[2] = 9;

// for 2,3,5,6 // 40
chunkMultipliers[3] = 9;

// for 4,5,7,8 // 41
chunkMultipliers[4] = 9;

// for 5,6,8,9 // 42
chunkMultipliers[5] = 9;

// for 10,11,7,8 // 43
chunkMultipliers[6] = 9;

// for 11,12,8,9 // 44
chunkMultipliers[7] = 9;

// for 11,12,14,15 // 45
chunkMultipliers[8] = 9;

// for 10,11,13,14 // 46
chunkMultipliers[9] = 9;

// for 14,15,17,18 // 47
chunkMultipliers[10] = 9;

// for 13,14,16,17 // 48
chunkMultipliers[11] = 9;

// for 17,18,20,21 // 49
chunkMultipliers[12] = 9;

// for 16,17,19,20 // 50
chunkMultipliers[13] = 9;

// for 20,21,23,24 // 51
chunkMultipliers[14] = 9;

// for 19,20,22,23 // 52
chunkMultipliers[15] = 9;

// for 23,24,26,27 // 53
chunkMultipliers[16] = 9;

// for 22,23,25,26 // 54
chunkMultipliers[17] = 9;

// for 26,27,29,30 // 55
chunkMultipliers[18] = 9;

// for 25,26,28,29 // 56
chunkMultipliers[19] = 9;

// for 29,30,32,33 // 57
chunkMultipliers[20] = 9;

// for 28,29,31,32  // 58
chunkMultipliers[21] = 9;

// for 32,33,35,36 // 59
chunkMultipliers[22] = 9;

// for 31,32,34,35 // 60
chunkMultipliers[23] = 9;

// for 1,10,11,12,2,3,4,5,6,7,8,9 // 61
chunkMultipliers[24] = 3;

// for 13,14,15,16,17,18,19,20,21,22,23,24 // 62
chunkMultipliers[25] = 3;

// for 25,26,27,28,29,30,31,32,33,34,35,36 // 63
chunkMultipliers[26] = 3;

// for 1,10,11,12,13,14,15,16,17,18,2,3,4,5,6,7,8,9 // 64
chunkMultipliers[27] = 2;

// for 19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36 // 65
chunkMultipliers[28] = 2;

// for 10,12,14,16,18,2,20,22,24,26,28,30,32,34,36,4,6,8 // 66
chunkMultipliers[29] = 2;

// for 1,11,13,15,17,19,21,23,25,27,29,3,31,33,35,5,7,9 // 67
chunkMultipliers[30] = 2;

// for 1,12,14,16,18,19,21,23,25,27,3,30,32,34,36,5,7,9 // 68
chunkMultipliers[31] = 2;

// for 10,11,13,15,17,2,20,22,24,26,28,29,31,33,35,4,6,8 // 69
chunkMultipliers[32] = 2;

// for 12,15,18,21,24,27,3,30,33,36,6,9 // 70
chunkMultipliers[33] = 3;

// for 11,14,17,2,20,23,26,29,32,35,5,8 // 71
chunkMultipliers[34] = 3;

// for 1,10,13,16,19,22,25,28,31,34,4,7 // 72
chunkMultipliers[35] = 3;

// for 1,2,3 // 73
chunkMultipliers[36] = 12;

// for 4,5,6 // 74
chunkMultipliers[37] = 12;

// for 7,8,9 // 75
chunkMultipliers[38] = 12;

// for 10,11,12 // 76
chunkMultipliers[39] = 12;

// for 13,14,15 // 77
chunkMultipliers[40] = 12;

// for 16,17,18 // 78
chunkMultipliers[41] = 12;

// for 19,20,21 // 79
chunkMultipliers[42] = 12;

// for 22,23,24 // 80
chunkMultipliers[43] = 12;

// for 25,26,27 // 81
chunkMultipliers[44] = 12;

// for 28,29,30 // 82
chunkMultipliers[45] = 12;

// for 31,32,33 // 83
chunkMultipliers[46] = 12;

// for 34,35,36 // 84
chunkMultipliers[47] = 12;

// for 0,1 // 85
chunkMultipliers[48] = 18;

// for 0,2 // 86
chunkMultipliers[49] = 18;

// for 0,3 // 87
chunkMultipliers[50] = 18;

// for 1,2 // 88
chunkMultipliers[51] = 18;

// for 1,4 // 89
chunkMultipliers[52] = 18;

// for 2,3 // 90
chunkMultipliers[53] = 18;

// for 2,5 // 91
chunkMultipliers[54] = 18;

// for 3,6 // 92
chunkMultipliers[55] = 18;

// for 4,5 // 93
chunkMultipliers[56] = 18;

// for 4,7 // 94
chunkMultipliers[57] = 18;

// for 5,6 // 95
chunkMultipliers[58] = 18;

// for 5,8 // 96
chunkMultipliers[59] = 18;

// for 6,9 // 97
chunkMultipliers[60] = 18;

// for 7,8 // 98
chunkMultipliers[61] = 18;

// for 7,10 // 99
chunkMultipliers[62] = 18;

// for 8,9 // 100
chunkMultipliers[63] = 18;

// for 8,11 // 101
chunkMultipliers[64] = 18;

// for 9,12 // 102
chunkMultipliers[65] = 18;

// for 10,11 // 103
chunkMultipliers[66] = 18;

// for 10,13 // 104
chunkMultipliers[67] = 18;

// for 11,12 // 105
chunkMultipliers[68] = 18;

// for 11,14 // 106
chunkMultipliers[69] = 18;

// for 12,15 // 107
chunkMultipliers[70] = 18;

// for 13,14 // 108
chunkMultipliers[71] = 18;

// for 13,16 // 109
chunkMultipliers[72] = 18;

// for 14,15 // 110
chunkMultipliers[73] = 18;

// for 14,17 // 111
chunkMultipliers[74] = 18;

// for 15,18 // 112
chunkMultipliers[75] = 18;

// for 16,17 // 113
chunkMultipliers[76] = 18;

// for 16,19 // 114
chunkMultipliers[77] = 18;

// for 17,18 // 115
chunkMultipliers[78] = 18;

// for 17,20 // 116
chunkMultipliers[79] = 18;

// for 18,21 // 117
chunkMultipliers[80] = 18;

// for 19,20 // 118
chunkMultipliers[81] = 18;

// for 19,22 // 119
chunkMultipliers[82] = 18;

// for 20,21 // 120
chunkMultipliers[83] = 18;

// for 20,23 // 121
chunkMultipliers[84] = 18;

// for 21,24 // 122
chunkMultipliers[85] = 18;

// for 22,23 // 123
chunkMultipliers[86] = 18;

// for 22,25 // 124
chunkMultipliers[87] = 18;

// for 23,24 // 125
chunkMultipliers[88] = 18;

// for 23,26 // 126
chunkMultipliers[89] = 18;

// for 24,27 // 127
chunkMultipliers[90] = 18;

// for 25,26 // 128
chunkMultipliers[91] = 18;

// for 25,28 // 129
chunkMultipliers[92] = 18;

// for 26,27 // 130
chunkMultipliers[93] = 18;

// for 26,29 // 131
chunkMultipliers[94] = 18;

// for 27,30 // 132
chunkMultipliers[95] = 18;

// for 28,29 // 133
chunkMultipliers[96] = 18;

// for 28,31 // 134
chunkMultipliers[97] = 18;

// for 29,30 // 135
chunkMultipliers[98] = 18;

// for 29,32 // 136
chunkMultipliers[99] = 18;

// for 30,33 // 137
chunkMultipliers[100] = 18;

// for 31,32 // 138
chunkMultipliers[101] = 18;

// for 31,34 // 139
chunkMultipliers[102] = 18;

// for 32,33 // 140
chunkMultipliers[103] = 18;

// for 32,35 // 141
chunkMultipliers[104] = 18;

// for 33,36 // 142
chunkMultipliers[105] = 18;

// for 34,35 // 143
chunkMultipliers[106] = 18;

// for 35,36 // 144
chunkMultipliers[107] = 18;

// for 0
chunkMaps[0] = [0, 1, 48, 49, 50];

// for 1
chunkMaps[1] = [0, 2, 24, 27, 30, 31, 35, 36, 48, 51, 52];

// for 2
chunkMaps[2] = [0, 1, 2, 3, 24, 27, 29, 32, 34, 36, 49, 51, 53, 54];

// for 3
chunkMaps[3] = [1, 3, 24, 27, 30, 31, 33, 36, 50, 53, 55];

// for 4
chunkMaps[4] = [2, 4, 24, 27, 29, 32, 35, 37, 52, 56, 57];

// for 5
chunkMaps[5] = [2, 3, 4, 5, 24, 27, 30, 31, 34, 37, 54, 56, 58, 59];

// for 6
chunkMaps[6] = [3, 5, 24, 27, 29, 32, 33, 37, 55, 58, 60];

// for 7
chunkMaps[7] = [4, 6, 24, 27, 30, 31, 35, 38, 57, 61, 62];

// for 8
chunkMaps[8] = [4, 5, 6, 7, 24, 27, 29, 32, 34, 38, 59, 61, 63, 64];

// for 9
chunkMaps[9] = [5, 7, 24, 27, 30, 31, 33, 38, 60, 63, 65];

// for 10
chunkMaps[10] = [6, 9, 24, 27, 29, 32, 35, 39, 62, 66, 67];

// for 11
chunkMaps[11] = [6, 7, 8, 9, 24, 27, 30, 32, 34, 39, 64, 66, 68, 69];

// for 12
chunkMaps[12] = [7, 8, 24, 27, 29, 31, 33, 39, 65, 68, 70];

// for 13
chunkMaps[13] = [9, 11, 25, 27, 30, 32, 35, 40, 67, 71, 72];

// for 14
chunkMaps[14] = [8, 9, 10, 11, 25, 27, 29, 31, 34, 40, 69, 71, 73, 74];

// for 15
chunkMaps[15] = [8, 10, 25, 27, 30, 32, 33, 40, 70, 73, 75];

// for 16
chunkMaps[16] = [11, 13, 25, 27, 29, 31, 35, 41, 72, 76, 77];

// for 17
chunkMaps[17] = [10, 11, 12, 13, 25, 27, 30, 32, 34, 41, 74, 76, 78, 79];

// for 18
chunkMaps[18] = [10, 12, 25, 27, 29, 31, 33, 41, 75, 78, 80];

// for 19
chunkMaps[19] = [13, 15, 25, 28, 30, 31, 35, 42, 77, 81, 82];

// for 20
chunkMaps[20] = [12, 13, 14, 15, 25, 28, 29, 32, 34, 42, 79, 81, 83, 84];

// for 21
chunkMaps[21] = [12, 14, 25, 28, 30, 31, 33, 42, 80, 83, 85];

// for 22
chunkMaps[22] = [15, 17, 25, 28, 29, 32, 35, 43, 82, 86, 87];

// for 23
chunkMaps[23] = [14, 15, 16, 17, 25, 28, 30, 31, 34, 43, 84, 86, 88, 89];

// for 24
chunkMaps[24] = [14, 16, 25, 28, 29, 32, 33, 43, 85, 88, 90];

// for 25
chunkMaps[25] = [17, 19, 26, 28, 30, 31, 35, 44, 87, 91, 92];

// for 26
chunkMaps[26] = [16, 17, 18, 19, 26, 28, 29, 32, 34, 44, 89, 91, 93, 94];

// for 27
chunkMaps[27] = [16, 18, 26, 28, 30, 31, 33, 44, 90, 93, 95];

// for 28
chunkMaps[28] = [19, 21, 26, 28, 29, 32, 35, 45, 92, 96, 97];

// for 29
chunkMaps[29] = [18, 19, 20, 21, 26, 28, 30, 32, 34, 45, 94, 96, 98, 99];

// for 30
chunkMaps[30] = [18, 20, 26, 28, 29, 31, 33, 45, 95, 98, 100];

// for 31
chunkMaps[31] = [21, 23, 26, 28, 30, 32, 35, 46, 97, 101, 102];

// for 32
chunkMaps[32] = [20, 21, 22, 23, 26, 28, 29, 31, 34, 46, 99, 101, 103, 104];

// for 33
chunkMaps[33] = [20, 22, 26, 28, 30, 32, 33, 46, 100, 103, 105];

// for 34
chunkMaps[34] = [23, 26, 28, 29, 31, 35, 47, 102, 106];

// for 35
chunkMaps[35] = [22, 23, 26, 28, 30, 32, 34, 47, 104, 106, 107];

// for 36
chunkMaps[36] = [22, 26, 28, 29, 31, 33, 47, 105, 107];

// UI ARRAYS
export const actions = [
  {
    label: "1 to 12",
    gridArea: "4 / 2 / auto / span 4",
    index: 61,
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    label: "13 to 24",
    gridArea: "4 / span 4 / auto / auto",
    index: 62,
    numbers: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    label: "25 to 36",
    gridArea: "4 / span 4 / auto / auto",
    index: 63,
    numbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  },
  {
    label: "1 to 18",
    gridArea: "5 / 2 / auto / span 2",
    index: 64,
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    label: "Even",
    gridArea: "5 / span 2 / auto / span 2",
    index: 66,
    numbers: rouletteNumbers.filter((i) => i % 2 === 0),
  },
  {
    label: "",
    gridArea: "5 / span 2 / auto / auto",
    styles: "wr-bg-red-600",
    index: 68,
    numbers: redNumbers,
  },
  {
    label: "",
    gridArea: "5 / span 2 / auto / auto",
    styles: "wr-bg-zinc-800",
    index: 69,
    numbers: rouletteNumbers.filter((i) => !redNumbers.includes(i)),
  },
  {
    label: "Odd",
    gridArea: "5 / span 2 / auto / auto",
    index: 67,
    numbers: rouletteNumbers.filter((i) => i % 2 === 1),
  },
  {
    label: "19 to 36",
    gridArea: "5 / span 2 / auto / auto",
    index: 65,
    numbers: rouletteNumbers.filter((i) => i > 18 && i < 37),
  },
  {
    label: "2:1",
    gridArea: "1 / 14 / auto / auto",
    index: 70,
    numbers: rouletteNumbers.filter((i) => i % 3 === 0),
  },
  {
    label: "2:1",
    gridArea: "2 / 14 / auto / auto",
    index: 71,
    numbers: rouletteNumbers.filter((i) => (i + 1) % 3 === 0),
  },
  {
    label: "2:1",
    gridArea: "3 / 14 / auto / auto",
    index: 72,
    numbers: rouletteNumbers.filter((i) => (i - 1) % 3 === 0),
  },
];

export const miniActions = [
  {
    gridArea: "1 / 1 / span 2 / span 2",
    index: 38,
    numbers: [0, 2, 3],
  },
  {
    gridArea: "1 / 2 / span 2 / span 2",
    index: 40,
    numbers: [2, 3, 5, 6],
  },
  {
    gridArea: "1 / 3 / span 2 / span 2",
    index: 42,
    numbers: [5, 6, 8, 9],
  },
  {
    gridArea: "1 / 4 / span 2 / span 2",
    index: 44,
    numbers: [8, 9, 11, 12],
  },
  {
    gridArea: "1 / 5 / span 2 / span 2",
    index: 45,
    numbers: [11, 12, 14, 15],
  },
  {
    gridArea: "1 / 6 / span 2 / span 2",
    index: 47,
    numbers: [14, 15, 17, 18],
  },
  {
    gridArea: "1 / 7 / span 2 / span 2",
    index: 49,
    numbers: [17, 18, 20, 21],
  },
  {
    gridArea: "1 / 8 / span 2 / span 2",
    index: 51,
    numbers: [20, 21, 23, 24],
  },
  {
    gridArea: "1 / 9 / span 2 / span 2",
    index: 53,
    numbers: [23, 24, 26, 27],
  },
  {
    gridArea: "1 / 10 / span 2 / span 2",
    index: 55,
    numbers: [26, 27, 29, 30],
  },
  {
    gridArea: "1 / 11 / span 2 / span 2",
    index: 57,
    numbers: [29, 30, 32, 33],
  },
  {
    gridArea: "1 / 12 / span 2 / span 2",
    index: 59,
    numbers: [32, 33, 35, 36],
  },
  {
    gridArea: "2 / 1 / span 2 / span 2",
    index: 37,
    numbers: [0, 1, 2],
  },
  {
    gridArea: "2 / 2 / span 2 / span 2",
    index: 39,
    numbers: [1, 2, 4, 5],
  },
  {
    gridArea: "2 / 3 / span 2 / span 2",
    index: 41,
    numbers: [4, 5, 7, 8],
  },
  {
    gridArea: "2 / 4 / span 2 / span 2",
    index: 43,
    numbers: [7, 8, 10, 11],
  },
  {
    gridArea: "2 / 5 / span 2 / span 2",
    index: 46,
    numbers: [10, 11, 13, 14],
  },
  {
    gridArea: "2 / 6 / span 2 / span 2",
    index: 48,
    numbers: [13, 14, 16, 17],
  },
  {
    gridArea: "2 / 7 / span 2 / span 2",
    index: 50,
    numbers: [16, 17, 19, 20],
  },
  {
    gridArea: "2 / 8 / span 2 / span 2",
    index: 52,
    numbers: [19, 20, 22, 23],
  },
  {
    gridArea: "2 / 9 / span 2 / span 2",
    index: 54,
    numbers: [22, 23, 25, 26],
  },
  {
    gridArea: "2 / 10 / span 2 / span 2",
    index: 56,
    numbers: [25, 26, 28, 29],
  },
  {
    gridArea: "2 / 11 / span 2 / span 2",
    index: 58,
    numbers: [28, 29, 31, 32],
  },
  {
    gridArea: "2 / 12 / span 2 / span 2",
    index: 60,
    numbers: [31, 32, 34, 35],
  },
  {
    gridArea: "3 / 2 / span 2 / span 1",
    index: 73,
    numbers: [1, 2, 3],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 3 / span 2 / span 1",
    index: 74,
    numbers: [4, 5, 6],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 4 / span 2 / span 1",
    index: 75,
    numbers: [7, 8, 9],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 5 / span 2 / span 1",
    index: 76,
    numbers: [10, 11, 12],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 6 / span 2 / span 1",
    index: 77,
    numbers: [13, 14, 15],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 7 / span 2 / span 1",
    index: 78,
    numbers: [16, 17, 18],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 8 / span 2 / span 1",
    index: 79,
    numbers: [19, 20, 21],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 9 / span 2 / span 1",
    index: 80,
    numbers: [22, 23, 24],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 10 / span 2 / span 1",
    index: 81,
    numbers: [25, 26, 27],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 11 / span 2 / span 1",
    index: 82,
    numbers: [28, 29, 30],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 12 / span 2 / span 1",
    index: 83,
    numbers: [31, 32, 33],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 13 / span 2 / span 1",
    index: 84,
    numbers: [34, 35, 36],
    styles: "wr-absolute wr-w-full wr-h-[10%]",
  },
  {
    gridArea: "3 / 1 / span 1 / span 2",
    index: 85,
    numbers: [0, 1],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 1 / span 1 / span 2",
    index: 86,
    numbers: [0, 2],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 1 / span 1 / span 2",
    index: 87,
    numbers: [0, 3],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 2 / span 2 / span 1",
    index: 88,
    numbers: [1, 2],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 2 / span 1 / span 2",
    index: 89,
    numbers: [1, 4],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 2 / span 2 / span 1",
    index: 90,
    numbers: [2, 3],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 2 / span 1 / span 2",
    index: 91,
    numbers: [2, 5],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 2 / span 1 / span 2",
    index: 92,
    numbers: [3, 6],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 3 / span 2 / span 1",
    index: 93,
    numbers: [4, 5],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 3 / span 1 / span 2",
    index: 94,
    numbers: [4, 7],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 3 / span 2 / span 1",
    index: 95,
    numbers: [5, 6],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 3 / span 1 / span 2",
    index: 96,
    numbers: [5, 8],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 3 / span 1 / span 2",
    index: 97,
    numbers: [6, 9],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 4 / span 2 / span 1",
    index: 98,
    numbers: [7, 8],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 4 / span 1 / span 2",
    index: 99,
    numbers: [7, 10],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 4 / span 2 / span 1",
    index: 100,
    numbers: [8, 9],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 4 / span 1 / span 2",
    index: 101,
    numbers: [8, 11],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 4 / span 1 / span 2",
    index: 102,
    numbers: [9, 12],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 5 / span 2 / span 1",
    index: 103,
    numbers: [10, 11],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 5 / span 1 / span 2",
    index: 104,
    numbers: [10, 13],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 5 / span 2 / span 1",
    index: 105,
    numbers: [11, 12],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 5 / span 1 / span 2",
    index: 106,
    numbers: [11, 14],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 5 / span 1 / span 2",
    index: 107,
    numbers: [12, 15],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 6 / span 2 / span 1",
    index: 108,
    numbers: [13, 14],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 6 / span 1 / span 2",
    index: 109,
    numbers: [13, 16],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 6 / span 2 / span 1",
    index: 110,
    numbers: [14, 15],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 6 / span 1 / span 2",
    index: 111,
    numbers: [14, 17],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 6 / span 1 / span 2",
    index: 112,
    numbers: [15, 18],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 7 / span 2 / span 1",
    index: 113,
    numbers: [16, 17],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 7 / span 1 / span 2",
    index: 114,
    numbers: [16, 19],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 7 / span 2 / span 1",
    index: 115,
    numbers: [17, 18],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 7 / span 1 / span 2",
    index: 116,
    numbers: [17, 20],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 7 / span 1 / span 2",
    index: 117,
    numbers: [18, 21],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 8 / span 2 / span 1",
    index: 118,
    numbers: [19, 20],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 8 / span 1 / span 2",
    index: 119,
    numbers: [19, 22],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 8 / span 2 / span 1",
    index: 120,
    numbers: [20, 21],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 8 / span 1 / span 2",
    index: 121,
    numbers: [20, 23],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 8 / span 1 / span 2",
    index: 122,
    numbers: [21, 24],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 9 / span 2 / span 1",
    index: 123,
    numbers: [22, 23],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 9 / span 1 / span 2",
    index: 124,
    numbers: [22, 25],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 9 / span 2 / span 1",
    index: 125,
    numbers: [23, 24],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 9 / span 1 / span 2",
    index: 126,
    numbers: [23, 26],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 9 / span 1 / span 2",
    index: 127,
    numbers: [24, 27],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 10 / span 2 / span 1",
    index: 128,
    numbers: [25, 26],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 10 / span 1 / span 2",
    index: 129,
    numbers: [25, 28],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 10 / span 2 / span 1",
    index: 130,
    numbers: [26, 27],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 10 / span 1 / span 2",
    index: 131,
    numbers: [26, 29],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 10 / span 1 / span 2",
    index: 132,
    numbers: [27, 30],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 11 / span 2 / span 1",
    index: 133,
    numbers: [28, 29],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 11 / span 1 / span 2",
    index: 134,
    numbers: [28, 31],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 11 / span 2 / span 1",
    index: 135,
    numbers: [29, 30],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 11 / span 1 / span 2",
    index: 136,
    numbers: [29, 32],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 11 / span 1 / span 2",
    index: 137,
    numbers: [30, 33],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 12 / span 2 / span 1",
    index: 138,
    numbers: [31, 32],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "3 / 12 / span 1 / span 2",
    index: 139,
    numbers: [31, 34],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 12 / span 2 / span 1",
    index: 140,
    numbers: [32, 33],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "2 / 12 / span 1 / span 2",
    index: 141,
    numbers: [32, 35],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "1 / 12 / span 1 / span 2",
    index: 142,
    numbers: [33, 36],
    styles: "wr-w-[10%] wr-h-[95%]",
  },
  {
    gridArea: "2 / 13 / span 2 / span 1",
    index: 143,
    numbers: [34, 35],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
  {
    gridArea: "1 / 13 / span 2 / span 1",
    index: 144,
    numbers: [35, 36],
    styles: "wr-w-[95%] wr-h-[10%]",
  },
];

// Roulette UI Wheel Numbers
export const rouletteWheelNumbers = [
  {
    number: 0,
    color: RouletteWheelColor.GREEN,
    degree: 5,
  },
  {
    number: 32,
    color: RouletteWheelColor.RED,
    degree: 14.5,
  },
  {
    number: 15,
    color: RouletteWheelColor.GREY,
    degree: 24.5,
  },
  {
    number: 19,
    color: RouletteWheelColor.RED,
    degree: 34.5,
  },
  {
    number: 4,
    color: RouletteWheelColor.GREY,
    degree: 44.25,
  },
  {
    number: 21,
    color: RouletteWheelColor.RED,
    degree: 53.5,
  },
  {
    number: 2,
    color: RouletteWheelColor.GREY,
    degree: 63.5,
  },
  {
    number: 25,
    color: RouletteWheelColor.RED,
    degree: 73,
  },
  {
    number: 17,
    color: RouletteWheelColor.GREY,
    degree: 83,
  },
  {
    number: 34,
    color: RouletteWheelColor.RED,
    degree: 92.5,
  },

  {
    number: 6,
    color: RouletteWheelColor.GREY,
    degree: 102.5,
  },
  {
    number: 27,
    color: RouletteWheelColor.RED,
    degree: 112.5,
  },
  {
    number: 13,
    color: RouletteWheelColor.GREY,
    degree: 122,
  },
  {
    number: 36,
    color: RouletteWheelColor.RED,
    degree: 131.25,
  },
  {
    number: 11,
    color: RouletteWheelColor.GREY,
    degree: 141.25,
  },
  {
    number: 30,
    color: RouletteWheelColor.RED,
    degree: 150.5,
  },
  {
    number: 8,
    color: RouletteWheelColor.GREY,
    degree: 160.5,
  },
  {
    number: 23,
    color: RouletteWheelColor.RED,
    degree: 170,
  },
  {
    number: 10,
    color: RouletteWheelColor.GREY,
    degree: 179.5,
  },
  {
    number: 5,
    color: RouletteWheelColor.RED,
    degree: 189.5,
  },
  {
    number: 24,
    color: RouletteWheelColor.GREY,
    degree: 199.25,
  },
  {
    number: 16,
    color: RouletteWheelColor.RED,
    degree: 208.75,
  },
  {
    number: 33,
    color: RouletteWheelColor.GREY,
    degree: 218.75,
  },
  {
    number: 1,
    color: RouletteWheelColor.RED,
    degree: 228.5,
  },
  {
    number: 20,
    color: RouletteWheelColor.GREY,
    degree: 238.25,
  },
  {
    number: 14,
    color: RouletteWheelColor.RED,
    degree: 248.25,
  },
  {
    number: 31,
    color: RouletteWheelColor.GREY,
    degree: 258.25,
  },
  {
    number: 9,
    color: RouletteWheelColor.RED,
    degree: 267.5,
  },
  {
    number: 22,
    color: RouletteWheelColor.GREY,
    degree: 277,
  },
  {
    number: 18,
    color: RouletteWheelColor.RED,
    degree: 287,
  },
  {
    number: 29,
    color: RouletteWheelColor.GREY,
    degree: 296.75,
  },
  {
    number: 7,
    color: RouletteWheelColor.RED,
    degree: 306.5,
  },
  {
    number: 28,
    color: RouletteWheelColor.GREY,
    degree: 316.25,
  },
  {
    number: 12,
    color: RouletteWheelColor.RED,
    degree: 326.25,
  },
  {
    number: 35,
    color: RouletteWheelColor.GREY,
    degree: 336,
  },
  {
    number: 3,
    color: RouletteWheelColor.RED,
    degree: 345.75,
  },
  {
    number: 26,
    color: RouletteWheelColor.GREY,
    degree: 355.5,
  },
];
