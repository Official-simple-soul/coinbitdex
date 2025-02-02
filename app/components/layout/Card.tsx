interface Profile {
  id: number;
  title: string;
  description: string;
  image: React.ReactNode | string;
  icon: string;
}

interface CardProps {
  profile: Profile;
}

const Card: React.FC<CardProps> = ({ profile }) => {
  return (
    <div className="rounded-xl p-4 border-b shadow-lg w-[95%]">
      <div className="flex items-center mb-4 gap-4">
        {profile.image}
        {/* <div className="">{profile.image}</div> */}
        {/* <img
          src={profile.image}
          alt=""
          className="w-12 h-12 rounded-full mr-4"
        /> */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{profile.title}</h2>
          <p className="text-sm text-gray-800">{profile.description}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <span className="">{profile.icon}</span>
      </div>
    </div>
  );
};

export default Card;
