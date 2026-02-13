import { getSellerSettings } from "@/app/actions/settings";
import SettingsClientPage from "@/components/(dashboards)/sellers-dashboard/settings/settings-client-page";

export default async function SettingsPage() {
  const result = await getSellerSettings();
  const settingsData = result.success && result.data ? result.data : null;

  return <SettingsClientPage initialData={settingsData} />;
}
