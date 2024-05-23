// #region                          ELEMENTS
const step = {
    cont: document.querySelector(".stepCont"),
    title: document.querySelector(".stepTitle"),
    par: document.querySelector(".stepPar"),
    note: document.querySelector(".stepNote"),
    btnCont: document.querySelector(".stepBtnCont"),
    get btns() { return document.querySelectorAll(".stepBtnCont > *") },

}

const audio = {
    main: document.querySelector(".audio"),
    pop: document.querySelector(".audio2"),
}

let firstPageName = "isCatDogWound"
let restartPath = { value: undefined, pageName: firstPageName, labels: ["Baştan Başla"] }
let seeLogsPath = { value: undefined, pageName: "logs", labels: ["Geçmişi Gör"] }
// #endregion                    ELEMENTS



//                      #region DATA

const notes = {
    rig: {
        dose: `İmmünglobülin Uygulaması Heterolog (at kaynaklı) olanlarda 40 IU/kg, insan kaynaklı olanlar için 20 IU/kg olarak yapılmalıdır. Dozun artırılmasının hiçbir yararı yoktur ve hatta antikor yanıtını baskılayabilir.`,
        site: `İmmünglobülinin tamamı, anatomik olarak uygun ise yara çevresine ve yara içine yapılmalı, anatomik olarak uygun değilse bir kısmı kompartman sendromu dikkate alınarak yara çevresine ve yara içine yapılmalı, geri kalanı sistemik olarak IM yolla (gluteal bölgeye yapılmamalıdır, öncelikle deltoid veya bacak anterolateral bölgesine) yapılmalıdır.`,
        dontMix: `İmmünglobülin asla aşıyla aynı enjektörle ve İmmünglobülin asla aşıyla aynı anatomik bölgeye yapılmaz`

    },
    vacc2dose:
        `Daha önce, herhangi bir nedenle (temas öncesi veya temas sonrası profilaksi) hücre kültür aşılarıyla tam doz (3 doz yeterli, bkz. sss) aşılaması yapılan sağlıklı kişilere (geçen süreye bakılmaksızın), 
        En az iki aralıklı doz yapılmış olan ve bunu belgeleyen immün sistemi normal bireylere aşılama 0. ve 3. günde olmak üzere toplam iki doz aşı yapılır. İmmünglobülin yapmaya gerek yoktur.`
    ,
    vac: {
        schema: `Kuduz Aşı Uygulaması 4 Dozluk Aşı Şeması: 0., 3., 7. günlerde birer doz ve 14 ile 28. günler arasında dördüncü doz olmak üzere toplam dört doz uygulanır.`,
        site: `Aşı erişkinlerde deltoid bölgeye, küçük çocuklarda uyluğun anterolateral bölgesine kas içine uygulanır. 
        Gluteal bölgeye aşı enjeksiyonu, yeterli antikor yanıtı oluşturmadığı için yapılmamalıdır. `,
        warning: `Aynı anatomik bölgeye birden fazla aşı uygulanacaksa, uygulama yerleri arasında en az 2 cm. uzaklık bulunmalıdır.`
    },
    noPEP: {

        par: ` Kuduz Profilaksisi Gerektirmeyen Temaslar Ülkemizde ve dünyada güncel verilerle fare, sıçan, sincap, hamster, kobay, gerbil, tavşan, yabani tavşan ısırıklarında ve kuduz şüphesi ile ölmüş hayvanın pişirilmiş et ve süt ürünlerinin tüketilmesi ile insana kuduz geçişi gösterilmemiştir, proflaksi gerekli değildir. Çiğ et ve/veya süt tüketimi ile bugüne kadar gösterilmiş insana geçiş yoktur, bu nedenle hayvan sağlığı ile ilgili kurumlar özel bir veri bildirmedikçe, bu durumlarda profilaksi gerekli değildir. `,


        list: `Temas sonrası kuduz profilaksisi gerektirmeyen durumlar
        - Ülkemizde ve dünyada güncel verilerle fare, sıçan, sincap, hamster, kobay, gerbil, tavşan, yabani tavşan ısırıklarında insana kuduz geçiçi gösterilmemiştir. Bu nedenle hayvan sağlığı ile ilgili kurumlar özel bir veri bildirmedikçe, bu tür hayvan ısırıklarında, 
        - Güncel verilerle, ülkemizde eve giren yarasaların ısırığı veya evde yarasa bulunması durumunda (doğal ortamdaki mağaralarda olan yarasa teması vaka temelli değerlendirilir), 
        - Soğukkanlı hayvanlar (yılan, kertenkele, kaplumbağa vb.) tarafından ısırılma durumunda, - Kümes hayvanları ısırıklarında, - Sağlam derinin yalanması, hayvana dokunma veya besleme, 
        - Bilinen ve halen sağlam bir kedi veya köpek tarafından 10 günden daha önce ısırılma veya temas durumunda,
         - Daha sonra kuduz olduğu anlaşılan bir hayvanı beslemiş olmak, sağlam derinin hayvanın kan, süt, idrar ve/veya feçesiyle temas etmiş olması, pişmiş etini yemek, kaynatılmış veya pastörize edilmiş sütünü içmek veya bu sütle yapılan süt ürünlerini tüketmek, 
         - Kuduz hastasına rutin bakım yapan riskli teması olmayan sağlık personeline (müköz membran veya bütünlüğü bozulmuş deri teması, ısırma vs.), 
         - Kedi temaslarında; çıplak derinin hafifçe sıyrılması (deri altına geçmeyen yaralanmalar), kanama olmadan küçük tırmalama veya zedeleme şeklinde yaralanmaya sebep olan, provakasyon ile olmuş ısırılma dışı kedi temasları,
       - Son 6 (altı) ay içinde tam doz kuduz temas sonrası profilaksi uygulanmış kişilerde profilaksi gerekmez. `,

        warnings: {
            immDefandFace: `Yüz bölgesinden yaralanma ve bağışıklığı baskılanmış kişilerde süreye bakılmaksızın profilaksi uygulanır.`,
            otherTreatments: `Profilaksi gerektirmeyen durumlarda da (insan ısırıkları dahil) yara temizliği, antibiyotik tedavisi, tetanoz profilaksisi gibi ihtiyaç duyulan tedavi yaklaşımları ihmal edilmemelidir.`,
            record: `Kuduz profilaksisi uygulansın ya da uygulanmasın tüm kuduz riskli temaslar mutlaka kayıt altına alınmalıdır.`
        }
    },
    exposure1: [
        `Kuduza yakalanma ihtimali olan hayvanların ısırıkları, yeri ne olursa olsun kuduz için risk oluşturur. Açık yara, kesi, müköz membranların tükrük, salya ve diğer nöral doku, hayvanlarda kullanılan canlı oral aşı yemleri gibi potansiyel enfekte olabilecek materyalle teması ve tırmalama da ısırık dışı kuduz riskli temas olarak kabul edilir.`
    ],
    exposure2: `Temas Sonrası Yaklaşım;- Yara bakımı, - Antibiyotik profilaksisi, - Tetanoz profilaksisi, - Kuduz aşısı uygulaması, - Kuduz immünglobulin uygulaması basamaklarını kapsar`,
    immDef: `İmmün sistemi baskılanmış hastalar (splenektomi dahil), kemoterapi gibi immün sistemi baskılayan ilaç alan hastalar CD4+ hücre sayısı <200/ mm3 olan HIV+ kişiler`
    ,
    catDogWhy: `Kedi ve köpeklerde kuduz patogenezini araştıran çalışmalarda virüs santral sinir sisteminden tükrük bezlerine ulaştıktan sonra 10 gün içinde hastalık belirtileri ortaya çıkmakta ve hayvan ölmektedir. Bir başka deyişle ısıran hayvan salyasında virüs taşıyorsa 10 gün içinde ölmesi beklenir (Bu nedenle kedi ve köpeğin 10 gün gözlemi önerilir). Kedi ve köpek dışındaki hayvanlarda böyle bir süre verilemez ve gözlem önerilmez. `,
    vaccedPetDies: `Hayvanın  kuduz belirtisi göstermesi veya açıklanamayan bir nedenle ölümü halinde  hemen   (0., 3., 7. günlerde birer doz ve 14-28. günler arasında bir doz daha olmak üzere toplam 4 doz aşı ile birlikte immünglobulin başlanır. `
}


