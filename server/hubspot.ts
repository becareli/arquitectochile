import { ReplitConnectors } from "@replit/connectors-sdk";

interface HubSpotContactData {
  email: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  city?: string;
  address?: string;
  message?: string;
  lifecyclestage?: string;
}

export async function upsertHubSpotContact(
  data: HubSpotContactData
): Promise<{ ok: boolean; contactId?: string; error?: string }> {
  try {
    const connectors = new ReplitConnectors();

    const properties: Record<string, string> = {
      email: data.email,
      firstname: data.firstname,
      ...(data.lastname && { lastname: data.lastname }),
      ...(data.phone && { phone: data.phone }),
      ...(data.city && { city: data.city }),
      ...(data.address && { address: data.address }),
      ...(data.message && { message: data.message }),
      ...(data.lifecyclestage && { lifecyclestage: data.lifecyclestage }),
    };

    const searchRes = await connectors.proxy(
      "hubspot",
      `/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                { propertyName: "email", operator: "EQ", value: data.email },
              ],
            },
          ],
          limit: 1,
        }),
      }
    );

    const searchData = await searchRes.json() as any;

    if (searchData.results && searchData.results.length > 0) {
      const existingId = searchData.results[0].id;
      await connectors.proxy("hubspot", `/crm/v3/objects/contacts/${existingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ properties }),
      });
      console.log(`🟠 HubSpot: contacto actualizado id=${existingId}`);
      return { ok: true, contactId: existingId };
    }

    const createRes = await connectors.proxy("hubspot", `/crm/v3/objects/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ properties }),
    });

    const createData = await createRes.json() as any;

    if (createData.id) {
      return { ok: true, contactId: createData.id };
    }

    const errMsg = createData.message || JSON.stringify(createData);
    console.warn("⚠️ HubSpot create response:", errMsg);
    return { ok: false, error: errMsg };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
