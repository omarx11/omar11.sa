// Prompt used for training AI assistant
export const websiteData = async (onlineStatus: string | undefined) => {
  // Here is everything the AI assistant needs to know about the website
  const allTheContent = {
    authorInfo: {
      name: "Omar",
      fullName: "Omar Abdulaziz",
      liveStatus: onlineStatus || "No information available",
      age: "Born on 10/12/1999",
      location: "Saudi Arabia / Qassim City",
      siteUrl: "https://omar11.sa/",
      github: "https://github.com/omarx11",
      twitter: "https://twitter.com/@dis_x0",
      linkedin: "https://www.linkedin.com/in/omar-abdulaziz-sa/",
      email: "mail@omar11.sa",
      discordUsername: "omarx11",
      description:
        "A self-taught web developer with a passion for website programming. I gained extensive knowledge independently during college and have completed several exciting projects. Having recently graduated, I am eager to begin my professional journey.",
      cvLink: "/static/files/omar_abdulaziz_cv_en.pdf",
      education: "Technical and Vocational Training Corporation",
      goal: "Seeking a full-time position at a reputable company.",
    },
    sections: {
      description: "omar11.sa section details",
      projects_page_no_1: {
        description: "Some of Omar's personal projects:",
        list: {
          project1: {
            title: "Online Portfolio",
            description:
              "Omar's personal website built with Next.js, featuring 7 pages highlighting his projects, skills, favorite anime, games, and more.",
            usedTech: ["Next.js 14", "TailwindCSS", "Sass", "Supabase"],
            link: "https://omar11.sa/",
            githubRepo: "https://github.com/omarx11/omar11.sa",
            license: "MIT License",
            licenseNote:
              "You are free to use this site's code, but please give credit to Omar Abdulaziz by linking back to the website.",
          },
          project2: {
            title: "Chatin AI",
            description:
              "An AI assistant where users can talk to the AI via voice commands and receive voice responses.",
            usedTech: ["Next.js", "TailwindCSS", "Supabase"],
            link: "https://chatin2.vercel.app/",
            githubRepo: "https://github.com/omarx11/chatin-v2",
          },
          project3: {
            title: "SGG",
            description:
              "A Steam game profile analyzer that helps users find games from any Steam profile.",
            usedTech: ["JavaScript", "Node.js", "MongoDB", "Steam Auth"],
            link: "https://steamid.info/",
          },
          project4: {
            title: "Guestbook Demo",
            description:
              "A logging system that allows visitors to leave public comments.",
            usedTech: ["Next.js 14", "TailwindCSS", "Supabase"],
            link: "https://guestbook.omar11.sa/",
            githubRepo: "https://github.com/omarx11/guestbook-demo",
          },
          project5: {
            title: "Steam Screenshots API",
            description:
              "An API for scraping Steam to retrieve screenshot URLs in JSON format.",
            usedTech: ["Node.js"],
            link: "https://github.com/omarx11/steam-screenshots-api",
          },
        },
        fullList: "https://github.com/omarx11?tab=repositories",
      },
      skills_page_no_2: {
        description: "Skills and technologies used to build various projects.",
        list: {
          programming_languages:
            "TypeScript, JavaScript, HTML, CSS, Node.js, PHP, jQuery",
          frameworks: "Next.js, React.js",
          styling: "TailwindCSS, Bootstrap",
          databases: "MongoDB, MySQL, Supabase",
          services_and_deployments:
            "GitHub, AWS, Cloudflare, Vercel, GCP, Oracle",
          systems: "Ubuntu Linux server, Kali Linux virtual machine",
          code_editor: "Visual Studio Code",
        },
      },
      specs_page_no_3: {
        description:
          "Current equipment used for gaming, programming, learning, and everyday tasks.",
        sections: {
          pc_parts: [
            {
              name: "Cooler Master MasterCase H500 ARGB ATX Mid Tower Case",
              link: "https://pcpartpicker.com/product/VczFf7/cooler-master-mastercase-h500-argb-atx-mid-tower-case-mcm-h500-ignn-s01",
            },
            {
              name: "Asus ROG STRIX B550-F GAMING (WI-FI) ATX AM4 Motherboard",
              link: "https://pcpartpicker.com/product/vFhmP6/asus-rog-strix-b550-f-gaming-wi-fi-atx-am4-motherboard-rog-strix-b550-f-gaming-wi-fi",
            },
            {
              name: "AMD Ryzen 7 5800X 3.8 GHz 8-Core Processor",
              link: "https://pcpartpicker.com/product/qtvqqs/amd-ryzen-7-5800x-38-ghz-8-core-processor-100-100000063wof",
            },
            {
              name: "ARCTIC Liquid Freezer II 240 56.3 CFM Liquid CPU Cooler",
              link: "https://pcpartpicker.com/product/c4MTwP/arctic-liquid-freezer-ii-240-563-cfm-liquid-cpu-cooler-acfre00046a",
            },
            {
              name: "XFX Radeon RX 6800 XT 16 GB Video Card",
              link: "https://pcpartpicker.com/product/8Wxbt6/xfx-radeon-rx-6800-xt-16-gb-video-card-rx-68xtacbd9",
            },
            {
              name: "G.Skill Trident Z Neo 16 GB (2 x 8 GB) DDR4-3600 CL16 Memory",
              link: "https://pcpartpicker.com/product/JgLwrH/gskill-trident-z-neo-16-gb-2-x-8-gb-ddr4-3600-cl16-memory-f4-3600c16d-16gtznc",
            },
            {
              name: "Seagate Barracuda 2 TB 3.5' 7200 RPM Internal Hard Drive",
              link: "https://pcpartpicker.com/product/mwrYcf/seagate-barracuda-computer-2-tb-35-7200rpm-internal-hard-drive-st2000dm008",
            },
            {
              name: "Western Digital Black SN750 1 TB M.2-2280 PCIe 3.0 X4 NVMe SSD",
              link: "https://pcpartpicker.com/product/QQrmP6/western-digital-wd_black-sn750-1-tb-m2-2280-nvme-solid-state-drive-wds100t3x0c",
            },
            {
              name: "Corsair RM850 (2019) 850 W 80+ Gold Fully Modular ATX Power Supply",
              link: "https://pcpartpicker.com/product/jtm323/corsair-rm-2019-850-w-80-gold-certified-fully-modular-atx-power-supply-cp-9020196-na",
            },
          ],
          virtual_machines: [
            {
              name: "Windows 10 Pro 22H2 (64-bit)",
              link: "https://www.microsoft.com/en-gb/software-download/windows10",
            },
            {
              name: "Ubuntu 22.04.3 rockchip server (arm64)",
              link: "https://github.com/Joshua-Riek/ubuntu-rockchip",
            },
            {
              name: "Kali Linux 2022.3 (amd64)",
              link: "https://www.kali.org/",
            },
          ],
          network_info: [
            {
              name: "Router Model: Zain H122-373 5G",
              link: "https://eshop.sa.zain.com/en/product/5g-home-premium/",
            },
            {
              name: "Iniversion: H122-373-CUST 10.0.3.1(C375)",
              link: "https://eshop.sa.zain.com/en/product/5g-home-premium/",
            },
            {
              name: "ISP: Mobile Telecommunication Company Saudi Arabia",
              link: "https://www.ripe.net/membership/indices/data/sa.mtc.html",
            },
            {
              name: "DNS Address: 1.1.1.1, 1.0.0.1",
            },
            {
              name: "Download Speed: 905.79 Mbps",
              link: "https://www.speedtest.net/result/15662914069",
            },
            {
              name: "Upload Speed: 40.84 Mbps",
              link: "https://www.speedtest.net/result/15662914069",
            },
            {
              name: "Ethernet Switch: Linksys LGS105 5-Port Gigabit",
              link: "https://www.linksys.com/5-port-business-desktop-gigabit-switch-lgs105/LGS105.html",
            },
          ],
          other_devices: [
            {
              name: "Orange Pi 5 16GB Rockchip RK3588S (8 Core 64-bit)",
              link: "http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5.html",
            },
            {
              name: "Bitmain Antminer S9 14T/S Bitcoin Miner",
              link: "https://www.asicminervalue.com/miners/bitmain/antminer-s9-14th",
            },
            {
              name: "Hikvision Camera DS-7200 Series 2 Bullet",
              link: "https://www.amazon.sa/-/en/Hikvision-Camera-Bundle-Kit-Bullet/dp/B089GW898C",
            },
            {
              name: "Creative Labs Sound Blaster AE-9 32-bit 384 kHz Sound Card",
              link: "https://pcpartpicker.com/product/btK2FT/creative-labs-sound-blaster-ae-9-32-bit-384-khz-sound-card-70sb178000000",
            },
            {
              name: "LG 27GL850-B 27.0' 2560x1440 144 Hz Monitor",
              link: "https://pcpartpicker.com/product/6XPgXL/lg-27gl850-b-270-2560x1440-144-hz-monitor-27gl850-b",
            },
            {
              name: "Beyerdynamic DT 990 Pro 250 Ohm Headphones",
              link: "https://pcpartpicker.com/product/vbNp99/beyerdynamic-headphones-amsdt990pro250",
            },
            {
              name: "Cooler Master MM712 Optical Mouse",
              link: "https://pcpartpicker.com/product/ZpGhP6/cooler-master-mm712-bluetoothwirelesswired-optical-mouse-mm-712-kkoh1",
            },
            {
              name: "Logitech MX Keys Advanced Wireless Slim Keyboard",
              link: "https://pcpartpicker.com/product/QnLwrH/logitech-mx-keys-advanced-wireless-slim-keyboard-920-009295",
            },
          ],
        },
      },
      about_page_no_4: {
        education: {
          college: "Technical and Vocational Training Corporation",
          degree: "Diploma",
          date: "2019 to 2023",
        },
        jobs: [
          {
            company: "Lulu Hypermarket",
            location: "Unaizah City",
            jobTitle: "Salesman (IT section)",
            date: "Mar 2024 to Jun 2024",
          },
          {
            company: "Uber",
            location: "Qassim Area",
            jobTitle: "Uber driver (Freelancer)",
            date: "Part-time",
          },
        ],
        about: [
          {
            title: "A Kid’s Adventure",
            description:
              "I started using my family's computer in 2011 when I was 11 years old. I opened a Facebook account to play Family Farm, which quickly became an addiction until I crashed my dad's PC with viruses. This sparked my curiosity about how games and websites work.",
          },
          {
            title: "The Hacker’s Dream",
            description:
              "My childhood dream was to become a hacker. In 2015, I accomplished this by using an SQL Injection attack to hack a website, proudly displaying my work. It was a thrilling experience.",
          },
          {
            title: "The Programming Journey",
            description:
              "In 2016, I started programming data packs for Minecraft, igniting my passion for coding. I taught myself languages like Java, Python, PHP, and JavaScript. Since 2019, I've focused on web development, which remains my passion.",
          },
          {
            title: "The Beginning of Crohn’s",
            description:
              "In 2019, I was diagnosed with Crohn's disease and underwent a partial colon resection. Thanks to the support of my loved ones, I recovered quickly and continued my studies.",
          },
          {
            title: "The Graduation Project",
            description:
              "In 2022, I worked on a major graduation project with two classmates, earning top marks for our idea and execution. You can check it [here](https://omar11.sa/static/files/graduation_project_ar.pdf).",
          },
        ],
      },
      anime_page_no_5: {
        description: "Omar's top 10 favorite anime:",
        list: [
          {
            name: "Berserk",
            desc: "Spurred by the flame raging in his heart",
            link: "https://anilist.co/anime/21560/Berserk/",
          },
          {
            name: "Gyakkyou Burai Kaiji",
            desc: "Intense gambling adventures and high-stakes survival",
            link: "https://anilist.co/anime/10271/Gyakkyou-Burai-Kaiji-Hakairokuhen/",
          },
          {
            name: "Claymore",
            desc: "Half-demon female",
            link: "https://anilist.co/anime/1818/CLAYMORE/",
          },
          {
            name: "Tate no Yuusha no Nariagari",
            desc: "Armed only with his shield, in a parallel world",
            link: "https://anilist.co/anime/99263/Tate-no-Yuusha-no-Nariagari/",
          },
          {
            name: "JoJo no Kimyou na Bouken",
            desc: "Full of supernatural battles and creative powers",
            link: "https://anilist.co/anime/20474/JoJo-no-Kimyou-na-Bouken-Stardust-Crusaders/",
          },
          {
            name: "Dororo",
            desc: "Journey to reclaim his stolen body parts by slaying demons",
            link: "https://anilist.co/anime/101347/Dororo/",
          },
          {
            name: "Karakuri Circus",
            desc: "A thrilling journey to uncover hidden secrets",
            link: "https://anilist.co/anime/101336/Karakuri-Circus/",
          },
          {
            name: "Monster",
            desc: "A doctor’s decision sparks a deadly mystery",
            link: "https://anilist.co/anime/19/MONSTER/",
          },
          {
            name: "Hunter x Hunter",
            desc: "Young boy's journey to become a Hunter",
            link: "https://anilist.co/anime/11061/HUNTERHUNTER-2011/",
          },
          {
            name: "Death Note",
            desc: "A supernatural notebook",
            link: "https://anilist.co/anime/1535/DEATH-NOTE/",
          },
        ],
      },
      games_page_no_6: {
        description: "Gaming profile and stats.",
        owned_games: "150+",
        favorite_games: "Valheim, No Man's Sky",
        total_playtime: "11,000+ hours",
        sections: {
          recently_played_games: "Displays games played in the last two weeks.",
          full_games_collection:
            "Shows the complete collection with playtime details.",
        },
      },
      guestbook_page_no_7: {
        description:
          "The guestbook page features comments from visitors. You can leave a comment after logging in via GitHub or Google.",
      },
    },
  };

  return JSON.stringify(allTheContent);
};
