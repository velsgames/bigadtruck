/**
 * AI Learning Guide — bilingual (English + हिन्दी) practical guides to the
 * leading AI tools, presented by Bigadtruck Group & Buzzmore Media.
 * Rendered at /ai-guides (listing) and /ai-guides/[slug] (guide, with a
 * language toggle). Evergreen best-practices — avoid version-specific claims
 * that go stale. Edit copy here.
 */

/** A bilingual string. */
export type Bi = { en: string; hi: string };

export type AiGuide = {
  slug: string;
  /** Tool/brand name — kept as-is in both languages. */
  name: string;
  maker: string;
  category: 'Assistant' | 'Coding' | 'App builder' | 'Image & video' | 'Audio & voice';
  cover: string;
  /** Soft "edition" label so monthly refreshes read as current without faking version numbers. */
  edition: string;
  updated: string; // ISO YYYY-MM-DD
  tagline: Bi;
  whatItIs: Bi;
  bestFor: Bi[];
  bestPractices: Bi[];
  /** Example prompts — the prompt text is shown as-is; the note explains it bilingually. */
  examples: { prompt: string; note: Bi }[];
  tips: Bi[];
};

export const guideCategories = [
  'All',
  'Assistant',
  'Coding',
  'App builder',
  'Image & video',
  'Audio & voice',
] as const;

