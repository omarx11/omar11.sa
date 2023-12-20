import { author } from "@/app/config/meta";
import { Heading } from "@/app/components/ui/Heading";

export const metadata = {
  title: "License Page",
  description: `MIT License for ${author.fullName} website`,
  keywords: [`${author.fullName} License`],
  openGraph: {
    title: "License Page",
    description: `MIT License for ${author.fullName} website`,
    url: `${author.siteUrl}/license`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function LicensePage() {
  return (
    <>
      <Heading name="License" emoji="📜" scrollTo="#license" />
      <h2 className="my-6 w-full border-l-4 border-emerald-900 bg-gradient-to-r from-stone-900 pl-4 text-neutral-400 opacity-60 md:w-[56%]">
        Note: Anyone is free to take inspiration from this site as long as you
        give credit to the ordinal creator, credits should include my full name
        ({author.fullName}) and a link to my site ({author.siteName}).{" "}
        <span className="text-rose-600">❤</span>
      </h2>
      <div
        className="w-full border-2 border-neutral-800 bg-neutral-900 p-4 md:w-5/6"
        id="license"
      >
        <p className="text-justify text-stone-400">
          MIT License <br />
          <br /> Copyright (c) {new Date().getFullYear()} {author.fullName}
          <br />
          <br /> Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
          <br />
          <br /> The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          <br />
          <br /> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </>
  );
}
