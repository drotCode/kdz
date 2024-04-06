
const algo = {
    cont: document.querySelector(".algo.cont"),
    title: document.querySelector(".title"),
    par: document.querySelector(".par"),
    btnCont: document.querySelector(".btnCont"),
    audio: document.querySelector(".audio")
}

let logger = {
    logs: [],
    log(e) { this.logs.push([algo.par.innerText, e.target.innerText]) },
}

const btnSound = () => { algo.audio.play() }

/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> ADDITIONS <---------- ---------- */


const addDay = (gunSayisi) => new Date(Date.now() + 86400000 * gunSayisi).toLocaleDateString().slice(0, -5);


const showVacDates = (e) => {
    let map = [0, 3, 7, 14, 28].map((x) => addDay(x))
    map = [...map.slice(0, 3), map.slice(3).join(" - ")]

    document.querySelectorAll(".doseDate").forEach((el, idx) => {
        el.innerText = map[idx]
    })
}

const igFunc = () => {
    let [kgEl, iuEl, humanEl, horseEl,] = document.querySelectorAll(".ig input")
    let iuEl2 = document.querySelector(".iu")
    document.querySelectorAll(".ig input").forEach((inp) => {
        inp.addEventListener("input", (e) => {
            iuEl.value = (humanEl.checked ? 20 : 40) * kgEl.value
        })
    })
}

showVacDates()
igFunc()
/* ---------- ----------> ADDITIONS <---------- ---------- */
/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */


/* ---------- ----------> ANIMATIONS <---------- ---------- */

/* ----- ---------- ----------* hide with anim */

let hideAtStart = () => {
    document.querySelectorAll(".hideWanim").forEach((el) => {
        el.animate([{ display: "none" }], { fill: "forwards" })
    })
}



let getAnim = (tar, fr, tm) => new Animation(new KeyframeEffect(tar, fr, tm))

/* ---------- ----------> Slider */
let sliderKf = [[{ height: "3rem" }, { height: 0 }], { duration: 500, fill: "both", easing: "ease" }]

const ig = {
    button: document.querySelector("button.ig"),
    pop: document.querySelector("section.ig"),
    anim: null,
    init() {
        this.anim = getAnim(this.pop,
            [{ height: "30vh" }, { height: 0 }], { duration: 100, fill: "both", easing: "ease" })

        ig.button.addEventListener("click", (e) => {
            algo.audio.play()
            this.anim.play(); this.anim.reverse()
        })
    }
}
ig.init()


const dates = {
    button: document.querySelector("button.dates"),
    pop: document.querySelector("section.dates"),
    anim: null,
    init() {
        this.anim = getAnim(this.pop,
            [{ height: "28vh" }, { height: 0 }], { duration: 100, fill: "both", easing: "ease" })

        dates.button.addEventListener("click", (e) => {
            algo.audio.play()
            this.anim.play(); this.anim.reverse()
        })
    }
}
dates.init()


const info = {
    button: document.querySelector("button.info"),
    pop: document.querySelector("section.info"),
    anim: null,
    init() {
        this.anim =  getAnim(this.pop,
            [{ height: "72vh" }, { height: 0 }], { duration: 100, fill: "both", easing: "ease" })
        
        this.button.addEventListener("click", (e) => {
            algo.audio.play()
            this.anim.play(); this.anim.reverse()
        })
    }
}
info.init()


/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> PAGE GENERATOR <---------- ---------- */

// let mainAnim =  getAnim(document.querySelector("main"),
//     [
//         { offset: "3%", translate:"100%" },
//         { offset: "5%", translate:"100%" },
//         { offset: "95%", translate:"100%" },
//         { offset: "95.001%", translate:"-100%" },
//         { offset: "100%", translate:"" },
//     ], { duration: 1500, fill: "both", easing: "ease" })
let mainAnim =  getAnim(document.querySelector("main"),
    [
        { offset: "0%", filter: "blur(10px)" },
        { offset: "2%", height:"0%", filter: "blur(10px)", },
        { offset: "95%", height:"0%" },
        { offset: "100%", height:"" },
    ], { duration: 2000, fill: "both", easing: "ease" })


/* pack: [val,func, ...labels]
choices : [pack1,pack2]   */

