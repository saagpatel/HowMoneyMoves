import type { Section } from "../../types";

export const swift: Section = {
	id: "swift",
	title: "SWIFT International Wire",
	subtitle: "How dollars cross borders through correspondent banking chains",
	icon: "🌐",
	estimatedMinutes: 5,
	steps: [
		{
			id: "swift-1",
			label: "Initiate wire transfer",
			narrative:
				"You request an international wire at your bank. The bank collects: beneficiary name, bank name, SWIFT/BIC code, account number (IBAN in Europe), amount, and purpose of payment.",
		},
		{
			id: "swift-2",
			label: "SWIFT MT103 message",
			narrative:
				"Your bank creates a SWIFT MT103 message — the standard format for single customer credit transfers. This isn't the money itself; it's a secure instruction telling the next bank in the chain what to do.",
			detail:
				"SWIFT doesn't move money. It's a messaging network. The actual money moves through correspondent banking relationships and central bank settlement systems.",
		},
		{
			id: "swift-3",
			label: "Correspondent bank chain",
			narrative:
				"If your bank doesn't have a direct relationship with the beneficiary's bank, the message routes through one or more correspondent banks. Each bank in the chain holds nostro/vostro accounts with the next.",
			wonkyFact:
				"The average international wire passes through 2.6 intermediary banks before reaching the beneficiary.",
			wonkyFactSource: "Bank for International Settlements",
		},
		{
			id: "swift-4",
			label: "Nostro/vostro accounts",
			narrative:
				"Correspondent banks maintain paired accounts: a 'nostro' (ours with them) and 'vostro' (theirs with us). Money moves by debiting one nostro and crediting another — no central settlement system for cross-border transfers.",
			detail:
				"If US Bank A has a nostro account at UK Bank B, A's nostro is B's vostro. When A sends money to a UK beneficiary, B debits A's nostro and credits the beneficiary locally.",
		},
		{
			id: "swift-5",
			label: "Currency conversion",
			narrative:
				"At some point in the chain, dollars must be converted to the destination currency. The correspondent bank handling the conversion applies its FX rate — which includes a spread (their profit).",
			errorCase: {
				title: "FX rate mismatch",
				description:
					"The beneficiary may receive less than expected because each intermediary bank applies its own FX spread. A $10,000 wire might lose $50-200 across the chain.",
			},
		},
		{
			id: "swift-6",
			label: "Sanctions screening",
			narrative:
				"Every bank in the chain screens the transaction against sanctions lists (OFAC, EU, UN). If any name, country, or entity matches, the transfer is held for manual review.",
			errorCase: {
				title: "Sanctions hold",
				description:
					"A name match against the OFAC SDN list can freeze a transfer for days or permanently. Even partial matches ('fuzzy matching') trigger manual review. The beneficiary isn't notified.",
			},
		},
		{
			id: "swift-7",
			label: "Beneficiary bank receives",
			narrative:
				"The final bank in the chain receives the SWIFT message and credits the beneficiary's account. Total time: 1–5 business days depending on chain length, time zones, and compliance holds.",
			wonkyFact:
				"SWIFT gpi (global payments innovation) now tracks payment status end-to-end. About 90% of gpi payments are credited within 24 hours.",
			wonkyFactSource: "SWIFT.com",
		},
		{
			id: "swift-8",
			label: "Fees along the chain",
			narrative:
				"Each bank in the chain may deduct a fee. Your bank charges a sending fee ($25-50). Each intermediary takes $10-25. The beneficiary's bank may charge a receiving fee. Fee transparency is improving with SWIFT gpi.",
		},
	],
};
