import clientPromise, { dbName } from "../../../../server/mongodb/mongodb";
import { SITEMAP } from "./main";

export default async function sitemapHandler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        const sitemap = await db.collection(SITEMAP).findOne({ type: 'people' }, { projection: { content: 1 } });

        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');

        res.status(200).send(sitemap.content);
    } catch (error) {
        console.error('Error serving the sitemap:', error);
        res.status(500).send('Error fetching sitemap');
    }
}