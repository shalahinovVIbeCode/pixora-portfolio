import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "Про мене — PIXORA",
  description:
    "Дмитро — засновник PIXORA. Один розробник для всього шляху цифрового продукту: від ідеї та дизайну до коду й запуску.",
};

export default function Page() {
  return <AboutPage />;
}
