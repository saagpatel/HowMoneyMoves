import type { Section } from "../../types";

export const paycheck: Section = {
	id: "paycheck",
	title: "Paycheck & Payroll",
	subtitle:
		"How your employer turns a salary into an electronic instruction that moves money",
	icon: "💰",
	estimatedMinutes: 3,
	steps: [
		{
			id: "paycheck-1",
			label: "Employer initiates payroll",
			narrative:
				"Every pay period, your employer sends payroll data to a payroll processor like ADP, Paychex, or Gusto. This happens T-2 business days before your pay date.",
			wonkyFact:
				"ADP processes payroll for 1 in 6 US workers — about 26 million people every pay period.",
			wonkyFactSource: "ADP Annual Report 2023",
		},
		{
			id: "paycheck-2",
			label: "Payroll processor calculates",
			narrative:
				"The processor calculates gross pay, deductions (taxes, benefits, 401k), and net pay. It generates a NACHA-formatted ACH file containing payment instructions for every employee.",
			detail:
				"A NACHA file is a fixed-width text file with batch headers, entry detail records (one per payment), and control totals. The format hasn't fundamentally changed since the 1970s.",
		},
		{
			id: "paycheck-3",
			label: "ACH file submitted to ODFI",
			narrative:
				"The payroll processor submits the ACH file to its bank — the Originating Depository Financial Institution (ODFI). The ODFI validates the file format and batch totals.",
			wonkyFact:
				"93% of US workers receive pay via direct deposit — only 7% still get paper checks.",
			wonkyFactSource: "American Payroll Association 2023 Survey",
			errorCase: {
				title: "File rejected by ODFI",
				description:
					"If the NACHA file has formatting errors or the batch totals don't balance, the ODFI rejects the entire file. This can delay payroll by a full day.",
			},
		},
		{
			id: "paycheck-4",
			label: "ODFI forwards to ACH Operator",
			narrative:
				"The ODFI transmits the file to an ACH Operator — either the Federal Reserve or EPN (Electronic Payments Network, run by The Clearing House). The operator sorts transactions by receiving bank.",
			wonkyFact:
				"A typical payroll batch contains 500–2,000 individual entries. Large employers like Walmart submit batches with 1.5 million+ entries.",
			wonkyFactSource: "NACHA Operating Rules",
			errorCase: {
				title: "ACH Operator rejection",
				description:
					"If the batch fails Fed validation (invalid routing numbers, duplicate trace numbers), all entries in the batch are returned — delaying the entire payroll run.",
			},
		},
		{
			id: "paycheck-5",
			label: "Money reaches your bank",
			narrative:
				"The ACH Operator delivers sorted transactions to each Receiving Depository Financial Institution (RDFI). Your bank credits your account — typically available by early morning on pay day.",
			wonkyFact:
				"Payroll files are submitted T-2, but your bank often makes funds available at midnight on pay day — before settlement actually completes.",
			wonkyFactSource: "NACHA direct deposit rules",
		},
	],
};
