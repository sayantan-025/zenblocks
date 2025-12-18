import React from "react";

const Footer = () => {
  return (
    <section className="py-20 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto px-6 text-center text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} ZenBlocks UI. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
