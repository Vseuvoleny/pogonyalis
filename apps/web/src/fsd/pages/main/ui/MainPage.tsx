import { sharedText } from "@pogonyalis/ui";
import { Footer } from "@/fsd/widgets/footer";
import { Header } from "@/fsd/widgets/header";

export function MainPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className="main-content">
        <section className="intro-section" aria-labelledby="main-title">
          <p className="eyebrow">Sailing debrief journal</p>
          <h1 id="main-title">Pogonyalis</h1>
          <p className="lead">
            Дневник тренировок и гонок: условия, соперники, настройки яхты и
            выводы после выхода на воду.
          </p>
          <p className="shared-note">{sharedText}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
