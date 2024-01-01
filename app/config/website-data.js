"use server";
import { cookies } from "next/headers";

// Prompt used for training AI assistant
export const websiteData = async () => {
  const cookieStore = cookies();
  const onlineState = cookieStore.get("onlineState");

  // everything should the AI assistant know about!
  const allTheContent = {
    authorInfo: {
      name: "Omar",
      fullName: "Omar Abdulaziz",
      status: `${onlineState ? onlineState.value : "No information was given"}`,
      age: "born in 10/12/1999",
      location: "Saudi Arabia / Buraydah",
      siteUrl: "https://omar11.sa/",
      github: "https://github.com/omarx11",
      twitter: "https://twitter.com/@dis_x0",
      linkedIn: "https://www.linkedin.com/in/omar-abdulaziz-sa/",
      email: "mail@omar11.sa",
      discordUsername: "omarx11",
      description:
        "Recent graduate and a passionate web developer with experience in HTML, CSS, and JavaScript. he works with frameworks like React.js and NEXT.js. During his college studies, he developed several projects showcasing his skills. Additionally, proficient in Microsoft Office programs. Always seeking ways to enhance the performance and optimization of his projects.",
      cvLink: "/static/files/omar_abdulaziz_cv_en.pdf",
      education: "Technical and Vocational Training Corporation",
      job: "Works for Uber as a freelancer in his free time, but is currently seeking a full-time position in a great job.",
      games:
        "Overwatch is his favorite game. He owns 130+ games. He has played for 5000+ hours.",
      skills:
        "JavaScript, HTML, CSS, Node.js, PHP, jQuery, Next.js, React.js, TailwindCSS, Bootstrap, MongoDB, MySQL, Supabase, Github, AWS, Cloudflare, Vercel, GCP, Linux, Kali Linux, RaspberryPi, VSCode",
    },
    aboutOmar: [
      {
        title: "A kid adventure",
        desc: "I started using my family computer in 2011 when I was 11 years old. I started opening an account on Facebook after my cousin told me that there was a game called Family Farm in it, and I started playing it and became addicted to it for two years after I destroyed my father's computer with viruses of course. From here my adventures in the sea of the Internet began, and I have always thought since I was young, how do these games and websites work?",
      },
      {
        title: "A hacker goal",
        desc: "In the beginning, I had a goal of becoming a hacker and hacking into a website on the internet, and that was before something called hacking became famous this year. I started learning hacking from forums and YouTube, and the explanations were not many and clear, but I was excited, however in 2015 I was finally able to hack a website with an SQL Injection attack and I was able to upload my index to the front page of the website, I remember at that time I did not leave anyone in school without telling him that.",
      },
      {
        title: "A programming journey",
        desc: "In 2016, I started learning to program data packs in the game Minecraft, since I loved the game. And in the first line I wrote the code and how it affected the game.. Here I started to love programming and began my career in it. After that, I entered into self-learning types of programming, including Java, Python, PHP, and JavaScript. The thing I loved most was web development, and I continued to do that from 2018 until now.",
      },
      {
        title: "A beginning of Crohn’s",
        desc: "It was time for me to begin my entry into the College of Technology in 2019 as a web programmer. Soon after, I was diagnosed with Crohn’s disease by God’s will. And underwent a partial colon resection. Despite the challenges, the constant support from my loved ones kept me upbeat during my hospital stay. After a short recovery, I was discharged from the hospital and Continued my path in life as if nothing had happened before!",
      },
      {
        title: "A graduation project",
        desc: "At the beginning of 2022, I worked on my first project, which was a graduation project. This was after our teacher divided us into teams, and each team had three people working on a project. At the end of the semester, our team worked hard and we were the first in the idea, shape, and design of the project. You can take a look at https://omar11.sa/static/files/graduation_project_ar.pdf, we also used techniques Such as JavaScript, NodeJS, and MongoDB database.",
      },
    ],
    projectsInfo: {
      description: "Here's all of his personal projects that he has worked on.",
      list: {
        project_no_1: {
          title: "Online Portfolio",
          desc: "Omar's Portfolio & Personal Website, built using NEXT.js and hosted on Vercel, It's the perfect spot to explore the 7 pages of his projects, skills, spaces, favorite animes, games, and more, all with his unique UI design touch.",
          usedTech: "nextjs, tailwindcss, sass, supabase, nextauth",
          link: "https://omar11.sa/",
          GitHubRepo: "https://github.com/omarx11/omar11.sa",
          license: "MIT License",
          licenseLink: "https://omar11.sa/license",
          licenseNote:
            "Anyone is free to take inspiration from this site as long as you give credit to the ordinal creator, credits should include my full name (Omar Abdulaziz) and a link to my site (omar11.sa).",
        },
        project_no_2: {
          title: "Chatin AI",
          desc: "A project where you can talk to AI with your voice and it will respond back to you with speech recognition.",
          usedTech: "nextjs, tailwindcss",
          link: "https://chatin2.vercel.app/",
        },
        project_no_3: {
          title: "SGG",
          desc: "A project that helps users on the Steam platform to find any list of games from any profile easily.",
          usedTech: "javascript, nodejs, mongodb, nextauth, ejs",
          link: "https://steamid.info/",
        },
        project_no_4: {
          title: "Guestbook demo",
          desc: "A logging system that allows visitors of a website to leave a public comment.",
          usedTech: "nextjs, tailwindcss, supabase, nextauth",
          link: "https://guestbook.omar11.sa/",
        },
        project_no_5: {
          title: "steam-screenshots-api",
          desc: "Attempted to make API data by scraping Steam website using (puppeteer), to get my own screenshot URLs in a JSON format.",
          usedTech: "nodejs",
          link: "https://github.com/omarx11/steam-screenshots-api",
        },
      },
    },
    fevAnimes: {
      description: "Top 10 of his favorite anime he has watched.",
      list: [
        {
          name: "Berserk",
          link: "https://anilist.co/anime/21560/Berserk/",
        },
        {
          name: "Gyakkyou Burai Kaiji",
          link: "https://anilist.co/anime/10271/Gyakkyou-Burai-Kaiji-Hakairokuhen/",
        },
        {
          name: "Claymore",
          link: "https://anilist.co/anime/1818/CLAYMORE/",
        },
        {
          name: "Tate no Yuusha no Nariagari",
          link: "https://anilist.co/anime/99263/Tate-no-Yuusha-no-Nariagari/",
        },
        {
          name: "JoJo no Kimyou na Bouken",
          link: "https://anilist.co/anime/20474/JoJo-no-Kimyou-na-Bouken-Stardust-Crusaders/",
        },
        {
          name: "Dororo",
          link: "https://anilist.co/anime/101347/Dororo/",
        },
        {
          name: "Karakuri Circus",
          link: "https://anilist.co/anime/101336/Karakuri-Circus/",
        },
        {
          name: "Asobi Asobase",
          link: "https://anilist.co/anime/101001/Asobi-Asobase/",
        },
        {
          name: "Hunter x Hunter",
          link: "https://anilist.co/anime/11061/HUNTERHUNTER-2011/",
        },
        {
          name: "Death Note",
          link: "https://anilist.co/anime/1535/DEATH-NOTE/",
        },
      ],
    },
    specs: {
      description:
        "The equipment he currently uses for gaming, programming, learning, and every day.",
      pc_parts: [
        {
          name: "Cooler Master MasterCase H500 ARGB ATX Mid Tower Case.",
          link: "https://pcpartpicker.com/product/VczFf7/cooler-master-mastercase-h500-argb-atx-mid-tower-case-mcm-h500-ignn-s01",
        },
        {
          name: "Asus ROG STRIX B550-F GAMING (WI-FI) ATX AM4 Motherboard.",
          link: "https://pcpartpicker.com/product/vFhmP6/asus-rog-strix-b550-f-gaming-wi-fi-atx-am4-motherboard-rog-strix-b550-f-gaming-wi-fi",
        },
        {
          name: "AMD Ryzen 7 5800X 3.8 GHz 8-Core Processor.",
          link: "https://pcpartpicker.com/product/qtvqqs/amd-ryzen-7-5800x-38-ghz-8-core-processor-100-100000063wof",
        },
        {
          name: "ARCTIC Liquid Freezer II 240 56.3 CFM Liquid CPU Cooler.",
          link: "https://pcpartpicker.com/product/c4MTwP/arctic-liquid-freezer-ii-240-563-cfm-liquid-cpu-cooler-acfre00046a",
        },
        {
          name: "XFX RX-68XTACBD9 Radeon RX 6800 XT 16 GB Video Card.",
          link: "https://pcpartpicker.com/product/8Wxbt6/xfx-radeon-rx-6800-xt-16-gb-video-card-rx-68xtacbd9",
        },
        {
          name: "G.Skill Trident Z Neo 16 GB (2 x 8 GB) DDR4-3600 CL16 Memory.",
          link: "https://pcpartpicker.com/product/JgLwrH/gskill-trident-z-neo-16-gb-2-x-8-gb-ddr4-3600-cl16-memory-f4-3600c16d-16gtznc",
        },
        {
          name: "Seagate Barracuda 2 TB 3.5' 7200 RPM Internal Hard Drive.",
          link: "https://pcpartpicker.com/product/mwrYcf/seagate-barracuda-computer-2-tb-35-7200rpm-internal-hard-drive-st2000dm008",
        },
        {
          name: "Western Digital Black SN750 1 TB M.2-2280 PCIe 3.0 X4 NVME Solid State Drive.",
          link: "https://pcpartpicker.com/product/QQrmP6/western-digital-wd_black-sn750-1-tb-m2-2280-nvme-solid-state-drive-wds100t3x0c",
        },
        {
          name: "Corsair RM850 (2019) 850 W 80+ Gold Certified Fully Modular ATX Power Supply.",
          link: "https://pcpartpicker.com/product/jtm323/corsair-rm-2019-850-w-80-gold-certified-fully-modular-atx-power-supply-cp-9020196-na",
        },
      ],
      virtual_machines: [
        {
          name: "Windows 10 Pro 22H2 desktop 64-bit.",
          link: "https://www.microsoft.com/en-gb/software-download/windows10",
        },
        {
          name: "Ubuntu 22.04.3 rockchip server arm64.",
          link: "https://github.com/Joshua-Riek/ubuntu-rockchip",
        },
        {
          name: "Kali Linux 2022.3 desktop amd64.",
          link: "https://www.kali.org/",
        },
      ],
      network_info: [
        {
          name: "Iniversion: H122-373-CUST 10.0.3.1(C375).",
          link: "https://eshop.sa.zain.com/en/product/5g-home-premium/",
        },
        {
          name: "ISP: Mobile Telecommunication Company Saudi Arabia.",
          link: "https://www.ripe.net/membership/indices/data/sa.mtc.html",
        },
        {
          name: "Modem router: Zain H122-373 5G.",
          link: "https://eshop.sa.zain.com/en/product/5g-home-premium/",
        },
        {
          name: "DNS address: 1.1.1.1, 1.0.0.1.",
        },
        {
          name: "Download speed Mbps: 905.79",
          link: "https://www.speedtest.net/result/15662914069",
        },
        {
          name: "Upload speed Mbps: 40.84",
          link: "https://www.speedtest.net/result/15662914069",
        },
        {
          name: "Ethernet switch: Linksys Lgs105 5-Port Lgs105-Me-Rtl",
          link: "https://www.linksys.com/5-port-business-desktop-gigabit-switch-lgs105/LGS105.html",
        },
      ],
      other_devices: [
        {
          name: "Orange Pi 5 16GB Rockchip RK3588S 8 Core 64 Bit Single Board Computer.",
          link: "http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5.html",
        },
        {
          name: "Bitmain Antminer S9 14T/S bitcoin miner.",
          link: "https://www.asicminervalue.com/miners/bitmain/antminer-s9-14th",
        },
        {
          name: "Hikvision Camera DS-7200 Series 2 Bullet.",
          link: "https://www.amazon.sa/-/en/Hikvision-Camera-Bundle-Kit-Bullet/dp/B089GW898C",
        },
        {
          name: "Creative Labs Sound Blaster AE-9 32-bit 384 kHz Sound Card.",
          link: "https://pcpartpicker.com/product/btK2FT/creative-labs-sound-blaster-ae-9-32-bit-384-khz-sound-card-70sb178000000",
        },
        {
          name: "LG 27GL850-B 27.0' 2560 x 1440 144 Hz Monitor.",
          link: "https://pcpartpicker.com/product/6XPgXL/lg-27gl850-b-270-2560x1440-144-hz-monitor-27gl850-b",
        },
        {
          name: "Beyerdynamic DT 990 Pro 250 Headphones.",
          link: "https://pcpartpicker.com/product/vbNp99/beyerdynamic-headphones-amsdt990pro250",
        },
        {
          name: "Cooler Master MM712 Optical Mouse.",
          link: "https://pcpartpicker.com/product/ZpGhP6/cooler-master-mm712-bluetoothwirelesswired-optical-mouse-mm-712-kkoh1",
        },
        {
          name: "Logitech MX Keys Advanced Wireless Slim Keyboard.",
          link: "https://pcpartpicker.com/product/QnLwrH/logitech-mx-keys-advanced-wireless-slim-keyboard-920-009295",
        },
      ],
    },
  };

  return JSON.stringify(allTheContent);
};
