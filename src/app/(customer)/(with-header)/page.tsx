import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Category } from "@/types/category";
import ProductGrid from "@/components/client/ProductGrid";

export default async function Home() {
  const categories: Category[] = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    orderBy: { price: "desc" },
    take: 4,
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      image: true,
    },
  });

  const formattedProducts = products.map((p) => ({
    ...p,
    image: p.image ?? undefined,
  }));

  return (
    <div>
      <main className="min-h-screen">
        <section className="relative min-h-[100vh] " data-header="dark">
          <Image
            src="/images/hero-section.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 z-10 flex items-end justify-center pb-30">
            <Link href="/collections">
              <button className="px-15 py-4 bg-white rounded-4xl text-black font-semibold tracking-widest hover:bg-gray-200 transition">
                SHOP NOW
              </button>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-[#E6E6E6]" data-header="light">
          <div className="max-w-[30%] mx-auto">
            <h2 className="text-2xl mb-8 text-center text-black">
              Explore Categories
            </h2>
            <div className="flex justify-center flex-wrap">
              {categories.map((category, index) => (
                <span key={category.id} className="flex items-center">
                  <Link
                    href={`/collections/${category.slug}`}
                    className="underline text-black"
                  >
                    Shop {category.name}
                  </Link>
                  {index < categories.length - 1 && (
                    <span className="mx-3 text-xl text-black">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F2F2F2]" data-header="light">
          <div className="grid md:grid-cols-2  items-center  mx-auto ">
            <div className="w-full h-96 md:h-[1000px] relative">
              <Image
                src="/images/luxury-watch-bg.png"
                alt="Luxury Watch"
                fill
                className="object-cover  shadow-lg"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 text-center px-45">
              <h4 className="text-lg tracking-wider text-black">
                PRODUCT STORY
              </h4>
              <h2 className="text-7xl font-semibold text-black">
                Elegance That Lasts
              </h2>
              <h3 className="text-[1.35rem] text-[#4D4D4D]">
                Designed for the discerning gentleman, this timepiece combines
                timeless aesthetics with durable craftsmanship for a statement
                that never fades.
              </h3>

              <Link
                href="/collections/watches"
                style={{ wordSpacing: "0.15rem" }}
                className="px-8 py-3 rounded-lg text-xl text-black font-semibold transition underline decoration-1 underline-offset-4 "
              >
                Discover the Timeless Collection
              </Link>
            </div>
          </div>
        </section>

        <section
          data-header="dark"
          className="relative w-screen h-screen flex items-center justify-center bg-[url('/images/homepage-shoes.jpeg')] bg-cover bg-center "
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative text-center gap-8 flex flex-col items-center px-[35rem] ">
            <h4 className=" text-white text-lg tracking-wider ">
              For the Modern Gentleman
            </h4>
            <h1 className="text-white text-8xl font-semibold">
              Shoes for Every Occasion
            </h1>
            <p className="text-white text-[1.35rem]">
              Treat yourself to elegant footwear
            </p>
            <Link href="/collections/shoes" style={{ wordSpacing: "0.15rem" }}>
              <button className="px-8 py-4 bg-white rounded-4xl text-black text-lg tracking-wide hover:bg-gray-200 transition">
                Discover the Collection
              </button>
            </Link>
          </div>
        </section>

        <section
          className="bg-[#F2F2F2] flex justify-center items-center py-40"
          data-header="light"
        >
          <div className="max-w-3xl w-full flex flex-col items-center gap-8 px-6  text-center">
            <h4 className="text-lg tracking-wider text-black">PRODUCT STORY</h4>
            <h2 className="text-7xl font-semibold text-center text-black">
              Crafted for Every Gentleman
            </h2>
            <h3 className="text-[1.35rem] text-[#4D4D4D]">
              From the stitching to the finish, every wallet is meticulously
              designed for durability, elegance, and a lasting impression.
            </h3>

            <Link
              href="/collections/wallets"
              style={{ wordSpacing: "0.15rem" }}
              className="px-8 py-3 rounded-lg text-xl font-semibold transition underline decoration-1 underline-offset-4 text-black"
            >
              Discover the Timeless Collection
            </Link>

            <div className="w-64 h-64 md:w-100 md:h-100 relative rounded-xl overflow-hidden ">
              <Image
                src="/images/travel-wallett.png"
                alt="Luxury Wallet"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-28 bg-[#E6E6E6]" data-header="light">
          <div className="max-w-full mx-auto ">
            <h2 className="text-3xl mb-8 text-center text-black">
              Featured Products
            </h2>

            <ProductGrid products={formattedProducts} />
          </div>
        </section>
      </main>
    </div>
  );
}
