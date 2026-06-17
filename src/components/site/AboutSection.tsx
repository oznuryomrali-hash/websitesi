export default function AboutSection() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand/50" id="hakkimda">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Yaklaşımım
          </span>
          <h2 className="font-headline text-headline-lg text-primary mt-4">
            Size özel, insani bir terapi deneyimi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Ana kart - Ben Kimim */}
          <div className="md:col-span-8 bg-surface rounded-xl p-8 md:p-12 border border-warm-sand soft-card-shadow">
            <div className="space-y-4">
              <h3 className="font-headline text-headline-md text-primary">Ben Kimim?</h3>
              <p className="font-body text-body-md text-on-surface-variant">
                2014 yılında Psikolojik Danışmanlık ve Rehberlik lisans eğitimimi tamamladım.
                2020'den beri psikoterapi alanında eğitimler almaktayım. Şu an klinik psikoloji
                yüksek lisansına devam etmekteyim.
              </p>
              <p className="font-body text-body-md text-on-surface-variant">
                Dinamik, aktarım odaklı ve gelişimsel psikoterapiler üzerine çeşitli eğitimler
                aldım. Yetişkinler ve çiftlerle çalışıyor; bireysel terapi ve çift terapisi hizmeti
                sunuyorum.
              </p>
              <p className="font-body text-body-md text-on-surface-variant">
                Çalışmalarımda yalnızca belirtilere değil, kişinin iç dünyasına, ilişki
                örüntülerine ve yaşam öyküsüne odaklanıyorum.
              </p>
            </div>
          </div>

          {/* Dinamik Psikoterapi */}
          <div className="md:col-span-4 bg-ocean-muted text-on-primary rounded-xl p-8 flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl">psychology</span>
            <div className="mt-8">
              <h3 className="font-headline text-headline-md mb-2">Dinamik Psikoterapi</h3>
              <p className="font-body text-body-md opacity-90">
                Görünmeyen örüntülerin görünür hale gelmesini destekleyen, derinlikli ve klinik bir
                yaklaşım.
              </p>
            </div>
          </div>

          {/* Güvenli Alan */}
          <div className="md:col-span-4 bg-soft-mist border border-outline-variant rounded-xl p-8 flex flex-col justify-between hover-card-lift">
            <span className="material-symbols-outlined text-3xl text-primary">shield</span>
            <div className="mt-6">
              <h3 className="font-headline text-headline-md text-primary mb-4">Güvenli Alan</h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Yargılanmadan, saygıyla ve gizlilikle dinlendiğiniz bir terapi ortamı.
              </p>
            </div>
          </div>

          {/* Bütüncül Yaklaşım */}
          <div className="md:col-span-8 bg-surface border border-warm-sand rounded-xl p-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-ocean-muted mt-1 flex-shrink-0">
                hub
              </span>
              <div>
                <h3 className="font-headline text-headline-md text-primary mb-2">
                  Bütüncül Yaklaşım
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  Bazen yaşadığımız sorunların neden tekrar ettiğini bilmeden aynı döngülerin
                  içinde kalabiliriz. Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale
                  gelmesine yardımcı olmak ve kişinin kendisiyle daha derin bir bağ
                  kurabilmesini desteklemektir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
