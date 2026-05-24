import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="w-full">
      <div
        className="px-6 lg:pl-10 pb-0 lg:pb-6"
        style={{ paddingTop: "56px" }}
      >
        <div className="w-[167px] lg:w-[274px]">
          <Logo className="max-w-full" />
        </div>
      </div>
    </header>
  );
}
