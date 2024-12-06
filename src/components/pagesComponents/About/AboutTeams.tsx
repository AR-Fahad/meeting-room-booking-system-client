import designer1 from "@/assets/images/p (1).jpg";
import designer2 from "@/assets/images/p (2).jpg";
import developer1 from "@/assets/images/p (3).jpg";
import developer2 from "@/assets/images/p (4).jpg";
import developer3 from "@/assets/images/p (5).jpg";
import manager from "@/assets/images/p (6).jpg";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Manager", image: manager },
  { id: 2, name: "Marrie Leo", role: "Developer", image: designer1 },
  { id: 3, name: "Charlie Davis", role: "Developer", image: designer2 },
  { id: 4, name: "Diana Evans", role: "Developer", image: developer1 },
  { id: 5, name: "Ella Fisher", role: "Designer", image: developer2 },
  { id: 6, name: "Frank Green", role: "Designer", image: developer3 },
];

const AboutTeams = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-priColor mb-16">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {teamMembers?.map((member) => (
          <div key={member.id} className="relative group">
            <img
              src={member.image}
              alt={member.name}
              className="w-full rounded-full object-cover shadow-lg transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 rounded-full">
              <div className="text-center text-white">
                <h3 className="lg:text-xl font-semibold">{member.name}</h3>
                <p className="text-xs md:text-sm">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTeams;
