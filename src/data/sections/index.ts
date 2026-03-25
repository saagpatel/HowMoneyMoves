import type { Section } from "../../types";
import { ach } from "./ach";
import { directDeposit } from "./direct-deposit";
import { fedSettlement } from "./fed-settlement";
import { fractionalReserve } from "./fractional-reserve";
import { paycheck } from "./paycheck";
import { swift } from "./swift";

export const SECTIONS: Record<string, Section> = {
	paycheck,
	"direct-deposit": directDeposit,
	ach,
	"fed-settlement": fedSettlement,
	swift,
	"fractional-reserve": fractionalReserve,
};

export const SECTION_ORDER = [
	"paycheck",
	"direct-deposit",
	"ach",
	"fed-settlement",
	"swift",
	"fractional-reserve",
] as const;
