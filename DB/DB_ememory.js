// pools.js
export const pools = [
  {
    id: 1,
    name: "Bolão da Sorte",
    description: "Bolão tradicional focado em grandes prêmios",
    color: "#000000",
  },
  {
    id: 2,
    name: "Bolão Premiado",
    description: "Bolão semanal com divisão equilibrada de prêmios",
    color: "#33B5FF",
  },
  {
    id: 3,
    name: "Bolão da Galera",
    description: "Bolão entre amigos e familiares",
    color: "#8E44AD",
  },
  {
    id: 4,
    name: "Bolão Milionário",
    description: "Bolão focado em jackpots acumulados",
    color: "#27AE60",
  },
  {
    id: 5,
    name: "Bolão Express",
    description: "Bolão rápido com apostas simples",
    color: "#F1C40F",
  },
];



// ===== Helpers de data =====

const daysFromNow = (days, hour = 21, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date.getTime();
};

//
const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.getTime();
};




export const contests = [
  // ===== POOL 1 =====
  {
    id: 101,
    contestNumber: 2456,
    poolId: 1,
    status: "open",
    createdAt: daysAgo(1),
    startAt: daysFromNow(0),
    prizeAmount: 200000,
    rules: [
      { points: 0, prize: 500, validUntilRound: null },
      { points: 5, prize: 2000, validUntilRound: 3 },
      { points: 6, prize: 5000, validUntilRound: 4 },
      { points: 8, prize: 15000, validUntilRound: 6 },
      { points: 9, prize: 30000, validUntilRound: 8 },
      { points: 10, prize: 60000, validUntilRound: 10 },
    ],
  },
  {
    id: 102,
    contestNumber: 2457,
    poolId: 1,
    status: "closed",
    createdAt: daysAgo(2),
    startAt: daysFromNow(7),
    prizeAmount: 180000,
    rules: [
      { points: 0, prize: 400, validUntilRound: null },
      { points: 5, prize: 1800, validUntilRound: 3 },
      { points: 6, prize: 4500, validUntilRound: 4 },
      { points: 8, prize: 13000, validUntilRound: 6 },
      { points: 9, prize: 26000, validUntilRound: 8 },
      { points: 10, prize: 52000, validUntilRound: 10 },
    ],
  },
  {
    id: 103,
    contestNumber: 2458,
    poolId: 1,
    status: "finished",
    createdAt: daysAgo(10),
    startAt: daysAgo(3),
    prizeAmount: 150000,
    rules: [
      { points: 0, prize: 300, validUntilRound: null },
      { points: 5, prize: 1200, validUntilRound: 3 },
      { points: 6, prize: 3500, validUntilRound: 4 },
      { points: 8, prize: 10000, validUntilRound: 6 },
      { points: 9, prize: 20000, validUntilRound: 8 },
      { points: 10, prize: 40000, validUntilRound: 10 },
    ],
  },

  // ===== POOL 2 =====
  {
    id: 201,
    contestNumber: 2460,
    poolId: 2,
    status: "open",
    createdAt: daysAgo(1),
    startAt: daysFromNow(7),
    prizeAmount: 220000,
    rules: [
      { points: 0, prize: 600, validUntilRound: null },
      { points: 5, prize: 2500, validUntilRound: 3 },
      { points: 6, prize: 6000, validUntilRound: 4 },
      { points: 8, prize: 18000, validUntilRound: 6 },
      { points: 9, prize: 35000, validUntilRound: 8 },
      { points: 10, prize: 70000, validUntilRound: 10 },
    ],
  },
  {
    id: 202,
    contestNumber: 2461,
    poolId: 2,
    status: "open",
    createdAt: daysAgo(3),
    startAt: daysFromNow(7),
    prizeAmount: 170000,
    rules: [
      { points: 0, prize: 450, validUntilRound: null },
      { points: 5, prize: 1800, validUntilRound: 3 },
      { points: 6, prize: 4500, validUntilRound: 4 },
      { points: 8, prize: 14000, validUntilRound: 6 },
      { points: 9, prize: 28000, validUntilRound: 8 },
      { points: 10, prize: 55000, validUntilRound: 10 },
    ],
  },
  {
    id: 203,
    contestNumber: 2462,
    poolId: 2,
    status: "finished",
    createdAt: daysAgo(12),
    startAt: daysAgo(4),
    prizeAmount: 140000,
    rules: [
      { points: 0, prize: 300, validUntilRound: null },
      { points: 5, prize: 1200, validUntilRound: 3 },
      { points: 6, prize: 3500, validUntilRound: 4 },
      { points: 8, prize: 11000, validUntilRound: 6 },
      { points: 9, prize: 22000, validUntilRound: 8 },
      { points: 10, prize: 45000, validUntilRound: 10 },
    ],
  },

  // ===== POOL 3 =====
  {
    id: 301,
    contestNumber: 2470,
    poolId: 3,
    status: "open",
    createdAt: daysAgo(2),
    startAt: daysFromNow(7),
    prizeAmount: 100000,
    rules: [
      { points: 0, prize: 200, validUntilRound: null },
      { points: 5, prize: 800, validUntilRound: 3 },
      { points: 6, prize: 2000, validUntilRound: 4 },
      { points: 8, prize: 6000, validUntilRound: 6 },
      { points: 9, prize: 12000, validUntilRound: 8 },
      { points: 10, prize: 25000, validUntilRound: 10 },
    ],
  },
  {
    id: 302,
    contestNumber: 2471,
    poolId: 3,
    status: "open",
    createdAt: daysAgo(3),
    startAt: daysFromNow(7),
    prizeAmount: 90000,
    rules: [
      { points: 0, prize: 180, validUntilRound: null },
      { points: 5, prize: 700, validUntilRound: 3 },
      { points: 6, prize: 1800, validUntilRound: 4 },
      { points: 8, prize: 5500, validUntilRound: 6 },
      { points: 9, prize: 11000, validUntilRound: 8 },
      { points: 10, prize: 22000, validUntilRound: 10 },
    ],
  },
  {
    id: 303,
    contestNumber: 2472,
    poolId: 3,
    status: "finished",
    createdAt: daysAgo(15),
    startAt: daysAgo(5),
    prizeAmount: 80000,
    rules: [
      { points: 0, prize: 150, validUntilRound: null },
      { points: 5, prize: 600, validUntilRound: 3 },
      { points: 6, prize: 1500, validUntilRound: 4 },
      { points: 8, prize: 5000, validUntilRound: 6 },
      { points: 9, prize: 10000, validUntilRound: 8 },
      { points: 10, prize: 20000, validUntilRound: 10 },
    ],
  },

  // ===== POOL 4 =====
  {
    id: 401,
    contestNumber: 2480,
    poolId: 4,
    status: "open",
    createdAt: daysAgo(1),
    startAt: daysFromNow(7),
    prizeAmount: 500000,
    rules: [
      { points: 0, prize: 1000, validUntilRound: null },
      { points: 5, prize: 5000, validUntilRound: 3 },
      { points: 6, prize: 12000, validUntilRound: 4 },
      { points: 8, prize: 40000, validUntilRound: 6 },
      { points: 9, prize: 80000, validUntilRound: 8 },
      { points: 10, prize: 150000, validUntilRound: 10 },
    ],
  },
  {
    id: 402,
    contestNumber: 2481,
    poolId: 4,
    status: "open",
    createdAt: daysAgo(4),
    startAt: daysFromNow(7),
    prizeAmount: 450000,
    rules: [
      { points: 0, prize: 900, validUntilRound: null },
      { points: 5, prize: 4500, validUntilRound: 3 },
      { points: 6, prize: 11000, validUntilRound: 4 },
      { points: 8, prize: 35000, validUntilRound: 6 },
      { points: 9, prize: 70000, validUntilRound: 8 },
      { points: 10, prize: 130000, validUntilRound: 10 },
    ],
  },
  {
    id: 403,
    contestNumber: 2482,
    poolId: 4,
    status: "finished",
    createdAt: daysAgo(20),
    startAt: daysAgo(6),
    prizeAmount: 400000,
    rules: [
      { points: 0, prize: 800, validUntilRound: null },
      { points: 5, prize: 4000, validUntilRound: 3 },
      { points: 6, prize: 10000, validUntilRound: 4 },
      { points: 8, prize: 30000, validUntilRound: 6 },
      { points: 9, prize: 60000, validUntilRound: 8 },
      { points: 10, prize: 120000, validUntilRound: 10 },
    ],
  },

  // ===== POOL 5 =====
  {
    id: 501,
    contestNumber: 2490,
    poolId: 5,
    status: "open",
    createdAt: daysAgo(2),
    startAt: daysFromNow(7),
    prizeAmount: 70000,
    rules: [
      { points: 0, prize: 150, validUntilRound: null },
      { points: 5, prize: 600, validUntilRound: 3 },
      { points: 6, prize: 1500, validUntilRound: 4 },
      { points: 8, prize: 4000, validUntilRound: 6 },
      { points: 9, prize: 8000, validUntilRound: 8 },
      { points: 10, prize: 15000, validUntilRound: 10 },
    ],
  },
  {
    id: 502,
    contestNumber: 2491,
    poolId: 5,
    status: "open",
    createdAt: daysAgo(3),
    startAt: daysFromNow(7),
    prizeAmount: 60000,
    rules: [
      { points: 0, prize: 120, validUntilRound: null },
      { points: 5, prize: 500, validUntilRound: 3 },
      { points: 6, prize: 1200, validUntilRound: 4 },
      { points: 8, prize: 3500, validUntilRound: 6 },
      { points: 9, prize: 7000, validUntilRound: 8 },
      { points: 10, prize: 13000, validUntilRound: 10 },
    ],
  },
  {
    id: 503,
    contestNumber: 2492,
    poolId: 5,
    status: "finished",
    createdAt: daysAgo(18),
    startAt: daysAgo(7),
    prizeAmount: 50000,
    rules: [
      { points: 0, prize: 100, validUntilRound: null },
      { points: 5, prize: 400, validUntilRound: 3 },
      { points: 6, prize: 1000, validUntilRound: 4 },
      { points: 8, prize: 3000, validUntilRound: 6 },
      { points: 9, prize: 6000, validUntilRound: 8 },
      { points: 10, prize: 12000, validUntilRound: 10 },
    ],
  },
];