let pageObjects = [
    {
        name: "isSevenDaysPassed",
        title: "7 Gün",
        par: "İlk aşıdan itibaren 7 gün geçti mi?",
        note: `Süre 7 günü geçmiş ise immünglobulin yapılmamalıdır.`,
        paths: [
            {
                value: true,
                pageName: "resultVacGoesOnNoRig",
                labels: [
                    "7 gün geçti"
                ]
            },
            {
                value: false,
                pageName: "resultRig",
                labels: [
                    "7 gün geçmedi"
                ]
            }
        ]
    },
    {
        name: "isPetVacced",
        title: "Hayvan Aşı",
        par: "Kedi/Köpek'in 1 sene içinde Kuduz Aşısı var mı?",
        note: `Geliştici Notu: "Bütün aşıları tam" denilen hayvan "kuduz aşısı hariç bütün aşıları tam" çıkabiliyor. Hayvan aşı kartını kontrol etmeniz önerilir. `,
        paths: [
            {
                value: true,
                pageName: "isPetFine",
                labels: [
                    "Kedi/Köpek son 1 senede kuduz aşısı olmuş"
                ]
            },
            {
                value: false,
                pageName: "isPetWatchBig",
                labels: [
                    "Kedi/Köpek son 1 senede kuduz aşısı olmamış"
                ]
            }
        ]
    },
    {
        name: "isPetFineNoVac",
        title: "Aşıla ve Gözlem Altında",
        par: "Aşılamaya başla ve kedi/köpek'i gözlem altında tut.\nKedi/Köpek 10 günü sağlıklı şekilde geçirdi mi?",
        note: `Hayvanın	hastalık	belirtisi	göstermesi	dahil,	herhangi	bir	nedenle	ölümü,	kaçması	yada	ortanan	kaybolması	durumunda, ilk	doz	aşıdan	sonra	en	geç	7	gün	içinde	immunglobulin	yapılır.
        `,
        paths: [
            {
                value: true,
                pageName: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                pageName: "isSevenDaysPassed",
                labels: [
                    "Hayvan öldü/hasta/bilinmiyor"
                ]
            }
        ]
    },
    {
        name: "isPetFine",
        title: "Gözlem Altında",
        par: "Aşı veya Ig yapılmaz. Kedi/Köpek'i 10 gün gözlem altında tutulur.\nKedi/Köpek 10 günü sağlıklı şekilde geçirdi mi?",
        note: ``,
        paths: [
            {
                value: true,
                pageName: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                pageName: "resultVacPlusRig",
                labels: [
                    "Hayvan öldü/hasta/bilinmiyor"
                ]
            }
        ]
    },
    {
        name: "isPetFineSmall",
        title: "Gözlem Altında",
        par: "Kedi/Köpek 10 günü sağlıklı şekilde geçirdi mi?",
        note: ``,
        paths: [
            {
                value: true,
                pageName: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                pageName: "resultVaccSmall",
                labels: [
                    "Hayvan öldü/hasta/bilinmiyor"
                ]
            }
        ]
    },
    {
        name: "isPetWatchBig",
        title: "Gözlem İmkanı",
        par: "Kedi/Köpek'in 10 gün gözlemi yapılabilecek mi?",
        note: `Geliştiric Notu: Hayvanın gözlemi yapılamayacaksa Ig uygulaması gerekli olacaktır.`,
        paths: [
            {
                value: true,
                pageName: "isPetFineNoVac",
                labels: [
                    "Gözlem Yapılacak"
                ]
            },
            {
                value: false,
                pageName: "resultVacPlusRig",
                labels: [
                    "Gözlem Yapılamayacak"
                ]
            }
        ]
    },
    {
        name: "isPetWatchSmall",
        title: "Gözlem İmkanı",
        par: "Kedi/Köpek'in 10 gün gözlemi yapılabilecek mi?",
        note: `Hayvanın	hastalık	belirtisi	göstermesi	dahil,	herhangi	bir	nedenle	ölümü,	kaçması	yada	ortanan	kaybolması	durumunda, temas	sonrası	aşı	profilaksisi	uygulanır:\n0.,	3.,	7.	günlerde	birer	doz	ve	14-28.	günler	arasında	bir	doz	daha	olmak	üzere	toplam	4	doz \n*İmmunglobulin	uygulamasına	gerek	yoktur.`,
        paths: [
            {
                value: true,
                pageName: "isPetFineSmall",
                labels: [
                    "Gözlem Yapılacak"
                ]
            },
            {
                value: false,
                pageName: "resultVaccSmall",
                labels: [
                    "Gözlem Yapılamayacak"
                ]
            }
        ]
    },
    {
        name: "isSmallWound",
        title: "Temas Kategorisi",
        par: "Yara hangi tarife uyuyor?",
        note: `Geliştici Notu: Kanama olmadan ifadesi bence yeterince belirli değil. Eğer yara üzerinde olan, akmayan kan; kanama olarak kabul edilecekse bu tarife uyan durum çok çok nadir.`,
        paths: [
            {
                value: true,
                pageName: "isPetWatchSmall",
                labels: [
                    "Çıplak derinin hafifçe sıyrılması (deri altına geçmeyen yaralanmalar)",
                    "Kanama olmadan küçük tırmalama veya zedeleme"
                ]
            },
            {
                value: false,
                pageName: "isPetVacced",
                labels: [
                    "Deriyi zedeleyen tek veya çok sayıda ısırma ve tırmalamalar",
                    "Mukozaların, açık cilt yaralarının hayvanın salyası ile temas etmesi",
                    "Lezyonun kafa, boyun, parmak uçları gibi sinir uçlarının yoğun olduğu bölgelerde olması"
                ]
            }
        ]
    },
    {
        name: "resultVacGoesOnNoRig",
        title: "Ig Yapılmaz",
        par: "Ig yapılmamalıdır. Aşılaya devam edilir.",
        note: notes.rig.warnings,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultRig",
        title: "Ig Uygula",
        par: "Kuduz Immunglobulini gerekli şekilde uygulanır. Aşılaya devam edilir.",
        note: notes.rig,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultVaccSmall",
        title: "Aşıla",
        par: "Aşılamaya başlanır. Immunglobulin gerekli değil.",
        note: notes.vac.schema,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultNoProphylaxis",
        title: "Son",
        par: "Sona ulaştınız. Kuduz profilaksisi tamamlandı.",
        note: `Profilaksi gerektirmeyen durumlarda da (insan ısırıkları dahil) yara temizliği, antibiyotik tedavisi, tetanoz profilaksisi gibi ihtiyaç duyulan tedavi yaklaşımları ihmal edilmemelidir.\nKuduz profilaksisi uygulansın ya da uygulanmasın tüm kuduz riskli temaslar mutlaka kayıt altına alınmalıdır.`,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultVacPlusRig",
        title: "Aşı + Ig",
        par: "Aşılamaya başla ve Ig uygula",
        note: `İmmünglobülin Uygulaması Heterolog (at kaynaklı) olanlarda 40 IU/kg, insan kaynaklı olanlar için 20 IU/kg olarak yapılmalıdır.\nDozun artırılmasının hiçbir yararı yoktur ve hatta antikor yanıtını baskılayabilir`,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultVacc2dose",
        title: "2 doz aşı",
        par: "Toplam 2 doz aşı uygula (0. ve 3. günlerde)",
        note: `Daha önce, herhangi bir nedenle (temas öncesi veya temas sonrası profilaksi) hücre kültür aşılarıyla tam doz  aşılaması yapılan sağlıklı kişilere (geçen süreye bakılmaksızın),\nEn az iki aralıklı doz yapılmış olan ve bunu belgeleyen immün sistemi normal bireylere\n aşılama 0. ve 3. günde olmak üzere toplam iki doz aşı yapılır. İmmünglobülin yapmaya gerek yoktur.\nGeliştirici Notu: 3 doz da tam sayılıyor, bkz. sss`,
        paths: [],
        meta: { result: true },
    },
    {
        name: "resultUnknown",
        title: "Bilmiyorum",
        par: "Cevabı Bilmiyorum :(",
        note: `Bir bilene sorun`,
        paths: [],
        meta: { result: true },
    },
    {
        name: "isInSixMonths",
        title: "6 Ay",
        par: "Son 6 ay içinde mi aşılanmış?",
        note: `Son 6 (altı) ay içinde tam doz kuduz temas sonrası profilaksi uygulanmış kişilerde profilaksi gerekmez. Yüz bölgesinden yaralanma ve bağışıklığı baskılanmış kişilerde süreye bakılmaksızın proflaksi uygulanır.(???)`,
        paths: [
            {
                value: true,
                pageName: "resultNoProphylaxis",
                labels: [
                    "6 ay içinde"
                ]
            },
            {
                value: false,
                pageName: "resultVacc2dose",
                labels: [
                    "6 aydan fazla olmuş"
                ]
            }
        ]
    },
    {
        name: "whichRareCase",
        title: "Özel Durum",
        par: "Hangi durum var?",
        note: `Temas sonrası kuduz profilaksisi gerektirmeyen durumlar
        - Ülkemizde ve dünyada güncel verilerle fare, sıçan, sincap, hamster, kobay, gerbil, tavşan, yabani tavşan ısırıklarında insana kuduz geçiçi gösterilmemiştir. Bu nedenle hayvan sağlığı ile ilgili kurumlar özel bir veri bildirmedikçe, bu tür hayvan ısırıklarında, 
        - Güncel verilerle, ülkemizde eve giren yarasaların ısırığı veya evde yarasa bulunması durumunda (doğal ortamdaki mağaralarda olan yarasa teması vaka temelli değerlendirilir), 
        - Soğukkanlı hayvanlar (yılan, kertenkele, kaplumbağa vb.) tarafından ısırılma durumunda, - Kümes hayvanları ısırıklarında, - Sağlam derinin yalanması, hayvana dokunma veya besleme, 
        - Bilinen ve halen sağlam bir kedi veya köpek tarafından 10 günden daha önce ısırılma veya temas durumunda,
         - Daha sonra kuduz olduğu anlaşılan bir hayvanı beslemiş olmak, sağlam derinin hayvanın kan, süt, idrar ve/veya feçesiyle temas etmiş olması, pişmiş etini yemek, kaynatılmış veya pastörize edilmiş sütünü içmek veya bu sütle yapılan süt ürünlerini tüketmek, 
         - Kuduz hastasına rutin bakım yapan riskli teması olmayan sağlık personeline (müköz membran veya bütünlüğü bozulmuş deri teması, ısırma vs.), 
         - Kedi temaslarında; çıplak derinin hafifçe sıyrılması (deri altına geçmeyen yaralanmalar), kanama olmadan küçük tırmalama veya zedeleme şeklinde yaralanmaya sebep olan, provakasyon ile olmuş ısırılma dışı kedi temasları`,
        paths: [
            {
                value: false,
                pageName: "isSmallWound",
                labels: [
                    "Hiçbiri"
                ]
            },
            {
                value: "immDef",
                pageName: "resultVacPlusRig",
                labels: [
                    "İmmün Yetmezlik"
                ]
            },
            {
                value: "vaccedPatient",
                pageName: "isInSixMonths",
                labels: [
                    "Hasta daha önce de kuduza karşı aşılanmış"
                ]
            },
            {
                value: "catScratch",
                pageName: "resultNoProphylaxis",
                labels: [
                    "Provoke, küçük, kanamasız kedi tırmalaması"
                ]
            }
        ]
    },
    {
        name: "isRiskyAnimal",
        title: "Hayvanlar",
        par: "Hayvan seçiniz",
        note: ` Kuduz Profilaksisi Gerektirmeyen Temaslar Ülkemizde ve dünyada güncel verilerle fare, sıçan, sincap, hamster, kobay, gerbil, tavşan, yabani tavşan ısırıklarında ve kuduz şüphesi ile ölmüş hayvanın pişirilmiş et ve süt ürünlerinin tüketilmesi ile insana kuduz geçişi gösterilmemiştir, proflaksi gerekli değildir. Çiğ et ve/veya süt tüketimi ile bugüne kadar gösterilmiş insana geçiş yoktur, bu nedenle hayvan sağlığı ile ilgili kurumlar özel bir veri bildirmedikçe, bu durumlarda profilaksi gerekli değildir. `,
        meta: {
            fns: [
                () => {
                    step.btnCont.style.display = "grid"
                    step.btnCont.style.gridTemplateColumns = "repeat(3, 1fr)"
                    step.btnCont.style.alignItems = "unset"
                }
            ]
        },
        paths: [
            {
                value: true,
                pageName: "resultNoProphylaxis",
                labels: [
                    "fare", "kirpi", "köstebek", "kuş", "sıçan", "sincap", "hamster", "kobay", "gerbil", "tavşan", "yılan", "kaplumbağa", "kertenkele", "tavuk", "horoz", "hindi"
                ]
            },
            {
                value: false,
                pageName: "resultVacPlusRig",
                labels: [
                    "köpek", "kedi", "sığır", "inek", "koyun", "keçi", "at", "eşek", "kurt", "tilki", "çakal", "domuz", "ayı", "sansar", "kokarca", "gelincik", "maymun"
                ]
            }
        ]
    },
    {
        name: "isBadExposure",
        title: "Temas Kategorisi",
        par: "Temas hangi kategoriye giriyor? ",
        note: `Temas Sonrası Yaklaşım;- Yara bakımı, - Antibiyotik profilaksisi, - Tetanoz profilaksisi, - Kuduz aşısı uygulaması, - Kuduz immünglobulin uygulaması basamaklarını kapsar`,
        paths: [
            {
                value: true,
                pageName: "isRiskyAnimal",
                labels: [
                    "Açık yaraya temas",
                    "Mukozaya temas"
                ]
            },
            {
                value: false,
                pageName: "resultNoProphylaxis",
                labels: [
                    "Sağlam derinin yalanması, hayvana dokunma veya besleme",
                    "Hayvanın etini, sütünü besin olarak tüketmek"
                ]
            }
        ]
    },
    {
        name: "isCatDogWound",
        title: "Kedi/Köpek Yarası?",
        par: "Kedi/Köpek tarafından yaralanma mı?",
        note: `Kuduza yakalanma ihtimali olan hayvanların ısırıkları, yeri ne olursa olsun kuduz için risk oluşturur. Açık yara, kesi, müköz membranların tükrük, salya ve diğer nöral doku, hayvanlarda kullanılan canlı oral aşı yemleri gibi potansiyel enfekte olabilecek materyalle teması ve tırmalama da ısırık dışı kuduz riskli temas olarak kabul edilir.`,
        paths: [
            {
                value: true,
                pageName: "whichRareCase",
                labels: [
                    "Kedi/Köpek Tarafından Yaralanma"
                ]
            },
            {
                value: false,
                pageName: "isBadExposure",
                labels: [
                    "Başka bir temas"
                ]
            }
        ]
    },
    {
        name: "welcome",
        title: "Kuduz Profilaksi Algoritması",
        par: `Uygun seçeneklere tıklayarak ilerleyiniz.
        Yukarıdaki başlığa tıklayarak, ilgili notu görebilirsiniz.
        En üstteki menüden iste aşı doz tarihlerini görebilir, Ig dozu hesaplayabilir veya ek bilgi edinebilirsiniz.`,
        note: `İlk sayfada not yok :P`,
        meta: {
            fns: [
                () => {
                    //  step.par.style.fontSize = "0.8rem"   
                    //  step.title.style.fontSize = "0.9rem"   
                }
            ]
        },
        paths: [
            {
                value: true,
                pageName: firstPageName,
                labels: [
                    "Başla"
                ]
            },
        ]
    },

]
//                      #endregion DATA