const adjust = {
    s2: {
        gridIfNeed() {
            
            if (            algo.btnCont.children.length >10) {
                algo.btnCont.style.display = "grid"
                algo.btnCont.style.alignItems = "unset"
                algo.btnCont.style.gridTemplateColumns = "repeat(3,1fr)"
            } else {
                algo.btnCont.style.display = "flex"
                algo.btnCont.style.alignItems = "unset"
                algo.btnCont.style.gridTemplateColumns = "repeat(4,1fr)"

            }
        }
    }, s1: {
        fontSize(label,button) {
            if (label.length > 50) { button.style.fontSize = "1rem" }

        }
    },
    s0: {
        extras(e) {
            mainAnim.play()
            algo.audio.play()
            logger.log(e)
        }
    }
}



function genFx([title, par, choices = [respck, reportpck]]) {


    return function () {
        while (algo.btnCont.children.length) { algo.btnCont.children[0].remove() }

        algo.title.innerText = title
        algo.par.innerText = par

        for (const [val, func, ...labels] of choices) {
            adjust.s2.gridIfNeed()

            for (const label of labels) {
                
                
                let btn = document.createElement("button")
                adjust.s1.fontSize(label,btn)
                btn.innerText = label
                btn.value = val
                btn.addEventListener("click", (e) => {
                    adjust.s0.extras(e)
                    func()
                })
                algo.btnCont.append(btn)
            }
        }

    }
}
/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> PAGE CONTENTS <---------- ---------- */

let respck = ["restart", () => location.reload(), "restart"]

const text = {
    nothing: "Ek profilaksiye gerek yok",
}

const report = () => {
    while (algo.btnCont.children.length) { algo.btnCont.children[0].remove() }

    algo.title = "Rapor"
    algo.par = "Sorular ve verilen cevaplar"
    logger.logs.forEach((arr) => {
        let q = document.createElement("p")
        q.innerText = "Soru: " + arr[0]
        let a = document.createElement("p")
        a.innerText = "Cavap: " + arr[1]
        let qa = document.createElement("div")
        qa.append(q, a)
        algo.btnCont.append(qa)
    })
    let r = document.createElement("button")
    r.innerText = "restart"
    r.addEventListener("click", () => {
        location.reload()
    })
    algo.btnCont.append(r)

}
let reportpck = ["report", report, "report"]


/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> MAIN <---------- ---------- */


const ltSeven = genFx(["Ig", "Ig uygula",])

const gtSeven = genFx(["Bitti", text.nothing,])

const noVacDead = genFx(["7 Gün?", "İlk aşıdan itibaren 7 gün geçti mi?", [
    ["good", gtSeven, "7 gün geçti",],
    ["bad", ltSeven, "7 gün geçmedi",]]])

const noVacAlive = genFx(["Bitti", text.nothing,])

const noVacCanWatch = genFx(["Aşı + Gözlem", "Aşılamaya başla ve kedi/köpek'i gözlem altında tut", [
    ["good", noVacAlive, "Kedi/Köpek gözlem altında ve sağlıklı veya gözlem tamamlandı",],
    ["bad", noVacDead, "Gözlemde Sorun Mevcut",],
    respck]])

const noVacNoWatch = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const noVac = genFx(["Gözlem", "Kedi/Köpek'in 10 gün gözlemi yapılabilecek mi?", [
    ["good", noVacCanWatch, "Gözlem Yapılacak"], ["bad", noVacNoWatch, "Gözlem Yapılamayacak"]]])
/* ---------- ----------> NO VAC <---------- ---------- */

const vacDead = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const vacAlive = genFx(["Bitti", text.nothing,])

const vac = genFx(["Gözlem", "Kedi/Köpek'i 10 gün gözlem altında tut. Aşı veya Ig yapma",
    [["good", vacAlive, "Kedi/Köpek gözlem altında ve sağlıklı veya gözlem tamamlandı",],
    ["bad", vacDead, "Gözlemde Sorun Mevcut",]]])
/* ---------- ----------> VAC <---------- ---------- */

const woundBad = genFx(["Hayvan Aşı", "Kedi/Köpek'in 1 sene içinde Kuduz Aşısı var mı?", [
    ["good", vac, "Kuduz Aşısı var",],
    ["bad", noVac, "Kuduz Aşısı yok",]]])
/* ---------- ----------> WOUND BAD <---------- ---------- */


const petDead = genFx(["Aşı", "Aşılamaya başla. Ig gerekli değil.",])

const petAlive = genFx(["Bitti", text.nothing,])

const noWatch = genFx(["Aşı", "Aşılamaya başla. Ig gerekli değil.",])

