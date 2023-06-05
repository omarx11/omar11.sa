export default function License() {
  return (
    <>
      <h1 className="mb-6 text-4xl font-bold text-stone-400">
        <span className="text-emerald-500"># </span>
        License 📜
      </h1>
      <div className="w-full bg-neutral-900 p-3 md:w-5/6">
        <p className="text-stone-300">
          MIT License <br />
          <br /> Copyright (c) {new Date().getFullYear()} Omar Abdulaziz
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
      <div className="mt-12 w-full border-l-4 border-emerald-900 pl-2 opacity-60 md:w-[60%]">
        <p className="text-gray-300">
          Note: Anyone is free to take inspiration from this site as long as you
          make some changes to your version and give credit to the ordinal
          creator. Credits should include my full name (Omar Abdulaziz) and a
          link to my site (omar11.sa). 👍
        </p>
      </div>
    </>
  );
}
