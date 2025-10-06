import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Experience", href: "#experience" },
	{ name: "Contact", href: "#contact" },
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			// Detect active section
			const sections = navItems.map((item) => item.href.substring(1));
			const current = sections.find((section) => {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top <= 100 && rect.bottom >= 100;
				}
				return false;
			});
			if (current) setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-card/80 backdrop-blur-xl border-b border-glass-border shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<button
						onClick={() => scrollToSection("#home")}
						className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
					>
						Harsh Shah
					</button>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-8">
						{navItems.map((item) => (
							<button
								key={item.name}
								onClick={() => scrollToSection(item.href)}
								className={`relative text-sm font-medium transition-colors hover:text-primary ${
									activeSection === item.href.substring(1)
										? "text-primary"
										: "text-muted-foreground"
								}`}
							>
								{item.name}
								{activeSection === item.href.substring(1) && (
									<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary" />
								)}
							</button>
						))}
						<a href="/Harsh_Shah_Resume.pdf" download>
							<Button
								size="sm"
								className="bg-gradient-primary hover:shadow-glow-primary transition-shadow"
							>
								Download Resume
							</Button>
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-foreground"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-glass-border">
					<div className="container mx-auto px-4 py-4 space-y-3">
						{navItems.map((item) => (
							<button
								key={item.name}
								onClick={() => scrollToSection(item.href)}
								className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
									activeSection === item.href.substring(1)
										? "bg-primary/10 text-primary"
										: "text-muted-foreground hover:bg-muted"
								}`}
							>
								{item.name}
							</button>
						))}
						<a href="/Harsh_Shah_Resume.pdf" download>
							<Button className="w-full bg-gradient-primary">Download Resume</Button>
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};
