import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(req, res) {
  if (req.method === "POST") {
    const TOKEN = process.env.NEXT_PUBLIC_DATO_FULL_API_TOKEN;
    const client = new SiteClient(TOKEN);
    const registro = await client.items.create({
      itemType: process.env.NEXT_PUBLIC_COMUNIDADES_ITEM_TYPE,
      ...req.body,
    });
    res.json({
      registro: registro,
    });
    return;
  }
}