//                      #region ANIMATIONS

let getAnim = (tar, fr, tm) => new Animation(new KeyframeEffect(tar, fr, tm))

// HIDING POPS AT THE BEGINNING
document.querySelectorAll(".hide").forEach((el) => {
    el.setAttribute("data-hiddenByAnim", true)
    el.animate([{ display: "none" }], { fill: "forwards" })
})

const fade = {
    out(...els) {
        els.forEach((el) => {
            el.animate([{ display: "flex", opacity: 1 },
            { display: "none", opacity: 0 },
            ], { duration: 250, fill: "forwards" }
            )
            el.setAttribute("data-hiddenByAnim", true)
        })
    },
    in(...els) {
        els.forEach((el) => {
            el.animate([{ display: "none", opacity: 0 },
            { display: "flex", opacity: 1 },
            ],
                { duration: 250, fill: "forwards" })
            el.setAttribute("data-hiddenByAnim", "")
        })
    },
    toggle(...els) {
        els.forEach((el) => {
            let isHidden = el.getAttribute("data-hiddenByAnim")
            isHidden ? fade.in(el) : fade.out(el)
        })
    },
}

const mainAnim = {
    bool: true,
    play() {
        let targets = [step.title, step.par, ...step.btns]
        audio.main.play()

        targets.forEach((el) => {
            el.animate([
                { offset: "0%", translate: (this.bool = !this.bool) ? "100%" : "-100%", filter: "blur(3px)" },
                { offset: "100%", translate: "", filter: "", },
            ], { duration: 500, fill: "both", easing: "ease" })
        })
    }
}


