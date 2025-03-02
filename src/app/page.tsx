import Icon from "@/components/share/Icon";

const benefits = [
  {
    id: 1,
    icon: "seal-percent",
    description: (
      <p>
        A <span className="text-brand_1 font-semibold">30%</span> early bird
        discount
      </p>
    ),
  },
  {
    id: 2,
    icon: "crown",
    description: (
      <p>
        <span className="text-brand_1 font-semibold">Priority access</span> to
        our upcoming features
      </p>
    ),
  },
  {
    id: 3,
    icon: "headset",
    description: (
      <p>
        <span className="text-brand_1 font-semibold">Personalized support</span>{" "}
        from our team
      </p>
    ),
  },
  {
    id: 4,
    icon: "arrows-counter-clockwise",
    description: <p>Regular updates and clear guidance</p>,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Icon
        name="blur-logo"
        width="296px"
        height="220px"
        className="mt-[68px] mb-[22px]"
      />
      <div className="w-[722px] flex flex-col gap-12">
        <div className="flex flex-col items-center">
          <p className="bg-gradient_title bg-clip-text text-transparent text-[48px] leading-[58px] font-bold mb-4">
            Join our waitlist!
          </p>
          <p>
            Join the S-mining waitlist today and get ready for a better way to
            mine.
          </p>
        </div>
        <div>
          <p className="text-brand_1 text-[16px]/[22px] font-semibold mb-6 text-center">
            As an early member, you will receive
          </p>
          <div className="flex gap-3">
            {benefits.map((item) => (
              <div
                key={item.id}
                className="p-3 flex-1 border border-[#525362] rounded-2xl bg-gradient_tab flex flex-col items-start"
              >
                <Icon
                  name={item.icon}
                  width="24px"
                  height="24px"
                  className="mb-4"
                />
                {item.description}
              </div>
            ))}
          </div>
        </div>
        <button className="bg-gradien_button hover:bg-gradien_button_hover font-semibold text-base w-[200px] h-[48px] sm:h-[56px] flex items-center justify-center rounded-lg transition-all duration-300 mx-auto">
          Join now!
        </button>
      </div>
    </main>
  );
}
