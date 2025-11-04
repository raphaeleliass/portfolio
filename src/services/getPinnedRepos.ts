const query = `
  {
    user(login: "raphaeleliass") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            createdAt
            updatedAt
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedRepos() {
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
		next: { revalidate: 60 },
	});
	if (!response.ok) throw new Error("Erro ao buscar repositórios pinados");
	const { data } = await response.json();

	return data.user.pinnedItems.nodes;
}
