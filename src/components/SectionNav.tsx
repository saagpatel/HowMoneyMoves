import { NavLink } from "react-router-dom";

interface SectionNavItem {
	id: string;
	title: string;
	icon: string;
}

const SECTIONS: SectionNavItem[] = [
	{ id: "paycheck", title: "Paycheck", icon: "💰" },
	{ id: "direct-deposit", title: "Direct Deposit", icon: "🏦" },
	{ id: "ach", title: "ACH Transfer", icon: "🔄" },
	{ id: "fed-settlement", title: "Fed Settlement", icon: "🏛️" },
	{ id: "swift", title: "SWIFT Wire", icon: "🌐" },
	{ id: "fractional-reserve", title: "Fractional Reserve", icon: "📊" },
];

export function SectionNav() {
	return (
		<nav className="flex gap-1 overflow-x-auto px-2 py-2">
			{SECTIONS.map((section) => (
				<NavLink
					key={section.id}
					to={`/${section.id}`}
					className={({ isActive }) =>
						`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
							isActive
								? "bg-trace-primary/10 text-text-accent"
								: "text-text-secondary hover:bg-elevated hover:text-text-primary"
						}`
					}
				>
					<span>{section.icon}</span>
					<span className="hidden sm:inline">{section.title}</span>
				</NavLink>
			))}
		</nav>
	);
}
