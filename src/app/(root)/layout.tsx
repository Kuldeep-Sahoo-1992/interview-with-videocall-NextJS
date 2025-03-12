import StreamClientProvide from "@/components/provider/StreamClientProvide";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StreamClientProvide>{children}</StreamClientProvide>;
};

export default Layout;
