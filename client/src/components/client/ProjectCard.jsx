import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onClick }) => {
  const navigate = useNavigate();

  const statusColor = project.status === 'open' ? 'text-green-500' : 'text-yellow-500';

  const handleUpdate = (e) => {
    e.stopPropagation();
    navigate(`/updateproject/${project.id}`); // You can handle the update page
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Call delete mutation here or send to a modal confirmation if you want
    console.log('Delete project', project.id);
  };

  return (
    <div
      className="border p-4 rounded-md shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div>
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm">{project.description}</p>
        <p className={`mt-2 font-semibold ${statusColor}`}>{project.status}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={handleUpdate} className="text-blue-500 hover:text-blue-700">
        Update
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
Deltee        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
