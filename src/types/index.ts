export interface TypeGithubPinned {
	id: string;
	name: string;
	description: string;
	url: string;
	stargazerCount: number;
	createdAt: string;
	updatedAt: string;
	languages: {
		nodes: [
			{
				name: string;
			},
			{
				name: string;
			},
			{
				name: string;
			},
		];
	};
}

export interface TypeBlogPost {
	id: string;
	authorImg: string;
	author: string;
	title: string;
	content: string;
	draft: boolean;
	createdAt: string;
	updatedAt: string;
}
