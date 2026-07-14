import type { Metadata } from "next";
import { ContactsPage } from "./ContactsPage";

export const metadata: Metadata = {
  title: "Контакти — PIXORA",
  description:
    "Зв’яжіться з PIXORA: Telegram, Instagram, Email або GitHub. Відповідь протягом доби.",
};

export default function Page() {
  return <ContactsPage />;
}