// title dropdowns
let simpleFade = getAnim(step.note, [
    { display: "flex", opacity: 1 },
    { display: "none", opacity: 0 },
],
    { duration: 250, fill: "both" })

step.title.addEventListener("click", (e) => {
    e.target.classList.toggle("on")
    fade.toggle(step.note)
})


// buttons(span) to popup link
let buttonPopMap = {
    names: ["info", "date", "rig", "log"],
    match() {
        this.names.forEach((popupName) => {
            let span = document.querySelector("." + popupName + ">span")
            let pop = document.querySelector("." + popupName + ".pop")

            const togglePopAndSpan = () => { audio.pop.play(); span.classList.toggle("on"); fade.toggle(pop); }
            span.addEventListener("click", (e) => { togglePopAndSpan() }, true)


            let allinside = Array.from(document.querySelectorAll("." + popupName + " *"))
            document.body.addEventListener("click", ({ target }) => {
                if (!allinside.includes(target) && span.classList.contains("on") && popupName !== "date") {
                    togglePopAndSpan()

                }
            })
        })
    },
}
buttonPopMap.match()


//                      #endregion ANIMATIONS


//                      #region GENERATOR

/**
 * 
 * @param {string} tag 
 * @param {string} text 
 * @param {string} event 
 * @param {function} fn 
 * @param {HTMLElement} parent 
 */
