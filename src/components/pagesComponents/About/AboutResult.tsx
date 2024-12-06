const companyNumberResult = [
  {
    id: 1,
    value: "300%",
    name: "Company Growth",
  },
  {
    id: 2,
    value: "65+",
    name: "Company Works",
  },
  {
    id: 3,
    value: "100k+",
    name: "Room Booking",
  },
];

const AboutResult = () => {
  return (
    <div>
      <section>
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Our results in numbers</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {companyNumberResult?.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white rounded-lg shadow hover:scale-105 duration-150 border-[0.1px] border-b-2 border-r-2 space-y-2 "
              >
                <h4 className="text-4xl text-priColor font-bold text-common-600">
                  {item.value}
                </h4>
                <h2 className="font-semibold text-xl">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutResult;
