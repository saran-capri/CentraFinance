import Image from "next/image";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-assest">
          <div>
            <Image
              src="/icons/CentraFinance_Logo.svg"
              alt="Auth image"
              width={600}
              height={600} 
            />
          </div>
        </div>
      </main>
    );
  }
  