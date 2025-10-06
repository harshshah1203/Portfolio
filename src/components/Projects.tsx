import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Rainfall Prediction System",
    category: "AI",
    description: "Machine learning model that predicts rainfall patterns using historical weather data",
    longDescription: "Developed a comprehensive rainfall prediction system using advanced machine learning algorithms. The system analyzes historical weather patterns, atmospheric conditions, and geographical data to provide accurate rainfall forecasts. Implemented using Jupyter Notebook with Python libraries including scikit-learn, pandas, and numpy.",
    tech: ["Python", "Jupyter", "scikit-learn", "pandas"],
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80",
  },
  {
    id: 2,
    title: "ChatBot AI",
    category: "AI",
    description: "Intelligent customer service automation chatbot powered by TensorFlow",
    longDescription: "Built an advanced AI chatbot for customer service automation using TensorFlow and natural language processing. The bot can understand user intent, provide contextual responses, and handle multiple conversation flows. Features include sentiment analysis, multi-language support, and integration capabilities with various platforms.",
    tech: ["Python", "TensorFlow", "NLP", "Flask"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
  },
  {
    id: 3,
    title: "MediAware",
    category: "Web",
    description: "AI-Driven Public Health Chatbot for Disease Awareness",
    longDescription: "Created an innovative public health platform that leverages AI to provide accurate disease information and health guidance. The system features a conversational AI assistant built with Flask backend, responsive frontend using HTML/CSS/JavaScript, and integrates with health databases to provide up-to-date medical information while maintaining user privacy.",
    tech: ["HTML", "CSS", "JavaScript", "Flask", "AI"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: 4,
    title: "FitnessPal",
    category: "Mobile",
    description: "Comprehensive workout planning mobile application",
    longDescription: "Developed a full-featured fitness application using React Native that helps users plan, track, and optimize their workout routines. Features include personalized workout plans, progress tracking with charts, exercise library with instructions, and social sharing capabilities. Includes offline mode for gym usage.",
    tech: ["React Native", "TypeScript", "Redux"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    id: 5,
    title: "BookClub",
    category: "Web",
    description: "Social reading platform connecting book enthusiasts",
    longDescription: "Built a comprehensive social platform for book lovers using Django and PostgreSQL. Features include user profiles, book reviews and ratings, reading lists, discussion forums, book recommendations based on reading history, and real-time notifications. Implements secure authentication and optimized database queries for performance.",
    tech: ["Django", "PostgreSQL", "React", "REST API"],
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
  },
  {
    id: 6,
    title: "WeatherNow",
    category: "Web",
    description: "Real-time weather dashboard with advanced forecasting",
    longDescription: "Created an interactive weather dashboard that provides real-time weather data and forecasts using multiple weather APIs. Features include current conditions, 7-day forecast, weather maps, severe weather alerts, and location-based recommendations. Built with modern JavaScript, featuring responsive design and smooth animations.",
    tech: ["JavaScript", "APIs", "Chart.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
  },
];

const categories = ["All", "Web", "Mobile", "AI"];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gradient-primary" : "border-primary/30"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-glass-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                <Badge className="absolute top-4 right-4 bg-primary">{project.category}</Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-card/95 backdrop-blur-xl border-glass-border">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary">{selectedProject.category}</Badge>
                  {selectedProject.tech.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-primary">
                    <Github className="mr-2" size={18} />
                    View Code
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary/30">
                    <ExternalLink className="mr-2" size={18} />
                    Live Demo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
