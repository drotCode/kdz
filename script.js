// #region              elements
const step = {
    cont: document.querySelector(".stepCont"),
    title: document.querySelector(".stepTitle"),
    par: document.querySelector(".stepPar"),
    note: document.querySelector(".stepNote"),
    btnCont: document.querySelector(".stepBtnCont"),
    get btns() {return document.querySelectorAll(".stepBtnCont > *")} ,

}

const audio = {
    main: document.querySelector(".audio"),
    pop: document.querySelector(".audio2"),
}
// #endregion elements




//                      #region adjust

const adjust = {
    tooManyBtns() {
        if (step.btnCont.children.length > 10) {
            step.btnCont.classList.add("jsGrid")
        } else if (step.btnCont.classList.contains("jsGrid")) { step.btnCont.classList.remove("jsGrid") }
    },
    fontSize(label, button) { if (label.length > 50) { button.classList.add("font1rem") } },
}
//                                  #endregion adjust


//                      #region animations

let getAnim = (tar, fr, tm) => new Animation(new KeyframeEffect(tar, fr, tm))

const hiding = (action, ...els) => {
    let hideArr = [1, "hide", "h", "on", true, "true"]
    let unhideArr = [0, "unhide", "u", "off", false, "false", "show"]
    let toggleArr = [-1, "toggle", "t", "alternate", "false", "show"]
    els.forEach((el) => {
        if (hideArr.includes(action)) { el.classList.add("hide") }
        else if (unhideArr.includes(action)) { el.classList.remove("hide") }
        else if (toggleArr.includes(action)) { el.classList.toggle("hide") } else console.warn("Unkown action")
    })
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

// title dropowns
step.title.addEventListener("click", (e) => {
    e.target.classList.toggle("on")

    hiding("toggle", step.note)
})

// buttons to targets
let buttonPopMap = {
    names: ["info", "date", "rig", "menu"],
    match() {
        this.names.forEach((name) => {
            let span = document.querySelector("." + name + ">span")
            let pop = document.querySelector("." + name + ".pop")
            span.addEventListener("click", (e) => {
                audio.pop.play()
                e.target.classList.toggle("on")
                hiding("toggle", pop)
            },true)
        })
    },
}
buttonPopMap.match()

//                      #endregion animations


//                      #region generator

const logger = {
    logs : [ ],
    pop: document.querySelector(".pop.log"),
    list: document.querySelector(".logList"),
    writeList (){
        this.logs.forEach((log) => {
            let logEl = document.createElement("div")
            log.forEach((logItem) => {
                let itemEl = document.createElement("p")
                itemEl.innerText = logItem
                logEl.append(itemEl)
            })
            this.list.append(logEl)
        })
    },
    clear(){this.logs = []},
    appear() {
      this.writeList()
      hiding("show",this.pop)  
    },
}

const pageIt = (nameofThePage) => {

    while (step.btnCont.children.item(0)) { step.btnCont.children.item(0).remove() }

    let page = pageObjects.find(page => page.name == nameofThePage)

    step.title.innerText = page.title
    step.par.innerText = page.par
    step.note.innerText = page?.note || "not yok";

    if (!page.choices.length) { page.choices.push(restartChoice) }

    if(nameofThePage.includes("result")){ logger.appear() }

    page.choices.forEach((choice) => {

        choice.labels.forEach((label) => {
            let btn = document.createElement("button")
            btn.innerText = label
            btn.classList.add("generated")
            let log = [page.title, page.par, label]
            btn.addEventListener("click", (e) => {
                logger.logs.push(log)
                pageIt(choice.nextPage)
                mainAnim.play()

            })
            step.btnCont.append(btn)
        })

    })
adjust.tooManyBtns()




}
//                      #endregion generator


//                      #region additions

const hideParent = () => {
    document.querySelector(".hideParent").addEventListener("click", (e) => {
        hiding("hide",e.target.parentElement)
    })
}
hideParent()

const copyToClip = () => {
    document.querySelector(".copyToClip").addEventListener("click", (e) => {
        navigator.clipboard.writeText(logger.list.innerText )
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


//                      #region Data


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
            immDefandFace: `Yüz bölgesinden yaralanma ve bağışıklığı baskılanmış kişilerde süreye bakılmaksızın proflaksi uygulanır.`,
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

const notes2 = {
    redBox: {
        vacInjSite: `Aşı erişkinlerde deltoid bölgeye, küçük çocuklarda uyluğun anterolateral bölgesine kas içine uygulanır. 
        Gluteal bölgeye aşı enjeksiyonu, yeterli antikor yanıtı oluşturmadığı için yapılmamalıdır.`,
        vacAsap: `Temas sonrası aşılamaya olabildiğince erken başlanmalıdır.`,
        neverTooLate: `Kuduzda inkübasyon süresi çok değişken olduğundan, riskli temas sonrasında aradan geçen süreye bakmaksızın temas kategorize edilerek uygun profilaksiye başlanmalıdır.`,
        dontForgetNonPep: `Profilaksi gerektirmeyen durumlarda da (insan ısırıkları dahil) yara temizliği, antibiyotik tedavisi, tetanoz profilaksisi gibi ihtiyaç duyulan tedavi yaklaşımları ihmal edilmemelidir.`,
        recordEveryCase: `Kuduz profilaksisi uygulansın ya da uygulanmasın tüm kuduz riskli temaslar mutlaka kayıt altına alınmalıdır.`,
        avoidSuture: `Yaraya mümkün olduğu kadar dikiş ve benzeri girişim yapılmaması tercih edilir. Derin ve geniş yaralanmalarda, kozmetik faktörler ve enfeksiyon riski değerlendirilmelidir. Kuduz profilaksisi gerekiyorsa, virüsün sinir içine inokülasyon riskini en aza indirmek için yara çevresine ve içine kuduz immünglobulini yapıldıktan 2 saat sonra dikiş atılabilir.`,
        abFollow: `Çocuk ve erişkinler için antibiyotik profilaksi süresi belirgin kirli olmayan yara durumunda 3 gün, kirli yara durumunda 5 gündür. 
        İmmünsupresif hastalar dahil tüm hastalar 3 gün sonra tekrar değerlendirilmelidir.`,
        justContinue: `Bir veya birkaç doz aşı yapıldıktan sonra, aşıya ara vererek yeniden başvuranlarda aşılama şemasına kalınan yerden devam edilir.`,
        everyOnesEqual: `Bebek, çocuk, erişkin ve gebelerde kuduz bağışıklaması aynı şema ve dozlarla uygulanır.`,
        superCase: `Kuduz riskli temas sonrası aşılaması devam eden hastanın bu sırada yeni bir riskli teması olmuşsa aşılama şeması aynı şekilde sürdürülür.
        İkinci temasta immünglobulin endikasyonu varsa ilk doz aşıyı takip eden yedi gün içinde immünglobulin yapılır. Süre 7 günü geçmiş ise immünglobulin yapılmamalıdır.`,
        rVacMustGoOn: `Aşılama sırasında viral ve bakteriyel enfeksiyon saptanan hastalar uygun şekilde tedavi edilir ve aşılama sürdürülür. Kullanılan ilaçlara devam edilir. `,
        dontMix: `İmmünglobülin asla aşıyla aynı enjektörle ve İmmünglobülin asla aşıyla aynı anatomik bölgeye yapılmaz.`,
        compartment: `İmmünglobülin yapılırken özellikle küçük yaralarda kompartman sendromu gelişmesi konusunda dikkatli olunmalıdır.`,

    }
}

let pageObjects = [
    {
        name: "isSevenDaysPassed",
        title: "7 Gün",
        par: "İlk aşıdan itibaren 7 gün geçti mi?",
        note: ``,
        choices: [
            {
                value: true,
                nextPage: "resultNoRig",
                labels: [
                    "7 gün geçti"
                ]
            },
            {
                value: false,
                nextPage: "resultRig",
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
        note: notes.vaccedPetDies,
        choices: [
            {
                value: true,
                nextPage: "isPetFine",
                labels: [
                    "Kedi/Köpek son 1 senede kuduz aşısı olmuş"
                ]
            },
            {
                value: false,
                nextPage: "isPetWatchBig",
                labels: [
                    "Kedi/Köpek son 1 senede kuduz aşısı olmamış"
                ]
            }
        ]
    },
    {
        name: "isPetFineNoVac",
        title: "Aşıla ve Gözlem Altında",
        par: "Aşılamaya başla ve kedi/köpek'i gözlem altında tut. Kedi/Köpek 10 günü sağlıklı şekilde geçirdi mi?",
        choices: [
            {
                value: true,
                nextPage: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                nextPage: "isSevenDaysPassed",
                labels: [
                    "Hayvan öldü/hasta/bilinmiyor"
                ]
            }
        ]
    },
    {
        name: "isPetFine",
        title: "Gözlem Altında",
        par: "Aşı veya Ig yapılmaz. Kedi/Köpek'i 10 gün gözlem altında tutulur. Kedi/Köpek 10 günü sağlıklı şekilde geçirdi mi?",
        choices: [
            {
                value: true,
                nextPage: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                nextPage: "resultVacPlusRig",
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
        choices: [
            {
                value: true,
                nextPage: "resultNoProphylaxis",
                labels: [
                    "Gözlem Sorunsuz"
                ]
            },
            {
                value: false,
                nextPage: "resultVaccSmall",
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
        choices: [
            {
                value: true,
                nextPage: "isPetFineNoVac",
                labels: [
                    "Gözlem Yapılacak"
                ]
            },
            {
                value: false,
                nextPage: "resultVacPlusRig",
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
        note: notes.catDogWhy,
        choices: [
            {
                value: true,
                nextPage: "isPetFineSmall",
                labels: [
                    "Gözlem Yapılacak"
                ]
            },
            {
                value: false,
                nextPage: "resultVaccSmall",
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
        note: notes.vac.schema,
        choices: [
            {
                value: true,
                nextPage: "isPetWatchSmall",
                labels: [
                    "Çıplak derinin hafifçe sıyrılması (deri altına geçmeyen yaralanmalar)",
                    "Kanama olmadan küçük tırmalama veya zedeleme"
                ]
            },
            {
                value: false,
                nextPage: "isPetVacced",
                labels: [
                    "Deriyi zedeleyen tek veya çok sayıda ısırma ve tırmalamalar",
                    "Mukozaların, açık cilt yaralarının hayvanın salyası ile temas etmesi",
                    "Lezyonun kafa, boyun, parmak uçları gibi sinir uçlarının yoğun olduğu bölgelerde olması"
                ]
            }
        ]
    },
    {
        name: "resultNoRig",
        title: "Ig Yapılmaz",
        par: "Ig yapılmamalı. Aşılama sürdürülür.",
        note: notes.rig.warnings,
        choices: []
    },
    {
        name: "resultRig",
        title: "Ig Uygula",
        par: "Ig uygulanır. Aşılama sürdürülür.",
        note: notes.rig,
        choices: []
    },
    {
        name: "resultVaccSmall",
        title: "Aşıla",
        par: "Aşılamaya başla. Ig gerekli değil.",
        note: notes.vac.schema,
        choices: []
    },
    {
        name: "resultNoProphylaxis",
        title: "Bitti",
        par: "Profilaksi bitti.",
        note: notes.noPEP.warnings,
        choices: []
    },
    {
        name: "resultVacPlusRig",
        title: "Aşı + Ig",
        par: "Aşılamaya başla ve Ig uygula",
        note: notes.rig.dose,
        choices: []
    },
    {
        name: "resultVacc2dose",
        title: "2 doz aşı",
        par: "Toplam 2 doz aşı uygula (0. ve 3. günlerde)",
        note: notes.vacc2dose,
        choices: []
    },
    {
        name: "resultUnknown",
        title: "Bilmiyorum",
        par: "Cevabı Bilmiyorum :(",
        choices: []
    },
    {
        name: "isInSixMonths",
        title: "6 Ay",
        par: "Son 6 ay içinde mi aşılanmış?",
        note: notes.noPEP.warnings,
        choices: [
            {
                value: true,
                nextPage: "resultNoProphylaxis",
                labels: [
                    "6 ay içinde"
                ]
            },
            {
                value: false,
                nextPage: "resultVacc2dose",
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
        note: notes.noPEP.list,

        choices: [
            {
                value: false,
                nextPage: "isSmallWound",
                labels: [
                    "Hiçbiri"
                ]
            },
            {
                value: "immDef",
                nextPage: "resultVacPlusRig",
                labels: [
                    "İmmün Yetmezlik"
                ]
            },
            {
                value: "vaccedPatient",
                nextPage: "isInSixMonths",
                labels: [
                    "Hasta daha önce de kuduza karşı aşılanmış"
                ]
            },
            {
                value: "catScratch",
                nextPage: "resultNoProphylaxis",
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
        note: notes.noPEP.par,
        choices: [
            {
                value: true,
                nextPage: "resultNoProphylaxis",
                labels: [
                    "fare", "kirpi", "köstebek", "kuş", "sıçan", "sincap", "hamster", "kobay", "gerbil", "tavşan", "yılan", "kaplumbağa", "kertenkele", "tavuk", "horoz", "hindi"
                ]
            },
            {
                value: false,
                nextPage: "resultVacPlusRig",
                labels: [
                    "köpek", "kedi", "sığır","inek", "koyun", "keçi", "at", "eşek", "kurt", "tilki", "çakal", "domuz", "ayı", "sansar", "kokarca", "gelincik", "maymun"
                ]
            }
        ]
    },
    {
        name: "isBadExposure",
        title: "Temas Kategorisi",
        par: "Temas hangi kategoriye giriyor? ",
        note: notes.exposure2,
        choices: [
            {
                value: true,
                nextPage: "isRiskyAnimal",
                labels: [
                    "Açık yaraya temas",
                    "Mukozaya temas"
                ]
            },
            {
                value: false,
                nextPage: "resultNoProphylaxis",
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
        note: notes.exposure1,
        choices: [
            {
                value: true,
                nextPage: "whichRareCase",
                labels: [
                    "Kedi/Köpek Tarafından Yaralanma"
                ]
            },
            {
                value: false,
                nextPage: "isBadExposure",
                labels: [
                    "Başka bir temas"
                ]
            }
        ]
    }
]




//                      #endregion Data

let firstPageName = "isCatDogWound"
let restartChoice = { value: undefined, nextPage: firstPageName, labels: ["Baştan Başla"] }
// let logChoice = { value: undefined, nextPage: firstPageName, labels: ["Baştan Başla"] }



/* ----- ---------- ----------* APP INIT */

pageIt(firstPageName)