const myElement = (tag = "div", text = "", event = "click", fn = null, parent = null) => {
    let newEl = document.createElement(tag)
    newEl.innerText = text
    if (fn) { newEl.addEventListener(event, fn) }
    parent?.append(newEl)
    return newEl
}

const logger = {
    pop: document.querySelector(".pop.log"),
    logs: [],
    fn16(ques, answ) {
        this.pop.insertAdjacentHTML("afterbegin",
            `<div>
    <span>${new Date().toLocaleString("tur-TR")}</span>
    <p> ${ques}</p>
    <p>${answ}</p>
</div>`
        )
    }

}

/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */


const pagify = (pageName, logArr = []) => {

    let page = pageObjects.find(page => page.name == pageName)
    document.querySelectorAll(".stepCont *").forEach((el) => {
        el.style = {}
    })



    while (step.btnCont.children.item(0)) step.btnCont.children.item(0).remove()
    let textProps = ["title", "par", "note"]
    textProps.forEach(propName => step[propName].innerText = page[propName])

    if (!page.paths.length) {
        page.paths.push(restartPath)
        console.log("I have no choice");
        step.note.innerText = logArr.slice(2).map(([par, label]) => {
            return par + "\n" + label
        }).join("\n\n")
        logArr = []

    }


    page.paths.forEach((path) => {

        path.labels.forEach((label) => {

            const listenerFn = (e) => {
                logArr.push([page.par, label])
                logger.fn16(page.par, label)
                pagify(path.pageName, logArr)
                mainAnim.play()
            }

            myElement("button", label, "click", listenerFn, step.btnCont)
        })
    })
    page?.meta?.fns?.forEach((fn) => fn())

}


