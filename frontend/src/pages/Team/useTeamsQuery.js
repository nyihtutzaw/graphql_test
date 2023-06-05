import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TEAMS = gql`
  query {
    teams {
      id
      name
      logo
      players {
        name
      }
    }
  }
`;

const useTeamsQuery = () => {
  const { data, loading, error } = useQuery(GET_TEAMS);

  return {
    data: data ? data.teams : [],
    loading,
    error,
  };
};

export default useTeamsQuery;
