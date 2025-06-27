import React from 'react';

const Footer = () => {
  return (

        <div className="not-prose relative overflow-hidden rounded-xl border bg-background p-0">
          <footer className="footer">
            <div className="flex w-full flex-col px-7 py-10 md:flex-row md:items-center md:justify-between md:px-10">
              <div className="flex w-full items-center justify-between gap-x-3 lg:pl-10">
                {[...Array(4)].map((_, colIndex) => (
                  <ul key={colIndex} className="flex flex-col gap-y-2">
                    {['About', 'Contact', 'Blog', 'Story'].map((item, i) => (
                      <a href="#" key={i}>
                        <li className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 hover:dark:text-neutral-100">
                          {item}
                        </li>
                      </a>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-y-5 border-t border-neutral-500/20 bg-neutral-100 px-7 py-10 dark:border-neutral-700/50 dark:bg-neutral-900 md:flex-row md:items-center md:px-10">
              <div className="flex flex-col items-start gap-y-3.5">
                <a href="#" className="flex items-center gap-x-2.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    alt="Magic UI"
                    src="https://magicui.design/icon.png"
                  />
                  <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Magic UI</h1>
                </a>
                <p className="text-neutral-900 dark:text-white">UI library for Design Engineers</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <div className="flex items-center gap-x-4">
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 dark:text-neutral-500 hover:dark:text-neutral-100"
                  >
                    {/* Example social icon */}
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                      <path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2Z" />
                    </svg>
                  </a>
                  {/* Add more social icons as needed */}
                </div>
                <p className="text-sm text-neutral-900 dark:text-white">All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>

  );
};

export default Footer;
