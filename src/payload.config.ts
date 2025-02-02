// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

/* Plugins */
import { seoPlugin } from '@payloadcms/plugin-seo';

/* Collections */
import { Users } from './app/(payload)/collections/Users';
import { Media } from './app/(payload)/collections/Media';
import { Theaters } from './app/(payload)/collections/Theaters';
import { Pages } from './app/(payload)/collections/Pages';

/* Globals */
import { Header } from './app/(payload)/config/globals/header';
import { Footer } from './app/(payload)/config/globals/footer';
import { Customization } from './app/(payload)/config/globals/customization';

/* Types */
import type { GenerateTitle } from '@payloadcms/plugin-seo/types';
import type { GenerateURL } from '@payloadcms/plugin-seo/types';
import type { Page } from './payload-types';

/* Utils */
import { getServerSideURL } from '@/lib/utils/payload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
	return doc.title
		? `${doc.title} | Payload Website Template`
		: 'Payload Website Template';
};

const generateURL: GenerateURL = ({ doc, globalConfig }) => {
	const url = getServerSideURL();
	if (globalConfig) {
		return `${url}/${globalConfig.slug}`;
	}
	const docWithSlug = doc as { slug?: string };
	if (docWithSlug.slug) {
		return `${url}/${docWithSlug.slug}`;
	}
	return url;
};

if (!process.env.DATABASE_URI) {
	throw new Error('Invalid ENV: DATABASE_URI is not set ❌');
}

if (!process.env.PAYLOAD_SECRET) {
	throw new Error('Invalid ENV: PAYLOAD_SECRET is not set ❌');
}

export default buildConfig({
	admin: {
		user: Users.slug,
		theme: 'dark',
		avatar: {
			Component: '@/_components/admin/AccountIcon.tsx',
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			graphics: {
				Logo: '@/_components/admin/AdminLogo.tsx',
			},
		},
	},
	collections: [Users, Media, Theaters, Pages],
	globals: [Customization, Header, Footer],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI,
		},
	}),
	sharp,
	plugins: [
		seoPlugin({
			generateTitle,
			generateURL,
		}),
	],
});
