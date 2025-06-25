import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Halo! Saya Tugus 👋</h1>
      <p className="text-muted-foreground text-lg mb-6">
        Seorang Web Developer yang suka membangun aplikasi modern dan bersih.
      </p>
      <Link href="/projects">
        <Button>Lihat Proyek Saya</Button>
      </Link>
    </section>
  );
}
