
const pg = {
    main:document.querySelector("main"),
    title: document.querySelector(".title"),
    par: document.querySelector(".par"),
    btnCont: document.querySelector(".btnCont"),
}


/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> ADDITIONS <---------- ---------- */


document.querySelector(".plusBtn").addEventListener("click", (e) => {
    document.querySelector(".plus").classList.toggle("close")
})


const addDay = (gunSayisi) => new Date(Date.now() + 86400000 * gunSayisi).toLocaleDateString().slice(0, -5);


const showVacDates = (e) => {
    let map = [0, 3, 7, 14, 28].map((x) => addDay(x))
    map = [...map.slice(0, 3), map.slice(3).join(" - ")]
    document.querySelectorAll(".dose").forEach((el, idx) => {
        el.innerText = map[idx]
    })
}

const igFunc = () => {
    let [humanEl, horseEl, kgEl] = document.querySelectorAll(".ig input")
    let iuEl = document.querySelector(".iu")
    document.querySelectorAll(".ig input").forEach((inp) => {
        inp.addEventListener("input", (e) => {
            iuEl.innerText = (humanEl.checked ? 20 : 40) * kgEl.value
        })
    })
}

showVacDates()
igFunc()
/* ---------- ----------> ADDITIONS <---------- ---------- */
/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */


/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> PAGE GENERATOR <---------- ---------- */

let respck = ["restart", () => location.reload(), "restart"]

/* pack: [val,func, ...labels]
choices : [pack1,pack2]   */
function genFx([title, par, choices = [respck]]) {
    return function () {
        while (pg.btnCont.children.length) { pg.btnCont.children[0].remove() }

        pg.title.innerText = title
        pg.par.innerText = par

        for (const [val, func, ...labels] of choices) {
            for (const label of labels) {


                let btn = document.createElement("button")
                if (label.length > 50) { btn.style.fontSize = "1rem" }
                btn.setAttribute("alt", "test")

                btn.innerText = label
                btn.value = val
                btn.addEventListener("click", (e) => func(e))
                pg.btnCont.append(btn)
            }
        }

    }
}
/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> PAGE CONTENTS <---------- ---------- */


const text = {
    nothing: "Başka kuduz profilaksi işlemi yok",
}

const ltSeven = genFx(["Ig", "Ig uygula",])

const gtSeven = genFx(["Bitti", text.nothing,])

const noVacDead = genFx(["7 Gün?", "İlk aşıdan itibaren 7 gün geçti mi?", [
    ["good", gtSeven, "7 gün geçti",],
    ["bad", ltSeven, "7 gün geçmedi",]]])

const noVacAlive = genFx(["Bitti", text.nothing,])

const noVacCanWatch = genFx(["Aşı + Gözlem", "Aşılamaya başla ve Kedi/Köpek'i gözlem altında tut", [
    ["good", noVacAlive, "Kedi/Köpek gözlem altında ve sağlıklı veya gözlem tamamlandı",],
    ["bad", noVacDead, "Gözlemde Sorun Mevcut",],
    respck]])

const noVacNoWatch = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const noVac = genFx(["Gözlem", "Kedi/Köpek'in 10 gün gözlemi yapılabilecek mi?", [
    ["good", noVacCanWatch, "Gözlem Yapılacak"], ["bad", noVacNoWatch, "Gözlem Yapılamayacak"]]])
/* ---------- ----------> NO VAC <---------- ---------- */

const vacDead = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const vacAlive = genFx(["Bitti", text.nothing,])

const vac = genFx(["Gözlem", "Kedi/Köpek'i 10 gün gözlem altında tut. Aşı veye Ig yapma.",
    [["good", vacAlive, "Kedi/Köpek gözlem altında ve sağlıklı veya gözlem tamamlandı",],
    ["bad", vacDead, "Gözlemde Sorun Mevcut",]]])
/* ---------- ----------> VAC <---------- ---------- */

const woundBad = genFx(["Hayvan Aşı", "Kedi/Köpek'in 1 sene içinde Kuduz Aşısı var?", [
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
const res2d = genFx(["2 doz", "Toplam 2 doz aşı uygula (0. ve 3. günlerde)",])
const resIg = genFx(["Aşı + Ig", "Aşılamaya başla ve Ig uygula",])

const spec = genFx(["Özel Durum", "Hangi durum var?", [
    ["normal", wound, "Hiçbiri"],
    ["bad", resIg, "İmmün Yetmezlik", "Baş-boyun Yarası"],
    ["good", res2d, "Hasta daha önce de kuduza karşı aşılanmış"],
    ["best", resNoNeed, "Provoke, küçük, kanamasız kedi tırmalaması"],
]])

const exposure = genFx(["Temas Türü", "Temas Türü Seç", [
    ["kk", spec, "Kedi/Köpek Yaralanması"],
]])

//   IGNITION    
exposure() 

/* ---------- ---------- ---------- -------- ---------- ---------- ---------- */
/* ---------- ----------> ANIMATIONS <---------- ---------- */

const animObj1 = {
    frames: [[]],
    timing: {},

    play(targetEl) {return targetEl.animate(this.frames,this.timing)
    }
}

let trg1 = pg.main
let kf1 = new KeyframeEffect(trg1,
    [
        {offset: 0 ,scale:"1"},
        {offset: 0.1 ,scale:"0.01", borderRadius: "50%" },
        {offset: 0.9 ,scale:"0.01", borderRadius: "50%" },
        {offset: 1 ,scale:"1" },
    ],
    {duration:1500,fill:"both"})

    let anim1 = new Animation(kf1)

    pg.title.addEventListener("click", (e) => {
        console.log("aaa");
        anim1.play()
    })





    /* offset:0, opacity: "1",translate:"0 0",display:"block"
offset:0.50,opacity: "1",translate:"100vw 0",display:"none"
offset:0.51,opacity: "1",translate:"-100vw 0",display:"block"
offset:1,opacity: "1",translate:" 0 0",display:"block" */