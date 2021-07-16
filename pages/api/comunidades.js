import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(req, res) {
  if (req.method === "POST") {
    const TOKEN = "759ff32cb624f4f143742fa9b572b8";
    const client = new SiteClient(TOKEN);
    const registro = await client.items.create({
      itemType: "972759",
      ...req.body,
    });
    res.json({
      registro: registro,
    });
    return;
  }
}