//                      #endregion GENERATOR


//                      #region additions

const hideParent = () => {
    document.querySelector(".hideParent")?.addEventListener("click", (e) => {
        fade.toggle(e.target.parentElement)

    })
}
hideParent()

const copyToClip = () => {
    document.querySelector(".copyToClip")?.addEventListener("click", (e) => {
        navigator.clipboard.writeText(logger.list.innerText)
    })
}
copyToClip()

const addDay = (gunSayisi) => new Date(Date.now() + 86400000 * gunSayisi).toLocaleDateString("tur-TR").slice(0, -5);

const showVacDates = (e) => {
    let map = [0, 3, 7, 14, 28].map((x) => addDay(x))
    document.querySelectorAll(".doseDate").forEach((el, idx) => {
        el.innerText = map[idx]
    })
}
showVacDates()

const igFunc = () => {

    let rigInputs = document.querySelectorAll(".pop.rig input")
    let [kgInput, iuInput, humanChckBx,] = rigInputs

    rigInputs.forEach((inp) => {
        inp.addEventListener("input", (e) => {
            iuInput.value = (humanChckBx.checked ? 20 : 40) * kgInput.value
        })
    })
}
igFunc()
//                      #endregion additions



/* ----- ---------- ----------* APP INIT */

pagify("welcome", [])













