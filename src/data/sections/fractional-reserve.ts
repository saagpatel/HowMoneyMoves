import type { Section } from "../../types";

export const fractionalReserve: Section = {
	id: "fractional-reserve",
	title: "Fractional Reserve Banking",
	subtitle: "How your deposit creates money through the lending cycle",
	icon: "📊",
	estimatedMinutes: 3,
	steps: [
		{
			id: "fr-1",
			label: "You deposit $100",
			narrative:
				"You deposit $100 in your bank. The bank doesn't just store it in a vault — it keeps a small fraction as reserves and lends the rest. This is fractional reserve banking.",
		},
		{
			id: "fr-2",
			label: "Bank lends $90",
			narrative:
				"The bank lends $90 to another customer (keeping $10 in reserves, historically). That borrower spends the $90, and it ends up deposited in another bank.",
			detail:
				"Since March 2020, the reserve requirement has been 0%. Banks now decide their own reserve levels based on operational needs, not regulatory minimums. The 10% ratio is used here for illustration.",
		},
		{
			id: "fr-3",
			label: "Second bank lends $81",
			narrative:
				"The second bank receives the $90 deposit, keeps $9 in reserves, and lends $81. That $81 gets deposited somewhere else. The cycle repeats.",
			wonkyFact:
				"With a theoretical 10% reserve ratio, the money multiplier is 10x — your original $100 deposit can create up to $1,000 in total deposits across the banking system.",
			wonkyFactSource: "Federal Reserve educational materials",
		},
		{
			id: "fr-4",
			label: "Money multiplier effect",
			narrative:
				"Each round of deposit → lend → deposit creates new money in the system. Your original $100 becomes $100 + $90 + $81 + $72.90 + ... The money supply expands.",
			errorCase: {
				title: "Bank run",
				description:
					"If too many depositors withdraw at once, the bank doesn't have enough reserves (it lent most of the money out). This is a bank run — the fundamental risk of fractional reserve banking. FDIC insurance ($250K limit) prevents most runs.",
			},
		},
		{
			id: "fr-5",
			label: "M1 and M2 money supply",
			narrative:
				"The Fed tracks this with M1 (checking deposits + cash) and M2 (M1 + savings + money market). Most 'money' is just numbers in bank ledgers, created through lending — not printed by the government.",
			wonkyFact:
				"As of 2023, US M2 money supply is about $21 trillion. Only about $2.3 trillion exists as physical cash. The rest is digital entries in bank databases.",
			wonkyFactSource: "Federal Reserve Statistical Release H.6",
		},
	],
};
