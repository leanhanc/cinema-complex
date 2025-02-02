import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		dynamicIO: true,
		reactCompiler: true,
		useCache: true,
	},
};

export default withPayload(nextConfig);
