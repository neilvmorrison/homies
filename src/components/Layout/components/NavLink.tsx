import Link from "next/link";
import { NavLink } from "@mantine/core";
import { ReactNode } from "react";

interface INavLink {
  href: string;
  label: string;
  icon: ReactNode;
}

function NavigationLink({ href, label, icon: Icon }: INavLink) {
  return (
    <NavLink
      label={label}
      icon={Icon}
      sx={{ textDecoration: "none" }}
      component={Link}
      href={href}
    />
  );
}

export default NavigationLink;
