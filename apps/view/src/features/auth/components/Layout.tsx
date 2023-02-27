import { Title } from "@components/Utils";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
export const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col bg-base-100">
      <Title />
      <header className="flex h-12 items-center px-4 py-8">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="ml-2 text-xs font-extrabold">SLT-UPS</h1>
      </header>
      <section className="mt-[-8em] flex flex-grow flex-col items-center justify-center px-12">
        {children}
      </section>
    </div>
  );
};
