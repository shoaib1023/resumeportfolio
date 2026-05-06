import { useState, useEffect, useRef } from "react";
import Section from "../components/section";
import { lenisInstance } from "../components/lenis";

export default function ProjectsSection() {
    const [index, setIndex] = useState(0);

    const scrollRef = useRef<any>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const stop = () => lenisInstance.current?.stop();
        const start = () => lenisInstance.current?.start();

        el.addEventListener("mouseenter", stop);
        el.addEventListener("mouseleave", start);
        el.addEventListener("touchstart", stop, { passive: true });
        el.addEventListener("touchend", start);

        return () => {
            el.removeEventListener("mouseenter", stop);
            el.removeEventListener("mouseleave", start);
            el.removeEventListener("touchstart", stop);
            el.removeEventListener("touchend", start);
        };
    }, []);

    const projects = [
        {
            title: "Beiing Humans",
            description: [
                "Contributed to the development of a web platform using Next.js, React.js, and Node.js, delivering scalable and responsive user experiences.",
                "Implemented OCR-based functionality to enable text extraction and processing within the application.",
                "Developed and integrated backend services and APIs to support core platform features and data handling.",
                "Collaborated with a cross-functional team to design, build, and enhance key functionalities aligned with business requirements."
            ],
            image: "/assets/image.png",
        },
        {
            title: "Aquafina Bulk Delivery",
            description: [
                "Developed and maintained an admin panel for end-to-end order management in a bulk water delivery system.",
                "Built RESTful APIs using Node.js for scalable backend workflows.",
                "Integrated secure payment gateways with proper error handling.",
                "Implemented role-based access control and optimized database queries."
            ],
            image: "/assets/aqua.png",
        },
        {
            title: "3D Pendulum Data Visualization",
            description: [
                "Built an interactive 3D data visualization system using Three.js, transforming large-scale social media data into dynamic 'mountain peak' terrains.",
                "Designed and implemented data aggregation pipelines to scrape and normalize data from multiple social media sources.",
                "Engineered custom geometries and shaders to represent data density, trends, and anomalies through elevation and surface variations.",
            ],
            image: "/assets/pendulum.png",
        }
    ];

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, offsetWidth } = scrollRef.current;
        const newIndex = Math.round(scrollLeft / offsetWidth);
        setIndex(newIndex);
    };

    return (
        <Section title="Projects">
            <div className="sm:hidden">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pb-3 -mx-4 px-4"
                    style={{ scrollbarWidth: "none" }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="snap-center shrink-0 w-[85vw] border rounded-xl shadow-sm overflow-hidden"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-1.5 mt-3">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                scrollRef.current?.scrollTo({
                                    left: i * scrollRef.current.offsetWidth,
                                    behavior: "smooth",
                                });
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                i === index ? "bg-gray-800" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
                {projects.map((project) => (
                    <div key={project.title} className="border rounded-xl shadow-sm overflow-hidden">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            <DesktopCarousel projects={projects} />
        </Section>
    );
}

// -------- Desktop Carousel --------
function DesktopCarousel({ projects }: any) {
    const [index, setIndex] = useState(0);
    const visibleCount = 2;
    const maxIndex = projects.length - visibleCount;

    const next = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    const prev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

    const visibleProjects = projects.slice(index, index + visibleCount);

    return (
        <div className="hidden lg:flex items-center gap-4">
            <button onClick={prev} className="p-2 border rounded shrink-0 hover:bg-gray-100 transition-colors">
                ◀
            </button>

            <div className="grid grid-cols-2 gap-6 w-full">
                {visibleProjects.map((project: any) => (
                    <div key={project.title} className="border rounded-xl shadow-sm overflow-hidden">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            <button onClick={next} className="p-2 border rounded shrink-0 hover:bg-gray-100 transition-colors">
                ▶
            </button>
        </div>
    );
}

// -------- Project Card --------
function ProjectCard({ project }: any) {
    return (
        <>
            <img
                src={project.image}
                className="h-44 w-full object-contain bg-white p-2"
                alt={project.title}
            />
            <div className="p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <ul className="list-disc pl-5 mt-3 text-sm text-gray-500 space-y-1">
                    {project.description.map((d: string, i: number) => (
                        <li key={i}>{d}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}