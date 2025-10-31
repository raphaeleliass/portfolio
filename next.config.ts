import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		qualities: [50, 75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "github.com",
			},
		],
	},
};

export default nextConfig;
