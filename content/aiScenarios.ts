/**
 * Real-world "in action" scenarios for the AI Learning Guide. Each is a short
 * story: a person in a role, a situation, the exact prompt they used, and what
 * happened. Bilingual (English + हिन्दी). Grouped by tool `slug` (matches
 * content/aiGuides.ts). The monthly refresh Routine keeps adding more.
 */

import type { Bi } from '@/content/aiGuides';

export type Scenario = {
  /** Tool slug this scenario belongs to (matches aiGuides). */
  tool: string;
  /** A person's name (language-neutral). */
  persona: string;
  role: Bi;
  situation: Bi;
  /** The exact prompt they typed (shown as-is). */
  prompt: string;
  outcome: Bi;
};

export const scenarios: Scenario[] = [
  // ---- Claude ----
  {
    tool: 'claude',
    persona: 'Ravi',
    role: { en: 'Freelance designer', hi: 'फ्रीलांस डिज़ाइनर' },
    situation: {
      en: 'Ravi’s desktop was a mess — hundreds of random files, screenshots and downloads everywhere.',
      hi: 'रवि का डेस्कटॉप बिखरा हुआ था — सैकड़ों बेतरतीब फ़ाइलें, स्क्रीनशॉट और डाउनलोड हर तरफ़।',
    },
    prompt:
      'Organise every file on my desktop into folders by type and project, and move anything older than a year into an "Archive" folder.',
    outcome: {
      en: 'The Claude desktop app sorted the files into clean, labelled folders in a couple of minutes — desktop finally empty.',
      hi: 'Claude डेस्कटॉप ऐप ने फ़ाइलों को कुछ ही मिनटों में साफ़, नामांकित फ़ोल्डरों में बाँट दिया — डेस्कटॉप आख़िरकार खाली।',
    },
  },
  {
    tool: 'claude',
    persona: 'Priya',
    role: { en: 'Marketing manager', hi: 'मार्केटिंग मैनेजर' },
    situation: {
      en: 'Priya had a 40-page vendor proposal to review before a 10 a.m. client call.',
      hi: 'प्रिया को सुबह 10 बजे की क्लाइंट कॉल से पहले 40 पन्नों का प्रस्ताव देखना था।',
    },
    prompt: 'Summarise this proposal into 5 bullets a busy client will actually read, and flag any risks.',
    outcome: {
      en: 'She walked into the call with a crisp summary and two risks she’d have otherwise missed.',
      hi: 'वह एक सटीक सारांश और दो जोखिमों के साथ कॉल में गई, जो वरना छूट जाते।',
    },
  },
  {
    tool: 'claude',
    persona: 'Aarav',
    role: { en: 'Engineering student', hi: 'इंजीनियरिंग छात्र' },
    situation: {
      en: 'Aarav’s code kept crashing the night before submission and he couldn’t spot why.',
      hi: 'सबमिशन से एक रात पहले आरव का कोड बार-बार क्रैश हो रहा था और वजह समझ नहीं आ रही थी।',
    },
    prompt: 'Here is my code and the error. Find the bug, explain it simply, and show the fix.',
    outcome: {
      en: 'Claude found an off-by-one error, explained it, and Aarav submitted on time — and understood it.',
      hi: 'Claude ने एक ऑफ़-बाय-वन त्रुटि पकड़ी, समझाई, और आरव ने समय पर सबमिट किया — और समझा भी।',
    },
  },
  {
    tool: 'claude',
    persona: 'Anjali',
    role: { en: 'HR manager', hi: 'एचआर मैनेजर' },
    situation: {
      en: 'Anjali had to send 12 warm, respectful rejection emails after interviews.',
      hi: 'अंजलि को इंटरव्यू के बाद 12 विनम्र, सम्मानजनक अस्वीकृति ईमेल भेजने थे।',
    },
    prompt: 'Write a kind, professional rejection email that thanks the candidate and encourages them to apply again.',
    outcome: {
      en: 'She got a warm template she lightly personalised for each — done in 15 minutes.',
      hi: 'उसे एक गर्मजोशी भरा टेम्पलेट मिला जिसे उसने हर एक के लिए थोड़ा निजी बनाया — 15 मिनट में काम पूरा।',
    },
  },

  // ---- ChatGPT ----
  {
    tool: 'chatgpt',
    persona: 'Meera',
    role: { en: 'Boutique owner', hi: 'बुटीक मालकिन' },
    situation: {
      en: 'Meera needed festive Instagram captions for her Diwali collection but had no time.',
      hi: 'मीरा को अपने दिवाली कलेक्शन के लिए इंस्टाग्राम कैप्शन चाहिए थे पर समय नहीं था।',
    },
    prompt: 'Act as my social media manager. Write 5 warm, short Diwali captions with a clear CTA and a few hashtags.',
    outcome: {
      en: 'She had a week of posts ready in five minutes and picked her three favourites.',
      hi: 'पाँच मिनट में एक हफ़्ते की पोस्ट तैयार थीं और उसने अपनी तीन पसंदीदा चुन लीं।',
    },
  },
  {
    tool: 'chatgpt',
    persona: 'Rohit',
    role: { en: 'Sales lead', hi: 'सेल्स लीड' },
    situation: {
      en: 'Rohit had 40 scattered customer reviews and wanted one testimonial for the website.',
      hi: 'रोहित के पास 40 बिखरी हुई ग्राहक समीक्षाएँ थीं और वेबसाइट के लिए एक प्रशंसापत्र चाहिए था।',
    },
    prompt: 'Turn these reviews into 3 common themes and one polished testimonial we can quote.',
    outcome: {
      en: 'He got three themes for the sales deck and a quotable line for the homepage.',
      hi: 'उसे सेल्स डेक के लिए तीन थीम और होमपेज के लिए एक उद्धरण-योग्य पंक्ति मिली।',
    },
  },
  {
    tool: 'chatgpt',
    persona: 'Neha',
    role: { en: 'School teacher', hi: 'स्कूल शिक्षिका' },
    situation: {
      en: 'Neha wanted a livelier lesson plan on photosynthesis for a Class 8 group.',
      hi: 'नेहा कक्षा 8 के लिए प्रकाश-संश्लेषण पर एक रोचक पाठ-योजना चाहती थीं।',
    },
    prompt: 'Make a 40-minute Class 8 lesson plan on photosynthesis with a simple experiment and 5 quiz questions.',
    outcome: {
      en: 'She got a ready plan with an activity and a quick quiz her students loved.',
      hi: 'उन्हें एक तैयार योजना, एक गतिविधि और एक छोटी क्विज़ मिली जो छात्रों को बहुत पसंद आई।',
    },
  },
  {
    tool: 'chatgpt',
    persona: 'Farhan',
    role: { en: 'Restaurant owner', hi: 'रेस्तराँ मालिक' },
    situation: {
      en: 'Farhan got a harsh public review and wanted to reply without sounding defensive.',
      hi: 'फ़रहान को एक कड़ी सार्वजनिक समीक्षा मिली और वह बचाव किए बिना जवाब देना चाहते थे।',
    },
    prompt: 'Write a calm, gracious reply to this negative review that apologises and invites them back.',
    outcome: {
      en: 'A measured reply that other diners noticed — and the reviewer updated to 4 stars.',
      hi: 'एक संयमित जवाब जिसे दूसरे ग्राहकों ने भी देखा — और समीक्षक ने रेटिंग 4 स्टार कर दी।',
    },
  },

  // ---- Gemini ----
  {
    tool: 'gemini',
    persona: 'Manish',
    role: { en: 'Accountant', hi: 'अकाउंटेंट' },
    situation: {
      en: 'Manish had a messy expense sheet with inconsistent categories.',
      hi: 'मनीष के पास असंगत श्रेणियों वाली एक बिखरी हुई व्यय शीट थी।',
    },
    prompt: 'Clean up this Sheet: standardise the category names, total each category, and flag duplicates.',
    outcome: {
      en: 'Gemini tidied the sheet and surfaced three double-entered bills.',
      hi: 'Gemini ने शीट व्यवस्थित की और तीन दोहरी दर्ज की गई बिलें सामने लाईं।',
    },
  },
  {
    tool: 'gemini',
    persona: 'Priya',
    role: { en: 'Marketing manager', hi: 'मार्केटिंग मैनेजर' },
    situation: {
      en: 'Priya had a 30-page market report and a leadership meeting in an hour.',
      hi: 'प्रिया के पास 30 पन्नों की रिपोर्ट थी और एक घंटे में लीडरशिप मीटिंग।',
    },
    prompt: 'Read this report and give me the 8 decisions leadership needs to make, as a table.',
    outcome: {
      en: 'A clean decision table she pasted straight into the meeting doc.',
      hi: 'एक साफ़ निर्णय-तालिका जिसे उसने सीधे मीटिंग डॉक में चिपका दिया।',
    },
  },

  // ---- Lovable ----
  {
    tool: 'lovable',
    persona: 'Vikram',
    role: { en: 'Startup founder', hi: 'स्टार्टअप फाउंडर' },
    situation: {
      en: 'Vikram wanted to test an idea before paying for a developer.',
      hi: 'विक्रम किसी डेवलपर पर ख़र्च करने से पहले एक आइडिया परखना चाहते थे।',
    },
    prompt: 'Build a lead-capture page: a hero, 3 services, and a contact form that saves name, email and message.',
    outcome: {
      en: 'A working page live the same afternoon — enough to start collecting real leads.',
      hi: 'उसी दोपहर एक चलता-फिरता पेज लाइव — असली लीड इकट्ठा करने के लिए काफ़ी।',
    },
  },
  {
    tool: 'lovable',
    persona: 'Divya',
    role: { en: 'Event planner', hi: 'इवेंट प्लानर' },
    situation: {
      en: 'Divya was tracking 200 wedding RSVPs across messy WhatsApp chats.',
      hi: 'दिव्या 200 शादी की RSVP बिखरी हुई व्हाट्सएप चैट में ट्रैक कर रही थीं।',
    },
    prompt: 'Make a simple RSVP app where guests confirm attendance and meal choice, with an admin list.',
    outcome: {
      en: 'Guests RSVP’d on a link; Divya watched the count update in one place.',
      hi: 'मेहमानों ने एक लिंक पर RSVP किया; दिव्या ने एक ही जगह गिनती बढ़ते देखी।',
    },
  },

  // ---- Cursor ----
  {
    tool: 'cursor',
    persona: 'Arjun',
    role: { en: 'Developer', hi: 'डेवलपर' },
    situation: {
      en: 'Arjun’s payment calls failed randomly and the retry logic was missing everywhere.',
      hi: 'अर्जुन के पेमेंट कॉल कभी-कभी फ़ेल होते थे और रीट्राई लॉजिक कहीं नहीं था।',
    },
    prompt: 'Find every place we call the payments API and add retry-with-backoff, then show me the diffs.',
    outcome: {
      en: 'Cursor edited each call site; Arjun reviewed the diffs and shipped in an hour.',
      hi: 'Cursor ने हर कॉल-साइट बदली; अर्जुन ने डिफ़ देखे और एक घंटे में शिप कर दिया।',
    },
  },

  // ---- Perplexity ----
  {
    tool: 'perplexity',
    persona: 'Priya',
    role: { en: 'Marketing manager', hi: 'मार्केटिंग मैनेजर' },
    situation: {
      en: 'Priya needed current, sourced OOH trends for a pitch — not a guess.',
      hi: 'प्रिया को एक पिच के लिए ताज़ा, स्रोत-सहित OOH ट्रेंड चाहिए थे — अनुमान नहीं।',
    },
    prompt: 'What are the top OOH advertising trends in India this year? Give sources I can cite.',
    outcome: {
      en: 'She got a sourced list and clicked through to verify each before the pitch.',
      hi: 'उसे स्रोत-सहित सूची मिली और पिच से पहले हर एक की पुष्टि की।',
    },
  },

  // ---- GitHub Copilot ----
  {
    tool: 'github-copilot',
    persona: 'Arjun',
    role: { en: 'Developer', hi: 'डेवलपर' },
    situation: {
      en: 'Arjun needed a validator for Indian phone numbers and didn’t want to write it by hand.',
      hi: 'अर्जुन को भारतीय फ़ोन नंबरों के लिए वैलिडेटर चाहिए था और हाथ से नहीं लिखना था।',
    },
    prompt: '// function that validates an Indian phone number and returns E.164 format',
    outcome: {
      en: 'Copilot completed the function from the comment; he added a test and moved on.',
      hi: 'Copilot ने कमेंट से फ़ंक्शन पूरा किया; उसने एक टेस्ट जोड़ा और आगे बढ़ गया।',
    },
  },

  // ---- Midjourney ----
  {
    tool: 'midjourney',
    persona: 'Kavya',
    role: { en: 'Content creator', hi: 'कंटेंट क्रिएटर' },
    situation: {
      en: 'Kavya needed a striking moodboard for a festive campaign pitch.',
      hi: 'कव्या को एक त्योहारी कैंपेन पिच के लिए आकर्षक मूडबोर्ड चाहिए था।',
    },
    prompt: 'A big blue ad truck on a Mumbai highway at dusk, cinematic, warm lights, wide shot --ar 16:9',
    outcome: {
      en: 'Four striking concepts to show the client — before spending on a shoot.',
      hi: 'क्लाइंट को दिखाने के लिए चार शानदार कॉन्सेप्ट — शूट पर ख़र्च से पहले।',
    },
  },

  // ---- Runway ----
  {
    tool: 'runway',
    persona: 'Kavya',
    role: { en: 'Content creator', hi: 'कंटेंट क्रिएटर' },
    situation: {
      en: 'Kavya had a great product photo but needed motion for a reel.',
      hi: 'कव्या के पास एक बढ़िया प्रोडक्ट फ़ोटो थी पर रील के लिए मूवमेंट चाहिए था।',
    },
    prompt: 'Animate this product photo: slow push-in, soft studio light, 4 seconds.',
    outcome: {
      en: 'A short, clean clip that made the reel feel premium.',
      hi: 'एक छोटा, साफ़ क्लिप जिसने रील को प्रीमियम बना दिया।',
    },
  },

  // ---- Suno ----
  {
    tool: 'suno',
    persona: 'Meera',
    role: { en: 'Boutique owner', hi: 'बुटीक मालकिन' },
    situation: {
      en: 'Meera wanted a catchy jingle for her festive sale reel.',
      hi: 'मीरा को अपनी त्योहारी सेल रील के लिए एक कैची जिंगल चाहिए था।',
    },
    prompt: 'A cheerful 20-second Hindi jingle for a festive sale, upbeat, with a catchy hook.',
    outcome: {
      en: 'A custom jingle in minutes that made her reel stand out.',
      hi: 'मिनटों में एक कस्टम जिंगल जिसने उसकी रील को अलग बना दिया।',
    },
  },

  // ---- ElevenLabs ----
  {
    tool: 'elevenlabs',
    persona: 'Farhan',
    role: { en: 'Restaurant owner', hi: 'रेस्तराँ मालिक' },
    situation: {
      en: 'Farhan needed a warm Hindi voiceover for a 30-second promo but had no budget for a studio.',
      hi: 'फ़रहान को 30-सेकंड के प्रोमो के लिए गर्मजोशी भरा हिन्दी वॉइसओवर चाहिए था पर स्टूडियो का बजट नहीं था।',
    },
    prompt: 'Read this script in a warm, confident Hindi male voice, with a friendly pace.',
    outcome: {
      en: 'A studio-quality voiceover the same day, playable on phone speakers.',
      hi: 'उसी दिन स्टूडियो-गुणवत्ता का वॉइसओवर, फ़ोन स्पीकर पर भी बढ़िया।',
    },
  },

  // ---- Antigravity ----
  {
    tool: 'antigravity',
    persona: 'Sneha',
    role: { en: 'Product engineer', hi: 'प्रोडक्ट इंजीनियर' },
    situation: {
      en: 'Sneha needed input validation added across every form in a large app.',
      hi: 'स्नेहा को एक बड़े ऐप के हर फ़ॉर्म में इनपुट वैलिडेशन जोड़ना था।',
    },
    prompt: 'Add input validation to every form in this app and write tests, then summarise what changed.',
    outcome: {
      en: 'The agent planned it, edited across files and ran tests; Sneha reviewed and merged.',
      hi: 'एजेंट ने योजना बनाई, कई फ़ाइलों में बदलाव किए और टेस्ट चलाए; स्नेहा ने समीक्षा कर मर्ज किया।',
    },
  },
];