let records = []
const fn1 = (pageName, record) => {
    let page = pageObjects.find(page => page.name == pageName)
    let paths = page.paths
    if (paths.length > 0) {
        paths.forEach((path) => {
            let pageName = path.pageName
            record.push(pageName)
            fn1(pageName, record)
        })
    } else {
        records.push(record)

    }

}


fn1(firstPageName, [])


// console.log(records);

/* 
--bgi
--bgi2
--bodyBg
--navBtnBg
--popBg
--popClr
--popTxtShdw
--logDivBg
--datePopBg
--infoPopNavBg
*/

const changeCssVars = () => {
    document.documentElement.style.setProperty('--bgi', 'none')
    document.documentElement.style.setProperty('--bgi2', 'none')
    document.documentElement.style.setProperty('--bodyBg', 'none')
    document.documentElement.style.setProperty('--navBtnBg', 'none')
    document.documentElement.style.setProperty('--popBg', 'none')
    document.documentElement.style.setProperty('--popClr', 'none')
    document.documentElement.style.setProperty('--popTxtShdw', 'none')
    document.documentElement.style.setProperty('--logDivBg', 'none')
    document.documentElement.style.setProperty('--datePopBg', 'none')
    document.documentElement.style.setProperty('--infoPopNavBg', 'none')

}