const canWatch = genFx(["Gözlem Süreci", "Kedi/Köpek gözlem altında ve sağlıklı veya gözlem tamamlandı",
    [["petAlive", petAlive, "Gözlem Sorunsuz"], ["petDead", petDead, "Gözlemde Sorun Mevcut"]]])


const woundGood = genFx(["Gözlem", "Kedi/Köpek'in 10 gün gözlemi yapılabilecek mi?", [
    ["canWatch", canWatch, "Gözlem Yapılacak"], ["noWatch", noWatch, "Gözlem Yapılamayacak"]]])
/* ---------- ----------> WOUND GOOD <---------- ---------- */

const wound = genFx(["Temas Kategorisi", "Yara hangi tarife uyuyor?", [
    ["bad", woundBad, "Deriyi zedeleyen tek veya çok sayıda ısırma ve tırmalamalar",],
    ["bad", woundBad, "Mukozaların, açık cilt yaralarının hayvanın salyası ile temas etmesi",],
    ["bad", woundBad, "Lezyonun kafa, boyun, parmak uçları gibi sinir uçlarının yoğun olduğu bölgelerde olması",],
    ["good", woundGood, "Çıplak derinin hafifçe sıyrılması (deri altına geçmeyen yaralanmalar)",],
    ["good", woundGood, "Kanama olmadan küçük tırmalama veya zedeleme",]
]])


const resNoNeed = genFx(["Bitti", text.nothing,])
const resIg = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const gt6months = genFx("2 doz aşı", "Toplam 2 doz aşı uygula (0. ve 3. günlerde)",)

const vacced = genFx(["6 Ay", "Son 6 ay içinde mi aşılanmış?", [
    ["can<6", resNoNeed, "6 ay içinde"], [">6", gt6months, "6 aydan fazla olmuş"]]])




const isSpecial = genFx(["Özel Durum", "Hangi durum var?", [
    ["normal", wound, "Hiçbiri"],
    ["bad", resIg, "İmmün Yetmezlik",],
    ["good", vacced, "Hasta daha önce de kuduza karşı aşılanmış"],
    ["best", resNoNeed, "Provoke, küçük, kanamasız kedi tırmalaması"],
]])




const unknown  = genFx("Bilmiyorum", "Cevabı Bilmiyorum :(")



const animal = genFx(["Hayvanlar", "Hayvan seçiniz", [
    ["good", resNoNeed,
        "fare", "kirpi", "köstebek", "kuş", "sıçan", "sincap", "hamster", "kobay", "gerbil", "tavşan", "yılan", "kaplumbağa", "kertenkele", "tavuk", "horoz", "hindi",],
    ["bad", resIg,
        "köpek", "kedi", "sığır", "koyun", "keçi", "at", "eşek", "kurt", "tilki", "çakal", "domuz", "ayı", "sansar", "kokarca", "gelincik", "maymun",],
        ["unknown",unknown,"diğer"]
]])







const otherExposure = genFx(["Diğer Temaslar", "Temas Türünü Seçiniz", [
    ["bad", animal, "Açık yaraya temas", "Mukozaya temas"],
    ["good", resNoNeed, "Sağlam derinin yalanması, hayvana dokunma veya besleme", "Hayvanın etini, sütünü besin olarak tüketmek"],
]])



const exposure = genFx(["Temas Türü", "Temas Türü Seçiniz", [
    ["catDogWound", isSpecial, "Kedi/Köpek Yaralanması"],
    ["other", otherExposure, "Başka bir temas"],
]])


//   APP INIT    
exposure()
// animal()


/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */






/* ---------- ----------> Title */







/* ---------- ----------> My Notes <---------- ---------- */
/*

*/










// let mainDotAnim = pg.main.animate([
//     { offset: 0, scale: "1" },
//     { offset: 0.1, scale: "0.9", borderRadius: "40%" },
//     { offset: 0.3, scale: "0", borderRadius: "50%" },
//     { offset: 0.7, scale: "0", borderRadius: "50%" },
//     { offset: 0.9, scale: "0.9", borderRadius: "40%" },
//     { offset: 1, scale: "1" },
// ], { duration: 1500, fill: "both", easing: "linear" })
// mainDotAnim.pause()







/* offset:0, opacity: "1",translate:"0 0",display:"block"
offset:0.50,opacity: "1",translate:"100vw 0",display:"none"
offset:0.51,opacity: "1",translate:"-100vw 0",display:"block"
offset:1,opacity: "1",translate:" 0 0",display:"block" */