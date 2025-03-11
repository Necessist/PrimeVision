import Link from "next/link";
import LogoSvg from "../LogoSvg";
import {
  BellIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
} from "../svgIcons";
import { useRouter } from "next/router";

const Header = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[63px] bg-stone-800/30 backdrop-blur-sm z-50">
        <div className="w-full h-full flex justify-between items-center px-4">
          <Link href={`/`}>
            <div className="flex items-center gap-3">
              <LogoSvg size={28} />
              <h1 className="text-[21px] font-medium">
                <span>Prime</span>
                <span className="opacity-75">Vision</span>
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/search`}
              className="w-[40px] h-[40px] flex items-center  justify-center rounded-full bg-stone-800"
            >
              <SearchIcon size={22} />
            </Link>
            <button className="w-[40px] h-[40px] flex items-center  justify-center rounded-full bg-stone-800">
              <BellIcon size={22} />
            </button>
            <button className="w-[40px] hidden h-[40px] flex items-center  justify-center rounded-full bg-stone-800">
              <img
                src={`https://github.com/khandelwaldev.png`}
                className="rounded-full aspect-square object-cover"
                width={38}
                height={38}
                alt="User Pfp"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const BottomMenu = () => {
  const router = useRouter();
  const size = 22;
  const menuItems = [
    { label: "Home", href: "/", icon: <HomeIcon size={size} /> },
    { label: "Explore", href: "/explore", icon: <CompassIcon size={size} /> },
    {
      label: "Favourites",
      href: "/favourites",
      icon: <HeartIcon size={size} />,
    },
    { label: "Profile", href: "/profile", icon: <ProfileIcon size={size} /> },
    {
      label: "Settings",
      href: "/settings",
      icon: <SettingsIcon size={size} />,
    },
  ];
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-[58px] bg-stone-800/30 backdrop-blur-sm z-50">
        <div className="w-full h-full flex justify-around items-center">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <div
                className={`flex flex-col justify-center items-center gap-1 ${
                  router.pathname == item.href ? "text-[#90DFAA]" : ""
                }`}
              >
                <i>{item.icon}</i>
                <span className="text-[11px]">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <div>
        <Header />
        <BottomMenu />
      </div>
    </>
  );
};

export default Navbar;
