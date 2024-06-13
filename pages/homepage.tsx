import React from "react";
import Navbar from "@/components/shared/navbar";
import LoginModal from "@/components/login-modal";
import TopContent from "@/components/top-content";
import Shop from "@/components/shop";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <LoginModal />
      <TopContent />
      <Shop />
    </>
  );
}
