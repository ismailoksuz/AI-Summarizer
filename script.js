const apiKey = "AIzaSyCjwboSkAkW8ItHnVzoYrlaKvCGxHca_VI";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";
const sourceSelect = document.getElementById('source-language');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const loadingSpinner = document.getElementById('loading-spinner');
const statusMessage = document.getElementById('status-message');
const processButton = document.getElementById('process-button');
const mainTitle = document.getElementById('main-title');
const mainSubtitle = document.getElementById('main-subtitle');
const footerText = document.getElementById('footer-text');
const sourceLabel = document.getElementById('source-label');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const loadingText = document.getElementById('loading-text');
const uiLabels = {
    'Turkish': { 
        title: 'ÖZ-ZEKA: METİN SIKILAŞTIRICI',
        subtitle: 'Metinlerinizi yapay zeka ile anında özetleyin.',
        source: 'Kaynak Dil:',
        input: 'Veri Girişi:',
        summarize: 'ÖZETLE',
        output: 'İŞLENMİŞ ÇIKTI:',
        loading: 'Veri Analizi Yapılıyor...',
        errorShort: 'Lütfen yeterince uzun bir metin giriniz (en az 50 karakter).',
        errorGeneral: 'İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        placeholder: 'Metni buraya yapıştırın...',
        footer: 'Gemini ile oluşturulmuş bir yardımcı program. Kod atıfı: ',
        initialOutput: 'Henüz bir işlem yapılmadı.',
    },
    'English': { 
        title: 'INSIGHT AI: TEXT COMPACTOR',
        subtitle: 'Summarize your texts instantly with artificial intelligence.',
        source: 'Source Language:',
        input: 'Data Input:',
        summarize: 'SUMMARIZE',
        output: 'PROCESSED OUTPUT:',
        loading: 'Analyzing Data...',
        errorShort: 'Please enter a sufficiently long text (at least 50 characters).',
        errorGeneral: 'An error occurred during the process. Please try again.',
        placeholder: 'Paste the text here...',
        footer: 'A utility built with Gemini. Code attribution: ',
        initialOutput: 'No operation performed yet.',
    },
    'Spanish': { 
        title: 'MÓDULO DE COMPACTACIÓN DE DATOS',
        subtitle: 'Resuma sus textos al instante con inteligencia artificial.',
        source: 'Idioma Origen:',
        input: 'Entrada de Datos:',
        summarize: 'RESUMIR',
        output: 'SALIDA PROCESADA:',
        loading: 'Analizando Datos...',
        errorShort: 'Por favor, ingrese un texto lo suficientemente largo (mínimo 50 caracteres).',
        errorGeneral: 'Ocurrió un error durante el proceso. Por favor, inténtelo de nuevo.',
        placeholder: 'Pegue el texto aquí...',
        footer: 'Una utilidad construida con Gemini. Atribución del código: ',
        initialOutput: 'Aún no se ha realizado ninguna operación.',
    },
    'German': { 
        title: 'DATENKOMPAKTIONSMODUL',
        subtitle: 'Fassen Sie Ihre Texte sofort mit künstlicher Intelligenz zusammen.',
        source: 'Quellsprache:',
        input: 'Dateneingabe:',
        summarize: 'ZUSAMMENFASSEN',
        output: 'VERARBEITETE AUSGABE:',
        loading: 'Daten werden analysiert...',
        errorShort: 'Bitte geben Sie einen ausreichend langen Text ein (mindestens 50 Zeichen).',
        errorGeneral: 'Während des Vorgangs ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
        placeholder: 'Fügen Sie den Text hier ein...',
        footer: 'Ein mit Gemini erstelltes Dienstprogramm. Code-Zuschreibung: ',
        initialOutput: 'Es wurde noch keine Operation durchgeführt.',
    },
    'French': { 
        title: 'MODULE DE COMPACTION DES DONNÉES',
        subtitle: 'Résumez instantanément vos textes grâce à l\'intelligence artificielle.',
        source: 'Langue Source:',
        input: 'Saisie de Données:',
        summarize: 'RÉSUMER',
        output: 'SORTIE TRAITÉE:',
        loading: 'Analyse des Données en cours...',
        errorShort: 'Veuillez entrer un texte suffisamment long (minimum 50 caractères).',
        errorGeneral: 'Une erreur s\'est produite pendant le processus. Veuillez réessayer.',
        placeholder: 'Collez le texte ici...',
        footer: 'Un utilitaire construit avec Gemini. Attribution du code: ',
        initialOutput: 'Aucune opération n\'a encore été effectuée.',
    },
    'Arabic': { 
        title: 'وحدة ضغط البيانات',
        subtitle: 'لخّص نصوصك فوراً باستخدام الذكاء الاصطناعي.',
        source: 'اللغة المصدر:',
        input: 'إدخال البيانات:',
        summarize: 'تَلْخِيص',
        output: 'الإخراج المعالج:',
        loading: 'تحليل البيانات...',
        errorShort: 'الرجاء إدخال نص طويل بما فيه الكفاية (50 حرفًا على الأقل).',
        errorGeneral: 'حدث خطأ أثناء العملية. يرجى المحاولة مرة أخرى.',
        placeholder: 'الصق النص هنا...',
        footer: 'أداة مساعدة تم بناؤها باستخدام Gemini. إسناد الرمز إلى: ',
        initialOutput: 'لم يتم إجراء أي عملية بعد.',
    },
    'Russian': { 
        title: 'МОДУЛЬ УПЛОТНЕНИЯ ДАННЫХ',
        subtitle: 'Мгновенно суммируйте свои тексты с помощью искусственного интеллекта.',
        source: 'Исходный Язык:',
        input: 'Ввод Данных:',
        summarize: 'СУММИРОВАТЬ',
        output: 'ОБРАБОТАННЫЙ ВЫХОД:',
        loading: 'Анализ Данных...',
        errorShort: 'Пожалуйста, введите достаточно длинный текст (не менее 50 символов).',
        errorGeneral: 'Во время процесса произошла ошибка. Пожалуйста, попробуйте снова.',
        placeholder: 'Вставьте текст сюда...',
        footer: 'Утилита, созданная с помощью Gemini. Атрибуция кода: ',
        initialOutput: 'Операция еще не выполнена.',
    },
    'Chinese': { 
        title: '数据压缩模块',
        subtitle: '使用人工智能即时总结您的文本。',
        source: '源语言:',
        input: '数据输入:',
        summarize: '概括',
        output: '已处理的输出:',
        loading: '正在分析数据...',
        errorShort: '请输入足够长的文本（至少 50 个字符）。',
        errorGeneral: '处理过程中发生错误。请再试一次。',
        placeholder: '将文本粘贴到此处...',
        footer: '使用 Gemini 构建的实用程序。代码归属: ',
        initialOutput: '尚未执行任何操作。',
    },
};
function updateUI() {
    const sourceLangValue = sourceSelect.value;
    const labels = uiLabels[sourceLangValue] || uiLabels['Turkish'];
    mainTitle.textContent = labels.title;
    mainSubtitle.textContent = labels.subtitle;
    const footerLink = footerText.querySelector('a');
    footerText.innerHTML = labels.footer + (footerLink ? footerLink.outerHTML : '');
    sourceLabel.textContent = labels.source;
    inputLabel.textContent = labels.input;
    outputLabel.innerHTML = `<i class="fas fa-brain mr-2"></i> ${labels.output}`;
    loadingText.textContent = labels.loading;
    statusMessage.textContent = '';
    inputText.placeholder = labels.placeholder;
    processButton.innerHTML = `<i class="fas fa-search"></i> ${labels.summarize}`;
    const currentOutputText = outputText.textContent.trim();
    const defaultTurkish = uiLabels['Turkish'].initialOutput;
    const allInitialMessages = Object.values(uiLabels).map(l => l.initialOutput);
    if (allInitialMessages.includes(currentOutputText) || currentOutputText === defaultTurkish) {
        outputText.textContent = labels.initialOutput;
    } else if (currentOutputText === uiLabels['Turkish'].loading) {
        outputText.textContent = labels.loading;
    }
}
window.processText = async function() {
    const text = inputText.value.trim();
    const sourceLangValue = sourceSelect.value;
    const labels = uiLabels[sourceLangValue] || uiLabels['Turkish'];
    const finalTargetLang = sourceLangValue;
    if (text.length < 50) {
        statusMessage.textContent = labels.errorShort;
        statusMessage.classList.remove('hidden');
        return;
    }
    statusMessage.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    processButton.disabled = true;
    outputText.textContent = labels.loading;
    const systemInstructionText = `Sen, makaleleri ve raporları sadece en önemli ana noktaları içerecek şekilde, maksimum 4 cümleye kısaltan profesyonel bir metin sıkıştırma motorusun. Çıktın sadece özeti içermelidir ve çıktı ${finalTargetLang} dilinde olmalıdır.`;
    const userQuery = `Lütfen aşağıdaki metni ${finalTargetLang} dilinde özetle:\n\nMETİN:\n${text}`;
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemInstructionText }] },
    };
    const MAX_RETRIES = 5;
    let attempt = 0;
    let resultText = labels.errorGeneral;
    const finalApiUrl = `${API_URL}?key=${apiKey}`;
    while (attempt < MAX_RETRIES) {
        try {
            const response = await fetch(finalApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('RateLimit');
                }
                const errorData = await response.json();
                throw new Error(`API Hatası: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }
            const result = await response.json();
            const candidate = result.candidates?.[0];
            if (candidate && candidate.content?.parts?.[0]?.text) {
                resultText = candidate.content.parts[0].text;
                break;
            } else {
                throw new Error('API yanıt yapısı beklenmiyor.');
            }
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error.message);
            attempt++;
            if (error.message === 'RateLimit' && attempt < MAX_RETRIES) {
                const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                if (error.message.includes("unregistered callers")) {
                    resultText = `${labels.errorGeneral} (Hata Kodu: Kimlik Doğrulama Başarısız. Lütfen API Anahtarınızı kontrol edin.)`;
                } else {
                    resultText = `${labels.errorGeneral} (Code: ${error.message})`;
                }
                break;
            }
        }
    }
    loadingSpinner.classList.add('hidden');
    processButton.disabled = false;
    outputText.textContent = resultText;
    if (resultText.startsWith(labels.errorGeneral)) {
         statusMessage.textContent = resultText;
         statusMessage.classList.remove('hidden');
    }
}
window.onload = updateUI;