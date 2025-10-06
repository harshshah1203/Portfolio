import { Briefcase, Code2, Trophy } from "lucide-react";

const experiences = [
  {
    icon: Trophy,
    title: "Competitive Programming",
    organization: "LeetCode & HackerRank",
    period: "2022 - Present",
    description: "Solved 300+ problems on LeetCode and 250+ on HackerRank, mastering Data Structures and Algorithms with focus on optimal solutions and time complexity.",
  },
  {
    icon: Code2,
    title: "Full Stack Developer",
    organization: "Personal Projects",
    period: "2023 - Present",
    description: "Built 6+ full-stack applications using modern technologies including React, React Native, Django, and Flask. Specialized in AI integration and chatbot development.",
  },
  {
    icon: Briefcase,
    title: "B.Tech Computer Science",
    organization: "University",
    period: "2022 - Present",
    description: "Currently in 3rd year, maintaining strong academic performance while focusing on practical software development and emerging technologies.",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          My <span className="bg-gradient-primary bg-clip-text text-transparent">Journey</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary hidden md:block"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow-primary flex-shrink-0 relative z-10">
                      <exp.icon size={28} className="text-primary-foreground" />
                    </div>

                    {/* Content card */}
                    <div className="flex-1 bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-glass-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary shadow-glow-primary flex-shrink-0">
                          <exp.icon size={20} className="text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                            <span className="text-primary font-semibold">{exp.organization}</span>
                            <span className="hidden sm:inline text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