export const aiGuides: AiGuide[] = [
  {
    slug: 'claude',
    name: 'Claude',
    maker: 'Anthropic',
    category: 'Assistant',
    cover: '/images/ai/claude.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'A thoughtful AI assistant for writing, analysis and coding — strong at long, careful reasoning.',
      hi: 'लेखन, विश्लेषण और कोडिंग के लिए एक समझदार AI असिस्टेंट — लंबी और सावधान सोच में बेहतरीन।',
    },
    whatItIs: {
      en: 'Claude is Anthropic’s AI assistant. It is known for careful reasoning, a large context window (you can paste long documents), and a natural, honest writing style. Claude Code brings the same model into your terminal and editor for hands-on coding.',
      hi: 'Claude, Anthropic का AI असिस्टेंट है। यह सावधान तर्क, बड़े कॉन्टेक्स्ट विंडो (आप लंबे दस्तावेज़ पेस्ट कर सकते हैं) और स्वाभाविक, ईमानदार लेखन शैली के लिए जाना जाता है। Claude Code उसी मॉडल को आपके टर्मिनल और एडिटर में कोडिंग के लिए लाता है।',
    },
    bestFor: [
      { en: 'Long-form writing, editing and summarising big documents.', hi: 'लंबा लेखन, संपादन और बड़े दस्तावेज़ों का सारांश।' },
      { en: 'Coding and debugging — especially multi-file, real codebases.', hi: 'कोडिंग और डिबगिंग — खासकर मल्टी-फ़ाइल, असली कोडबेस।' },
      { en: 'Careful analysis where you want the model to show its reasoning.', hi: 'सावधान विश्लेषण, जहाँ आप चाहते हैं कि मॉडल अपना तर्क दिखाए।' },
    ],
    bestPractices: [
      { en: 'Give context up front: paste the document, data or code rather than describing it.', hi: 'शुरुआत में ही संदर्भ दें: दस्तावेज़, डेटा या कोड का वर्णन करने के बजाय उसे पेस्ट करें।' },
      { en: 'Tell it the audience and the goal — “explain to a client”, “for a board deck”.', hi: 'दर्शक और लक्ष्य बताएं — “क्लाइंट को समझाएँ”, “बोर्ड प्रेज़ेंटेशन के लिए”।' },
      { en: 'Ask for a draft, then iterate — “tighten this”, “make it more formal”.', hi: 'पहले ड्राफ़्ट माँगें, फिर सुधारें — “इसे संक्षिप्त करें”, “और औपचारिक बनाएं”।' },
      { en: 'For facts, ask it to flag what it is unsure about instead of guessing.', hi: 'तथ्यों के लिए, अनुमान लगाने के बजाय उससे अनिश्चित बातों को चिह्नित करने को कहें।' },
    ],
    examples: [
      { prompt: 'Here is our 12-page proposal. Summarise it into 5 bullets a busy client will actually read.', note: { en: 'Summarising long documents for a specific audience.', hi: 'किसी विशेष दर्शक के लिए लंबे दस्तावेज़ों का सारांश।' } },
      { prompt: 'Review this React component for bugs and suggest a cleaner version with comments.', note: { en: 'Code review and refactoring.', hi: 'कोड समीक्षा और रीफैक्टरिंग।' } },
    ],
    tips: [
      { en: 'Longer, specific prompts beat short vague ones — spend a sentence on the goal.', hi: 'छोटे, अस्पष्ट प्रॉम्प्ट की तुलना में लंबे, स्पष्ट प्रॉम्प्ट बेहतर होते हैं — लक्ष्य पर एक वाक्य लगाएं।' },
      { en: 'Use it as a thinking partner: ask it to argue both sides before you decide.', hi: 'इसे सोचने के साथी के रूप में इस्तेमाल करें: निर्णय से पहले दोनों पक्षों पर बहस करने को कहें।' },
    ],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    maker: 'OpenAI',
    category: 'Assistant',
    cover: '/images/ai/chatgpt.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'The most widely used AI chat assistant — versatile for writing, ideas, images and everyday tasks.',
      hi: 'सबसे ज़्यादा इस्तेमाल होने वाला AI चैट असिस्टेंट — लेखन, विचार, इमेज और रोज़मर्रा के कामों के लिए बहुउपयोगी।',
    },
    whatItIs: {
      en: 'ChatGPT is OpenAI’s conversational assistant. It can write, brainstorm, code, analyse files, generate images and browse the web. Custom GPTs let you build tailored assistants for a specific task or brand.',
      hi: 'ChatGPT, OpenAI का संवादात्मक असिस्टेंट है। यह लिख सकता है, विचार दे सकता है, कोड कर सकता है, फ़ाइलें विश्लेषण कर सकता है, इमेज बना सकता है और वेब ब्राउज़ कर सकता है। Custom GPTs से आप किसी खास काम या ब्रांड के लिए असिस्टेंट बना सकते हैं।',
    },
    bestFor: [
      { en: 'Everyday drafting: emails, captions, outlines, replies.', hi: 'रोज़मर्रा का लेखन: ईमेल, कैप्शन, आउटलाइन, जवाब।' },
      { en: 'Brainstorming campaign ideas, names and angles.', hi: 'कैंपेन आइडिया, नाम और एंगल पर विचार-मंथन।' },
      { en: 'Quick image generation and everyday how-to help.', hi: 'तुरंत इमेज बनाना और रोज़मर्रा की मदद।' },
    ],
    bestPractices: [
      { en: 'Set a role: “You are a senior copywriter for a real-estate brand.”', hi: 'एक भूमिका दें: “आप एक रियल-एस्टेट ब्रांड के सीनियर कॉपीराइटर हैं।”' },
      { en: 'Give an example of the style/output you want (one good sample helps a lot).', hi: 'जो शैली/आउटपुट चाहते हैं उसका एक उदाहरण दें (एक अच्छा नमूना बहुत मदद करता है)।' },
      { en: 'Ask for 5 options, then refine the best one instead of accepting the first.', hi: '5 विकल्प माँगें, फिर पहले को स्वीकारने के बजाय सबसे अच्छे को सुधारें।' },
      { en: 'Build a Custom GPT for repeat tasks so you don’t re-paste the brief each time.', hi: 'बार-बार के कामों के लिए Custom GPT बनाएं ताकि हर बार ब्रीफ दोबारा न देना पड़े।' },
    ],
    examples: [
      { prompt: 'Act as our social media manager. Write 5 Instagram captions for a Diwali offer, warm and short, with a CTA.', note: { en: 'Role + task + constraints in one prompt.', hi: 'एक ही प्रॉम्प्ट में भूमिका + काम + शर्तें।' } },
      { prompt: 'Turn these 10 customer reviews into 3 themes and one testimonial we can quote.', note: { en: 'Turning raw input into usable output.', hi: 'कच्चे इनपुट को उपयोगी आउटपुट में बदलना।' } },
    ],
    tips: [
      { en: 'Tell it what NOT to do (“no jargon, no emojis”) — negatives sharpen output.', hi: 'बताएं कि क्या नहीं करना है (“कोई शब्दजाल नहीं, कोई इमोजी नहीं”) — नकारात्मक निर्देश आउटपुट को बेहतर करते हैं।' },
      { en: 'Always fact-check specifics; it can sound confident and still be wrong.', hi: 'विशेष तथ्यों की हमेशा जाँच करें; यह आत्मविश्वास से गलत भी हो सकता है।' },
    ],
  },
  {
    slug: 'lovable',
    name: 'Lovable',
    maker: 'Lovable',
    category: 'App builder',
    cover: '/images/ai/lovable.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Describe an app in plain language and Lovable builds a working web app — front end and database.',
      hi: 'सादी भाषा में ऐप का वर्णन करें और Lovable एक चलता-फिरता वेब ऐप बना देता है — फ्रंट एंड और डेटाबेस दोनों।',
    },
    whatItIs: {
      en: 'Lovable is an AI app builder. You describe what you want in chat and it generates a real, deployable web application — user interface, logic and a connected database — that you can keep editing by prompting.',
      hi: 'Lovable एक AI ऐप बिल्डर है। आप चैट में बताते हैं कि क्या चाहिए और यह एक असली, डिप्लॉय होने योग्य वेब ऐप बनाता है — यूज़र इंटरफ़ेस, लॉजिक और जुड़ा हुआ डेटाबेस — जिसे आप प्रॉम्प्ट देकर बदलते रह सकते हैं।',
    },
    bestFor: [
      { en: 'Landing pages, MVPs and internal tools — fast, without a dev team.', hi: 'लैंडिंग पेज, MVP और आंतरिक टूल — बिना डेव टीम के, तेज़ी से।' },
      { en: 'Founders and marketers validating an idea before investing in build.', hi: 'फाउंडर और मार्केटर जो बिल्ड में निवेश से पहले आइडिया परखना चाहते हैं।' },
    ],
    bestPractices: [
      { en: 'Start small: build one screen well, then add features one prompt at a time.', hi: 'छोटे से शुरू करें: पहले एक स्क्रीन अच्छे से बनाएं, फिर एक-एक प्रॉम्प्ट में फ़ीचर जोड़ें।' },
      { en: 'Be specific about data: name the fields and what each screen should show.', hi: 'डेटा के बारे में स्पष्ट रहें: फ़ील्ड के नाम और हर स्क्रीन पर क्या दिखे, यह बताएं।' },
      { en: 'Describe the look you want (“clean, navy brand, big headings”).', hi: 'जो लुक चाहिए उसे बताएं (“साफ़-सुथरा, नेवी ब्रांड, बड़े हेडिंग”)।' },
    ],
    examples: [
      { prompt: 'Build a lead-capture page: hero, 3 services, a contact form that saves name, email, message.', note: { en: 'A clear first screen with a defined form.', hi: 'एक स्पष्ट पहली स्क्रीन और तय फ़ॉर्म।' } },
      { prompt: 'Add an admin page that lists all form submissions, newest first.', note: { en: 'Adding one feature at a time.', hi: 'एक बार में एक फ़ीचर जोड़ना।' } },
    ],
    tips: [
      { en: 'Review what it builds — you own the result, so read the pages it makes.', hi: 'यह जो बनाता है उसे जाँचें — नतीजा आपका है, इसलिए बने पेज पढ़ें।' },
      { en: 'Connect your own domain and check it on mobile before sharing.', hi: 'अपना डोमेन जोड़ें और शेयर करने से पहले मोबाइल पर जाँचें।' },
    ],
  },
  {
    slug: 'antigravity',
    name: 'Antigravity',
    maker: 'Google',
    category: 'Coding',
    cover: '/images/ai/antigravity.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Google’s agent-first development platform — you set the goal, AI agents plan and write the code.',
      hi: 'Google का एजेंट-फर्स्ट डेवलपमेंट प्लेटफ़ॉर्म — आप लक्ष्य तय करें, AI एजेंट योजना बनाकर कोड लिखें।',
    },
    whatItIs: {
      en: 'Antigravity is Google’s agentic coding environment. Instead of writing every line yourself, you describe a task and AI agents plan the steps, edit across files, run the code and report back — with you reviewing and steering.',
      hi: 'Antigravity, Google का एजेंटिक कोडिंग एनवायरनमेंट है। हर लाइन खुद लिखने के बजाय, आप काम बताते हैं और AI एजेंट चरणों की योजना बनाते हैं, कई फ़ाइलों में बदलाव करते हैं, कोड चलाते हैं और रिपोर्ट देते हैं — आप समीक्षा और मार्गदर्शन करते हैं।',
    },
    bestFor: [
      { en: 'Larger coding tasks that span many files or steps.', hi: 'बड़े कोडिंग काम जो कई फ़ाइलों या चरणों में फैले हों।' },
      { en: 'Developers who want to review outcomes rather than type every line.', hi: 'ऐसे डेवलपर जो हर लाइन टाइप करने के बजाय नतीजों की समीक्षा करना चाहते हैं।' },
    ],
    bestPractices: [
      { en: 'Write the goal clearly, including how you’ll know it’s done (acceptance criteria).', hi: 'लक्ष्य स्पष्ट लिखें, यह भी कि पूरा होना कैसे पता चलेगा (स्वीकृति की शर्तें)।' },
      { en: 'Review the agent’s plan before it runs, and check its work after.', hi: 'एजेंट के चलने से पहले उसकी योजना देखें, और बाद में उसका काम जाँचें।' },
      { en: 'Keep changes in small, reviewable steps rather than one giant task.', hi: 'बदलावों को एक विशाल काम के बजाय छोटे, समीक्षा-योग्य चरणों में रखें।' },
    ],
    examples: [
      { prompt: 'Add input validation to every form in this app and write tests for it.', note: { en: 'A cross-file task an agent can plan and execute.', hi: 'एक क्रॉस-फ़ाइल काम जिसे एजेंट योजना बनाकर कर सकता है।' } },
    ],
    tips: [
      { en: 'You are the reviewer — agents move fast, so read diffs before you ship.', hi: 'आप समीक्षक हैं — एजेंट तेज़ चलते हैं, इसलिए शिप करने से पहले डिफ़ पढ़ें।' },
      { en: 'Give it access to run tests so it can catch its own mistakes.', hi: 'इसे टेस्ट चलाने की अनुमति दें ताकि यह अपनी गलतियाँ खुद पकड़ सके।' },
    ],
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    maker: 'Google',
    category: 'Assistant',
    cover: '/images/ai/gemini.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Google’s multimodal assistant — strong with text, images and your Workspace (Docs, Gmail, Sheets).',
      hi: 'Google का मल्टीमोडल असिस्टेंट — टेक्स्ट, इमेज और आपके Workspace (Docs, Gmail, Sheets) के साथ बेहतरीन।',
    },
    whatItIs: {
      en: 'Gemini is Google’s AI assistant. It handles text, images and documents together, has a very large context window, and plugs into Google Workspace so it can help right inside Docs, Gmail and Sheets.',
      hi: 'Gemini, Google का AI असिस्टेंट है। यह टेक्स्ट, इमेज और दस्तावेज़ एक साथ संभालता है, बहुत बड़ा कॉन्टेक्स्ट रखता है, और Google Workspace से जुड़कर Docs, Gmail व Sheets के भीतर ही मदद करता है।',
    },
    bestFor: [
      { en: 'Working across long documents and spreadsheets.', hi: 'लंबे दस्तावेज़ों और स्प्रेडशीट पर काम करना।' },
      { en: 'Anyone already living inside Google Workspace.', hi: 'वे लोग जो पहले से Google Workspace में काम करते हैं।' },
    ],
    bestPractices: [
      { en: 'Point it at a file (“summarise this Doc”, “clean up this Sheet”) instead of retyping.', hi: 'किसी फ़ाइल पर लगाएं (“इस Doc का सारांश”, “इस Sheet को ठीक करें”), दोबारा टाइप न करें।' },
      { en: 'Attach images or screenshots when the question is visual.', hi: 'जब सवाल दृश्य हो तो इमेज या स्क्रीनशॉट लगाएं।' },
      { en: 'Ask for tables and structured output — it formats cleanly.', hi: 'टेबल और संरचित आउटपुट माँगें — यह साफ़-सुथरा फ़ॉर्मैट करता है।' },
    ],
    examples: [
      { prompt: 'Read this 30-page report and give me the 8 decisions leadership needs to make.', note: { en: 'Long-document reasoning.', hi: 'लंबे दस्तावेज़ पर विश्लेषण।' } },
    ],
    tips: [
      { en: 'Great as a research + summarise pair with a spreadsheet of data.', hi: 'डेटा की स्प्रेडशीट के साथ रिसर्च + सारांश जोड़ी के रूप में बढ़िया।' },
      { en: 'Double-check figures it pulls from documents.', hi: 'दस्तावेज़ों से लिए गए आँकड़ों की दोबारा जाँच करें।' },
    ],
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    maker: 'Anysphere',
    category: 'Coding',
    cover: '/images/ai/cursor.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'An AI-first code editor — chat with your codebase and let it edit across files.',
      hi: 'एक AI-फर्स्ट कोड एडिटर — अपने कोडबेस से बात करें और इसे कई फ़ाइलों में बदलाव करने दें।',
    },
    whatItIs: {
      en: 'Cursor is a code editor built around AI. It understands your whole project, answers questions about it, and can make multi-file edits from a plain-language request — while you review each change.',
      hi: 'Cursor एक AI के इर्द-गिर्द बना कोड एडिटर है। यह आपके पूरे प्रोजेक्ट को समझता है, उसके बारे में सवालों के जवाब देता है, और सादी भाषा के अनुरोध से कई फ़ाइलों में बदलाव कर सकता है — जबकि आप हर बदलाव देखते हैं।',
    },
    bestFor: [
      { en: 'Developers who want AI help without leaving the editor.', hi: 'ऐसे डेवलपर जो एडिटर छोड़े बिना AI मदद चाहते हैं।' },
      { en: 'Understanding and changing an unfamiliar codebase.', hi: 'किसी अनजान कोडबेस को समझना और बदलना।' },
    ],
    bestPractices: [
      { en: 'Reference specific files or symbols so it edits the right place.', hi: 'खास फ़ाइल या सिंबल का हवाला दें ताकि यह सही जगह बदलाव करे।' },
      { en: 'Accept changes in small chunks and run your tests often.', hi: 'बदलाव छोटे हिस्सों में स्वीकारें और अपने टेस्ट बार-बार चलाएं।' },
      { en: 'Keep a clear prompt: what to change and what must not break.', hi: 'स्पष्ट प्रॉम्प्ट रखें: क्या बदलना है और क्या नहीं टूटना चाहिए।' },
    ],
    examples: [
      { prompt: 'Find every place we call the payments API and add retry-with-backoff.', note: { en: 'A codebase-wide change.', hi: 'पूरे कोडबेस में एक बदलाव।' } },
    ],
    tips: [
      { en: 'Ask it to explain code before changing it — you stay in control.', hi: 'बदलने से पहले कोड समझाने को कहें — नियंत्रण आपके पास रहे।' },
      { en: 'Commit often so you can undo an AI change cleanly.', hi: 'बार-बार कमिट करें ताकि AI बदलाव आसानी से वापस ले सकें।' },
    ],
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    maker: 'Perplexity AI',
    category: 'Assistant',
    cover: '/images/ai/perplexity.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'An AI answer engine — asks the web, then answers with sources you can click.',
      hi: 'एक AI उत्तर-इंजन — वेब से पूछता है, फिर ऐसे स्रोतों के साथ जवाब देता है जिन्हें आप क्लिक कर सकें।',
    },
    whatItIs: {
      en: 'Perplexity is built for research. It searches the web live and answers your question with citations, so you can verify every claim. Great when you need current, sourced information rather than a guess.',
      hi: 'Perplexity रिसर्च के लिए बना है। यह लाइव वेब खोजता है और आपके सवाल का जवाब उद्धरणों के साथ देता है, ताकि आप हर दावे की पुष्टि कर सकें। जब आपको अनुमान नहीं, बल्कि ताज़ा व स्रोत-सहित जानकारी चाहिए तब बढ़िया।',
    },
    bestFor: [
      { en: 'Market and competitor research with sources.', hi: 'स्रोतों के साथ बाज़ार और प्रतिस्पर्धी रिसर्च।' },
      { en: 'Fact-checking and finding current information.', hi: 'तथ्य-जाँच और ताज़ा जानकारी खोजना।' },
    ],
    bestPractices: [
      { en: 'Ask focused questions; then open the cited sources to confirm.', hi: 'केंद्रित सवाल पूछें; फिर उद्धृत स्रोत खोलकर पुष्टि करें।' },
      { en: 'Use follow-ups to go deeper on one thread.', hi: 'एक विषय पर गहराई में जाने के लिए फ़ॉलो-अप का उपयोग करें।' },
    ],
    examples: [
      { prompt: 'What are the top 5 OOH advertising trends in India this year, with sources?', note: { en: 'Sourced, current research.', hi: 'स्रोत-सहित, ताज़ा रिसर्च।' } },
    ],
    tips: [
      { en: 'Trust it more than a plain chatbot for “what’s happening now”.', hi: '“अभी क्या हो रहा है” के लिए सादे चैटबॉट से ज़्यादा इस पर भरोसा करें।' },
      { en: 'Still read the sources — a citation is a link, not a guarantee.', hi: 'फिर भी स्रोत पढ़ें — उद्धरण एक लिंक है, गारंटी नहीं।' },
    ],
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    maker: 'GitHub & OpenAI',
    category: 'Coding',
    cover: '/images/ai/github-copilot.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'AI pair-programmer inside your editor — autocompletes code and answers in-context.',
      hi: 'आपके एडिटर के भीतर AI पेयर-प्रोग्रामर — कोड ऑटोकम्प्लीट करता है और संदर्भ में जवाब देता है।',
    },
    whatItIs: {
      en: 'Copilot suggests code as you type, completes functions, and can chat about your code inside popular editors like VS Code. It’s the most widely used AI coding assistant for everyday development.',
      hi: 'Copilot आपके टाइप करते समय कोड सुझाता है, फ़ंक्शन पूरे करता है, और VS Code जैसे लोकप्रिय एडिटर में आपके कोड पर बातचीत कर सकता है। यह रोज़मर्रा के डेवलपमेंट के लिए सबसे ज़्यादा इस्तेमाल होने वाला AI कोडिंग असिस्टेंट है।',
    },
    bestFor: [
      { en: 'Speeding up everyday coding and boilerplate.', hi: 'रोज़मर्रा की कोडिंग और बॉयलरप्लेट तेज़ करना।' },
      { en: 'Learning a new language or framework by example.', hi: 'उदाहरण से नई भाषा या फ्रेमवर्क सीखना।' },
    ],
    bestPractices: [
      { en: 'Write a clear comment first; the suggestion follows your intent.', hi: 'पहले स्पष्ट कमेंट लिखें; सुझाव आपके इरादे के अनुसार आता है।' },
      { en: 'Read every suggestion before accepting — don’t autopilot.', hi: 'स्वीकारने से पहले हर सुझाव पढ़ें — आँख मूंदकर न लें।' },
    ],
    examples: [
      { prompt: '// function that validates an Indian phone number and returns E.164 format', note: { en: 'A guiding comment produces the function.', hi: 'एक मार्गदर्शक कमेंट फ़ंक्शन बना देता है।' } },
    ],
    tips: [
      { en: 'Best for small, local suggestions; use an agent tool for big tasks.', hi: 'छोटे, स्थानीय सुझावों के लिए सबसे अच्छा; बड़े कामों के लिए एजेंट टूल इस्तेमाल करें।' },
      { en: 'Always test AI-written code before trusting it.', hi: 'AI-लिखित कोड पर भरोसा करने से पहले हमेशा टेस्ट करें।' },
    ],
  },
  {
    slug: 'grok',
    name: 'Grok',
    maker: 'xAI',
    category: 'Assistant',
    cover: '/images/ai/grok.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'xAI’s assistant with a real-time pulse on X — good for what’s trending right now.',
      hi: 'xAI का असिस्टेंट, X पर रियल-टाइम नज़र के साथ — अभी क्या ट्रेंड कर रहा है, उसके लिए अच्छा।',
    },
    whatItIs: {
      en: 'Grok is xAI’s conversational assistant, closely tied to the X platform, so it’s handy for real-time conversation, trends and a more informal tone. It also handles general writing and reasoning tasks.',
      hi: 'Grok, xAI का संवादात्मक असिस्टेंट है, जो X प्लेटफ़ॉर्म से गहराई से जुड़ा है, इसलिए रियल-टाइम बातचीत, ट्रेंड और अधिक अनौपचारिक लहजे के लिए उपयोगी है। यह सामान्य लेखन और तर्क के काम भी करता है।',
    },
    bestFor: [
      { en: 'Reading the room on X — trends, reactions, topics.', hi: 'X पर माहौल भाँपना — ट्रेंड, प्रतिक्रियाएँ, विषय।' },
      { en: 'Casual brainstorming with a lighter tone.', hi: 'हल्के लहजे में अनौपचारिक विचार-मंथन।' },
    ],
    bestPractices: [
      { en: 'Use it for timely, social-first questions.', hi: 'समयानुकूल, सोशल-फर्स्ट सवालों के लिए इस्तेमाल करें।' },
      { en: 'Cross-check facts elsewhere for anything important.', hi: 'किसी भी ज़रूरी बात के तथ्य कहीं और जाँचें।' },
    ],
    examples: [
      { prompt: 'What are people on X saying about this year’s festive ad campaigns?', note: { en: 'Real-time social sentiment.', hi: 'रियल-टाइम सोशल भावना।' } },
    ],
    tips: [
      { en: 'Treat trend readings as signals, not proof.', hi: 'ट्रेंड को संकेत मानें, प्रमाण नहीं।' },
      { en: 'Pair with a research tool for a balanced view.', hi: 'संतुलित नज़रिये के लिए किसी रिसर्च टूल के साथ इस्तेमाल करें।' },
    ],
  },
  {
    slug: 'deepseek',
    name: 'DeepSeek',
    maker: 'DeepSeek',
    category: 'Assistant',
    cover: '/images/ai/deepseek.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'A capable, cost-efficient model family — strong at reasoning and code, often open-weight.',
      hi: 'एक सक्षम, किफ़ायती मॉडल परिवार — तर्क और कोड में मज़बूत, अक्सर ओपन-वेट।',
    },
    whatItIs: {
      en: 'DeepSeek offers powerful assistant and reasoning models known for strong performance at low cost, with open-weight releases that teams can self-host. Popular for coding and step-by-step reasoning.',
      hi: 'DeepSeek शक्तिशाली असिस्टेंट और रीज़निंग मॉडल देता है, जो कम लागत पर मज़बूत प्रदर्शन के लिए जाने जाते हैं, और ओपन-वेट रिलीज़ के साथ आते हैं जिन्हें टीमें स्वयं होस्ट कर सकती हैं। कोडिंग और चरण-दर-चरण तर्क के लिए लोकप्रिय।',
    },
    bestFor: [
      { en: 'Cost-sensitive teams that still want strong reasoning.', hi: 'लागत के प्रति सजग टीमें जो फिर भी मज़बूत तर्क चाहती हैं।' },
      { en: 'Developers who want to self-host an open model.', hi: 'डेवलपर जो ओपन मॉडल स्वयं होस्ट करना चाहते हैं।' },
    ],
    bestPractices: [
      { en: 'Ask for step-by-step reasoning on hard problems.', hi: 'कठिन समस्याओं पर चरण-दर-चरण तर्क माँगें।' },
      { en: 'For production, evaluate on your own tasks before switching.', hi: 'प्रोडक्शन के लिए, बदलने से पहले अपने कामों पर मूल्यांकन करें।' },
    ],
    examples: [
      { prompt: 'Solve this logic problem and show each step of your reasoning.', note: { en: 'Reasoning-heavy tasks.', hi: 'तर्क-प्रधान काम।' } },
    ],
    tips: [
      { en: 'Great value — benchmark it against your current tool.', hi: 'बढ़िया मूल्य — इसे अपने मौजूदा टूल से तुलना करके देखें।' },
      { en: 'Check data-handling rules before using any model at work.', hi: 'काम पर कोई भी मॉडल इस्तेमाल करने से पहले डेटा-नियम जाँचें।' },
    ],
  },
  {
    slug: 'v0',
    name: 'v0',
    maker: 'Vercel',
    category: 'App builder',
    cover: '/images/ai/v0.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Prompt to polished UI — generates React/Tailwind interfaces you can ship.',
      hi: 'प्रॉम्प्ट से बेहतरीन UI — React/Tailwind इंटरफ़ेस बनाता है जिन्हें आप शिप कर सकते हैं।',
    },
    whatItIs: {
      en: 'v0 by Vercel turns a text (or image) prompt into clean, modern web interface code. It’s a fast way to go from an idea or a screenshot to a real, editable React + Tailwind component.',
      hi: 'Vercel का v0 टेक्स्ट (या इमेज) प्रॉम्प्ट को साफ़, आधुनिक वेब इंटरफ़ेस कोड में बदलता है। यह किसी आइडिया या स्क्रीनशॉट से असली, संपादन-योग्य React + Tailwind कंपोनेंट तक तेज़ी से पहुँचने का तरीका है।',
    },
    bestFor: [
      { en: 'Designers and marketers who want production-ready UI fast.', hi: 'डिज़ाइनर और मार्केटर जो जल्दी प्रोडक्शन-रेडी UI चाहते हैं।' },
      { en: 'Turning a rough sketch or screenshot into code.', hi: 'किसी कच्चे स्केच या स्क्रीनशॉट को कोड में बदलना।' },
    ],
    bestPractices: [
      { en: 'Describe layout, tone and content; attach a reference image if you have one.', hi: 'लेआउट, लहजा और सामग्री बताएं; कोई संदर्भ इमेज हो तो लगाएं।' },
      { en: 'Iterate section by section, then export the code.', hi: 'सेक्शन-दर-सेक्शन सुधारें, फिर कोड एक्सपोर्ट करें।' },
    ],
    examples: [
      { prompt: 'A pricing section with 3 tiers, navy brand, monthly/yearly toggle.', note: { en: 'A specific, shippable component.', hi: 'एक विशिष्ट, शिप-योग्य कंपोनेंट।' } },
    ],
    tips: [
      { en: 'Perfect for a first draft; a developer polishes for production.', hi: 'पहले ड्राफ़्ट के लिए बढ़िया; प्रोडक्शन के लिए डेवलपर निखारता है।' },
      { en: 'Keep your brand tokens handy to paste in.', hi: 'पेस्ट करने के लिए अपने ब्रांड टोकन तैयार रखें।' },
    ],
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    maker: 'Midjourney',
    category: 'Image & video',
    cover: '/images/ai/midjourney.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'The go-to for striking, stylised AI images — art direction through prompts.',
      hi: 'आकर्षक, स्टाइलाइज़्ड AI इमेज के लिए पसंदीदा — प्रॉम्प्ट के ज़रिये आर्ट डायरेक्शन।',
    },
    whatItIs: {
      en: 'Midjourney generates high-quality, artistic images from text prompts. It’s loved for its aesthetic and control over style, lighting and composition — a favourite for moodboards, concepts and campaign visuals.',
      hi: 'Midjourney टेक्स्ट प्रॉम्प्ट से उच्च-गुणवत्ता वाली, कलात्मक इमेज बनाता है। इसे इसके सौंदर्य और शैली, प्रकाश व संरचना पर नियंत्रण के लिए पसंद किया जाता है — मूडबोर्ड, कॉन्सेप्ट और कैंपेन विज़ुअल के लिए पसंदीदा।',
    },
    bestFor: [
      { en: 'Moodboards, concept art and campaign visuals.', hi: 'मूडबोर्ड, कॉन्सेप्ट आर्ट और कैंपेन विज़ुअल।' },
      { en: 'Exploring a look before a real photoshoot.', hi: 'असली फ़ोटोशूट से पहले लुक तलाशना।' },
    ],
    bestPractices: [
      { en: 'Describe subject, style, lighting, mood and aspect ratio.', hi: 'विषय, शैली, प्रकाश, मूड और आस्पेक्ट रेशियो बताएं।' },
      { en: 'Iterate with variations; steal from the best one.', hi: 'वेरिएशन के साथ सुधारें; सबसे अच्छे से विचार लें।' },
    ],
    examples: [
      { prompt: 'A big blue ad truck on a Mumbai highway at dusk, cinematic, wide shot --ar 16:9', note: { en: 'Subject + style + framing.', hi: 'विषय + शैली + फ़्रेमिंग।' } },
    ],
    tips: [
      { en: 'Check usage rights before using AI images commercially.', hi: 'AI इमेज को व्यावसायिक रूप से इस्तेमाल करने से पहले अधिकार जाँचें।' },
      { en: 'Avoid real logos and real people’s likenesses.', hi: 'असली लोगो और असली लोगों की समानता से बचें।' },
    ],
  },
  {
    slug: 'runway',
    name: 'Runway',
    maker: 'Runway',
    category: 'Image & video',
    cover: '/images/ai/runway.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'AI video generation and editing — text or image to short, usable clips.',
      hi: 'AI वीडियो जनरेशन और एडिटिंग — टेक्स्ट या इमेज से छोटे, उपयोगी क्लिप।',
    },
    whatItIs: {
      en: 'Runway creates and edits video with AI — generating clips from a prompt or image, extending shots, and doing effects that used to need a full post team. Popular for social video and ad concepts.',
      hi: 'Runway AI से वीडियो बनाता और एडिट करता है — प्रॉम्प्ट या इमेज से क्लिप बनाना, शॉट बढ़ाना, और ऐसे इफ़ेक्ट करना जिनके लिए पहले पूरी पोस्ट टीम चाहिए होती थी। सोशल वीडियो और विज्ञापन कॉन्सेप्ट के लिए लोकप्रिय।',
    },
    bestFor: [
      { en: 'Short social video and quick ad concepts.', hi: 'छोटे सोशल वीडियो और तेज़ विज्ञापन कॉन्सेप्ट।' },
      { en: 'Adding motion to a still image.', hi: 'किसी स्थिर इमेज में गति जोड़ना।' },
    ],
    bestPractices: [
      { en: 'Keep shots short and describe camera movement.', hi: 'शॉट छोटे रखें और कैमरा मूवमेंट बताएं।' },
      { en: 'Generate several takes and pick the cleanest.', hi: 'कई टेक बनाएं और सबसे साफ़ चुनें।' },
    ],
    examples: [
      { prompt: 'Animate this product photo: slow push-in, soft studio light, 4 seconds.', note: { en: 'Image-to-motion with direction.', hi: 'दिशा के साथ इमेज-से-मोशन।' } },
    ],
    tips: [
      { en: 'Plan for cleanup — AI video often needs a light edit.', hi: 'सफ़ाई की योजना रखें — AI वीडियो को अक्सर हल्की एडिट चाहिए।' },
      { en: 'Storyboard first; generate to the plan.', hi: 'पहले स्टोरीबोर्ड बनाएं; योजना के अनुसार जनरेट करें।' },
    ],
  },
  {
    slug: 'suno',
    name: 'Suno',
    maker: 'Suno',
    category: 'Audio & voice',
    cover: '/images/ai/suno.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Generate full songs from a prompt — melody, vocals and lyrics for jingles and reels.',
      hi: 'प्रॉम्प्ट से पूरा गाना बनाएं — जिंगल और रील के लिए धुन, गायन और बोल।',
    },
    whatItIs: {
      en: 'Suno turns a description into original music, including vocals and lyrics. Handy for jingles, reel audio and mood tracks when you need something custom and quick.',
      hi: 'Suno किसी वर्णन को मौलिक संगीत में बदलता है, गायन और बोल सहित। जब आपको कुछ कस्टम और जल्दी चाहिए तब जिंगल, रील ऑडियो और मूड ट्रैक के लिए उपयोगी।',
    },
    bestFor: [
      { en: 'Jingles and custom reel/ad audio.', hi: 'जिंगल और कस्टम रील/विज्ञापन ऑडियो।' },
      { en: 'Quick mood tracks for a pitch.', hi: 'किसी पिच के लिए तेज़ मूड ट्रैक।' },
    ],
    bestPractices: [
      { en: 'Describe genre, mood, tempo and language of vocals.', hi: 'शैली, मूड, गति और गायन की भाषा बताएं।' },
      { en: 'Write or refine the lyrics for on-brand messaging.', hi: 'ब्रांड-अनुरूप संदेश के लिए बोल लिखें या सुधारें।' },
    ],
    examples: [
      { prompt: 'A cheerful 20-second Hindi jingle for a festive sale, upbeat, catchy hook.', note: { en: 'Genre + length + language + hook.', hi: 'शैली + अवधि + भाषा + हुक।' } },
    ],
    tips: [
      { en: 'Check licensing before using AI music in paid ads.', hi: 'पेड विज्ञापनों में AI संगीत से पहले लाइसेंसिंग जाँचें।' },
      { en: 'Keep hooks short — the first 3 seconds matter most.', hi: 'हुक छोटे रखें — पहले 3 सेकंड सबसे अहम।' },
    ],
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    maker: 'ElevenLabs',
    category: 'Audio & voice',
    cover: '/images/ai/elevenlabs.svg',
    edition: '2026 Edition',
    updated: '2026-07-06',
    tagline: {
      en: 'Lifelike AI voices and dubbing — voiceovers in many languages, including Hindi.',
      hi: 'सजीव AI आवाज़ें और डबिंग — कई भाषाओं में वॉइसओवर, हिन्दी सहित।',
    },
    whatItIs: {
      en: 'ElevenLabs generates natural-sounding speech from text and can dub audio into other languages while keeping the voice. Widely used for ad voiceovers, explainer videos and multilingual content.',
      hi: 'ElevenLabs टेक्स्ट से स्वाभाविक लगने वाली आवाज़ बनाता है और आवाज़ बरकरार रखते हुए ऑडियो को दूसरी भाषाओं में डब कर सकता है। विज्ञापन वॉइसओवर, एक्सप्लेनर वीडियो और बहुभाषी सामग्री के लिए व्यापक रूप से इस्तेमाल।',
    },
    bestFor: [
      { en: 'Voiceovers for ads and explainers.', hi: 'विज्ञापन और एक्सप्लेनर के लिए वॉइसओवर।' },
      { en: 'Dubbing content into Hindi and regional languages.', hi: 'सामग्री को हिन्दी और क्षेत्रीय भाषाओं में डब करना।' },
    ],
    bestPractices: [
      { en: 'Pick a voice that fits the brand; keep it consistent.', hi: 'ब्रांड से मेल खाती आवाज़ चुनें; उसे एक जैसा रखें।' },
      { en: 'Add punctuation and pauses to control delivery.', hi: 'डिलीवरी नियंत्रित करने के लिए विराम-चिह्न और ठहराव जोड़ें।' },
    ],
    examples: [
      { prompt: 'Read this 30-second script in a warm, confident Hindi male voice.', note: { en: 'Tone + language + length.', hi: 'लहजा + भाषा + अवधि।' } },
    ],
    tips: [
      { en: 'Get consent before cloning any real person’s voice.', hi: 'किसी असली व्यक्ति की आवाज़ क्लोन करने से पहले सहमति लें।' },
      { en: 'Listen on phone speakers — that’s where most ads play.', hi: 'फ़ोन स्पीकर पर सुनें — ज़्यादातर विज्ञापन वहीं चलते हैं।' },
    ],
  },
];
