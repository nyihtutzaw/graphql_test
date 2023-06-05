mutation DeleteTeam($id: ID!) {
  deleteTeam(id: $id)
}


mutation CreateTeam($input: TeamInput!) {
  createTeam(input: $input) {
    id
    name
    logo
  }
}


mutation UpdateTeam($id: ID!, $input: TeamInput!) {
  updateTeam(id: $id, input: $input) {
    id
    name
    logo
  }
}


query {
    teams {
        id
        name
        logo
        players {
          name
          kit
        }
    }
}

query Teams($keyword: String) {
  teams(keyword: $keyword) {
    id
    name
    logo
    players {
      id
      name
    }
  }
}

query GetTeam($id: ID!) {
  team(id: $id) {
    id
    name
    logo
  }
}


