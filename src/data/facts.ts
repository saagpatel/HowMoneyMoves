interface Fact {
	value: string;
	description: string;
	source: string;
}

interface FactCategory {
	category: string;
	facts: Fact[];
}

export const FINANCIAL_FACTS: FactCategory[] = [
	{
		category: "ACH Network",
		facts: [
			{
				value: "30 billion",
				description: "ACH transactions processed in 2023",
				source: "NACHA 2023 Annual Report",
			},
			{
				value: "$80.1 trillion",
				description: "Total ACH transaction value in 2023",
				source: "NACHA 2023 Annual Report",
			},
			{
				value: "T+1 business day",
				description: "Standard ACH settlement time",
				source: "NACHA Operating Rules",
			},
			{
				value: "10:30am, 2:45pm, 4:45pm ET",
				description: "Same-day ACH processing windows",
				source: "NACHA Rules §2.13",
			},
		],
	},
	{
		category: "Federal Reserve",
		facts: [
			{
				value: "~1 million",
				description: "Daily Fedwire transactions",
				source: "Federal Reserve Payments Study",
			},
			{
				value: "~$4 trillion",
				description: "Daily Fedwire transaction value",
				source: "Federal Reserve Payments Study",
			},
			{
				value: "0%",
				description: "US bank reserve requirement (since March 26, 2020)",
				source: "Federal Reserve Board",
			},
		],
	},
	{
		category: "SWIFT",
		facts: [
			{
				value: "11,000+",
				description: "SWIFT member institutions across 200+ countries",
				source: "SWIFT.com",
			},
			{
				value: "1–5 business days",
				description: "MT103 settlement time range",
				source: "SWIFT documentation",
			},
			{
				value: "2.6",
				description:
					"Average number of intermediary banks in a correspondent chain",
				source: "Bank for International Settlements",
			},
		],
	},
	{
		category: "Payroll",
		facts: [
			{
				value: "T-2 business days",
				description: "Average payroll file submission lead time",
				source: "NACHA direct deposit rules",
			},
		],
	},
];
