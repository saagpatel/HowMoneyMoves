import type { Section } from "../../types";

export const ach: Section = {
	id: "ach",
	title: "ACH Debit (Pull)",
	subtitle:
		"When a company pulls money from your account — bills, subscriptions, transfers",
	icon: "🔄",
	estimatedMinutes: 3,
	steps: [
		{
			id: "ach-1",
			label: "Authorization",
			narrative:
				"Before anyone can pull money from your account via ACH, you must authorize it — either via signed form, online agreement, or recorded phone call. This is required by NACHA rules.",
		},
		{
			id: "ach-2",
			label: "Originator creates debit entry",
			narrative:
				"The company (originator) creates an ACH debit entry — an instruction to pull money from your account. They submit this to their bank (ODFI) in a NACHA batch file.",
			wonkyFact:
				"79% of recurring bills in the US are paid via ACH debit — utilities, subscriptions, insurance, and loan payments.",
			wonkyFactSource: "NACHA 2023 Annual Report",
		},
		{
			id: "ach-3",
			label: "ACH Operator processes",
			narrative:
				"The ACH Operator sorts the debit entries by RDFI and delivers them. Your bank receives the instruction to debit your account.",
			wonkyFact:
				"EPN (Electronic Payments Network) handles about 60% of commercial ACH volume. The Federal Reserve handles the rest.",
			wonkyFactSource: "The Clearing House",
		},
		{
			id: "ach-4",
			label: "RDFI posts the debit",
			narrative:
				"Your bank debits your account for the specified amount. If you don't have sufficient funds, the bank decides whether to pay it anyway (overdraft) or return it.",
			wonkyFact:
				"The average ACH debit transaction is about $1,200 — but the median is much lower because a few large B2B payments skew the average.",
			wonkyFactSource: "Federal Reserve Payments Study 2023",
			errorCase: {
				title: "NSF — Non-Sufficient Funds (R01)",
				description:
					"If your balance is too low, the RDFI returns the entry with code R01 (Insufficient Funds). You may also get hit with a $35 overdraft/NSF fee from your bank.",
			},
		},
		{
			id: "ach-5",
			label: "Settlement (T+1)",
			narrative:
				"Settlement happens on the next business day. The Fed transfers the actual money between reserve accounts — debiting your bank's reserves and crediting the originator's bank.",
			wonkyFact:
				"Same-day ACH now handles up to $1 million per transaction, with three processing windows per day.",
			wonkyFactSource: "NACHA Rules §2.13",
		},
		{
			id: "ach-6",
			label: "Returns and disputes",
			narrative:
				"If something goes wrong, the RDFI can return the entry within 2 business days (most return codes). Common returns: R01 (NSF), R02 (closed account), R03 (no account), R10 (unauthorized).",
			errorCase: {
				title: "Unauthorized debit (R10)",
				description:
					"If you didn't authorize the debit, your bank returns it with R10. You have 60 days under Reg E for consumer accounts. The originator's bank eats the loss.",
			},
		},
	],
};
