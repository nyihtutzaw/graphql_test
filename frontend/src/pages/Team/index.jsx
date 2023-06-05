import useTeamsQuery from './useTeamsQuery';
import './index.css';

function Team() {
  const { data, loading, error } = useTeamsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='team-wrapper'>
      <table>
        <tr>
            <th>No</th>
            <th>Logo</th>
            <th>Team</th>
            <th>Players:</th>
            <th>Actions</th>
        </tr>
        {data.map((team,index) => (
          <tr key={team.id}>
            <td>{index+1}</td>
            <td><img src={team.logo} alt={team.name} /></td>
            <td>{team.name}</td>
            <td>{team.players.length}</td>
            <td>
                <button>Detail</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Team;