const removeBgImages = () => {
    document.querySelectorAll("*").forEach((el) => {
        el.style.backgroundImage = "unset"
    })
}

const addBgImages = () => {
    document.querySelectorAll("*").forEach((el) => {
        el.style.backgroundImage = "initial"
    })
}



// document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR')

cssVars = {
    dark: {
        "--bgi": "linear-gradient(90deg, hsl(190, 50%, 7%), hsl(190, 50%, 3%))",
        "--bgi2": "linear-gradient(90deg, hsl(190, 50%, 8%), hsl(190, 50%, 5%))",
        "--bodyBg": "hsl(0, 0%, 7%)",
        "--navBtnBg": "hsl(192, 100%, 5%)",
        "--popBg": "#202224f1",
        "--popClr": "hsl(138, 100%, 69%)",
        "--popTxtShdw": "hsl(133, 100%, 61%) -2px -0px 15px",
        "--logDivBg": "hsla(120, 100%, 47%, 0.067)",
        "--datePopBg": "hsla(0, 0%, 7%, 0.333)",
        "--infoPopNavBg": "hsl(210, 14%, 9%)",
    },
    light: {
        "--bgi": "linear-gradient(90deg, hsl(190, 50%, 97%), hsl(190, 50%, 93%))",
        "--bgi2": "linear-gradient(90deg, hsl(190, 50%, 98%), hsl(190, 50%, 95%))",
        "--bodyBg": "hsl(0, 0%, 97%)",
        "--navBtnBg": "hsl(192, 100%, 95%)",
        "--popBg": "#202224f1",
        "--popClr": "hsl(138, 100%, 19%)",
        "--popTxtShdw": "hsl(133, 100%, 61%) -2px -0px 15px",
        "--logDivBg": "hsla(120, 100%, 47%, 0.067)",
        "--datePopBg": "hsla(0, 0%, 7%, 0.333)",
        "--infoPopNavBg": "hsl(210, 14%, 99%)",
    },
    applyLight() {
        Object.entries(this.light).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value)
        })
    }

}


/**
 *  Applies CSS to element(s)
 * @param {string} bg - background color
 * @param {string} text - color
 * @param {string} border - border color
 * @param {string} bgImage - background image
 * @param {objects} els - HTML elements
 */
const setColors = (bg = null, text = null, border = null, bgImage = null, ...els) => {
    els.forEach((el) => {
        let style = el.style
        if (bg ?? false) { style.backgroundColor = bg }
        if (text ?? false) { style.color = text }
        if (border ?? false) { style.borderColor = border }
        if (bgImage ?? false) { style.backgroundImage = bgImage }
    })
}


const resetColors = () => {
    let allEls = document.querySelectorAll("*")
    setColors("#ccc", "#111", "#111", "none", ...allEls)
}




