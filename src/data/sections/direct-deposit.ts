import type { Section } from "../../types";

export const directDeposit: Section = {
	id: "direct-deposit",
	title: "Direct Deposit (ACH Credit)",
	subtitle:
		"The ACH credit push that delivers your paycheck from employer's bank to yours",
	icon: "🏦",
	estimatedMinutes: 4,
	steps: [
		{
			id: "dd-1",
			label: "ODFI originates ACH credit",
			narrative:
				"Your employer's bank (the ODFI) sends an ACH credit entry — an instruction to push money from the employer's account to your account at another bank.",
		},
		{
			id: "dd-2",
			label: "ACH Operator receives batch",
			narrative:
				"The Federal Reserve (or EPN) receives the batch file and sorts individual entries by receiving bank. Each entry is grouped into a delivery file for that bank.",
			wonkyFact:
				"The Fed processes ACH in fixed windows: 6:00am, 12:00pm, 4:00pm, and 5:30pm ET on business days.",
			wonkyFactSource: "Federal Reserve ACH processing schedule",
		},
		{
			id: "dd-3",
			label: "NACHA file structure",
			narrative:
				"Each payment is a 94-character fixed-width record inside a NACHA file. The file contains: a file header, batch headers, entry detail records, and control records with hash totals.",
			detail:
				"The entry detail record includes: transaction code (22 = credit), routing number, account number, amount, and individual name. The format was designed in 1972.",
		},
		{
			id: "dd-4",
			label: "RDFI receives entries",
			narrative:
				"Your bank (the RDFI) receives the delivery file from the ACH Operator. It posts the credit to your account based on the routing and account number in the entry.",
			wonkyFact:
				"The ACH return rate is less than 0.5% — meaning 99.5% of all ACH transactions complete without issues.",
			wonkyFactSource: "NACHA 2023 Annual Report",
			errorCase: {
				title: "Wrong account number",
				description:
					"If the routing/account number is wrong, the RDFI returns the entry with code R03 (No Account) or R04 (Invalid Account Number). The money bounces back through the entire chain.",
			},
		},
		{
			id: "dd-5",
			label: "Funds availability",
			narrative:
				"Under Regulation CC, your bank must make direct deposit funds available by the opening of the next business day. Many banks make them available at midnight or earlier.",
			wonkyFact:
				"Banks that advertise 'early direct deposit' simply credit your account when they receive the ACH file (T-1 or T-2) instead of waiting for the official pay date.",
			wonkyFactSource: "NACHA Operating Rules + Regulation CC",
		},
		{
			id: "dd-6",
			label: "Settlement between banks",
			narrative:
				"The actual money moves between banks via their reserve accounts at the Federal Reserve. The Fed debits the ODFI's reserve account and credits the RDFI's reserve account.",
		},
		{
			id: "dd-7",
			label: "Reg E protections",
			narrative:
				"If something goes wrong — unauthorized debit, wrong amount — Regulation E gives you 60 days to dispute. Your bank must investigate within 10 business days and provisionally credit your account.",
			errorCase: {
				title: "Unauthorized ACH debit",
				description:
					"Under Reg E, you can dispute any unauthorized ACH debit within 60 days. The RDFI must provisionally credit your account within 10 business days while investigating.",
			},
		},
	],
};
