import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/profile.jpg";

const skills = [
  { name: "JavaScript/TypeScript", level: 90 },
  { name: "React & React Native", level: 85 },
  { name: "Python & AI/ML", level: 88 },
  { name: "Django & Flask", level: 80 },
  { name: "Data Structures & Algorithms", level: 92 },
  { name: "PostgreSQL & Databases", level: 82 },
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
              <img
                src={profileImage}
                alt="Harsh Shah"
                className="relative rounded-full w-full h-auto border-4 border-primary/30 shadow-glow-primary hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Bio and Skills */}
          <div className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-glass-border shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Full Stack Developer & AI Enthusiast
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I am a 3rd-year B.Tech Computer Science and Engineering student with a strong 
                foundation in software development and problem-solving. My technical journey 
                spans across <span className="text-primary font-semibold">Web Development, Chatbot Engineering, 
                and Data Analytics</span>, where I have built multiple projects that demonstrate 
                both practical application and innovation.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Beyond projects, I am passionate about <span className="text-secondary font-semibold">Data 
                Structures and Algorithms</span>, having solved <span className="text-primary font-semibold">300+ 
                problems on LeetCode</span> and <span className="text-primary font-semibold">250+ on HackerRank</span>, 
                which sharpened my ability to design optimized solutions for complex challenges.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                With a blend of hands-on project experience and algorithmic expertise, I am 
                continuously expanding my skill set to contribute to impactful, real-world 
                software solutions.
              </p>

              {/* Skills */}
              <h4 className="text-xl font-bold mb-4 text-foreground">Technical Skills</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
