interface contentProps {
  content: any;
}

const Skills: React.FC<contentProps> = ({ content }) => {
  return (
    <div
      className={`flex items-center p-6 space-x-4 rounded-md min-w-[250px] bg-slate-100`}
    >
      <div className="flex items-center justify-center w-16 h-16 text-black text-3xl">
        <i className={`${content.icon}`}></i>
      </div>
      <h3 className=" text-black text-xl font-semibold">{content.name}</h3>
    </div>
  );
};
export default Skills;
