import type { Section } from "../../types";

export const fedSettlement: Section = {
	id: "fed-settlement",
	title: "Federal Reserve Settlement",
	subtitle:
		"How the Fed actually moves money between banks using reserve accounts",
	icon: "🏛️",
	estimatedMinutes: 4,
	steps: [
		{
			id: "fed-1",
			label: "Reserve accounts",
			narrative:
				"Every US bank holds a reserve account at the Federal Reserve. When money moves between banks, the Fed debits one reserve account and credits another. No physical cash moves.",
			wonkyFact:
				"Since March 2020, the reserve requirement is 0% — banks aren't required to hold any minimum reserves. They keep reserves for operational liquidity, not regulatory minimums.",
			wonkyFactSource: "Federal Reserve Board",
		},
		{
			id: "fed-2",
			label: "Deferred Net Settlement (ACH)",
			narrative:
				"For ACH, the Fed uses deferred net settlement. It tallies all the debits and credits between each pair of banks throughout the day, then settles the net difference once.",
			detail:
				"If Bank A owes Bank B $10M across thousands of individual ACH entries, and Bank B owes Bank A $7M, the Fed only moves $3M net from A's reserve account to B's.",
		},
		{
			id: "fed-3",
			label: "Fedwire (real-time gross settlement)",
			narrative:
				"For large, time-sensitive transfers, banks use Fedwire — real-time gross settlement. Each transfer is settled individually and immediately, not batched. Finality is instant and irrevocable.",
			wonkyFact:
				"Fedwire processes about 1 million transfers per day, worth roughly $4 trillion. The average Fedwire transfer is $4 million.",
			wonkyFactSource: "Federal Reserve Payments Study",
		},
		{
			id: "fed-4",
			label: "CHIPS (private settlement)",
			narrative:
				"CHIPS (Clearing House Interbank Payments System) is a private-sector alternative to Fedwire, run by The Clearing House. It handles about 95% of US cross-border dollar payments.",
			wonkyFact:
				"CHIPS settles $1.8 trillion daily across roughly 250,000 transactions — making it one of the largest private payment systems in the world.",
			wonkyFactSource: "The Clearing House Annual Report",
			errorCase: {
				title: "Daylight overdraft",
				description:
					"If a bank's reserve account goes negative during the day (before final settlement), that's a daylight overdraft. The Fed charges a fee and monitors these closely. Persistent overdrafts can trigger regulatory action.",
			},
		},
		{
			id: "fed-5",
			label: "End-of-day settlement",
			narrative:
				"At the end of each business day, all deferred settlements are finalized. Every bank's reserve account reflects all the day's ACH, check, and Fedwire activity. The books must balance.",
			wonkyFact:
				"The Fed's FedNow service launched in July 2023, enabling instant 24/7 settlement for the first time. It's designed to eventually replace same-day ACH for small payments.",
			wonkyFactSource: "Federal Reserve FedNow Service",
		},
		{
			id: "fed-6",
			label: "T+1 and beyond",
			narrative:
				"Most ACH settles T+1 (next business day). Same-day ACH settles same day. Fedwire is real-time. Checks can take T+2. The Fed is the ultimate arbiter of who owes what.",
			errorCase: {
				title: "Bank failure during settlement",
				description:
					"If a bank fails mid-day, the Fed halts its Fedwire activity and the FDIC steps in. Pending ACH entries are handled by the acquiring bank or returned. Deposits up to $250K are insured.",
			},
		},
	],
};
