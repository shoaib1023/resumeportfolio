import Section from "../components/section";

export default function ExperienceSection() {
    const experience = [
        {
            image: "/assets/staples.png",
            title: "Software engineer (Contract)",
            company: "Staples — via Luminogics",
            location: "Pakistan",
            start: "Sept 2021",
            end: "Present",
            description: [
                "Developed and maintained scalable microservices using Node.js and Express, serving thousands of daily users, Built responsive, reusable UI components using React.js and Redux, improving page performance and reducing load times by 25%.","Collaborated within Agile Scrum teams, actively participating in sprint planning, reviews, and retrospectives.","Migrated the entire website from Electrode (Walmart’s framework) to the latest Next.js architecture.","Migrated backend services from a Java-based layer to Node.js, reducing API response time to 35%.","Worked with Jenkins to run CI/CD pipelines and manage application deployments.","Utilized Splunk to write queries and analyze logs for effective debugging and monitoring",
            ],
        },
        // {
        //     image: "/assets/microsoft.svg",
        //     title: "Full Stack developer",
        //     company: "Microsoft",
        //     location: "London",
        //     start: "May 2021",
        //     end: "Dec 2024",
        //     description: [
        //         "Full-stack development of large-scale, high-performance systems used by millions of users.",
        //         "Mentor junior engineers, conduct code reviews, and uphold engineering best practices.",
        //     ],
        // },
    ];

    return (
        <Section title="Experience">
            <div className="space-y-6">
                {experience.map((experience) => (
                    <div key={experience.title} className="w-full border border-gray-200 p-6 rounded-xl">
                        <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                                <div className="bg-red-500 border border-gray-200 rounded-lg p-3">
                                    <img
                                        src={experience.image}
                                        alt={experience.title}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-800">
                                        {experience.title}
                                    </h3>
                                    <div>{experience.company}</div>
                                </div>
                            </div>
                            <div>{experience.start} - {experience.end}</div>
                        </div>
                        <ul className="list-disc px-5 mt-6 text-gray-500 space-y-2">
                            {experience.description.map((description) => (
                                <li key={description}>{description}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}