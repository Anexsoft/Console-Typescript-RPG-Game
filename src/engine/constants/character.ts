export const STR = 5;
export const VIT = 5;
export const INT = 5;
export const DEX = 5;
export const LUK = 5;

export const BASE_HP = 50;
export const HP_PER_VIT = 5;

export const BASE_MP = 20;
export const MP_PER_INT = 3;

export const BASE_DMG = 20;
export const DMG_PER_STR = 3;

export const CTR_PER_LUK = 0.5;
export const EVA_PER_DEX = 0.5;

export const RES_PER_LEVEL = 0.5;

export const STATS_AVAILABLE_PER_LEVEL = 3;

export const CHARACTER_LEVEL = {
  1: [0, 20],
  2: [21, 50],
  3: [51, 90],
  4: [91, 140],
  5: [141, 200],
  6: [201, 270],
  7: [271, 350],
  8: [351, 440],
  9: [441, 540],
  10: [541, 650],
  11: [651, 770],
  12: [771, 900],
  13: [901, 1040],
  14: [1041, 1190],
  15: [1191, 1350],
  16: [1351, 1520],
  17: [1521, 1700],
  18: [1701, 1890],
  19: [1891, 2090],
  20: [2091, 2300],
  21: [2301, 2520],
  22: [2521, 2750],
  23: [2751, 2990],
  24: [2991, 3240],
  25: [3241, 3500],
  26: [3501, 3770],
  27: [3771, 4050],
  28: [4051, 4340],
  29: [4341, 4640],
  30: [4641, 4950],
  31: [4951, 5270],
  32: [5271, 5600],
  33: [5601, 5940],
  34: [5941, 6290],
  35: [6291, 6650],
  36: [6651, 7020],
  37: [7021, 7400],
  38: [7401, 7790],
  39: [7791, 8190],
  40: [8191, 8600],
  41: [8601, 9020],
  42: [9021, 9450],
  43: [9451, 9890],
  44: [9891, 10340],
  45: [10341, 10800],
  46: [10801, 11270],
  47: [11271, 11750],
  48: [11751, 12240],
  49: [12241, 12740],
  50: [12741, 13250],
};

export const CHARACTER_MAX_LEVEL = Math.max(
  ...Object.keys(CHARACTER_LEVEL).map(Number),
);
